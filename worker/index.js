const DOCS_PREFIX = "/docs";

function isFileLike(pathname) {
  return /\.[^/]+$/.test(pathname);
}

async function fetchAsset(env, url, pathname) {
  const assetUrl = new URL(url);
  assetUrl.pathname = pathname;
  return env.ASSETS.fetch(new Request(assetUrl.toString()));
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

    return fetchAsset(env, url, "/404.html");
  },
};
