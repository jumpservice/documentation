/** @type {import('next-sitemap').IConfig} */
module.exports = {
  /** 生产站点根 URL；部署前请设置 SITE_URL（勿带末尾 /） */
  siteUrl: process.env.SITE_URL || "https://www.jumpserver.com",
  /** 输出到 /docs 目录：public/docs/sitemap.xml */
  outDir: "public/docs",
  generateRobotsTxt: false,
  /** 文档站规模较小，单文件 sitemap 更直观 */
  generateIndexSitemap: false,
  exclude: ["/404"],
};
