/**
 * Sitemap：Nextra/Next Pages Router 不在此文件内生成站点地图。
 * 使用 `next-sitemap`（见根目录 `next-sitemap.config.js`），在 `pnpm run build` 末尾写入 `public/sitemap.xml` 与 `public/robots.txt`。
 */
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
});

const withLess = require("next-with-less");
const path = require("node:path");

const sep = path.sep === "/" ? "/" : "\\\\";

const ALLOWED_SVG_REGEX = new RegExp(`${sep}icons${sep}.+\\.svg$`);

/**
 * @type {import('next').NextConfig}
 */
module.exports = withLess(
  withNextra({
    webpack(config) {
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.(".svg"),
      );

      fileLoaderRule.exclude = ALLOWED_SVG_REGEX;

      config.module.rules.push({
        test: ALLOWED_SVG_REGEX,
        use: ["@svgr/webpack"],
      });
      return config;
    },
  }),
);
