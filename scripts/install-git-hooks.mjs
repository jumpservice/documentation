#!/usr/bin/env node

/**
 * Point this repository's Git hooks at the checked-in .githooks directory.
 *
 * Runs during `pnpm install` via the package `prepare` script. It is a no-op
 * when the project is installed outside a Git checkout, such as a deployment
 * build that only receives source files.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const gitDirectory = path.join(projectRoot, ".git");
const hooksDirectory = path.join(projectRoot, ".githooks");

if (!fs.existsSync(gitDirectory) || !fs.existsSync(hooksDirectory)) {
  console.log(
    "Git hooks not installed: not a Git checkout or .githooks is missing.",
  );
  process.exit(0);
}

execFileSync("git", ["config", "core.hooksPath", ".githooks"], {
  cwd: projectRoot,
  stdio: "inherit",
});
console.log("Git hooks installed: core.hooksPath=.githooks");
