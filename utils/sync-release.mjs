import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RELEASES_PATH = fileURLToPath(
  new URL("../src/data/releases.json", import.meta.url),
);
const VERSION_PATTERN = /^v(\d+)\.(\d+)\.(\d+)$/;

export function compareVersions(left, right) {
  const leftParts = VERSION_PATTERN.exec(left);
  const rightParts = VERSION_PATTERN.exec(right);
  if (!leftParts || !rightParts) {
    throw new Error(`Expected stable release tags, got ${left} and ${right}`);
  }

  for (let index = 1; index <= 3; index += 1) {
    const difference = Number(leftParts[index]) - Number(rightParts[index]);
    if (difference !== 0) return difference;
  }
  return 0;
}

export function mergeRelease(existing, release) {
  const tag = release.tag_name;
  if (!VERSION_PATTERN.test(tag) || release.draft || release.prerelease) {
    throw new Error(`Not a stable release tag: ${tag}`);
  }
  if (!Array.isArray(existing)) {
    throw new Error("Release data must be an array");
  }
  if (existing.some((item) => item.version === tag)) {
    return existing;
  }

  const publishedAt = new Date(release.published_at);
  if (Number.isNaN(publishedAt.getTime())) {
    throw new Error(`Release ${tag} has no valid published_at value`);
  }

  const entry = { date: publishedAt.toISOString().slice(0, 10), version: tag };
  return [...existing, entry].sort((a, b) =>
    compareVersions(b.version, a.version),
  );
}

export function mergeReleases(existing, releases) {
  if (!Array.isArray(releases)) {
    throw new Error("GitHub Release API did not return an array");
  }
  return releases
    .filter(
      (release) =>
        VERSION_PATTERN.test(release.tag_name) &&
        /^v[45]\./.test(release.tag_name) &&
        !release.draft &&
        !release.prerelease,
    )
    .reduce(mergeRelease, existing);
}

async function main() {
  const tag = process.argv[2];
  if (!tag || !VERSION_PATTERN.test(tag)) {
    throw new Error("Pass a stable tag such as v5.0.1");
  }

  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "jumpserver-docs-release-sync",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const releases = [];
  for (let page = 1; page <= 20; page += 1) {
    const response = await fetch(
      `https://api.github.com/repos/jumpserver/jumpserver/releases?per_page=100&page=${page}`,
      { headers, signal: AbortSignal.timeout(15000) },
    );
    if (!response.ok) {
      throw new Error(
        `GitHub Release API returned ${response.status} on page ${page}`,
      );
    }
    const pageReleases = await response.json();
    if (!Array.isArray(pageReleases)) {
      throw new Error(
        `GitHub Release API returned invalid data on page ${page}`,
      );
    }
    releases.push(...pageReleases);
    if (pageReleases.length < 100) break;
    if (page === 20) {
      throw new Error("GitHub Release pagination exceeded 20 pages");
    }
  }

  if (
    !releases.some(
      (release) =>
        release.tag_name === tag && !release.draft && !release.prerelease,
    )
  ) {
    throw new Error(`Published release ${tag} was not found`);
  }
  const existing = JSON.parse(await readFile(RELEASES_PATH, "utf8"));
  const updated = mergeReleases(existing, releases);

  if (JSON.stringify(updated) === JSON.stringify(existing)) {
    console.log(`${tag} is already up to date`);
    return;
  }

  const content = `[\n${updated.map((item) => `  ${JSON.stringify(item)}`).join(",\n")}\n]\n`;
  await writeFile(RELEASES_PATH, content);
  console.log(`Updated ${RELEASES_PATH} through ${tag}`);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
