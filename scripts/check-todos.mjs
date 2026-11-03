#!/usr/bin/env node

/**
 * Pre-push guard: fail when documentation still contains TODO markers.
 *
 * The check intentionally scans the source tree, not build output, so a
 * generated site with stale content cannot hide a remaining placeholder.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const docsRoot = path.join(projectRoot, "docs");
const textExtensions = new Set([".md", ".mdx"]);
const todoPattern = /\bTODO\b/i;

function walk(directory) {
  if (!fs.existsSync(directory)) return [];

  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(absolutePath));
    } else if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }
  return files;
}

const violations = [];
for (const file of walk(docsRoot).sort()) {
  const content = fs.readFileSync(file, "utf8");
  content.split(/\r?\n/).forEach((line, index) => {
    if (todoPattern.test(line)) {
      violations.push({
        file: path.relative(projectRoot, file).replaceAll(path.sep, "/"),
        line: index + 1,
        text: line.trim(),
      });
    }
  });
}

if (violations.length > 0) {
  console.error(
    `\nPush rejected: ${violations.length} TODO item(s) remain in the documentation.\n`,
  );
  for (const item of violations) {
    console.error(`${item.file}:${item.line}: ${item.text}`);
  }
  console.error(
    "\nResolve the TODO items, or remove the markers after completing the content, before pushing.\n",
  );
  process.exit(1);
}

console.log("TODO check passed: no TODO items found in docs/.");
