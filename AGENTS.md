# AGENTS.md — AI Agent 操作契约

> 本文件是**执行契约**，面向在本仓库工作的 AI Agent（Claude Code、Codex、GitHub Copilot、Cursor 等）。它只规定最低要求、边界与验证回路；**写作规范权威是 [WRITING-GUIDE.md](WRITING-GUIDE.md)**，规则细节一律引用其章节。
> 规范冲突时按 [第 3 节](#3-事实优先级) 的优先级处理。

## 1. 项目速览

| 项       | 值                                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| 站点框架 | Rspress 2（`@rspress/core` 2.0.23）+ React 19 + Tailwind CSS 3，内容为 MDX                                           |
| 站点路径 | `base: /docs/`，`cleanUrls: true`（页面地址不带 `.html`），构建时校验死链、锚点、死图                                |
| 内容版本 | V5 默认版本 `docs/v5`（147 篇，`/docs/...`）；V4 历史版本 `docs/v4`（83 篇，`/docs/v4/...`，由多版本路由自动加前缀） |
| 内容语言 | 正文全英文、使用英文界面术语；本文件与 WRITING-GUIDE 用中文                                                          |
| 图片资源 | V5：`docs/public/images/v5/jumpserver/`；V4：`docs/public/images/v4/admin-guides/`、`docs/public/images/v4/jumpserver/`；共享导航图：`docs/public/images/docs/navs/` |
| 构建产物 | `build/`（生成物，不手改；含 `llms.txt`、`llms-full.txt`、`sitemap.xml`）                                            |
| 运行时   | Node.js `>= 20.19.0`，pnpm `11.x`（`packageManager: pnpm@11.15.1`）                                                  |

### 1.1 命令

| 命令                                 | 用途                                 | 备注                                                                                    |
| ------------------------------------ | ------------------------------------ | --------------------------------------------------------------------------------------- |
| `pnpm install`                       | 安装依赖                             | 首次执行或依赖变更后                                                                    |
| `pnpm dev`                           | 本地开发服务器                       | `http://localhost:3000/docs/`                                                           |
| `pnpm check:docs`                    | 文档静态检查                         | 由 `scripts/check-docs.mjs` 提供，见 [第 11 章](WRITING-GUIDE.md#11-质量校验与常见错误) |
| `pnpm exec prettier --check <files>` | 检查本次改动文件                     | Agent 默认用这个，不用 `pnpm format`                                                    |
| `pnpm exec prettier --write <files>` | 格式化本次改动文件                   | 仅限自己负责的文件                                                                      |
| `pnpm build`                         | 生产构建 + 死链死图检查              | 默认由 Lead 统一执行，Agent 不主动运行                                                  |
| `pnpm preview --port 4173`           | 预览构建产物，自动重建               | `http://127.0.0.1:4173/docs/`；修改源文件后自动构建，刷新浏览器；`--no-watch` 关闭 |
| `pnpm format`                        | 全仓库格式化（`prettier --write .`） | **禁止**在文档任务中使用，会重排无关文件                                                |

### 1.2 目录

```text
docs/v5/            默认版本正文（features/ roles/ operations/ developer-guide/ reference/，以及根级 getting started 页面）
docs/v4/            历史版本正文（legacy 结构，除任务明确要求外不改）
docs/public/        图片资源（images/v5/jumpserver/、images/v4/admin-guides/、images/v4/jumpserver/）、SVG、favicon
src/components/     MDX 组件（docs/ 为实现，global/ 为全局注册的包装）
src/data/           releases.json（VersionedCommand 的版本号来源）
scripts/            preview 服务器、remark/rehype 插件、check-docs
theme/              主题组件；rspress.config.ts 为站点配置（base、多版本、组件注册、链接检查）
```

## 2. 必读顺序（每次任务开工前）

按顺序读，不要跳：

1. **本文件**：执行契约、边界、验证回路。
2. **[WRITING-GUIDE.md](WRITING-GUIDE.md)**：至少读 [3. 页面结构规范](WRITING-GUIDE.md#3-页面结构规范)、[4. 行文规范](WRITING-GUIDE.md#4-行文规范)、[5. 步骤与操作说明](WRITING-GUIDE.md#5-步骤与操作说明)、[6. 组件与 Markdown 规范](WRITING-GUIDE.md#6-组件与-markdown-规范)、[7. 截图规范](WRITING-GUIDE.md#7-截图规范)、[9. 链接与引用规范](WRITING-GUIDE.md#9-链接与引用规范)、[11. 质量校验与常见错误](WRITING-GUIDE.md#11-质量校验与常见错误)、[12. AI Agent 编写规范](WRITING-GUIDE.md#12-ai-agent-编写规范)、[附录 A：页面模板](WRITING-GUIDE.md#附录-a页面模板)。
3. **目标目录的 `_meta.json`** + 同目录 2–3 篇同类页面：它们决定侧边栏位置和本仓库的实际写法。
4. **需要的组件源码**：`src/components/docs/*.tsx`（全局包装在 `src/components/global/*.tsx`），以源码为准，不凭记忆写 props。

按任务补充：新增页面另读 [2. 文档体系与信息架构](WRITING-GUIDE.md#2-文档体系与信息架构)、[附录 A](WRITING-GUIDE.md#附录-a页面模板)；截图任务另读 [7. 截图规范](WRITING-GUIDE.md#7-截图规范) 与 [SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md)；安装/升级/命令页另读 [10. 版本、国际化与发布](WRITING-GUIDE.md#10-版本国际化与发布)；表格与图示另读 [8. 图示与表格规范](WRITING-GUIDE.md#8-图示与表格规范)。

## 3. 事实优先级

| 优先级 | 来源                                    | 说明                                                                             |
| ------ | --------------------------------------- | -------------------------------------------------------------------------------- |
| 1      | V5 英文界面真实文案 + 仓库配置/组件源码 | `rspress.config.ts`、`_meta.json`、`src/components/**`、`src/data/releases.json` |
| 2      | [WRITING-GUIDE.md](WRITING-GUIDE.md)    | 规范权威；与构建冲突时以构建为准，并回报规范需修正                               |
| 3      | 现有英文文档页面                        | 历史写法，可能尚未整改；同目录同类页面是最实用的模板                             |
| 4      | 模型知识/记忆                           | **最低**；不得作为唯一依据，菜单名、字段名、版本号必须能溯源                     |

无法用 1–3 确认的界面事实，按 [第 10 节](#10-升级人工条件) 升级给人工，不要猜测填充。

## 4. 写前检查清单

- [ ] 目标版本：新增功能只写 `docs/v5`；V4 仅在被明确要求时修改。
- [ ] 页面类型：任务页 / 章节概览页（`overview: true`）/ 入口页（只指路，不复制步骤）。
- [ ] 是否已有权威页：能改现有页就不要新建，避免重复内容（见 [2.7](WRITING-GUIDE.md#2-文档体系与信息架构)）。
- [ ] 同级 `_meta.json` 的登记位置、`label` 文案和折叠字段写法。
- [ ] 需要的组件：全局组件直接写，需 import 的先确认路径。
- [ ] 页面需要的截图：仓库里是否已有可复用图片；没有就写 TODO，不伪造。
- [ ] 界面事实能否溯源（菜单路径、字段名、按钮文案、版本号）。
- [ ] 是否涉及企业版功能（`xpack` 标注 / CTA）。
- [ ] 本次写作用域是否与他人重叠（尤其 `_meta.json`）；是否触发 [第 10 节](#10-升级人工条件)。

## 5. 硬性格式规则

| 项目        | 硬规则                                                                                                                                                                                                     | 详见                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| frontmatter | 新页面必须有 `title` 与 `description`；章节概览页额外加 `overview: true`；不加自定义字段                                                                                                                   | [3.1](WRITING-GUIDE.md#3-页面结构规范)          |
| 标题        | 全页有且只有一个 H1（`#`），位于 frontmatter 与 import 块之后、正文第一行（概览页除外）；sentence case，不手动编号                                                                                         | [3.4](WRITING-GUIDE.md#3-页面结构规范)          |
| 站内链接    | 绝对路径、**不带 `/docs` 前缀**，写**版本内路径**：V5 如 `/features/console/assets/`，V4 如 `/notifications/email`（多版本路由自动加 `/v4`）；仅显式跨版本引用才写 `/v4/...`；目标必须存在                  | [9](WRITING-GUIDE.md#9-链接与引用规范)          |
| 图片        | V5 写 `![Figure N: 描述](/images/v5/jumpserver/<name>.png)`，**所有 V5 页面用到的图片统一放 `docs/public/images/v5/jumpserver/`，不再按 admin-guides 等子目录拆分**；V4 写 `/images/v4/admin-guides/...` 或 `/images/v4/jumpserver/...`，文件放 `docs/public/images/v4/`；**禁止** `/docs/images/...` | [7](WRITING-GUIDE.md#7-截图规范)                |
| 截图 TODO   | 页面可见、可搜索的 `> **Screenshot TODO:** ...` Markdown 引用块；写清画面、建议文件名和保存路径 | [7](WRITING-GUIDE.md#7-截图规范) |
| `Steps`     | 每个**直接子元素**是一步，必须用 `<div>` 包裹；嵌套用 `<Steps stepLevel="2">`；步骤内可放 `<Nav>`、代码块、`<Alert>`                                                                                       | [5](WRITING-GUIDE.md#5-步骤与操作说明)          |
| `Alert`     | `type` 只能是 `tip`（默认）、`note`、`warning`、`important`、`error`、`xpack`；拼错会导致渲染异常                                                                                                          | [6.2](WRITING-GUIDE.md#6-组件与-markdown-规范)  |
| 组件        | 全局组件不需要 import；`Tabs`/`Tab` 与 `@/components/docs/*` 定制组件必须显式 import                                                                                                                       | [6.1](WRITING-GUIDE.md#6-组件与-markdown-规范)  |
| 代码块      | 标注语言（` ```sh `、` ```bash `、` ```json `、` ```yaml `）；密码/Token/AK/SK 一律占位符；版本号命令用 `VersionedCommand`                                                                                 | [6.10](WRITING-GUIDE.md#6-组件与-markdown-规范) |
| 表格        | 列数一致，单元格内不换行；用 Markdown 原生表格，不手写 `<table>`                                                                                                                                           | [8](WRITING-GUIDE.md#8-图示与表格规范)          |
| 术语        | 英文界面术语；菜单路径写 **Console > Assets**；按钮名加粗 **Create**                                                                                                                                       | [4.4–4.5](WRITING-GUIDE.md#4-行文规范)          |
| 版本        | 一页只讲一个版本，V5 页面不混入 V4 菜单；同一页面内的链接都用版本内路径，不要给本版本链接加 `/v4` 前缀；功能引入/变更用 `VersionBadge` 标注，并在页面下方维护 `## Version history` Release note 表，正文不重复版本描述（[10.7](WRITING-GUIDE.md#107-版本引入与变更标注)） | [10](WRITING-GUIDE.md#10-版本国际化与发布)      |

## 6. 组件速查

**全局注册**（`rspress.config.ts` 的 `markdown.globalComponents`，直接用、**不要 import**）；其余组件按“引入方式”列显式 import。

| 组件                                            | 引入方式                                                                                | 用法要点                                                                                                                                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Alert`                                         | 全局                                                                                    | `<Alert type="warning">…</Alert>`；企业版用 `type="xpack"`，放首屏                                                                                                                |
| `Steps`                                         | 全局                                                                                    | `<Steps>` + 每步 `<div>`；嵌套 `<Steps stepLevel="2">`                                                                                                                            |
| `Nav`                                           | 全局                                                                                    | `<Nav name="console" />`；`name` 取值：`console`、`pam`、`audits`、`web-terminal`、`system-settings`、`change-org`；输出导航说明 + 官方示意图，通常作为 `Steps` 的第一步          |
| `Icon`                                          | 全局                                                                                    | `<Icon name="plus" />`；`name` 必须存在于 `src/components/docs/icons.tsx` 的 `iconConfig`，拼错时静默渲染空白                                                                     |
| `ApplyTrialLicense`                             | 全局                                                                                    | 首页/介绍页的试用入口                                                                                                                                                             |
| `DataTable`                                     | 全局                                                                                    | `headers` + `rows`（单元格对象 `{ content, link? }`）；普通表格优先用 Markdown 表格                                                                                               |
| `VersionBadge`                                  | 全局                                                                                    | `<VersionBadge version="5.1.0" kind="new" />`；标注功能引入/变更版本，`kind` 取 `new`、`changed`、`deprecated`、`removed`，规则见 [10.7](WRITING-GUIDE.md#107-版本引入与变更标注) |
| `Tabs` / `Tab`                                  | `import { Tab, Tabs } from "@rspress/core/theme"`                                       | `<Tab label="Upload">…</Tab>`；标签页内容同样要可写、可执行                                                                                                                       |
| `Link`                                          | `import { Link } from "@rspress/core/theme-original"`                                   | 卡片/CTA 内部跳转用；普通正文优先 Markdown 链接                                                                                                                                   |
| `VersionedCommand`                              | `import VersionedCommand from "@/components/docs/versioned-command"`                    | `<VersionedCommand template="cd jumpserver-ee-{version}" />`；版本号来自 `src/data/releases.json`，**不要手写版本号**                                                             |
| `EnterpriseEditionCta` / `EnterpriseFeatureCta` | `import … from "@/components/docs/enterprise-edition-cta"`、`…/enterprise-feature-cta"` | 企业版引导块，每页最多一处，与正文 `xpack` 标注配合使用                                                                                                                           |
| `CompareVersionsDataTable`                      | `import CompareVersionsDataTable from "@/components/docs/compare-versions-datatable"`   | 版本对比表；用于 v5 `reference/compare-editions` 与 v4 `compare-versions`                                                                                                         |
| `ChangelogTable`                                | `import ChangelogTable from "@/components/docs/changelog-table"`                        | 变更日志版本表；仅 v5 `reference/changelog`                                                                                                                                       |

`src/components/docs/` 为实现，`src/components/global/` 为全局包装；组件源码优先于本文档。

## 7. 写入边界与禁止事项

**允许写**：任务分配给你的 `docs/**` 页面、`_meta.json`，以及明确指定的仓库级文档。

**禁止**：

- 修改 `rspress.config.ts`、`src/**`、`scripts/**`、`theme/**`、`package.json`（除非任务明确要求且由 Lead 授权）。
- 修改 [WRITING-GUIDE.md](WRITING-GUIDE.md)、本文件；发现规范问题只报告，不擅自改。
- 删除或移动文件/图片、一次改动超过 5 个页面、重排 `_meta.json` 结构。
- 伪造截图、AI 生成截图、用中文 UI 或带水印的图；提交真实凭据、Token、API Key。
- 对真实环境执行删除、改密、推送等写操作。
- 运行 `pnpm format`（全仓库重排）；运行 `git` 写操作（commit/push/branch，本工作副本可能没有 `.git`）。
- 主动运行 `pnpm build`（构建由 Lead 统一执行，除非任务明确要求）；手工编辑 `build/`、`llms.txt`、`sitemap.xml` 等生成物。

## 8. 截图规则

- **默认只写 TODO**，不新增、不替换图片文件；内容写清楚并留下 TODO 即可。
- 引用已有截图：V5 用 `![Figure 1: Assets list](/images/v5/jumpserver/v5_admin_assets_01.png)`，V4 用 `/images/v4/admin-guides/...` 或 `/images/v4/jumpserver/...`；路径都不带 `/docs`。
- 截图基准：英文界面、无水印、无测试密码/API Key/个人信息、1600×1000 PNG（客户端截图保留原生窗口尺寸）。
- 替换或补充截图必须由任务明确授权并遵循 [7. 截图规范](WRITING-GUIDE.md#7-截图规范)；替换后同步 `SCREENSHOT-REPLACEMENT.md` 台账。
- 交付时**必须列出待人工截图清单**：页面 → 位置 → 期望画面 → 阻塞原因。

## 9. 验证回路

按顺序执行，全绿才算完成：

```bash
pnpm check:docs                          # 1. 文档静态检查（scripts/check-docs.mjs）
pnpm exec prettier --check <改动文件>     # 2. 只检查本次改动文件
pnpm exec prettier --write <改动文件>     #    仅在 check 失败且差异属于自己改动时使用
pnpm build                              # 3. 构建（默认由 Lead 执行；获准后才跑）
pnpm preview --port 4173                # 4. 预览抽检改动涉及的页面
```

注意事项：

- 仓库存在历史格式债：`docs/v4` 大部分文件为 CRLF，`docs/v5` 仍有部分 MDX 尚未 prettier-clean。**只检查本次改动的文件**，不要为通过检查去重排未改动的旧页面。
- `prettier --check` 失败常见原因：CRLF 行尾、旧表格未对齐；确认差异来自自己的改动再 `--write`。
- `pnpm preview` 会自动监听源文件并重新构建；刷新浏览器即可看到更新。使用 `--no-watch` 可关闭自动重建；构建失败时继续提供上一次成功的构建。

## 10. 升级人工条件

出现以下任一情况，**停止写入并报告**，不要自行决定：

1. 需要删除、移动、重命名文件或图片。
2. 需要改动超过 5 个页面，或需要重排 `_meta.json` / `_nav.json` 结构。
3. 需要对真实环境执行写操作（建资产、改密、推送、删除）。
4. 界面事实无法用第 3 节 1–3 级来源确认（菜单名、字段名、按钮文案、版本差异）。
5. 需要新增依赖、改构建配置或主题组件。
6. `pnpm build` 或 `pnpm check:docs` 失败且原因不明；页面需要截图证据但仓库无图。
7. 与他人写作用域冲突，或发现现有页面存在规范缺陷但不在本次范围内。
8. 需要信息架构调整、跨版本迁移或跨模块内容重组。
9. 发现规范本身需要修改（只报告，不擅自改）。

## 11. 多 Agent 协作

- 只写任务分配给你的写作用域；跨文件“顺手修”一律禁止，发现他人的问题写入交付说明。
- `_meta.json` 是热点文件：同一目录同一时间只允许一个 Agent 修改；改前重新读取最新内容，避免覆盖他人条目。
- 仓库级文档（本文件、WRITING-GUIDE、README/CONTRIBUTING/MAINTENANCE）由 Lead 统一维护。
- 文件被他人改动时，重新读取后基于最新内容修改，不要回滚别人的内容；完成即更新任务状态并向 Lead 发送交付说明。

## 12. 常见陷阱

| 症状                           | 原因                                                                     | 处理                                                                      |
| ------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 构建报死链                     | 链接目标不存在；在 V4 页面误写 `/v4/...`（实际会变成 `/docs/v4/v4/...`） | 写版本内路径，如 V5 `/features/console/assets/`、V4 `/notifications/email` |
| 图片 404                       | 写了 `/docs/images/...`                                                  | 去掉 `/docs`，确认 V5 文件在 `docs/public/images/v5/jumpserver/`、V4 文件在 `docs/public/images/v4/admin-guides/` 或 `docs/public/images/v4/jumpserver/` |
| 侧边栏看不到新页面             | 只建了 MDX，没在 `_meta.json` 登记                                       | 补 `{ "type": "file", "name": "<file>", "label": "..." }`                 |
| `Steps` 编号错乱或空步骤       | 子元素没包 `<div>`，或写了裸文本                                         | 每步一个 `<div>`                                                          |
| 页面构建报错或空白             | 需要 import 的组件没 import，或组件名拼错                                | 按第 6 节补 import                                                        |
| `Icon` 区域空白 / `Alert` 异常 | `name` 不在 `iconConfig`；`type` 拼错                                    | 用 `icons.tsx` 已有名字；`Alert` 只用 6 个合法值                          |
| prettier 检查失败              | CRLF 行尾或旧文件未格式化                                                | 只处理自己改动的文件                                                      |
| 预览没更新                     | 预览进程未监听或构建失败                                                | 确认 `pnpm preview` 正在运行并查看终端构建日志；必要时重启预览              |
| 版本号过期 / 表格错位          | 命令手写版本号；单元格换行或列数不一致                                   | 改用 `VersionedCommand`；拆表格、统一列数                                 |

## 13. 规范索引

| 主题                         | 权威位置                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 页面结构、frontmatter、骨架  | [3. 页面结构规范](WRITING-GUIDE.md#3-页面结构规范)                                                                              |
| 语气、术语、界面文案         | [4. 行文规范](WRITING-GUIDE.md#4-行文规范)                                                                                      |
| 步骤、命令块、前置条件       | [5. 步骤与操作说明](WRITING-GUIDE.md#5-步骤与操作说明)                                                                          |
| 组件、表格、代码块、MDX 边界 | [6. 组件与 Markdown 规范](WRITING-GUIDE.md#6-组件与-markdown-规范)                                                              |
| 截图、TODO、图示             | [7. 截图规范](WRITING-GUIDE.md#7-截图规范) / [8. 图示与表格规范](WRITING-GUIDE.md#8-图示与表格规范)                             |
| 链接、锚点、引用             | [9. 链接与引用规范](WRITING-GUIDE.md#9-链接与引用规范)                                                                          |
| 版本、发布、命令版本号       | [10. 版本、国际化与发布](WRITING-GUIDE.md#10-版本国际化与发布)                                                                  |
| 质量校验、常见错误           | [11. 质量校验与常见错误](WRITING-GUIDE.md#11-质量校验与常见错误)                                                                |
| Agent 执行细则               | [12. AI Agent 编写规范](WRITING-GUIDE.md#12-ai-agent-编写规范)                                                                  |
| 提交与评审                   | [13. 提交与评审](WRITING-GUIDE.md#13-提交与评审)                                                                                |
| 页面模板 / 术语表 / 检查清单 | [附录 A](WRITING-GUIDE.md#附录-a页面模板) / [附录 B](WRITING-GUIDE.md#附录-b术语表) / [附录 C](WRITING-GUIDE.md#附录-c检查清单) |
| 维护、贡献、截图台账         | [MAINTENANCE.md](MAINTENANCE.md) / [CONTRIBUTING.md](CONTRIBUTING.md) / [SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md)  |

## 14. 交付报告模板

```markdown
## 交付说明

- 任务：<task id / 一句话目标>
- 改动文件：<路径>（新增/修改，+N 行）；<路径>（如 `_meta.json` 登记）
- 截图：无新增 / <文件名>（来源、是否入库、是否替换旧图）
- 待人工截图清单：<页面> → <位置> → <期望画面> → <阻塞原因>
- 验证：pnpm check:docs → <通过/失败原因>；prettier --check <files> → <通过/说明>；build → <由 Lead 执行/结果>；预览抽检 → <页面 + 结论>
- 风险与未决：<规范歧义、事实不确定、写作用域冲突、遗留 TODO>
```
