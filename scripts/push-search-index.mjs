#!/usr/bin/env node
/**
 * Push the generated documentation URLs to IndexNow and Google Indexing API.
 *
 * This script runs after a successful Cloudflare deployment. It is
 * intentionally best-effort: search-engine failures are logged but do not mark
 * a successful deployment as failed unless SEARCH_PUSH_STRICT=1 is set.
 *
 * Required for IndexNow:
 *   INDEXNOW_KEY (has a default for this site)
 *
 * Required for Google Indexing API:
 *   GOOGLE_SERVICE_ACCOUNT_JSON       full service-account JSON
 *   GOOGLE_SERVICE_ACCOUNT_JSON_B64   base64-encoded service-account JSON
 *
 * Optional:
 *   SEARCH_SITE_ORIGIN         defaults to https://www.jumpserver.com
 *   INDEXNOW_ENABLED           defaults to true
 *   GOOGLE_INDEXING_ENABLED    defaults to true when credentials are present
 *   GOOGLE_INDEXING_ALL        set to 1 to include /docs/v4/ pages
 *   GOOGLE_INDEXING_LIMIT      defaults to 200 (Google's daily quota)
 *   SEARCH_PUSH_DRY_RUN        set to 1 to print targets without sending
 *   SEARCH_PUSH_STRICT         set to 1 to exit non-zero on any failure
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sitemapPath = path.join(projectRoot, "build", "sitemap.xml");
const siteOrigin = (
  process.env.SEARCH_SITE_ORIGIN || "https://www.jumpserver.com"
).replace(/\/+$/, "");
const indexNowKey =
  process.env.INDEXNOW_KEY || "019db843c3d570d9a0a88a45aad88338";
const indexNowKeyLocation =
  process.env.INDEXNOW_KEY_LOCATION || `${siteOrigin}/docs/${indexNowKey}.txt`;
const strict = process.env.SEARCH_PUSH_STRICT === "1";
const dryRun = process.env.SEARCH_PUSH_DRY_RUN === "1";

const fail = (message) => {
  console.error(`[search-push] ${message}`);
  if (strict) process.exitCode = 1;
};

const readSitemapUrls = () => {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`sitemap not found: ${sitemapPath}`);
  }
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].trim(),
  );
  return [...new Set(urls)];
};

const request = async (url, options, timeoutMs = 30_000) => {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(timeoutMs),
  });
  const text = await response.text();
  return { response, text };
};

const pushIndexNow = async (urls) => {
  if (process.env.INDEXNOW_ENABLED === "false") {
    console.log("[search-push] IndexNow disabled");
    return { attempted: 0, failed: 0 };
  }

  const payload = {
    host: new URL(siteOrigin).host,
    key: indexNowKey,
    keyLocation: indexNowKeyLocation,
    urlList: urls,
  };

  if (dryRun) {
    console.log(
      `[search-push] IndexNow dry run: ${urls.length} URLs -> ${siteOrigin}`,
    );
    return { attempted: 0, failed: 0 };
  }

  try {
    const { response, text } = await request(
      "https://api.indexnow.org/indexnow",
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      },
    );
    if (response.ok) {
      console.log(
        `[search-push] IndexNow accepted ${urls.length} URLs (HTTP ${response.status})`,
      );
      return { attempted: urls.length, failed: 0 };
    }
    fail(`IndexNow returned HTTP ${response.status}: ${text.slice(0, 500)}`);
    return { attempted: urls.length, failed: 1 };
  } catch (error) {
    fail(`IndexNow request failed: ${error.message}`);
    return { attempted: urls.length, failed: 1 };
  }
};

const loadGoogleCredentials = () => {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64;
  let json = raw;
  if (!json && encoded) {
    json = Buffer.from(encoded, "base64").toString("utf8");
  }
  if (!json) return null;
  try {
    const credentials = JSON.parse(json);
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error("client_email and private_key are required");
    }
    return credentials;
  } catch (error) {
    fail(`GOOGLE_SERVICE_ACCOUNT_JSON is invalid: ${error.message}`);
    return null;
  }
};

const base64url = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");

const getGoogleAccessToken = async (credentials) => {
  const now = Math.floor(Date.now() / 1000);
  const tokenUrl =
    credentials.token_uri || "https://oauth2.googleapis.com/token";
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: tokenUrl,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claim}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(credentials.private_key).toString("base64url");
  const assertion = `${unsigned}.${signature}`;

  const { response, text } = await request(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(
      `token endpoint returned HTTP ${response.status}: ${text.slice(0, 500)}`,
    );
  }
  const data = JSON.parse(text);
  if (!data.access_token) throw new Error("token response has no access_token");
  return data.access_token;
};

const publishGoogleUrl = async (url, accessToken) => {
  const { response, text } = await request(
    "https://indexing.googleapis.com/v3/urlNotifications:publish",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    },
  );
  return { status: response.status, text };
};

const pushGoogle = async (urls) => {
  if (process.env.GOOGLE_INDEXING_ENABLED === "false") {
    console.log("[search-push] Google Indexing API disabled");
    return { attempted: 0, failed: 0 };
  }

  const credentials = loadGoogleCredentials();
  if (!credentials) {
    console.log(
      "[search-push] Google Indexing API skipped: GOOGLE_SERVICE_ACCOUNT_JSON is not configured",
    );
    return { attempted: 0, failed: 0 };
  }

  const includeV4 = process.env.GOOGLE_INDEXING_ALL === "1";
  const limit = Number(process.env.GOOGLE_INDEXING_LIMIT || "200");
  const candidates = urls
    .filter((url) => includeV4 || !url.includes("/docs/v4/"))
    .slice(0, Number.isFinite(limit) && limit > 0 ? limit : 200);

  if (dryRun) {
    console.log(
      `[search-push] Google dry run: ${candidates.length} URLs (V4 ${includeV4 ? "included" : "excluded"})`,
    );
    return { attempted: 0, failed: 0 };
  }

  let accessToken;
  try {
    accessToken = await getGoogleAccessToken(credentials);
    console.log("[search-push] Google OAuth token acquired");
  } catch (error) {
    fail(`Google authentication failed: ${error.message}`);
    return { attempted: candidates.length, failed: 1 };
  }

  let succeeded = 0;
  let failed = 0;
  let rateLimited = false;
  const concurrency = 3;
  for (let index = 0; index < candidates.length; index += concurrency) {
    const chunk = candidates.slice(index, index + concurrency);
    const results = await Promise.all(
      chunk.map(async (url) => {
        try {
          return { url, ...(await publishGoogleUrl(url, accessToken)) };
        } catch (error) {
          return { url, status: 0, text: error.message };
        }
      }),
    );
    for (const result of results) {
      if (result.status >= 200 && result.status < 300) {
        succeeded += 1;
      } else {
        failed += 1;
        if (result.status === 429) rateLimited = true;
        fail(
          `Google Indexing API ${result.status || "request failed"} for ${result.url}: ${String(
            result.text,
          ).slice(0, 300)}`,
        );
      }
    }
    if (rateLimited) {
      fail("Google Indexing API quota exhausted; stopping this run");
      break;
    }
  }

  console.log(
    `[search-push] Google Indexing API: ${succeeded} accepted, ${failed} failed`,
  );
  return { attempted: candidates.length, failed };
};

const main = async () => {
  const urls = readSitemapUrls();
  console.log(`[search-push] ${urls.length} URLs from sitemap (${siteOrigin})`);
  await pushIndexNow(urls);
  await pushGoogle(urls);
};

main().catch((error) => {
  console.error(`[search-push] fatal: ${error.stack || error.message}`);
  if (strict) process.exitCode = 1;
});
