import fs from "node:fs";
import path from "node:path";

const BUILD_DIR = path.resolve("build");
const SITE_ORIGIN = "https://www.jumpserver.com";
const BASE_PATH = "/docs/";

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function canonicalPath(file) {
  const rel = path.relative(BUILD_DIR, file).split(path.sep).join("/");
  if (rel === "index.html") return BASE_PATH;
  if (rel.endsWith("/index.html")) return `${BASE_PATH}${rel.slice(0, -"index.html".length)}`;
  return `${BASE_PATH}${rel.replace(/\.html$/, "")}`;
}

let canonicalCount = 0;
let noindexCount = 0;

for (const file of walk(BUILD_DIR)) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('rel="canonical"')) continue;

  const rel = path.relative(BUILD_DIR, file).split(path.sep).join("/");

  if (rel === "404.html") {
    if (!html.includes('name="robots"')) {
      html = html.replace(
        "</head>",
        '  <meta name="robots" content="noindex, follow" />\n</head>'
      );
      noindexCount += 1;
    }
  } else {
    const href = `${SITE_ORIGIN}${canonicalPath(file)}`;
    html = html.replace(
      "</head>",
      `  <link rel="canonical" href="${href}" />\n</head>`
    );
    canonicalCount += 1;
  }

  fs.writeFileSync(file, html);
}

console.log(
  `[canonical] injected ${canonicalCount} canonical tags, ${noindexCount} 404 noindex tag(s)`
);
