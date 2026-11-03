#!/usr/bin/env node
/**
 * Static preview server for the Rspress `build/` output.
 *
 * The site is deployed under `/docs/` (`base: '/docs/'`), and uses
 * `route.cleanUrls`, so the generated pages live at `build/docs/...` style
 * paths only after the base is stripped: `build/docs/quickstart.html` is
 * served at `/docs/quickstart`. The built-in `rspress preview` server does not
 * map clean URLs to `.html` files, so this small server implements the same
 * rules that production hosting must provide.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const buildRoot = path.join(projectRoot, "build");
const base = "/docs";

const argv = process.argv.slice(2);
const argValue = (names, fallback) => {
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    for (const name of names) {
      if (arg === name && argv[index + 1]) return argv[index + 1];
      if (arg.startsWith(`${name}=`)) return arg.slice(name.length + 1);
    }
  }
  return fallback;
};

const port = Number(process.env.PORT || argValue(["--port", "-p"], "4173"));
const host = process.env.HOST || argValue(["--host"], "127.0.0.1");
const watchEnabled = !argv.includes("--no-watch");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const isFile = (filePath) => {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
};

const resolvePage = (pathname) => {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname.split("?")[0].split("#")[0]);
  } catch {
    return null;
  }

  const relativeUrl = decoded.slice(base.length).replace(/^\/+/, "/");
  const relative = relativeUrl.replace(/^\/+/, "");
  const requested = path.resolve(buildRoot, relative);

  if (
    requested !== buildRoot &&
    !requested.startsWith(`${buildRoot}${path.sep}`)
  ) {
    return null;
  }

  const candidates = [];
  try {
    if (fs.statSync(requested).isDirectory()) {
      candidates.push(path.join(requested, "index.html"));
    }
  } catch {
    // The path does not exist; try the clean URL variants below.
  }
  if (decoded.endsWith("/")) {
    candidates.push(path.join(requested, "index.html"));
  } else {
    candidates.push(
      requested,
      `${requested}.html`,
      path.join(requested, "index.html"),
    );
  }

  return candidates.find(isFile) ?? null;
};

const sendFile = (request, response, filePath, statusCode = 200) => {
  const extension = path.extname(filePath).toLowerCase();
  const body = fs.readFileSync(filePath);
  response.writeHead(statusCode, {
    "Content-Type": contentTypes[extension] ?? "application/octet-stream",
    "Content-Length": body.length,
    "Cache-Control": "no-cache",
  });
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  response.end(body);
};

const server = http.createServer((request, response) => {
  const pathname = request.url ?? "/";

  if (pathname === "/" || pathname.startsWith("/?")) {
    response.writeHead(302, { Location: `${base}/` });
    response.end();
    return;
  }

  if (pathname === base || pathname === `${base}/?`) {
    response.writeHead(301, { Location: `${base}/` });
    response.end();
    return;
  }

  if (!pathname.startsWith(`${base}/`)) {
    const notFound = path.join(buildRoot, "404.html");
    if (isFile(notFound)) {
      sendFile(request, response, notFound, 404);
    } else {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
    }
    return;
  }

  const filePath = resolvePage(pathname);
  if (filePath) {
    sendFile(request, response, filePath);
    return;
  }

  const notFound = path.join(buildRoot, "404.html");
  if (isFile(notFound)) {
    sendFile(request, response, notFound, 404);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not Found");
});

server.listen(port, host, () => {
  console.log(`\n  JumpServer docs preview: http://${host}:${port}${base}/\n`);
});

if (watchEnabled) {
  const rspressBin = path.join(
    projectRoot,
    "node_modules",
    "@rspress",
    "core",
    "bin",
    "rspress.js",
  );
  const watchedPaths = [
    path.join(projectRoot, "docs"),
    path.join(projectRoot, "theme"),
    path.join(projectRoot, "src"),
    path.join(projectRoot, "rspress.config.ts"),
    path.join(projectRoot, "i18n.json"),
    path.join(projectRoot, "package.json"),
  ].filter((candidate) => fs.existsSync(candidate));

  let debounceTimer;
  let building = false;
  let queued = false;
  const watchers = [];

  const build = () => {
    if (building) {
      queued = true;
      return;
    }
    building = true;
    console.log("\n  [preview] source changed; rebuilding...\n");
    const child = spawn(process.execPath, [rspressBin, "build"], {
      cwd: projectRoot,
      stdio: "inherit",
    });
    child.on("error", (error) => {
      building = false;
      console.error("[preview] build could not start:", error.message);
      if (queued) {
        queued = false;
        build();
      }
    });
    child.on("exit", (code) => {
      building = false;
      if (code === 0) {
        console.log("\n  [preview] build complete; refresh the browser.\n");
      } else {
        console.error(
          `\n  [preview] build failed with exit code ${code}; keeping the previous build.\n`,
        );
      }
      if (queued) {
        queued = false;
        build();
      }
    });
  };

  const scheduleBuild = (reason) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`[preview] detected change: ${reason}`);
      build();
    }, 600);
  };

  for (const watchedPath of watchedPaths) {
    try {
      const isDirectory = fs.statSync(watchedPath).isDirectory();
      const watcher = fs.watch(
        watchedPath,
        isDirectory ? { recursive: true } : {},
        (eventType, filename) => {
          if (filename) {
            const normalized = filename.toString().replaceAll("\\", "/");
            if (
              normalized.includes("node_modules") ||
              normalized.includes("/.git/") ||
              normalized.startsWith(".git/")
            ) {
              return;
            }
            scheduleBuild(normalized);
          } else {
            scheduleBuild(path.basename(watchedPath));
          }
        },
      );
      watcher.on("error", (error) => {
        console.error(
          `[preview] watcher error for ${watchedPath}:`,
          error.message,
        );
      });
      watchers.push(watcher);
    } catch (error) {
      console.error(`[preview] could not watch ${watchedPath}:`, error.message);
    }
  }

  const closeWatchers = () => {
    for (const watcher of watchers) watcher.close();
  };
  process.on("SIGINT", () => {
    closeWatchers();
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    closeWatchers();
    process.exit(0);
  });

  console.log(
    `[preview] watching ${watchedPaths.length} source paths; edited files rebuild automatically.`,
  );
  console.log("[preview] use --no-watch to disable automatic rebuilds.\n");
}
