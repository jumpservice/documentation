import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rspress/core";
import { pluginSitemap } from "@rspress/plugin-sitemap";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import mermaid from "rspress-plugin-mermaid";
import remarkBaseImages from "./scripts/remark-base-images.mjs";
import rehypeTableGroupRowspan from "./scripts/rehype-table-group-rowspan.mjs";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const abs = (...segments: string[]) => path.join(rootDir, ...segments);

const SITE_ORIGIN = "https://www.jumpserver.com";

export default defineConfig({
  root: abs("docs"),
  themeDir: abs("theme"),
  outDir: "build",
  base: "/docs/",
  lang: "en",
  title: "JumpServer",
  description: "An open-source PAM platform (Bastion Host)",
  icon: "/favicon.svg",
  logo: {
    light: "/jumpserver-wordmark.svg",
    dark: "/jumpserver-wordmark-white.svg",
  },
  logoText: "",
  logoHref: "https://www.jumpserver.com/",
  siteOrigin: SITE_ORIGIN,
  head: [],
  llms: true,
  multiVersion: {
    default: "v5",
    versions: ["v4", "v5"],
  },
  search: {
    codeBlocks: false,
  },
  globalStyles: abs("src/styles/globals.css"),
  route: {
    cleanUrls: true,
    cleanUrlsRedirect: true,
  },
  mediumZoom: {
    selector: ".rspress-doc img:not(.no-zoom)",
  },
  markdown: {
    remarkPlugins: [[remarkBaseImages, { base: "/docs/" }]],
    rehypePlugins: [rehypeTableGroupRowspan],
    link: {
      checkDeadLinks: true,
      checkAnchors: true,
    },
    image: {
      checkDeadImages: true,
    },
    defaultWrapCode: true,
    globalComponents: [
      abs("src/components/global/Icon.tsx"),
      abs("src/components/global/Alert.tsx"),
      abs("src/components/global/Steps.tsx"),
      abs("src/components/global/Nav.tsx"),
      abs("src/components/global/ApplyTrialLicense.tsx"),
      abs("src/components/global/DataTable.tsx"),
      abs("src/components/global/VersionBadge.tsx"),
    ],
  },
  plugins: [
    pluginSitemap({
      siteUrl: `${SITE_ORIGIN}/docs/`,
    }),
    mermaid({
      mermaidConfig: {
        layout: "dagre",
        look: "classic",
        htmlLabels: false,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        themeVariables: {
          fontSize: "15px",
        },
        flowchart: {
          htmlLabels: false,
          useMaxWidth: true,
          nodeSpacing: 36,
          rankSpacing: 44,
        },
      },
    }),
  ],
  builderConfig: {
    plugins: [pluginSvgr()],
    resolve: {
      alias: {
        "@": abs("src"),
      },
    },
  },
  themeConfig: {
    darkMode: true,
    lastUpdated: false,
    enableScrollToTop: true,
    search: true,
    llmsUI: {
      placement: "outline",
    },
    editLink: {
      docRepoBaseUrl:
        "https://github.com/jumpservice/documentation/tree/dev/docs",
    },
  },
});
