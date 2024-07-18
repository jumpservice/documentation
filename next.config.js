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
