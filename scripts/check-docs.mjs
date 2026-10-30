#!/usr/bin/env node
/**
 * JumpServer 文档静态检查脚本（零依赖，ESM，Node.js >= 20）。
 *
 * 用法：
 *   node scripts/check-docs.mjs            # 中文报告，始终以退出码 0 结束
 *   node scripts/check-docs.mjs --strict   # 存在 error 时以退出码 1 结束
 *   node scripts/check-docs.mjs --json     # 输出机器可读的 JSON
 *
 * 检查范围：
 *   - docs/v5、docs/v4 下的全部 .mdx
 *   - docs/public/images/v5/jumpserver 下的图片文件名
 *
 * 设计原则：确定性、低误报。历史上已普遍存在、但暂时不阻塞写作的偏差按 warning
 * 报告；只有会导致构建失败或明显违反硬性规范的问题才按 error 报告。
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const DOCS_DIR = path.join(REPO_ROOT, "docs");
const PUBLIC_DIR = path.join(DOCS_DIR, "public");
const IMAGE_DIR = path.join(PUBLIC_DIR, "images", "v5", "jumpserver");
const VERSIONS = ["v5", "v4"];
const MAX_SAMPLES = 5;

/** 规则定义：id 用于 --json 与分组，label 为中文说明。顺序即报告顺序。 */
const RULES = [
  { id: "frontmatter", label: "缺少 frontmatter 块" },
  { id: "title", label: "页面 title" },
  { id: "description", label: "页面 description" },
  { id: "description-template", label: "模板化 description" },
  { id: "image-path", label: "图片路径" },
  { id: "image-alt", label: "图片 alt 文本" },
  { id: "link", label: "站内链接" },
  { id: "todo", label: "TODO 标记格式" },
  { id: "chinese", label: "正文中文字符" },
  { id: "heading", label: "标题结构" },
  { id: "fence-language", label: "代码块语言" },
  { id: "image-filename", label: "图片文件名命名" },
];

/** v4 大量页面使用模板化 description，属于历史债务，只告警。 */
const TEMPLATE_DESCRIPTION =
  /^Learn how to .* in JumpServer documentation, with key steps/;

/** 截图 TODO 的标准写法：{/* //TODO: ... *\/} */
const TODO_COMMENT = /\{\/\*[^\n]*\/\/TODO\b[^\n]*\*\/\}/;

const IMAGE_FILENAME_PATTERN = /^[a-z0-9][a-z0-9_-]*\.(?:png|jpe?g|webp|svg)$/;

const results = new Map(
  RULES.map((rule) => [rule.id, { error: [], warning: [] }]),
);

function addIssue(ruleId, severity, file, line, message) {
  const bucket = results.get(ruleId);
  if (!bucket) throw new Error(`未知规则：${ruleId}`);
  bucket[severity].push({ file, line, message });
}

const toPosix = (value) => value.split(path.sep).join("/");
const relFromRepo = (absPath) => toPosix(path.relative(REPO_ROOT, absPath));
const compareStrings = (left, right) =>
  left < right ? -1 : left > right ? 1 : 0;
const stripBom = (text) =>
  text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

function countNewlines(text) {
  let count = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === "\n") count += 1;
  }
  return count;
}

function buildLineStarts(text) {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === "\n") starts.push(index + 1);
  }
  return starts;
}

/** 返回 1-based 行号。 */
function lineAt(lineStarts, offset) {
  let low = 0;
  let high = lineStarts.length - 1;
  while (low < high) {
    const middle = (low + high + 1) >> 1;
    if (lineStarts[middle] <= offset) low = middle;
    else high = middle - 1;
  }
  return low + 1;
}

function isRegularFile(absPath) {
  try {
    return statSync(absPath).isFile();
  } catch {
    return false;
  }
}

function listFilesRecursive(dir, filter) {
  const files = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listFilesRecursive(absPath, filter));
    else if (entry.isFile() && filter(entry.name)) files.push(absPath);
  }
  return files;
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeFieldValue(rawValue) {
  const value = rawValue.trim();
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return value.slice(1, -1).trim();
    }
  }
  return value;
}

/**
 * 解析文件开头的 YAML frontmatter。
 * 返回 { fields: Map<name, {value, line}>, bodyStart }，没有 frontmatter 时返回 null。
 * 兼容 UTF-8 BOM、CRLF、行尾空格。
 */
function parseFrontmatter(text) {
  const match = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?=\r?\n|$)/.exec(text);
  if (!match) return null;

  const fields = new Map();
  const fieldLines = match[1].split(/\r?\n/);
  for (let index = 0; index < fieldLines.length; index += 1) {
    const fieldMatch = /^([A-Za-z0-9_-]+):[ \t]*(.*)$/.exec(fieldLines[index]);
    if (!fieldMatch) continue;
    fields.set(fieldMatch[1], {
      value: normalizeFieldValue(fieldMatch[2]),
      line: 2 + index,
    });
  }

  let bodyStart = match.index + match[0].length;
  if (text.startsWith("\r\n", bodyStart)) bodyStart += 2;
  else if (text[bodyStart] === "\n") bodyStart += 1;

  return { fields, bodyStart };
}

/** 把一行的字符全部替换为空格（保持长度与列位置）。 */
function blankLine(line) {
  return " ".repeat(line.length);
}

/** 标记并遮蔽 fenced code block，返回逐行掩码与围栏信息。 */
function scanFences(lines) {
  const maskedLines = [];
  const openings = [];
  let fence = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (fence) {
      maskedLines.push(blankLine(line));
      const close = /^[ \t]*(`{3,}|~{3,})[ \t]*$/.exec(line);
      if (
        close &&
        close[1][0] === fence.char &&
        close[1].length >= fence.length
      ) {
        fence = null;
      }
      continue;
    }
    const open = /^[ \t]*(`{3,}|~{3,})(.*)$/.exec(line);
    if (open) {
      fence = { char: open[1][0], length: open[1].length };
      maskedLines.push(blankLine(line));
      openings.push({ lineIndex: index, info: open[2].trim() });
      continue;
    }
    maskedLines.push(line);
  }

  return { maskedLines, openings };
}

/** 遮蔽 MDX 注释 `{/* ... *\/}`（可跨行）。 */
function maskMdxComments(lines) {
  const maskedLines = [];
  let inComment = false;
  for (const line of lines) {
    if (!inComment) {
      let masked = line;
      let start = masked.indexOf("{/*");
      while (start !== -1) {
        const end = masked.indexOf("*/}", start + 3);
        if (end === -1) {
          masked = masked.slice(0, start) + blankLine(masked.slice(start));
          inComment = true;
          break;
        }
        masked =
          masked.slice(0, start) +
          " ".repeat(end + 3 - start) +
          masked.slice(end + 3);
        start = masked.indexOf("{/*", end + 3);
      }
      maskedLines.push(masked);
    } else {
      const end = line.indexOf("*/}");
      if (end === -1) {
        maskedLines.push(blankLine(line));
      } else {
        maskedLines.push(" ".repeat(end + 3) + line.slice(end + 3));
        inComment = false;
      }
    }
  }
  return maskedLines;
}

/** 遮蔽行内代码（反引号 span），避免把示例中的链接、图片、标题当成真实内容。 */
function maskInlineCode(line) {
  let masked = line;
  let index = 0;
  while (index < masked.length) {
    if (masked[index] !== "`") {
      index += 1;
      continue;
    }
    let run = 1;
    while (masked[index + run] === "`") run += 1;
    let cursor = index + run;
    let close = -1;
    while (cursor < masked.length) {
      if (masked[cursor] === "`") {
        let closeRun = 1;
        while (masked[cursor + closeRun] === "`") closeRun += 1;
        if (closeRun === run) {
          close = cursor;
          break;
        }
        cursor += closeRun;
      } else {
        cursor += 1;
      }
    }
    if (close === -1) {
      index += run;
      continue;
    }
    masked =
      masked.slice(0, index) +
      " ".repeat(close + run - index) +
      masked.slice(close + run);
    index = close + run;
  }
  return masked;
}

/** 把正文拆成若干层掩码；各层保持字符偏移与行数不变。 */
function analyzeBody(body) {
  const lines = body.split(/\r?\n/);
  const fenceScan = scanFences(lines);
  const commentMaskedLines = maskMdxComments(fenceScan.maskedLines);
  const referenceMaskedLines = commentMaskedLines.map(maskInlineCode);
  return {
    lines,
    fenceMaskedLines: fenceScan.maskedLines,
    commentMaskedLines,
    referenceMaskedLines,
    fenceOpenings: fenceScan.openings,
  };
}

/** 在掩码文本中提取 Markdown 行内链接，支持标签内嵌套方括号与圆括号。 */
function extractLinkTargets(maskedText) {
  const links = [];
  let index = 0;
  while (index < maskedText.length) {
    const char = maskedText[index];
    if (char === "!" && maskedText[index + 1] === "[") {
      const image = parseInlineReference(maskedText, index + 1);
      index = image ? image.end : index + 2;
      continue;
    }
    if (char === "[") {
      const link = parseInlineReference(maskedText, index);
      if (link) {
        links.push(link);
        index = link.end;
        continue;
      }
    }
    index += 1;
  }
  return links;
}

/** 从 `[label](destination)` 解析出目标 URL；不匹配时返回 null。 */
function parseInlineReference(text, start) {
  let depth = 0;
  let labelEnd = -1;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (char === "\\") {
      index += 1;
      continue;
    }
    if (char === "[") depth += 1;
    else if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        labelEnd = index;
        break;
      }
    }
  }
  if (labelEnd === -1 || text[labelEnd + 1] !== "(") return null;

  let parenthesisDepth = 0;
  let destinationEnd = -1;
  for (let index = labelEnd + 1; index < text.length; index += 1) {
    const char = text[index];
    if (char === "\\") {
      index += 1;
      continue;
    }
    if (char === "(") parenthesisDepth += 1;
    else if (char === ")") {
      parenthesisDepth -= 1;
      if (parenthesisDepth === 0) {
        destinationEnd = index;
        break;
      }
    }
  }
  if (destinationEnd === -1) return null;

  const raw = text.slice(labelEnd + 2, destinationEnd);
  let cursor = 0;
  while (cursor < raw.length && /\s/.test(raw[cursor])) cursor += 1;
  let url = "";
  if (raw[cursor] === "<") {
    const close = raw.indexOf(">", cursor + 1);
    if (close === -1) return null;
    url = raw.slice(cursor + 1, close);
  } else {
    const urlStart = cursor;
    while (cursor < raw.length && !/\s/.test(raw[cursor])) cursor += 1;
    url = raw.slice(urlStart, cursor);
  }

  return { start, end: destinationEnd + 1, url };
}

function isExternalUrl(url) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url);
}

/** 把站内链接解析为文件系统路径；返回 ok、scope 与候选路径。 */
function resolveLinkTarget(fileAbs, version, rawTarget) {
  let baseDir = path.join(DOCS_DIR, version);
  let scope = `${version} 根目录`;
  let isAbsolute = true;
  let target = rawTarget;

  if (target === "/v4" || target.startsWith("/v4/")) {
    baseDir = path.join(DOCS_DIR, "v4");
    scope = "docs/v4";
    target = target.slice(3);
  } else if (target === "/v5" || target.startsWith("/v5/")) {
    baseDir = path.join(DOCS_DIR, "v5");
    scope = "docs/v5";
    target = target.slice(3);
  } else if (!target.startsWith("/")) {
    baseDir = path.dirname(fileAbs);
    scope = `${version} 页面所在目录`;
    isAbsolute = false;
  }

  const relative = safeDecode(target).replace(/\\/g, "/");
  const candidates = [];
  if (relative === "") {
    candidates.push(path.join(baseDir, "index.mdx"));
  } else if (relative.endsWith("/")) {
    candidates.push(path.join(baseDir, relative, "index.mdx"));
  } else {
    const extension = path.posix.extname(relative).toLowerCase();
    if (extension === ".mdx" || extension === ".md") {
      candidates.push(path.join(baseDir, relative));
    } else if (extension !== "") {
      if (isAbsolute) candidates.push(path.join(PUBLIC_DIR, relative));
      candidates.push(path.join(baseDir, relative));
    } else {
      candidates.push(path.join(baseDir, `${relative}.mdx`));
      candidates.push(path.join(baseDir, relative, "index.mdx"));
    }
  }

  return {
    ok: candidates.some(isRegularFile),
    scope,
    tried: candidates.map((candidate) => relFromRepo(candidate)),
  };
}

function checkImage(file, line, version, alt, rawUrl) {
  const altText = (alt ?? "").trim();
  const url = rawUrl === null ? null : rawUrl.trim();
  const dynamic = url === null || /^\{/.test(url);
  const external = url !== null && /^(?:https?:)?\/\//i.test(url);
  const urlPath = url === null ? "" : url.split("#")[0].split("?")[0];
  const fileName = urlPath.split("/").pop() ?? "";
  const fileStem = fileName.replace(/\.[^.]+$/, "");

  if (altText === "") {
    addIssue(
      "image-alt",
      "error",
      file,
      line,
      "图片缺少 alt 文本（应写 ![Figure N: 描述](...)，" +
        "<img> 需带 alt 属性）",
    );
  } else {
    const lowerAlt = altText.toLowerCase();
    if (lowerAlt === "image") {
      addIssue(
        "image-alt",
        "warning",
        file,
        line,
        'alt 为无意义的 "image"，请描述图片内容',
      );
    }
    if (
      !external &&
      !dynamic &&
      fileName !== "" &&
      (lowerAlt === fileName.toLowerCase() ||
        lowerAlt === fileStem.toLowerCase())
    ) {
      addIssue(
        "image-alt",
        "warning",
        file,
        line,
        `alt 等于文件名（${fileName}），请改为描述性文本`,
      );
    }
    if (/\.(?:png|jpe?g|gif|webp|svg|avif|bmp)$/i.test(altText)) {
      addIssue(
        "image-alt",
        "warning",
        file,
        line,
        "alt 含文件扩展名，请去掉扩展名并描述图片内容",
      );
    }
    // 外部图片（如 shields.io 徽章）不要求 Figure N: 前缀，避免大量误报。
    if (
      version === "v5" &&
      !external &&
      !dynamic &&
      !/^Figure \d+:/.test(altText)
    ) {
      addIssue(
        "image-alt",
        "warning",
        file,
        line,
        'v5 页面图片 alt 应以 "Figure N:" 开头（历史偏差，不阻塞）',
      );
    }
  }

  if (dynamic) return;
  if (external) {
    addIssue(
      "image-path",
      "warning",
      file,
      line,
      "外部 http(s) 图片（徽章等），请确认可长期访问",
    );
    return;
  }
  if (url === "") {
    addIssue("image-path", "error", file, line, "图片路径为空");
    return;
  }
  if (urlPath === "/docs" || urlPath.startsWith("/docs/")) {
    const suggestion = urlPath.slice("/docs".length) || "/";
    addIssue(
      "image-path",
      "error",
      file,
      line,
      `图片路径禁止带 /docs/ 前缀（站点 base 已为 /docs/），应写 ${suggestion}`,
    );
    return;
  }
  if (urlPath.startsWith("/")) {
    const target = path.join(
      PUBLIC_DIR,
      safeDecode(urlPath.replace(/^\/+/, "")),
    );
    if (!isRegularFile(target)) {
      addIssue(
        "image-path",
        "error",
        file,
        line,
        `图片在 docs/public 下不存在：${relFromRepo(target)}`,
      );
    }
    return;
  }
  addIssue(
    "image-path",
    "warning",
    file,
    line,
    "图片使用相对路径（站点 base 为 /docs/），建议改为 /images/... 绝对路径",
  );
}

function readAttribute(tag, name) {
  const pattern = new RegExp(
    `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|\\{([^}]*)\\})`,
    "i",
  );
  const match = pattern.exec(tag);
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? "";
}

function checkImageTag(file, line, version, tag) {
  const source = readAttribute(tag, "src");
  const alt = readAttribute(tag, "alt");
  const dynamicSource = /\bsrc\s*=\s*\{/.test(tag);
  checkImage(file, line, version, alt, dynamicSource ? null : source);
}

function checkLink(file, line, fileAbs, version, rawUrl) {
  const url = rawUrl.trim();
  if (url === "") return;
  if (isExternalUrl(url)) return;
  const clean = url.split("#")[0].split("?")[0];
  if (clean === "") return; // 纯锚点，锚点内容不在此校验
  if (clean === "/docs" || clean.startsWith("/docs/")) {
    const suggestion = clean.slice("/docs".length) || "/";
    addIssue(
      "link",
      "error",
      file,
      line,
      `站内链接禁止带 /docs/ 前缀（应写 ${suggestion}）`,
    );
    return;
  }
  const resolution = resolveLinkTarget(fileAbs, version, clean);
  if (!resolution.ok) {
    addIssue(
      "link",
      "error",
      file,
      line,
      `站内链接无法解析：${clean}（按 ${resolution.scope} 尝试 ${resolution.tried.join(
        " / ",
      )}）`,
    );
  }
}

function checkFile(fileAbs, version) {
  const file = relFromRepo(fileAbs);
  const text = stripBom(readFileSync(fileAbs, "utf8"));
  const frontmatter = parseFrontmatter(text);

  let body;
  let bodyLineOffset;
  if (frontmatter) {
    body = text.slice(frontmatter.bodyStart);
    bodyLineOffset = countNewlines(text.slice(0, frontmatter.bodyStart));
  } else {
    addIssue(
      "frontmatter",
      "error",
      file,
      1,
      "缺少 frontmatter 块（文件应以 --- 开头，并以 --- 结束该块）",
    );
    body = text;
    bodyLineOffset = 0;
  }

  if (frontmatter) {
    const title = frontmatter.fields.get("title");
    const description = frontmatter.fields.get("description");
    const overview = frontmatter.fields.get("overview");
    const isOverview = overview?.value.toLowerCase() === "true";

    if (!title || title.value === "") {
      if (version === "v5") {
        addIssue(
          "title",
          "error",
          file,
          1,
          "v5 页面缺少 title 字段（overview 页同样要求）",
        );
      } else {
        addIssue(
          "title",
          "warning",
          file,
          1,
          "v4 页面缺少 title 字段（v4 以 H1 作为标题，属历史现状）",
        );
      }
    }

    if (!description || description.value === "") {
      if (version === "v5") {
        if (isOverview) {
          addIssue(
            "description",
            "warning",
            file,
            1,
            "v5 overview 页面缺少 description 字段",
          );
        } else {
          addIssue(
            "description",
            "error",
            file,
            1,
            "v5 页面缺少 description 字段",
          );
        }
      }
    } else if (
      version === "v4" &&
      TEMPLATE_DESCRIPTION.test(description.value)
    ) {
      addIssue(
        "description-template",
        "warning",
        file,
        description.line,
        "description 为模板化文本（Learn how to ...），建议改写为具体摘要",
      );
    }
  }

  const analysis = analyzeBody(body);
  const maskedText = analysis.referenceMaskedLines.join("\n");
  const lineStarts = buildLineStarts(maskedText);
  const fileLineAt = (offset) => bodyLineOffset + lineAt(lineStarts, offset);
  const bodyFileLine = (lineIndex) => bodyLineOffset + lineIndex + 1;

  // 标题结构
  const headings = [];
  analysis.commentMaskedLines.forEach((line, lineIndex) => {
    const heading = /^ {0,3}(#{1,6})[ \t]+\S/.exec(line);
    if (!heading) return;
    headings.push({ level: heading[1].length, line: bodyFileLine(lineIndex) });
  });
  const h1Headings = headings.filter((heading) => heading.level === 1);
  // overview 页通常只有 frontmatter（正文为空），由 Rspress 生成子页面索引，
  // 不要求 H1；因此缺 H1 只对"有正文"的页面告警。
  const hasBodyContent = body.trim() !== "";
  if (h1Headings.length > 1) {
    addIssue(
      "heading",
      "warning",
      file,
      h1Headings[1].line,
      `文件含 ${h1Headings.length} 个 H1 标题（全页应只有一个 H1）`,
    );
  }
  if (hasBodyContent && h1Headings.length === 0) {
    addIssue(
      "heading",
      "warning",
      file,
      bodyFileLine(0),
      "缺少 H1 标题（正文应以 # 标题开头）",
    );
  }
  for (let index = 1; index < headings.length; index += 1) {
    const previous = headings[index - 1];
    const current = headings[index];
    if (current.level > previous.level + 1) {
      addIssue(
        "heading",
        "warning",
        file,
        current.line,
        `标题级别跳跃：H${previous.level} → H${current.level}`,
      );
    }
  }

  // 正文中文字符
  analysis.lines.forEach((line, lineIndex) => {
    if (/\p{Script=Han}/u.test(line)) {
      addIssue(
        "chinese",
        "warning",
        file,
        bodyFileLine(lineIndex),
        "正文出现中文字符（本站正文应使用英文）",
      );
    }
  });

  // TODO 标记格式
  analysis.fenceMaskedLines.forEach((line, lineIndex) => {
    if (!/\bTODO\b/.test(maskInlineCode(line))) return;
    if (TODO_COMMENT.test(analysis.lines[lineIndex])) return;
    addIssue(
      "todo",
      "warning",
      file,
      bodyFileLine(lineIndex),
      "TODO 标记格式不规范，应写作 {/* //TODO: ... */}",
    );
  });

  // 代码块语言
  for (const opening of analysis.fenceOpenings) {
    if (opening.info !== "") continue;
    addIssue(
      "fence-language",
      "warning",
      file,
      bodyFileLine(opening.lineIndex),
      "代码块缺少语言标注（如 ```sh）",
    );
  }

  // 图片
  const imagePattern =
    /!\[([^\]]*)\]\(\s*([^)\s]*)(?:\s+["'][^"']*["'])?\s*\)/g;
  for (const match of maskedText.matchAll(imagePattern)) {
    checkImage(file, fileLineAt(match.index), version, match[1], match[2]);
  }
  const imageTagPattern = /<img\b[^>]*>/gi;
  for (const match of maskedText.matchAll(imageTagPattern)) {
    checkImageTag(file, fileLineAt(match.index), version, match[0]);
  }

  // 站内链接：Markdown 行内链接
  for (const link of extractLinkTargets(maskedText)) {
    checkLink(file, fileLineAt(link.start), fileAbs, version, link.url);
  }

  // JSX 链接（<a href> / <Link href> 等）
  const hrefPattern = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  for (const match of maskedText.matchAll(hrefPattern)) {
    const url = match[1] ?? match[2] ?? "";
    checkLink(file, fileLineAt(match.index), fileAbs, version, url);
  }
}

function checkImageFileNames() {
  const files = listFilesRecursive(IMAGE_DIR, () => true);
  files.sort(compareStrings);
  for (const fileAbs of files) {
    const name = path.basename(fileAbs);
    if (IMAGE_FILENAME_PATTERN.test(name)) continue;
    addIssue(
      "image-filename",
      "warning",
      relFromRepo(fileAbs),
      1,
      `图片文件名不符合命名规范：${name}（应为小写字母、数字、下划线或连字符 + 扩展名）`,
    );
  }
  return files.length;
}

function collectDocFiles() {
  const entries = [];
  for (const version of VERSIONS) {
    const dir = path.join(DOCS_DIR, version);
    const files = listFilesRecursive(dir, (name) => name.endsWith(".mdx"));
    files.sort(compareStrings);
    for (const absPath of files) entries.push({ absPath, version });
  }
  return entries;
}

function collectResults(docEntries, imageCount) {
  const rules = RULES.map((rule) => {
    const bucket = results.get(rule.id);
    return {
      id: rule.id,
      label: rule.label,
      errors: bucket.error.length,
      warnings: bucket.warning.length,
      errorSamples: bucket.error.slice(0, MAX_SAMPLES),
      warningSamples: bucket.warning.slice(0, MAX_SAMPLES),
    };
  });
  const versions = Object.fromEntries(VERSIONS.map((version) => [version, 0]));
  for (const entry of docEntries) versions[entry.version] += 1;

  const errorTotal = rules.reduce((sum, rule) => sum + rule.errors, 0);
  const warningTotal = rules.reduce((sum, rule) => sum + rule.warnings, 0);

  return {
    rules,
    versions,
    docTotal: docEntries.length,
    imageCount,
    errorTotal,
    warningTotal,
  };
}

function isWideCharacter(char) {
  return /[\u1100-\u115f\u2e80-\u303e\u3041-\u33ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]/u.test(
    char,
  );
}

function displayWidth(value) {
  let width = 0;
  for (const char of value) width += isWideCharacter(char) ? 2 : 1;
  return width;
}

function padDisplay(value, width) {
  return value + " ".repeat(Math.max(0, width - displayWidth(value)));
}

function renderRuleTable(summary) {
  const rows = summary.rules.map((rule) => [
    rule.id,
    rule.label,
    String(rule.errors),
    String(rule.warnings),
  ]);
  rows.push([
    "合计",
    "",
    String(summary.errorTotal),
    String(summary.warningTotal),
  ]);

  const header = ["规则", "说明", "error", "warning"];
  const widths = header.map((cell, column) =>
    Math.max(
      displayWidth(cell),
      ...rows.map((row) => displayWidth(row[column] ?? "")),
    ),
  );
  const formatRow = (row) =>
    `  ${row
      .map((cell, column) => padDisplay(cell, widths[column]))
      .join("  ")}`.trimEnd();

  const lines = [formatRow(header)];
  lines.push(`  ${widths.map((width) => "-".repeat(width)).join("  ")}`);
  for (const row of rows) lines.push(formatRow(row));
  return lines;
}

function renderRuleSamples(rule, severity) {
  const count = severity === "error" ? rule.errors : rule.warnings;
  const samples =
    severity === "error" ? rule.errorSamples : rule.warningSamples;
  const lines = [`  [${rule.id}] ${rule.label}：${count} 条`];
  for (const sample of samples) {
    lines.push(`    ${sample.file}:${sample.line}  ${sample.message}`);
  }
  if (count > samples.length) {
    lines.push(`    ……（另有 ${count - samples.length} 条未显示）`);
  }
  return lines;
}

function renderReport(summary) {
  const lines = ["JumpServer 文档检查", "====================", ""];
  lines.push(
    `扫描范围：docs/v5 ${summary.versions.v5} 篇，docs/v4 ${summary.versions.v4} 篇，` +
      `合计 ${summary.docTotal} 篇 .mdx；` +
      `图片目录 docs/public/images/v5/jumpserver ${summary.imageCount} 个文件。`,
  );
  lines.push("");
  lines.push("规则统计（error / warning）");
  lines.push(...renderRuleTable(summary));
  lines.push("");

  for (const section of [
    { severity: "error", title: "错误（error）" },
    { severity: "warning", title: "警告（warning）" },
  ]) {
    const total =
      section.severity === "error" ? summary.errorTotal : summary.warningTotal;
    lines.push(`${section.title} 共 ${total} 条`);
    const handledRules = summary.rules.filter((rule) =>
      section.severity === "error" ? rule.errors > 0 : rule.warnings > 0,
    );
    if (handledRules.length === 0) {
      lines.push("  无");
    } else {
      for (const rule of handledRules) {
        lines.push(...renderRuleSamples(rule, section.severity));
      }
    }
    lines.push("");
  }

  lines.push(
    `结论：${summary.errorTotal} 个 error，${summary.warningTotal} 个 warning。`,
  );
  lines.push(
    "说明：overview 页（正文为空）不参与缺 H1 检查；外部图片不参与 " +
      '"Figure N:" 前缀检查；锚点不校验。',
  );
  lines.push(
    "用法：node scripts/check-docs.mjs [--strict] [--json]；" +
      "默认退出码 0，--strict 在存在 error 时以退出码 1 结束。",
  );

  return lines.join("\n");
}

function renderJson(summary) {
  return JSON.stringify(
    {
      versions: summary.versions,
      files: { total: summary.docTotal },
      images: summary.imageCount,
      totals: {
        errors: summary.errorTotal,
        warnings: summary.warningTotal,
      },
      rules: summary.rules.map((rule) => ({
        id: rule.id,
        label: rule.label,
        errors: rule.errors,
        warnings: rule.warnings,
        samples: {
          error: rule.errorSamples,
          warning: rule.warningSamples,
        },
      })),
    },
    null,
    2,
  );
}

function printUsage() {
  console.log(
    [
      "用法：node scripts/check-docs.mjs [选项]",
      "",
      "选项：",
      "  --strict  存在 error 时以退出码 1 结束（默认始终 0）",
      "  --json    输出机器可读的 JSON（不输出中文报告）",
      "  --help    显示本帮助",
    ].join("\n"),
  );
}

function parseArgs(argv) {
  const options = { strict: false, json: false, help: false };
  for (const arg of argv) {
    if (arg === "--strict") options.strict = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else {
      console.error(`未知参数：${arg}`);
      printUsage();
      process.exit(2);
    }
  }
  return options;
}

export {
  analyzeBody,
  extractLinkTargets,
  maskInlineCode,
  parseFrontmatter,
  resolveLinkTarget,
};

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printUsage();
    return;
  }

  const docEntries = collectDocFiles();
  for (const entry of docEntries) checkFile(entry.absPath, entry.version);
  const imageCount = checkImageFileNames();

  const summary = collectResults(docEntries, imageCount);
  if (options.json) console.log(renderJson(summary));
  else console.log(renderReport(summary));

  if (options.strict && summary.errorTotal > 0) process.exitCode = 1;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main();
}
