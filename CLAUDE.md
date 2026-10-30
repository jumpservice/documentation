# CLAUDE.md

本仓库的 AI Agent 操作契约是 [AGENTS.md](AGENTS.md)，写作规范权威是 [WRITING-GUIDE.md](WRITING-GUIDE.md)。开工前先读这两份，再读目标目录的 `_meta.json` 与 2–3 篇同类页面。

最硬的 5 条：

1. 正文页面在 `docs/v5`（默认版本）与 `docs/v4`（历史版本），全英文、使用英文界面术语；新增功能只写 `docs/v5`。
2. frontmatter 必须有 `title` 与 `description`，章节概览页加 `overview: true`。
3. 站内链接写版本内绝对路径（V5 如 `/features/console/assets/`，V4 如 `/notifications/email`），都不带 `/docs` 前缀；仅显式跨版本引用才写 `/v4/...`。图片写 `/images/jumpserver/<name>.png`。
4. `<Steps>` 的每个直接子元素用 `<div>` 包裹，一步一个；嵌套用 `<Steps stepLevel="2">`。
5. 没有截图就写页面可见、可搜索的 `Screenshot TODO` 引用块，包含建议文件名；禁止伪造截图、禁止凭记忆写界面事实；改动文件过 `pnpm check:docs` 与 `pnpm exec prettier --check`。
