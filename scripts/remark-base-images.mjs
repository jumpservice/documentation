/**
 * Prefix absolute image URLs with the Rspress deployment base path.
 *
 * Rspress leaves absolute image sources (for example `/images/foo.png`)
 * untouched, which is correct when `base` is `/`. This site is served from
 * `/docs/`, so images in `docs/public` are reached at `/docs/images/...`.
 * The dead-image checker still sees the original `/images/...` paths and
 * resolves them against `docs/public`, so the check keeps working.
 */
const isAbsoluteAsset = (url) =>
  typeof url === "string" && url.startsWith("/") && !url.startsWith("//");

export default function remarkBaseImages(options = {}) {
  const base = (options.base ?? "/").replace(/\/$/, "");
  if (!base) return () => {};

  const withBase = (url) =>
    isAbsoluteAsset(url) && !url.startsWith(`${base}/`) ? `${base}${url}` : url;

  const visit = (node) => {
    if (!node || typeof node !== "object") return;

    if (node.type === "image" && typeof node.url === "string") {
      node.url = withBase(node.url);
    }

    if (
      (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
      node.name === "img"
    ) {
      for (const attribute of node.attributes ?? []) {
        if (
          attribute.type === "mdxJsxAttribute" &&
          attribute.name === "src" &&
          typeof attribute.value === "string"
        ) {
          attribute.value = withBase(attribute.value);
        }
      }
    }

    for (const child of node.children ?? []) visit(child);
  };

  return (tree) => visit(tree);
}
