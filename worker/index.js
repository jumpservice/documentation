import { LEGACY_REDIRECTS } from "./legacy-redirects.js";

const DOCS_PREFIX = "/docs";

function isFileLike(pathname) {
  return /\.[^/]+$/.test(pathname);
}

async function fetchAsset(env, url, pathname) {
  const assetUrl = new URL(url);
  assetUrl.pathname = pathname;
  return env.ASSETS.fetch(new Request(assetUrl.toString()));
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
