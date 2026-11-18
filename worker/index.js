import { LEGACY_REDIRECTS } from "./legacy-redirects.js";

const DOCS_PREFIX = "/docs";

// Assets under /static are content-hashed by Rspress, so they can be cached
// for a year. Images and SVGs are not hashed: keep a shorter browser TTL so a
// replaced screenshot is picked up without a hard refresh.
const STATIC_PREFIX = "/static/";
const FONT_PREFIX = "/fonts/";
const MEDIA_PREFIXES = ["/images/", "/svgs/"];
const MEDIA_EXTENSION = /\.(?:svg|png|jpe?g|gif|webp|avif|ico)$/i;
const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable";
const MEDIA_CACHE_CONTROL = "public, max-age=604800";
const HTML_CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=300";
const HTML_CACHE_TAG = "jumpserver-docs-html";

function withCacheHeaders(response, assetPath) {
  const headers = new Headers(response.headers);
  const contentType = headers.get("content-type") || "";
  if (assetPath.startsWith(STATIC_PREFIX)) {
    headers.set("cache-control", IMMUTABLE_CACHE_CONTROL);
  } else if (
    assetPath.startsWith(FONT_PREFIX) ||
    MEDIA_PREFIXES.some((prefix) => assetPath.startsWith(prefix)) ||
    MEDIA_EXTENSION.test(assetPath)
  ) {
    headers.set("cache-control", MEDIA_CACHE_CONTROL);
  } else if (contentType.startsWith("text/html")) {
    // Clean URLs are served as HTML without a .html extension in the asset
    // path, so detect the document by its response type instead of the path.
    headers.set("cache-control", HTML_CACHE_CONTROL);
    headers.set("cache-tag", HTML_CACHE_TAG);
  } else {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function isFileLike(pathname) {
  return /\.[^/]+$/.test(pathname);
}

async function fetchAsset(env, url, pathname) {
  const assetUrl = new URL(url);
  assetUrl.pathname = pathname;
  const response = await env.ASSETS.fetch(new Request(assetUrl.toString()));
  return withCacheHeaders(response, pathname);
}

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "");
  }
  return pathname;
}

function notFoundResponse(assetResponse) {
  // Serving 404.html through the asset binding keeps a 200 status, which makes
  // every unknown route look like a duplicate page. Return the body with a real
  // 404 status and keep crawlers from indexing the error page.
  return new Response(assetResponse.body, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex",
      "cache-control": "no-store",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // The Rspress build uses /docs as its base path. Strip the mount prefix
    // before asking Workers Static Assets for the generated file.
    if (pathname !== DOCS_PREFIX && !pathname.startsWith(`${DOCS_PREFIX}/`)) {
      return env.ASSETS.fetch(request);
    }

    // Documentation pages moved during the v5 restructure. Send the old URLs to
    // their current location with a permanent redirect so search engines drop
    // the legacy entries instead of treating the 404 page as duplicate content.
    const legacyTarget = LEGACY_REDIRECTS[normalizePath(pathname)];
    if (legacyTarget && legacyTarget !== pathname) {
      const redirectUrl = new URL(url);
      // Cloudflare can hand the worker an http:// request URL even when the
      // visitor is on https, which would add a second hop to the redirect.
      redirectUrl.protocol = "https:";
      redirectUrl.pathname = legacyTarget;
      return Response.redirect(redirectUrl.toString(), 301);
    }

    const assetPath =
      pathname === DOCS_PREFIX ? "/" : pathname.slice(DOCS_PREFIX.length);

    if (assetPath === "/") {
      return fetchAsset(env, url, "/index.html");
    }

    const candidates = [assetPath];
    if (!assetPath.endsWith("/") && !isFileLike(assetPath)) {
      candidates.push(`${assetPath}.html`, `${assetPath}/index.html`);
    }

    for (const candidate of candidates) {
      const response = await fetchAsset(env, url, candidate);
      if (response.status !== 404) {
        return response;
      }
    }

    return notFoundResponse(await fetchAsset(env, url, "/404.html"));
  },
};
