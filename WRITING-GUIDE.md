# JumpServer 文档编写规范

> **适用范围**：`docs/v5`、`docs/v4` 下的所有 MDX 页面，以及文档配套的截图、图示和仓库级说明文档。
>
> **适用对象**：人工编写者（技术文档、产品、研发、交付同学）与 AI Agent。
>
> **关联文档**：[AGENTS.md](AGENTS.md)（AI Agent 操作契约）、[MAINTENANCE.md](MAINTENANCE.md)（站点维护与发布）、[CONTRIBUTING.md](CONTRIBUTING.md)（社区贡献流程）、[SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md)（截图替换台账）。
>
> **效力与优先级**：Rspress 构建与仓库配置（[rspress.config.ts](rspress.config.ts)、`_meta.json`、组件源码）**高于**本规范；本规范**高于**现有页面中尚未整改的历史写法。规范与构建冲突时，以构建结果为准，并回头修正本规范。

## 目录

- [1. 总则与适用范围](#1-总则与适用范围)
- [2. 文档体系与信息架构](#2-文档体系与信息架构)
- [3. 页面结构规范](#3-页面结构规范)
- [4. 行文规范](#4-行文规范)
- [5. 步骤与操作说明](#5-步骤与操作说明)
- [6. 组件与 Markdown 规范](#6-组件与-markdown-规范)
- [7. 截图规范](#7-截图规范)
- [8. 图示与表格规范](#8-图示与表格规范)
- [9. 链接与引用规范](#9-链接与引用规范)
- [10. 版本、国际化与发布](#10-版本国际化与发布)
- [11. 质量校验与常见错误](#11-质量校验与常见错误)
- [12. AI Agent 编写规范](#12-ai-agent-编写规范)
- [13. 提交与评审](#13-提交与评审)
- [附录 A：页面模板](#附录-a页面模板)
- [附录 B：术语表](#附录-b术语表)
- [附录 C：检查清单](#附录-c检查清单)

## 1. 总则与适用范围

### 1.1 文档是产品的一部分

JumpServer 文档站的读者是正在做运维、审计、交付和日常接入的工程师。文档的目标不是"介绍产品"，而是**让读者在真实环境中完成一件事**：装好、配好、连上、审计到、排掉故障。

因此，任何页面的价值都可以用三个问题检验：

1. 读者读完能否完成目标操作？
2. 操作结果是否可验证（能看到什么、去哪里确认）？
3. 信息是否准确对应当前版本的英文界面？

三个问题有一个答不上来，页面就不算写完。

### 1.2 适用对象

| 对象       | 关注章节                                                         |
| ---------- | ---------------------------------------------------------------- |
| 人工编写者 | 全文，重点为第 2–9 章、第 13 章                                  |
| 评审者     | 第 3、4、6、7、9、11 章与附录 C                                  |
| AI Agent   | 第 12 章为本规范的执行细则，[AGENTS.md](AGENTS.md)为最低操作契约 |
| 首次贡献者 | 第 1–3 章的页面骨架、附录 A 的模板、附录 C 的检查清单            |

### 1.3 规范用词

| 用词 | 含义                                   |
| ---- | -------------------------------------- |
| 必须 | 硬性要求，违反即视为缺陷，评审必须打回 |
| 应该 | 默认要求，除非有明确理由并可被评审接受 |
| 可以 | 允许的可选做法                         |
| 禁止 | 不得出现，包括"临时先这样"的情况       |
| 不要 | 与"禁止"同义，用于写法层面的提醒       |

### 1.4 五条基本原则

1. **准确**：以当前版本的英文界面、[rspress.config.ts](rspress.config.ts) 与组件源码为事实来源。界面文案、字段名、菜单路径不得凭印象书写。
2. **可执行**：每个操作步骤都能被读者照做；每个步骤都有明确的前置条件和可观察结果。
3. **一致**：同类页面结构一致，同一概念用词一致，同类截图规格一致。一致性优先于个人表达习惯。
4. **简洁**：一页只解决一类问题；能删的字都删掉；不写产品营销文案。
5. **可验证**：文档变更必须通过 `pnpm build`（死链、死图检查）和 `pnpm check:docs`，并至少预览一次相关页面。

### 1.5 读者模型

不要写"给所有人看"的页面。写作前先确定主读者，并据此决定深度：

| 读者       | 关心什么                               | 不关心什么             |
| ---------- | -------------------------------------- | ---------------------- |
| 系统管理员 | 用户、资产、账号、授权、ACL、系统设置  | 审计回放的具体操作细节 |
| 运维工程师 | 安装、升级、备份、网络、端口、故障排查 | 权限模型的理论推导     |
| 审计员     | 会话、命令、登录日志、工单、报表       | 资产创建的字段含义     |
| 普通用户   | 工作台接入、文件传输、工单、客户端     | 组织级策略配置         |

角色页（`docs/v5/roles/`）只做能力地图和入口，不复制功能页的步骤；功能页是唯一权威内容（canonical page）。

## 2. 文档体系与信息架构

### 2.1 双版本文档树

| 项       | V5（默认）           | V4（历史版本）       |
| -------- | -------------------- | -------------------- |
| 源码目录 | `docs/v5/`           | `docs/v4/`           |
| 访问路径 | `/docs/...`          | `/docs/v4/...`       |
| 侧边栏   | `docs/v5/_meta.json` | `docs/v4/_meta.json` |
| 顶部导航 | `docs/v5/_nav.json`  | `docs/v4/_nav.json`  |
| 内容定位 | 新功能的唯一目标版本 | 冻结维护，仅按需修正 |

**新增和改写内容默认只写 V5**。除非任务明确要求维护 V4，不要改 `docs/v4/`。同一功能确实需要双版本保留时，V5 为权威版本，V4 只保留与旧界面匹配的必要内容，不做整篇复制。

### 2.2 页面类型

写之前先判断页面类型，类型决定骨架，而不是相反：

| 类型       | 回答的问题               | 典型骨架                                                   |
| ---------- | ------------------------ | ---------------------------------------------------------- |
| 任务页     | 怎么做                   | 前置条件 → 操作步骤 → 字段参考 → 注意事项 → 相关主题       |
| 概念页     | 是什么、为什么           | 定义 → 组成/关系 → 使用场景 → 相关主题                     |
| 参考页     | 有哪些字段/参数/限制     | 表格或字段列表 → 取值说明 → 注意事项                       |
| 故障排查页 | 出问题怎么办             | 现象 → 诊断步骤 → 原因与处理 → 仍无法解决时的入口          |
| 章节概览页 | 这一章包含什么、从哪开始 | 简介 → 卡片/链接列表（`overview: true`）                   |
| 发布说明页 | 这个版本有什么变化       | 版本 → 新增/变更/修复（数据来自 `src/data/releases.json`） |

一个页面只承担一种主类型。既想讲概念又想讲全量操作时，拆成两个页面并互相链接。

### 2.3 目录与文件命名

- 文件名使用 **kebab-case 英文**，例如 `cloud-sync.mdx`、`session-commands.mdx`、`job-executions.mdx`。
- 文件名表达主题，不用 `page-1.mdx`、`new.mdx`、`test.mdx`、`temp.mdx`。
- 不用中文、空格、大写字母、下划线命名文件或目录。
- 一个主题一个文件。文件名与页面 `title` 不必逐字相同，但语义必须一致。
- 目录按模块划分，不按作者或时间划分。新增目录前先确认现有目录能否容纳。

### 2.4 页面放在哪里

V5 顶层保持“Feature Modules / Role Guides / Operations”三段式分区，模块内部再按真实目录组织：

| 顶层分区 | 实际目录 | 内容 |
| --- | --- | --- |
| Get Started | `docs/v5/` 根目录文件 | Quickstart、安装、升级 |
| Feature Modules | `docs/v5/features/` | General、Console、PAM、Audits、Workbench、Client、System Settings |
| Role Guides | `docs/v5/roles/` | 按角色组织的能力地图与入口 |
| Operations | `docs/v5/operations/` | 部署、维护、安全、Device Manager |
| Developer Guide | `docs/v5/developer-guide/` | API、集成、SDK |
| Reference | `docs/v5/reference/` | 版本、License、术语、版本对比 |

按以下顺序做决策，命中即停：

1. 是某个产品模块的操作/概念 → `docs/v5/features/<module>/`（`general`、`console`、`pam`、`audits`、`workbench`、`client`、`system-settings`）。
2. 是安装、升级、部署、配置、备份、安全加固、网络端口 → `docs/v5/operations/`。
3. 是 API、集成、SDK → `docs/v5/developer-guide/`。
4. 是术语、版本对比、License、Changelog → `docs/v5/reference/`。
5. 是按角色组织的能力地图 → `docs/v5/roles/`，且只链接到功能页，不复制步骤。
6. 以上都不合适 → 在 PR 中提出信息架构调整建议，不要随手新建顶层目录。

### 2.5 侧边栏：`_meta.json`

每个目录都有自己的 `_meta.json`，决定该目录的侧边栏顺序与分组。V5 的模型是：**顶层分区用静态标题，Feature Modules 内部用目录分组。**

顶层示例：

```json
[
  { "type": "file", "name": "index", "label": "Introduction" },
  { "type": "section-header", "label": "Get Started" },
  { "type": "file", "name": "quickstart", "label": "Quickstart" },
  { "type": "dir-section-header", "name": "features", "label": "Feature Modules", "collapsed": true },
  { "type": "dir-section-header", "name": "roles", "label": "Role Guides", "collapsed": true },
  { "type": "dir-section-header", "name": "operations", "label": "Operations", "collapsed": true }
]
```

`features/_meta.json` 内的模块示例：

```json
[
  { "type": "file", "name": "index", "label": "Feature Overview" },
  { "type": "dir", "name": "general", "label": "General", "collapsed": true },
  { "type": "dir", "name": "console", "label": "Console", "collapsed": true }
]
```

模块内示例：

```json
[
  { "type": "file", "name": "dashboard", "label": "Dashboard" },
  { "type": "dir", "name": "users", "label": "Users", "collapsed": true },
  { "type": "dir", "name": "assets", "label": "Assets", "collapsed": true },
  { "type": "file", "name": "tags", "label": "Tags" }
]
```

规则：

- **顶层分区**用 `section-header`（Get Started）或 `dir-section-header`（Feature Modules、Role Guides、Operations、Developer Guide、Reference）建立静态标题；它们没有独立 URL，不承担可折叠分组。
- **Feature Modules 内部**不使用 `section-header` 或 `dir-section-header`，所有有子页面的分组都必须是真实目录 + `dir`。
- **新页面必须登记**到同级 `_meta.json`，否则不会出现在侧边栏。未登记的页面虽然可路由，但视为缺陷。
- 每个模块 `dir` 必须有 `index.mdx`。模块概览页不登记到 `_meta.json`，模块标题直接链接到它；`Feature Overview` 这类顶层入口页作为 `file` 显式登记。
- 只有一个页面的主题直接登记为 `file`，不要再包一层目录。
- 新增分组前先确认现有目录能否容纳；不要为了折叠交互把扁平页面强行升级为目录。
- 顺序即侧边栏顺序：按读者使用频率和任务先后排，不按字母排。
- 删除或重命名页面时，同步删除/更新 `_meta.json` 条目和所有入链。
- 旧版模块内部的 `section-header` 写法不再接受；发现历史残留时按本节迁移为目录分组或单页直达。

### 2.6 顶部导航：`_nav.json`

只有新增一级导航时才改 `docs/v5/_nav.json` 或 `docs/v4/_nav.json`。普通功能页、子页面不需要动顶部导航。`_nav.json` 与 `_meta.json` 属于热点文件，多个任务并行时**串行修改**，避免互相覆盖。

### 2.7 页面关系：权威页与入口页

- 一个主题只有一个权威页（canonical page），其他页面用链接引用它，不复制内容。
- 角色页、总览页、Quickstart 属于入口页，负责"指路"，不重复功能页的完整步骤。
- 发现两页内容重复时，保留更完整、更靠近功能模块的一页，另一页改为摘要 + 链接。
- 链接文案用目标页的主题，不写"点击这里"（见 4.9）。

## 3. 页面结构规范

### 3.1 frontmatter

每个 `.mdx` 文件开头必须是 YAML frontmatter：

```yaml
---
title: "Create an asset"
description: "Create a host, network device, or database asset and bind the accounts used to sign in."
---
```

| 字段          | 必填             | 说明                                                    |
| ------------- | ---------------- | ------------------------------------------------------- |
| `title`       | V5 必须          | 页面标题，用于浏览器标题、搜索、`llms.txt` 和侧边栏回退 |
| `description` | 必须             | 一句话说明页面用途，用于搜索摘要、SEO 与 `llms.txt`     |
| `overview`    | 仅章节概览页必须 | `true`，启用 Halo 风格卡片索引页                        |

规则：

- 字段值使用双引号包裹的字符串，避免 YAML 解析歧义。
- 不要在 frontmatter 中新增自定义字段。需要新字段时，先改主题/配置并在 PR 中说明。
- 页面正文的 H1 与 `title` 语义一致，但 H1 可以更简（例如 `title: "Create an asset"` + `# Create an asset`）。
- V4 历史页面可以只有 `description`（用 H1 作标题），但**新增和改写的 V4 页面应补齐 `title` 与 `description`**。

### 3.2 `description` 写作规则

`description` 不是 SEO 填充物，而是一句话的功能说明：

- 一页一句话，长度控制在 **160 字符以内**（英文）。
- 写"读者能在这里做什么"，不写"本文档介绍了……"。
- 禁止模板句：`Learn how to <X> in JumpServer documentation, with key steps, configuration options, and best practices.` 这类句子对读者没有信息量，见到即改。
- 不堆关键词，不写营销词（powerful、seamless、best-in-class）。
- 概览页也要写 `description`，说明这一章覆盖的范围。

### 3.3 标准页面骨架

任务页（最常见）：

> 模板中的 `[方括号]` 为占位符，复制时必须全部替换；保留方括号或写成 `<尖括号>` 都会导致 MDX 解析/构建失败。

```mdx
---
title: "Page title"
description: "One sentence that says what this page helps the reader do."
---

# Page title

<Alert type="xpack">
  **Enterprise-only capability** requires JumpServer Enterprise Edition.
</Alert>

One short paragraph: what this page is, where it is in the UI, who it is for.

![Figure 1: What the page looks like with the key areas visible.](/images/jumpserver/v5_admin_example_01.png)

## Overview

What the page shows and what the main controls do.

## Before you begin

- Prerequisite one.
- Permission or edition requirement.

## [Task section]

<Steps>
  <div>Click **Create**.</div>
  <div>Fill in the fields, then click **Submit**.</div>
</Steps>

## Field reference

| Field    | Description             |
| -------- | ----------------------- |
| **Name** | Required. Display name. |

<Alert type="warning">What can go wrong and how to avoid it.</Alert>

## Related topics

- [Related page](/features/console/assets/)
```

章节概览页：

```mdx
---
title: "Audits Overview"
description: "Review sessions, commands, logs, jobs, tickets, and reports for the selected organization."
overview: true
---
```

### 3.4 标题层级与标题文案

- 全页**有且只有一个 H1**。H1 位于 frontmatter 与 import/组件声明之后、正文第一行（`overview: true` 的章节概览页除外）。
- H2 用于主要章节，H3 用于章节内的子话题，不跳级（H2 不能直接接 H4）。
- 标题使用 **sentence case**：`Create an asset`，不是 `Create An Asset`。产品名和界面术语保留官方大小写。
- 标题不加手动编号（`## 1. 创建资产` 禁止），不写句号、问号、感叹号。
- 标题动宾结构优先：`Import and export`、`Work with the node tree`、`Row actions and bulk actions`。
- 同一页面内的标题不重复；不同页面之间可以复用常见标题（`Overview`、`Before you begin`、`Related topics`）。
- 不要为了 SEO 堆标题。标题层级服务于阅读路径。

### 3.5 首屏三要素

进入页面后的前 15 行必须让读者知道：

1. **是什么**：这一页/这个功能是什么。
2. **在哪里**：菜单路径或入口，例如 **Console > Assets**。
3. **给谁用**：适用角色或前提（管理员、审计员、Enterprise 版本等）。

企业版限定内容在第一屏用 `<Alert type="xpack">` 明确标注，不要让读者读到最后才发现需要 License。

### 3.6 章节顺序

推荐顺序（可按页面需要裁剪，但不随意打乱）：

1. 版本/范围提示（xpack Alert）
2. 简介
3. 首图（`Figure 1`）
4. `## Overview`
5. `## Before you begin`
6. 操作章节（按任务流顺序，使用 `Steps`）
7. `## Field reference` 或参数表
8. 注意事项、限制、风险（Alert）
9. `## Related topics` 或 `## Next steps`

### 3.7 结尾

- 任务页以 `## Related topics` 收尾，列出 3–6 个真正相关的页面。
- 入门/流程页可以用 `## Next steps`，给出按顺序的后续阅读路径。
- 结尾链接必须指向已存在的页面；不要为了"看起来完整"加无关链接。
- 页面末尾不写"如有疑问请联系我们"这类空泛内容；支持入口用统一的 Help/Support 说明。

### 3.8 页面长度与拆分

- 单页建议 800–2500 词（中文约 1500–4000 字）。超过 3000 词时评估拆分。
- 拆分依据是主题边界，不是长度：一个页面只承担一个任务或一个概念。
- 拆分后保留一个权威页，其他页改为摘要 + 链接，避免内容漂移。
- 不要用折叠、滚动长截图等方式掩盖过长的内容。

### 3.9 章节概览页

- 章节索引页使用 `overview: true`，只写 frontmatter，不写正文（Rspress 自动生成卡片索引）。
- 概览页的 `title` 要能作为侧边栏分组标题，例如 `Console Overview`。
- 概览页仍要写 `description`，用于搜索与 `llms.txt`。
- 概览页不再在 `_meta.json` 中作为子项重复出现。

### 3.10 禁止的结构

- 多个 H1，或用 H1 当段落强调。
- 空章节（标题下没有内容）。
- 用标题模拟表格/列表（例如 `### 字段一` 逐字段堆 H3；字段多时用表格）。
- 把完整 UI 说明复制到多个页面。
- 在正文中保留 `TODO`、`FIXME`、作者备注；截图待办使用页面可见、可搜索的引用块（见 7.10）。

## 4. 行文规范

本章规定"怎么写"。第 3 章规定页面长什么样，本章规定句子里该出现什么、不该出现什么。

### 4.1 语种

- 站点正文统一使用**美式英语**（US English）。`docs/v5`、`docs/v4` 中不得出现中文正文、中文标题、中文注释。
- 仓库级流程文档（`MAINTENANCE.md`、本规范、`AGENTS.md`）使用中文，但产品名、界面术语、命令保持英文。
- 中文文档中不要整段夹带英文句子；英文文档中不要用中文标点。
- 界面文案引用一律保留英文，不翻译：**Submit** 不要写成"提交按钮"。

### 4.2 语气、人称与时态

- 使用**第二人称 you**，直接对读者说话；不出现 we、our、I、us（除非引用官方立场）。
- 操作说明使用**祈使句**：`Click **Create**.`、`Select the **Linux** platform.`。
- 描述当前行为使用**现在时**：`The list shows only assets in the current organization.`。
- 使用**主动语态**：`JumpServer stores the recording in object storage.`，不写 `The recording is stored ...`（除非执行者不重要）。
- 不使用 "please" 作为默认礼貌词：`Please click **Submit**.` → `Click **Submit**.`。
- 不使用 "we recommend" 代替明确建议；直接写 `Use ...` / `Avoid ...`。
- 不写"未来会支持"这类承诺，除非有已发布版本或官方计划作为依据。

### 4.3 句子与段落

- 一句话表达一个意思。英文句长建议不超过 25 词，中文建议不超过 40 字。
- 段落 1–4 句；一个段落只讲一个点。超过 5 行考虑拆分。
- 并列内容用列表，不用逗号堆叠；列表项保持语法结构一致。
- 删除填充词：`simply`、`just`、`easily`、`obviously`、`of course`、`as you know`、`it is worth noting that`。
- 删除营销词：`powerful`、`seamless`、`best-in-class`、`revolutionary`、`world-class`、`cutting-edge`。
- 少用括号补充说明；必要信息放进正文，次要信息删除。
- 一个句子中不要嵌套超过两层从句。

### 4.4 术语与产品名

**必须使用官方写法**，同一概念全文只用一个词：

| 概念                  | 正确写法                                                     | 不要写成                                     |
| --------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| 产品                  | JumpServer                                                   | Jumpserver、jumpserver、JS                   |
| 社区版 / 企业版       | Community Edition (CE) / Enterprise Edition (EE)，首现给全称 | 社区版、免费版、商业版、Pro                  |
| 平台用户              | user                                                         | 用户、账号（与资产账号混淆）                 |
| 资产账号              | account                                                      | credential、secret（secret 指凭据内容本身）  |
| 资产                  | asset                                                        | host（host 只是资产类型之一）、device        |
| 组织                  | organization                                                 | org（界面缩写除外）、tenant                  |
| 节点 / 网关           | node / zone                                                  | 分组、区域（视上下文）                       |
| 授权                  | authorization                                                | permission（permission 指一般权限）          |
| 访问控制              | ACL (Access Control List)，首现给全称                        | acl、访问策略                                |
| 会话                  | session                                                      | connection（connection 指连接动作/连接方法） |
| 工单                  | ticket                                                       | work order、order                            |
| 作业 / 模板           | job / template；`Adhoc` 保留界面写法                         | ad-hoc、task（task 用于系统任务）            |
| Web 终端              | Web Terminal；连接方式 Web CLI 写作 **Web CLI**              | web terminal、网页终端                       |
| 客户端                | JumpServer Client，首现后可用 Client                         | client、桌面端                               |
| Lua 终端 / 原生客户端 | Luna（按界面与官方文档）                                     | luna、Luna 组件                              |
| 多因素认证            | MFA (Multi-Factor Authentication)                            | 二次验证、双因子                             |
| 单点登录              | SSO (Single Sign-On)                                         | 单点登陆                                     |
| 系统角色 / 组织角色   | system role / organization role                              | 角色（有歧义时必须限定）                     |

规则：

- 缩写首次出现给全称：`MFA (Multi-Factor Authentication)`；全文多次出现后直接用缩写。
- 不随意使用同义词替换：`asset` 不要时而写 asset、时而写 host；`account` 不要时而写 credential。
- 界面中的菜单、页签、按钮名按界面原文书写，不翻译、不改大小写。
- 版本号写作 `v5.10.1`；文档版本写作 V5/V4（大写）。
- 不确定界面术语时，以英文界面或源码为准；仍不确定时停下来问，不要猜。

### 4.5 界面元素与交互动作

**格式规则**：

- 按钮、菜单项、页签、字段名、选项值：**粗体**，例如 `Click **Create**.`、`In the **Name** field`。
- 菜单路径：**粗体 + `>` 分隔**，例如 `**Console > Assets**`；路径层级从大到大，中间是空格 + `>` + 空格。
- 图标：使用 `<Icon name="..." />`，不要用 emoji 代替。
- 输入值、路径、命令、代码、占位符、配置项：`行内代码`，例如 `admin`、`/opt`、`ssh/22`、`<jumpserver-host>`。
- 不要给界面元素加 "button"、"field"、"tab" 等后缀：`Click **Create**`，不写 `Click the **Create** button`（首次说明字段类型时可用 "the **Name** field"）。
- 不要用粗体强调普通句子；粗体只用于界面元素和少量关键限制。

**动作用词表**（同一动作全文用同一个词）：

| 动作                 | 用法                                | 示例                                       |
| -------------------- | ----------------------------------- | ------------------------------------------ |
| 打开页面/入口        | Open                                | `Open **Console > Assets**.`               |
| 点击按钮、链接、页签 | Click                               | `Click **Create**.`                        |
| 从下拉框/列表选择    | Select                              | `Select **Linux**.`                        |
| 勾选/取消勾选复选框  | Select / Clear                      | `Select **Active**.` / `Clear **Active**.` |
| 在输入框输入         | In the **X** field, type / Enter    | `In the **Name** field, type Demo Linux.`  |
| 按键盘               | Press                               | `Press **Enter**.`、`Press **Ctrl+C**.`    |
| 打开/关闭开关        | Turn on / Turn off                  | `Turn on **Sync enabled**.`                |
| 启用/禁用功能        | Enable / Disable                    | `Enable **MFA**.`                          |
| 上传/下载/导入/导出  | Upload / Download / Import / Export | `Export the list as CSV.`                  |
| 拖拽                 | Drag ... to ...                     | `Drag the asset to the **/DEFAULT** node.` |

不要在步骤中混用 "click"、"press"、"tap"、"hit"；移动端场景才用 tap，本项目默认桌面 Web。

### 4.6 字段、值与占位符

- 字段名用粗体，字段值用行内代码或引号：`In the **Secret type** field, select "Password".`（选择项优先用引号，字段值用行内代码）。
- 占位符必须一眼可辨：
  - 尖括号形式：`https://<jumpserver-host>/`、`<organization-id>`；
  - 全大写形式：`YOUR_DOWNLOAD_URL`、`YOUR_API_TOKEN`。
- 示例值要真实可读，但**不得是真实生产数据**：`Demo Linux`、`172.16.10.110`、`example.com`。
- 必填/可选：字段参考表用 `Required.` / `Optional.` 开头，不写 "此项必填"。
- 不要在正文中暴露默认密码以外的真实凭据；默认密码（如 `admin` / `ChangeMe`）必须紧跟修改提示。

### 4.7 数字、单位、时间与版本

- 使用阿拉伯数字：`3 items`，不写 `three items`（句首除外）。
- 数字与单位之间加空格：`10 MB`、`30 s`、`4 CPU cores`、`8 GB`；百分比不加空格：`10%`。
- 范围用 en dash（–）：`5–10 minutes`、`10–20 assets`。
- 版本号：`v5.10.1`；产品名 + 版本：`JumpServer v5.10.1`。
- 日期：正文用 `March 3, 2026`；Changelog/数据文件用 ISO 8601（`2026-03-03`）。
- 时间：写清时区或使用相对描述（`after 10 minutes`）；涉及审计时间时说明界面时区。
- 端口与协议：`22/tcp`、`ssh/22`、`HTTP 443`。
- 大数字用 K/M 或千分位，同一页保持一致。

### 4.8 标点与排版

- 英文使用牛津逗号：`users, assets, and accounts`。
- 不使用感叹号；不堆问号。
- 不使用 emoji、颜文字、装饰性符号。
- 复合修饰词用连字符：`read-only`、`sign-in`、`Enterprise-only`、`role-based`。
- 动词与名词区分：`sign in`（动词）/ `sign-in`（形容词）；`log in`（动词）/ `login`（名词/形容词）；`set up`（动词）/ `setup`（名词）。
- 引号统一使用直引号 `"`，不混用中文引号；代码中的引号保持代码原样。
- 省略号用 `...`，不用 `…`；英文正文尽量不用省略号。
- 列表项不以句号结尾（完整句子除外）；同一列表内保持一致。

### 4.9 链接文案

- 链接文字描述目标内容，不写 "here"、"this link"、"点击这里"。
- 链接文字用目标页标题或主题短语：`[Assets](/features/console/assets/)`。
- 同一段落内不重复堆多个同义链接；需要多个入口时用列表。
- 外部链接给出可识别的名称：`[JumpServer GitHub repository](https://github.com/jumpserver/jumpserver)`。
- 不要用裸 URL 作为正文（除极短的官方地址）；不要给链接文字加行内代码或粗体。
- 链接不得嵌套（链接里再放链接）。

### 4.10 中英混排（仅中文文档）

仓库级中文文档遵循：

- 中文与英文/数字之间加一个半角空格：`使用 JumpServer 的 Console 页面`、`支持 v5 版本`。
- 中文使用全角标点（，。；：！？（）），英文与代码内部使用半角。
- 全角标点前不加空格；中文行内代码两侧保留空格与反引号。
- 产品名、界面术语、命令保持英文原文，不翻译、不加书名号。
- 不使用"您"，统一用"你"或省略主语。
- 避免"进行了……的操作"这类冗余表达，直接写动作。

### 4.11 措辞禁忌与替换表

| 错误写法                               | 推荐写法                                                         | 原因                     |
| -------------------------------------- | ---------------------------------------------------------------- | ------------------------ |
| Please click **Submit**.               | Click **Submit**.                                                | 祈使句更直接             |
| Simply/Just click **Create**.          | Click **Create**.                                                | 无信息量的填充词         |
| It is easy to ... / You can easily ... | 删除或写具体操作                                                 | 主观、无法验证           |
| We recommend that you ...              | Use ... / Avoid ...                                              | 第一人称、含糊           |
| JumpServer is a powerful PAM platform. | 删除营销句，写能力与适用场景                                     | 营销文案                 |
| Note: This operation cannot be undone. | `<Alert type="warning">This operation cannot be undone.</Alert>` | 统一用 Alert 组件        |
| and so on / etc.                       | 列举完整，或写 "for example, A and B"                            | 信息不完整               |
| in order to                            | to                                                               | 冗余                     |
| utilize / leverage                     | use                                                              | 冗余                     |
| perform a click / execute a click      | click                                                            | 冗余                     |
| is able to / will be able to           | can                                                              | 冗余、时态错误           |
| allows you to configure                | lets you configure / configure                                   | 冗余                     |
| The user must ...                      | You must ...                                                     | 人称不一致               |
| In case of failure                     | If it fails                                                      | 冗长                     |
| As mentioned above                     | 删除，必要时重述                                                 | 依赖阅读顺序             |
| The button "Create"                    | **Create**                                                       | 界面元素格式不统一       |
| Click on the "Create" button.          | Click **Create**.                                                | 同上                     |
| 10MB / 30sec                           | 10 MB / 30 s                                                     | 单位空格                 |
| v5.10.1 版本                           | JumpServer v5.10.1                                               | 版本号单独出现时缺少对象 |
| 请点击"提交"按钮                       | 点击 **Submit**                                                  | 中文界面术语被翻译       |
| 本功能非常强大，可以……                 | 删除评价，直接写能力与限制                                       | 营销文案                 |

其他禁止项：

- 不使用反问句、设问句作为段落开头。
- 不使用"众所周知"、"显然"、"当然"。
- 不使用未定义缩写；缩写首次出现给全称。
- 不用"支持"掩盖限制：不能做的要明确写"不支持"或"仅企业版支持"。

### 4.12 可访问性与包容性

- 不单独用颜色或方位指代元素：`Click the red **Delete** button` → `Click **Delete**.`
- 方位描述只在稳定且必要时使用，并配合名称：`the gear icon at the top-right opens **System Settings**`。
- 不用 "he/she" 指代读者，用 you 或 they。
- 图片必须有描述性 alt；表格必须有表头。
- 标题层级不跳级；链接文字脱离上下文仍可理解。
- 不写带有能力假设的措辞：`simply`、`obviously`、`of course` 暗示读者"应该会"，删除。

### 4.13 安全与合规

- 不写真实密码、Token、AK/SK、私钥、内网 IP、真实主机名、客户名称、个人信息。
- 示例数据使用 `Demo`、`Example`、`example.com`、`172.16.x.x` 等明显非生产值。
- 涉及删除、改密、推送、终止会话、批量操作时，必须配 `<Alert type="warning">` 说明影响。
- 企业版能力不得描述成社区版可用；License、AI Assistant、报表等状态相关功能要注明前提。
- 不承诺性能、容量、SLA、合规认证，除非有官方材料并注明来源。
- 不复制第三方文档原文；引用时给出版本与链接。
- 截图遵循第 7 章的脱敏要求。

## 5. 步骤与操作说明

### 5.1 选择正确的格式

| 场景                             | 用法                                  |
| -------------------------------- | ------------------------------------- |
| 多个 GUI 步骤，需要编号引导      | `<Steps>`（每个步骤一个 `<div>`）     |
| 命令行操作，每条命令一个动作     | 有序列表 + fenced code block          |
| 单一动作或说明性内容             | 普通段落                              |
| 字段/参数说明                    | 表格                                  |
| 互斥的两条路径（如上传 vs wget） | `<Tabs>` 内嵌 `<Steps stepLevel="2">` |

不要用截图代替步骤，也不要用长段落掩盖多步操作。

### 5.2 `<Steps>` 语法硬规则

```mdx
<Steps>

<div>Click **Create**.</div>

<div>
  In the **Name** field, type a name for the asset, such as "Demo Linux".
</div>

<div>Click **Submit**.</div>

</Steps>
```

- `<Steps>` 的每个**直接子元素**渲染为一个步骤，因此每个步骤**必须**用 `<div>` 包裹。
- `<Steps>` 内不得出现裸文本、裸段落、裸列表；它们会被渲染成额外的"步骤"。
- 步骤之间空行分隔，便于阅读和 MDX 解析；`<div>` 与内容之间可换行。
- 需要先说明当前所在页面时，第一步放 `<Nav name="console" />`（外层仍需 `<div>`）：

  ```mdx
  <Steps>

  <div>
    <Nav name="console" />
  </div>

  <div>
  Open **Console > Assets**.
  </div>

  </Steps>
  ```

- 嵌套步骤用 `<Steps stepLevel="2">`，放在父步骤的 `<div>` 内部；`stepLevel` 是字符串，不是数字。
- 步骤内可以放代码块、`<Alert>`、`<Tabs>`、图片，但不要放整段多主题内容；一个步骤只做一件事。
- 每页的 `Steps` 从 1 开始编号；不要手写 "1." 数字，组件会自动生成。

### 5.3 步骤写作规则

1. **动词开头**：`Click`、`Select`、`Type`、`Open`、`Run`。
2. **一步一个动作**：不要把"点击 Create 并填写表单然后提交"写成一步。
3. **说明在哪里**：首次操作要给出菜单路径或页面位置。
4. **给出可观察结果**：操作后读者应看到什么（页面打开、提示出现、状态变为 Active）。
5. **不写"继续"、"然后"作为步骤主体**；用动作本身推进。
6. **分支写清楚**：`If you use the offline package, ...`；不要用"或者"把两条路径混在一个步骤里（改用 Tabs）。
7. **失败处理**：预期会失败的检查步骤，说明失败含义和下一步入口。
8. **数值示例**：给出符合实际的示例值，并说明可替换。
9. **不重复表格内容**：字段含义放字段参考表，步骤里只写操作动作。
10. **步骤数量**：超过 10 步时评估拆分页面或合并次要步骤。

### 5.4 前置条件与权限

- 任务页必须有 `## Before you begin`，列出：软件/环境前提、权限前提、版本/许可前提、数据准备。
- 权限写到角色或能力级别：`Sign in with an account that can manage assets.`，不要写"有权限即可"。
- 版本相关的前置条件要明确：`Requires JumpServer Enterprise Edition.`
- 如果前置条件不满足会导致数据风险，放在页面开头，不要藏在步骤中间。

### 5.5 命令与代码块

- fenced code block 必须标注语言：`sh`、`bash`、`powershell`、`json`、`yaml`、`http`、`sql`、`ini`、`text`。
- 命令块不写提示符 `$` 或 `#`，读者可直接复制。
- 命令与输出分开：输出用独立代码块，并标明 `text`。
- 占位符使用 `<...>` 或 `YOUR_...`，并在命令附近说明替换方法。
- 会修改数据、不可逆或影响生产的命令，前面必须加 `<Alert type="warning">`。
- 长输出截断并注明 `... (output truncated)`；不要贴几百行日志。
- 安装/升级命令随版本变化时，使用 `VersionedCommand` 组件而不是手写版本号（见 6.10）。
- 代码中的密码、Token、AK/SK 一律用占位符；禁止真实凭据入文档。

### 5.6 验证与排错

- 关键操作后给出验证步骤：重新打开列表、查看状态列、运行检查命令、查看审计记录。
- 验证步骤要写预期结果：`The asset status changes to **Active**.`
- 失败时给出入口：链接到 `Troubleshooting` 或对应参数参考页，不要让读者停在半路。
- 不写"如果失败请重试"作为唯一处理方式；至少说明常见原因。

### 5.7 常见步骤错误

- 步骤描述与界面不一致（旧版本截图/旧文案）。
- 缺少进入页面的路径，读者不知道从哪里开始。
- 一个步骤塞入多个动作，无法定位失败点。
- 只写"配置参数"而不给字段表或示例值。
- 用 "Next"、"Continue" 作为动作，读者不知道具体点什么。
- 在 Steps 中直接写段落（未包 `<div>`），步骤编号错位。
- 步骤后没有验证，读者无法确认是否成功。

## 6. 组件与 Markdown 规范

### 6.1 组件总表

| 组件                       | 引入方式                                                                              | 用途                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `Alert`                    | 全局注册，无需 import                                                                 | 提示、警告、限制、企业版标注                                              |
| `Steps`                    | 全局注册                                                                              | 编号操作步骤                                                              |
| `Nav`                      | 全局注册                                                                              | 插入"切换到某工作区"的说明与图示                                          |
| `Icon`                     | 全局注册                                                                              | 行内界面图标                                                              |
| `ApplyTrialLicense`        | 全局注册                                                                              | 企业版试用引导                                                            |
| `DataTable`                | 全局注册                                                                              | 带链接的简单数据表                                                        |
| `VersionBadge`             | 全局注册                                                                              | 标注功能引入或变更的版本                                                  |
| `Tabs` / `Tab`             | `import { Tab, Tabs } from '@rspress/core/theme'`                                     | 互斥路径切换                                                              |
| `VersionedCommand`         | `import VersionedCommand from '@/components/docs/versioned-command'`                  | 自动填充当前版本文本的命令块                                              |
| `EnterpriseEditionCta`     | `import EnterpriseEditionCta from '@/components/docs/enterprise-edition-cta'`         | 企业版通用引导横幅                                                        |
| `EnterpriseFeatureCta`     | `import EnterpriseFeatureCta from '@/components/docs/enterprise-feature-cta'`         | 企业版单功能引导                                                          |
| `CompareVersionsDataTable` | `import CompareVersionsDataTable from '@/components/docs/compare-versions-datatable'` | 版本对比表；用于 v5 `reference/compare-editions` 与 v4 `compare-versions` |
| `ChangelogTable`           | `import ChangelogTable from '@/components/docs/changelog-table'`                      | 变更日志版本表；仅 v5 `reference/changelog`                               |

全局组件在 [rspress.config.ts](rspress.config.ts) 的 `markdown.globalComponents` 中注册；新增全局组件时必须同时更新该配置和本章表格。

### 6.2 `Alert`

`Alert` 的 `type` 取值为：`tip`（默认）、`note`、`warning`、`important`、`error`、`xpack`。

| type        | 语义             | 使用场景                             |
| ----------- | ---------------- | ------------------------------------ |
| `tip`       | 技巧/建议        | 更高效的做法、可选优化               |
| `note`      | 补充说明         | 不影响主流程但需要知道的信息         |
| `warning`   | 风险/不可逆操作  | 删除、改密、推送、终止会话、覆盖配置 |
| `important` | 必须注意         | 当前组织/版本/权限等强约束           |
| `error`     | 错误/限制/不支持 | 已知限制、报错含义、无法恢复的场景   |
| `xpack`     | 企业版           | 仅 Enterprise Edition 提供的能力     |

规则：

- 不写 `type="info"`、`type="danger"` 等不存在的值；默认值 `tip` 也建议显式写上。
- 不在 Alert 内写标题（组件已渲染标题）；开头直接写内容，1–3 句。
- 不使用 `**Note:**`、`Note:` 纯文本代替 Alert。
- 不嵌套 Alert；需要多层提示时拆成两段。
- Alert 内可以放链接、行内代码、列表；不要放整段 Steps 或大表格。
- Alert 不用于营销、不用于重复正文已说过的内容。
- `xpack` 内容必须明确"需要企业版"，推荐句式：`**<Feature>** requires JumpServer Enterprise Edition.`

### 6.3 `Steps`

见第 5 章。补充：

- `stepLevel` 可选值为 `"1"`（默认）与 `"2"`；嵌套时传给内层 `<Steps>`。
- 不要手写步骤数字，不要用 `<Steps>` 包裹列表。
- 一个页面内多个 `<Steps>` 各自从 1 编号，符合阅读直觉；同一任务被拆成多段时，用 `##` 小节区分。

### 6.4 `Nav`

`Nav` 渲染一段"切换到某工作区"的说明和示意图，适合作为 GUI 任务的第一个步骤：

```mdx
<Steps>

<div>
  <Nav name="console" />
</div>

<div>
Open **Console > Assets**.
</div>

</Steps>
```

可用的 `name`：`console`、`pam`、`audits`、`web-terminal`、`system-settings`、`change-org`。

- 只在确实需要先切换工作区/组织时使用，不要每页机械地放。
- 外层仍需 `<div>` 包裹，保证步骤编号正确。

### 6.5 `Icon`

用于行内界面图标，例如 `<Icon name="plus" />`、`<Icon name="xpack" />`。

- 可用名称来自 [src/components/docs/icons.tsx](src/components/docs/icons.tsx) 的 `iconConfig`，以及 `src/icons/lina` 的导出；**不要猜名称**，猜错会静默渲染为空。
- 图标放在对应标签前，例如 `Click **<Icon name="plus" /> Create**.`；同一页面保持写法一致。
- 图标不单独承担语义；必须有文字说明。
- 企业版图标使用 `xpack`、`xpack-md`、`xpack-lg`，不要用其他图标代替。
- 新增图标时，先在组件中注册，再在文档中使用；不要直接引用不存在的 SVG 路径。

### 6.6 `Tabs` / `Tab`

```mdx
import { Tab, Tabs } from "@rspress/core/theme";

<Tabs>
  <Tab label="Online">...</Tab>
  <Tab label="Offline">...</Tab>
</Tabs>
```

- 只用于**互斥的等价路径**（上传 vs wget、在线安装 vs 离线安装），不要用于并列内容。
- 每个 Tab 的 `label` 用 1–3 个词，sentence case。
- Tab 前给一句引导：`Choose the tab that matches your environment.`
- 不要在 Tab 内再嵌套 Tabs；Tab 内可以放 `Steps stepLevel="2"`、代码块、Alert。
- 必须显式 import，`Tabs` 不是全局组件。

### 6.7 企业版标注与 CTA

| 场景                   | 用法                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| 单个企业版功能         | 首屏 `<Alert type="xpack">` + 页内一次 `<EnterpriseFeatureCta />` |
| 整页仅企业版提供       | 首屏 xpack Alert；页面顶部 `EnterpriseEditionCta`                 |
| 版本对比/试用引导      | `<ApplyTrialLicense />`（`showBorder` 默认 `true`）               |
| 安装页（CE/EE 双路径） | `<EnterpriseEditionCta />` 放在安装方式表格之后                   |

`EnterpriseFeatureCta` 用法：

```mdx
import EnterpriseFeatureCta from "@/components/docs/enterprise-feature-cta";

<EnterpriseFeatureCta
  feature="Enterprise license management"
  description="Activate JumpServer Enterprise Edition to unlock advanced PAM capabilities and commercial support."
/>
```

规则：

- `feature` 必填，描述具体功能；`description` 可选，一句话说明价值，不写营销长文。
- 一个页面只放一个引导组件，不要 xpack Alert + FeatureCta + EditionCta 叠放。
- 企业版能力必须在正文中说明"没有 License 时会发生什么"，不能只放 CTA。
- 社区版功能不得误标 xpack；企业版功能不得描述为社区版可用。

### 6.8 `DataTable`

```mdx
<DataTable
  headers={["Name", "Description"]}
  rows={[
    [
      { content: "Console", link: "/features/console/" },
      { content: "Administration workspace" },
    ],
    [
      { content: "Workbench", link: "/features/workbench/" },
      { content: "Daily access workspace" },
    ],
  ]}
/>
```

- `headers` 为字符串数组；`rows` 为二维数组，单元格为 `{ content, link?, linkIcon? }`。
- 只在需要"表格内链接"时使用；普通字段说明用 Markdown 表格。
- 单元格内不支持 MDX/组件；需要富文本时改用 Markdown 表格。

### 6.9 表格

- 使用 GFM Markdown 表格，必须有表头；表头使用 sentence case。
- 列数在整张表内一致；不要用空列凑格式。
- 首列放实体名（字段、参数、操作、角色），后续列放说明。
- 字段参考表推荐三列：`Group | Field | Description`；当表头首列恰好是 `Group`（或 `分组`）时，重复的分组名会自动合并并生成 rowspan，因此同一组的首列值必须**完全一致**。
- `Description` 栏以 `Required.` / `Optional.` 开头；值类型、默认值、取值范围写清楚。
- 单元格保持短句；超过两行的说明改为段落 + 表格组合。
- 不使用 HTML `<table>` 手写表格；不使用图片代替表格。
- 表格前给一句用途说明，表格后给必要的注意事项。

### 6.10 代码块

- 必须标注语言；纯输出用 `text`。
- 需要标题时使用 fence 信息串：` ```sh title="jmsctl.sh" `。
- 命令、配置、JSON 保持可复制；不要在代码块中加注释性中文（英文注释可以，且仅在必要处）。
- 密码、Token、AK/SK 使用占位符；禁止真实凭据。
- 长命令可以换行，但要保证复制后可直接执行；不要把一条命令拆成多个代码块。
- 版本相关命令使用 `VersionedCommand`：

  ```mdx
  <VersionedCommand template="curl -sSL https://github.com/jumpserver/jumpserver/releases/latest/download/quick_start.sh | bash" />
  ```

  `template` 中的 `{version}` 会替换为当前版本最新补丁号；仅支持 shell 命令，其他语言请用普通代码块。

### 6.11 MDX 与 HTML 使用边界

允许：

- `<iframe>` 嵌入官方视频，必须带 `className="aspect-video w-full"`、`src`、`allow`、`allowFullScreen`。
- `<img>` 仅用于需要固定宽度的小尺寸界面片段（历史 V4 页面常见），并必须写有意义的 `alt` 与 `width`。
- 少量 `<div>` 用于布局（例如功能总览的卡片网格），`className` 使用站点已有 Tailwind token，不自造样式。
- MDX 注释：`{/* ... */}`，用于不渲染的作者备注；截图待办不再使用注释。

禁止：

- `<script>`、`<style>`、内联事件（`onClick` 等）。
- 原始 HTML 表格、手写复杂布局。
- 在 MDX 注释中放大段被"隐藏"的内容；注释只用于待办说明。
- 直接写 `/docs/...` 资源或链接前缀（见第 9 章）。

### 6.12 图片语法与 alt

- 正文图片统一用 Markdown 图片语法：`![Figure 1: ...](/images/jumpserver/xxx.png)`。
- 图片路径以 `/images/...` 开头，**禁止**写 `/docs/images/...`；构建时的 `remark-base-images` 会自动补 `/docs` base。
- alt 文本规则见 7.5；alt 不是文件名的复述，必须描述图中可见的关键信息。
- 图片默认支持 medium zoom；需要禁止放大时加 `no-zoom` class（通过 `<img className="no-zoom">`，仅特殊情况使用）。
- 不使用外链图床（GitHub 徽章等特殊场景除外）；图片必须随仓库提交。

### 6.13 新增组件流程

新增全局或文档专用组件时：

1. 在 `src/components/` 下实现，提供 TypeScript props 类型。
2. 全局组件在 [rspress.config.ts](rspress.config.ts) 的 `globalComponents` 注册；非全局组件通过 `@/components/...` 显式引入。
3. 更新本章 6.1 表格与相关用法说明。
4. 在至少一个真实页面中验证渲染，并跑 `pnpm build`。
5. 组件文案使用英文，与站点语言一致。

## 7. 截图规范

截图是文档的第二正文。它承担三类信息：**界面长什么样**、**操作在哪里发生**、**成功了是什么状态**。不承担信息量的截图一律不加。

> 截图相关的历史台账在 [SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md)；替换进度与人工待办以该文件为准。

### 7.1 采集环境

| 要求       | 说明                                                              |
| ---------- | ----------------------------------------------------------------- |
| 界面语言   | 英文界面（V5 英文演示环境）；英文文档中不得出现中文菜单、中文按钮 |
| 数据语言   | 演示数据使用英文或中性名称；避免中文人名、客户名、真实业务数据    |
| License    | 涉及企业版页面时，License、AI Assistant、报表等能力处于可用状态   |
| 水印       | 关闭水印；关闭任何第三方录屏/标注浮层                             |
| 浏览器     | 缩放 100%；隐藏书签栏与扩展图标；使用标准窗口尺寸                 |
| 主题       | 统一使用浅色主题；同一页面的截图不得深浅混用                      |
| 组织与账号 | 使用专门的演示账号与演示组织，不出现个人账号信息                  |

### 7.2 采集规格

| 类型      | 规格                                                                 |
| --------- | -------------------------------------------------------------------- |
| 桌面 Web  | 视口 **1600×1000**（16:10）PNG；整页较长时允许 1920×1080，但同页一致 |
| 局部/抽屉 | 保留遮罩与必要上下文，不做无意义裁剪；同页局部图宽度保持一致         |
| 客户端    | 保留客户端原生窗口尺寸，最多 1600 宽；不截桌面背景                   |
| 格式      | PNG；不要用 JPEG 截 UI 文字（压缩伪影）；不要用 WebP 作为交付格式    |
| 文件大小  | 单图建议 ≤ 500 KB；超过时压缩或裁剪，不降低可读性                    |
| 清晰度    | 文字可辨认；整数缩放；不使用模糊、马赛克遮罩来掩盖敏感信息           |

历史截图尺寸不统一（存在 1636×1236、1240×669、1920×1040 等宽度），属于历史债务。**新截图按上表执行**，替换旧图时顺带统一到同页规格。

### 7.3 构图与裁剪

- 截 **页面视口**：不含浏览器地址栏、书签栏、操作系统任务栏、桌面背景。
- 保留理解操作所需的上下文：面包屑、页签、选中行、抽屉标题、按钮位置；不要只截一个孤立输入框。
- 列表页保留关键列与表头；表格过宽时可截取关键列，但要在正文说明省略了哪些列。
- 弹窗/抽屉保留遮罩背景，让读者知道当前层级；不要截全屏后再裁剪到只剩弹窗。
- 同一页面的多张截图使用一致的缩放与视口，避免"这张大、那张小"。
- 不使用拼接图伪造完整界面；确需对比时，用两张独立截图并在正文说明。

### 7.4 命名与存放

- 新截图放在 `docs/public/images/jumpserver/`。
- 文件名格式：`v5_<模块>_<页面>_<序号>.png`，全小写、下划线分隔、无空格、无中文、无大写（历史文件除外）。

  ```text
  v5_admin_assets_01.png
  v5_user_wb_luna_04.png
  v5_jdmc_dashboard_01.png
  ```

- 序号从 `01` 开始，同一页面递增；替换同名图片时保持原文件名，避免改引用。
- 历史目录 `docs/public/images/docs/**` 只读保留，不再新增；V5 新截图不要放进该目录。
- 已废弃的图片确认无引用后删除；不要长期保留"可能有用"的孤立图片。
- 图片必须随仓库提交，禁止外链图床（GitHub 徽章等特殊场景除外）。

### 7.5 引用位置与 alt 文本

正文统一用 Markdown 图片语法：

```mdx
![Figure 1: Assets list with node tree, type tabs, and connection status.](/images/jumpserver/v5_admin_assets_01.png)
```

alt 规则：

1. 以 `Figure N: ` 开头，`N` 为**每页从 1 开始**、按阅读顺序递增的序号。
2. 描述图中**可见的关键信息**：页面/抽屉名称、关键区域、列、状态；不写"截图""image""示意图"。
3. 使用完整句子，句末加句号；英文 sentence case。
4. 不写文件名、不写"点击这里"、不写与正文无关的修饰。
5. 同一张图被多个页面复用时，alt 可按当前上下文调整，但必须准确。
6. 小尺寸行内界面片段（历史 V4 页面）alt 可简短，但同样必须描述内容，不得为 `image` 或文件名。

图片位置：

- 图片放在它所说明的段落后、步骤前；先文字后图，读者知道要看什么。
- 每页 1–3 张主截图为宜；字段级说明用表格，不要逐字段截图。
- 删除图片时同步删除引用；删除/新增图后重新编号 `Figure N`，保持连续。

### 7.6 敏感信息与脱敏

截图中不得出现：

- 真实密码、Token、Access Key、Secret Key、私钥、License Key；
- 真实内网 IP、内网域名、真实主机名、数据库连接串（改用 `172.16.x.x`、`example.com` 等演示值）；
- 姓名、邮箱、手机号、工号、头像等个人信息；
- 客户名称、客户 Logo、真实业务数据、真实审计记录；
- 浏览器个人书签、登录态、Cookie、通知弹窗。

处理方式：

- 优先**用演示数据重造界面**，而不是事后遮挡。
- 必须遮挡时使用不可还原的像素化/纯色块，颜色与界面协调；不要用半透明模糊（可能被还原）。
- 遮挡后不得影响对操作位置和字段名的理解。

### 7.7 标注

- 默认不加箭头和红框：界面本身已能说明操作位置时不标注。
- 需要标注时统一使用品牌绿 `#2B937C`，线宽 2–3 px，箭头/序号风格全站一致。
- 标注不得遮挡字段名、按钮文字、关键数据；序号顺序与正文步骤一致。
- 不手工修改 UI 内容、不 P 出界面中不存在的元素；标注只是叠加层。
- 标注信息必须同时出现在正文或 alt 中，不能只存在于图上。

### 7.8 版本与内容一致性

- 截图必须与当前文档描述的版本、界面、菜单路径一致；V5 文档使用 V5 英文界面截图。
- 不使用 V4 截图冒充 V5；确需展示旧版本时，在正文明确标注版本。
- 界面改版或字段改名后，截图必须同步更新；不能只改文字不改图。
- 截图中出现的字段、菜单、按钮名称必须与正文用词一致。
- 截图中的示例数据要与正文示例一致（例如正文写 `Demo Linux`，图中也应是同一数据）。

### 7.9 禁止使用的截图

- **禁止伪造**：不得用 AI 生成图、设计稿、手绘/拼接图冒充产品界面截图。
- 禁止使用带水印、带录屏工具浮层、带个人信息的截图。
- 禁止在英文文档中使用中文界面截图（正在整改的历史图除外，见 11.5）。
- 禁止使用过期版本、过期组织、过期 License 状态的截图。
- 禁止使用空表、未加载完成、报错状态（除非文档就是要说明该状态）的截图。
- 禁止用表情包、装饰图、与内容无关的插图填充版面。

### 7.10 无法截图时的约定

没有条件采集截图（Agent 默认情况、无法访问演示环境）时，**不要留空、不要用占位图、不要删除已有图**，而是在对应位置写一个**页面可见、且可被站内搜索索引**的截图待办：

```mdx
> **Screenshot TODO:** Capture the asset list with the Hosts tab selected and the Create button visible.
>
> Save as `docs/public/images/jumpserver/v5_admin_assets_02.png` and replace this block with the figure reference.
```

规则：

- 使用 Markdown 引用块（blockquote）渲染到页面，让编写者浏览文档时就能看到，并能通过站内搜索框检索；不要使用隐藏的 MDX 注释，也不要只用 `Alert` 组件（组件内容不会进入搜索索引）。
- 固定以 `**Screenshot TODO:**` 开头，搜索框输入 `Screenshot TODO` 即可找到全部待补截图。
- 必须写清**拍什么**、**页面/状态**、**图中要出现的关键元素**，并给出建议文件名和完整保存路径；不要只写 `Screenshot TODO`。
- 放在它所服务的段落后，单独一块。
- 交付说明中列出全部待人工截图项（页面 + 内容 + 建议文件名），交接给人工。
- 已有正确截图时不要新增 TODO；截图采集完成后删除整个引用块，改为 `Figure N` 图片引用。

### 7.11 截图替换流程

1. 在英文演示环境按本章规格重新采集。
2. **优先覆盖原文件名**；确需改名时，全局搜索并同步所有引用（`pnpm build` 会报死图）。
3. 原始中文/旧版截图备份到仓库外的工作目录，不提交。
4. 执行 `pnpm build`，确认无死图、无构建失败。
5. 用 `pnpm preview` 打开对应页面，确认图片显示、顺序、alt 正确。
6. 更新 [SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md) 的替换数量与待办清单。
7. 删除无人引用的旧图；文档改动与截图改动尽量分开提交。

### 7.12 截图评审清单

- [ ] 英文界面、英文/中性演示数据、无水印
- [ ] 尺寸与同页其它截图一致，文字清晰
- [ ] 保留了必要的上下文（页签、面包屑、抽屉标题）
- [ ] 无密码、Token、AK/SK、内网地址、个人信息、客户信息
- [ ] 文件名符合 `v5_<模块>_<页面>_<序号>.png`，位置在 `docs/public/images/jumpserver/`
- [ ] 引用使用 `/images/...`，无 `/docs` 前缀
- [ ] alt 以 `Figure N:` 开头，描述准确，编号连续
- [ ] 截图内容与正文步骤、字段名、版本一致
- [ ] 无法截图的项已写可见、可搜索的 `Screenshot TODO` 引用块并列入交付清单

### 7.13 AI Agent 的截图边界

- Agent **默认不生成、不伪造、不"补"任何截图**；没有真实采集能力时一律写 TODO 并交接人工。
- 即使具备浏览器自动化能力，也必须：使用英文演示环境、遵守 7.1–7.8、不得写入生产环境、不得执行删除/改密/推送等写操作。
- Agent 不得删除或重命名现有截图；此类操作需人工确认。
- Agent 在交付说明中必须单列"待人工截图清单"。

## 8. 图示与表格规范

### 8.1 表达方式的选择顺序

1. 能用一句话说清 → 正文。
2. 字段、参数、对比、清单 → 表格。
3. 界面位置与状态 → 截图（第 7 章）。
4. 架构、流程、层级关系 → 图示（SVG/组件）。
5. 操作演示 → 官方视频（`<iframe>`）。

不要用截图替代表格，也不要用表格承载操作步骤。

### 8.2 架构图与流程图

- 当前站点**未启用 Mermaid**：不要写 ` ```mermaid ` 代码块，不会渲染。
- 架构图优先做成静态 SVG 资源（放 `docs/public/` 或 `docs/public/svgs/`），或在 `src/components/` 中实现可维护的组件，并遵循站点设计 token。
- 图示必须与正文一致：组件名、数量、方向、协议、端口不能与文字矛盾。
- 图示要有可读的替代说明：在正文用一段话描述图中关系，或提供有意义的 alt。
- 不贴未经授权的第三方架构图；引用外部图时注明来源。

### 8.3 视频嵌入

官方视频使用 `<iframe>`，写法固定：

```mdx
<iframe
  className="aspect-video w-full"
  src="https://www.youtube.com/embed/VIDEO_ID"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

- 视频上方给一句说明（视频内容、时长、对应流程），不要只放播放器。
- 不自动播放；不使用第三方不稳定视频源。
- 视频只是补充，正文必须能独立完成操作。

### 8.4 表格规范

- 参考表：字段名 + 说明 + 必填/可选 + 默认值/取值。
- 对比表：维度 + 各方案；只对比有差异的维度，不堆"支持/不支持"的全部清单。
- 数据表：限定列、限定行数；示例数据必须非真实数据。
- 表头带单位：`Size (MB)`、`Timeout (s)`。
- 空值统一写 `-` 或 `Not applicable`，同一表内一致。
- 长表按业务分组，首列表头用 `Group` 触发自动 rowspan 合并（见 6.9）。
- 表格不嵌套表格；单元格不写多段内容。

### 8.5 视觉一致性

- 同一页面的图、表、代码块风格一致；图宽与正文阅读宽度协调。
- 图注（alt）编号连续；表格编号默认不使用。
- 不使用彩色标题、分隔线、装饰字符制造层次；层次用标题层级表达。

## 9. 链接与引用规范

### 9.1 内部链接

站内链接使用**版本内绝对路径**，不带 `/docs` 前缀，也不带版本前缀：

```mdx
[Assets](/features/console/assets/)
[Authorizations](/features/console/policies/authorizations#field-reference)
[Console overview](/features/console/)
```

- V5 页面：`/features/...`、`/operations/...`、`/roles/...`、`/developer-guide/...`、`/reference/...`、`/reference/...`、`/roles/...`、`/developer-guide/...`。
- V4 页面同样写版本内路径（例如 `/notifications/email`），由多版本路由处理；不要手写 `/v4/...`。
- 指向目录时用尾斜杠：`/features/console/`。
- 锚点直接拼在路径后：`/features/console/assets/#field-reference`。
- 版本内链接**不要**手写本版本前缀：V4 页面写 `/v4/...` 会被再次加上 `/v4`，变成 `/docs/v4/v4/...`。
- 跨版本链接谨慎使用：V5 → V4 可写 `/v4/...`（构建会校验）；V4 → V5 不要手写，交给顶部版本选择器，或在正文说明切换到 V5 查看。
- 禁止 `/docs/...` 前缀；禁止指向 `build/`、`node_modules/`、源文件路径。
- 链接文字用目标主题，不写 "click here"、"here"、"this page"（见 4.9）。

### 9.2 锚点

- 锚点由标题自动生成，英文标题生成英文锚点（小写、空格转 `-`、去标点）。
- 标题即 API：修改标题可能导致其他页面的锚点失效。改标题前全局搜索该锚点，同步所有引用。
- 指向字段参考时使用稳定的语义标题（如 `## Field reference`），不要依赖临时小标题。
- 不手写 `<a id="...">` 锚点，除非有跨系统引用需求并在 PR 中说明。

### 9.3 外部链接

- 优先官方来源：JumpServer 官网、GitHub 仓库/Release、协议与产品官方文档。
- 不链接来源不明、广告、破解、非官方教程站点。
- 链接文字使用页面标题或组织名，例如 `[JumpServer GitHub repository](https://github.com/jumpserver/jumpserver)`。
- 不写裸 URL 作为正文；必要的短地址可直接展示，但优先用链接文字。
- 外部链接可能在构建时不可达，但不要因此链接到镜像或缓存；链接失效时及时替换。
- 引用第三方内容时注明来源与访问/版本信息，不整段复制。

### 9.4 版本相关引用

- 安装、升级命令随补丁版本变化时，使用 `VersionedCommand`（见 6.10），不手写具体版本号。
- 正文提到版本能力时写明版本范围：`JumpServer v5.0 and later`。
- 版本历史表（`ChangelogTable`）来自 `src/data/releases.json`，由脚本自动更新；详细 Release notes（`ReleaseNotes`）来自 `src/data/release-notes.json`，需要单独维护。两者都不要手工编辑生成结果。
- V5/V4 差异只在必要处说明，不写"V4 请回退查看"之类无效引导。

### 9.5 死链与死图

`pnpm build` 启用了 `checkDeadLinks`、`checkAnchors`、`checkDeadImages`。常见失败原因：

- 目标页面不存在或路径拼错；
- 页面未创建就写了链接（先建页再建链，或先不写链接）；
- 锚点标题被改过；
- 图片路径错误或文件名拼错；
- 写了 `/docs/...` 前缀，导致解析成不存在的路径。

处理原则：构建报错必须修复，不得通过删除链接、注释掉内容或跳过校验来"通过构建"。

### 9.6 生成文件与引用

- `build/`、`llms.txt`、`llms-full.txt`、每页 `.md`、`sitemap.xml` 都是构建生成物，不提交、不手工编辑、不作为链接目标。
- 截图与静态资源随仓库提交；不引用本地绝对路径（如 `C:\...`）。
- docs 页面不要链接仓库源文件（`rspress.config.ts`、`src/**` 等）；确需引用源码时使用 GitHub 链接。仓库级文档之间互相引用时，使用相对当前文件的相对路径（如 `[AGENTS.md](AGENTS.md)`）。

## 10. 版本、国际化与发布

### 10.1 版本维护原则

- V5 是默认版本、唯一权威版本；新功能、新页面只写 V5。
- V4 冻结维护：只做明确要求的修正（安装/升级命令、错误、失效链接），不做结构重排和内容重写。
- 同一功能双版本并存时：V5 页面写完整内容，V4 页面只保留旧界面所需的最小内容，并避免复制 V5 全文。
- 改动共享文件（组件、样式、配置）前，确认对两个版本的影响；不能只验证 V5。
- 版本选择器由 [rspress.config.ts](rspress.config.ts) 的 `multiVersion` 控制，不为单个页面修改版本配置。

### 10.2 版本相关文案

- 版本号统一 `v5.10.1` 写法；文档版本写 V5/V4。
- 安装、升级命令随补丁版本变化时使用 `VersionedCommand`，模板中写 `{version}` 占位，不写死补丁号。
- 正文说明能力范围时给出明确版本：`Available in JumpServer v5.0 and later.`
- 版本差异写在对应功能页；不新建"V4 vs V5 全量差异"页，除非信息架构明确要求。
- 版本历史来自 `src/data/releases.json`（脚本自动更新）；详细 Release notes 来自 `src/data/release-notes.json`（单独维护）。不要手工编辑生成结果。

### 10.3 国际化与本地化

- 站点当前为英文单语（`lang: "en"`）；正文必须英文。仓库级流程文档可用中文。
- `i18n.json` 只存放界面/组件文案覆盖（如概览页搜索提示），不存放页面正文。
- 新增可翻译文案时，key 语义化并同时给 `en`（必要时 `zh`）值，不硬编码中文到页面。
- 产品名、功能名、界面术语不翻译；不要"中文页面里夹英文句子，英文页面里夹中文注释"。
- 未来若增加中文站点，需要同时更新版本配置、语言切换、搜索与 `llms.txt`；单页面的语言改动不接受。

### 10.4 构建与预览

```bash
pnpm dev                    # 本地开发，http://localhost:3000/docs/
pnpm build                  # 生产构建，输出 build/
pnpm preview --port 4173    # 预览构建产物，http://127.0.0.1:4173/docs/
```

- `pnpm build` 是提交前的硬门槛：MDX 编译、路由、死链、死图、锚点都会在这里暴露。
- `pnpm preview` 用于验证构建产物；本地预览读取的是 `build/`，不是 `docs/public` 原文件。
- `rspress preview` 不处理 clean URL，必须用 `scripts/preview.mjs`（`pnpm preview`）。
- 构建输出包含 `llms.txt`、`llms-full.txt`、`sitemap.xml` 与每页 `.md`，不要手工编辑。
- 提交前至少预览本次改动涉及的页面，检查图片、表格、版本切换、移动端宽度。

### 10.5 发布流程

- 分支、发布、Cloudflare 部署细节以 [MAINTENANCE.md](MAINTENANCE.md) 为准。
- 不直接提交到 `dev`；从 `origin/dev` 建功能分支。
- 文档改动与截图改动尽量分开提交，便于评审与回滚。
- 正式发布前确认：构建通过、预览正常、链接与图片无死链、V4/V5 未被串改、`llms.txt` 正常生成。

### 10.6 生成物与缓存

- `build/` 是生成物，不提交；不要为让预览生效手工改 `build/` 里的文件。
- 浏览器仍显示旧图/旧页面时：确认 `build/` 已重新生成 → 强制刷新 → 再排查缓存或 CDN。
- 不提交 `node_modules/`、日志、截图备份、本地环境配置。

### 10.7 版本引入与变更标注

功能页只回答“这个功能是什么、怎么用”。能力的引入或变更版本由 **`VersionBadge` 统一标注**，正文不再重复写版本描述。

**版本徽标**（全局组件，无需 import）：

```mdx
## [Section title]

<VersionBadge version="5.1.0" kind="new" />
```

- `version` 写引入或变更的版本。`5.1.0` 与 `v5.1.0` 等价，组件统一渲染为 `v5.1.0`；同一页面保持同一种写法。
- `kind` 取值：`new`（默认）、`changed`、`deprecated`、`removed`，分别渲染为 `New in v5.1.0`、`Changed in v5.1.0`、`Deprecated in v5.1.0`、`Removed in v5.1.0`。
- 位置：放在介绍该能力的小节标题下第一行；一个小节只放一枚，覆盖整节，不逐条重复。
- 徽标不是企业版标注：企业版能力仍用 `<Alert type="xpack">`，徽标只回答"哪个版本"。
- 不放在 H1 之后的首屏位置，首屏仍按 3.5 写"是什么、在哪里、给谁用"。

**正文措辞**：

- 有徽标的小节，正文只描述功能本身；不再重复 `Available since JumpServer vX.Y.Z`、`From vX.Y.Z, ...`、`In vX.Y.Z, ...`、`The same release...` 等版本化开场。
- 功能页不再增加 `## Version history` 表；版本历史集中在 [What's New](/reference/whats-new)、[Changelog](/reference/changelog) 与升级页，避免同一版本信息在多个页面重复漂移。
- 例外：升级页、兼容性说明和迁移步骤本身就以版本为主题，可以保留必要的版本号与前后行为对比，但仍应聚焦“升级时做什么”。

**事实来源**：版本归属以 GitHub Release Notes、`src/data/releases.json`（版本历史）与 `src/data/release-notes.json`（详细说明）为准，不得凭印象写"某版本新增"。发布说明页（[changelog.mdx](docs/v5/reference/changelog.mdx)）同时渲染这两份数据：新增版本时，版本历史更新 `releases.json`（脚本自动），详细说明更新 `release-notes.json`（人工维护），不在页面里手抄。

**集中入口**：[whats-new.mdx](docs/v5/reference/whats-new.mdx) 按版本列出新增能力并链接到功能页；功能页的徽标与它互相印证，不复制成两张互相漂移的清单。

## 11. 质量校验与常见错误

### 11.1 三层检查

| 层级     | 检查者    | 内容                                               |
| -------- | --------- | -------------------------------------------------- |
| 自动     | 脚本/构建 | frontmatter、链接、图片、alt、TODO、格式、MDX 编译 |
| 人工自检 | 编写者    | 内容准确性、步骤可执行、术语与结构一致             |
| 评审     | reviewer  | 事实、完整性、可读性、截图、版本、规范符合度       |

### 11.2 自动检查

```bash
pnpm check:docs        # 文档规范检查；默认报告，--strict 时 error 退出非 0
pnpm build             # 死链/死图/锚点/MDX 编译
pnpm exec prettier --check <files>   # 格式检查；修复用 prettier --write
```

- `pnpm check:docs` 的规则与分级见 [scripts/check-docs.mjs](scripts/check-docs.mjs) 与 [AGENTS.md](AGENTS.md)。
- 构建失败必须修复根因，禁止注释掉链接、删除内容或跳过校验来"通过"。
- 不要对全仓库执行格式化；只格式化本次改动的文件，避免无关 diff。

### 11.3 人工自检清单

完整清单见附录 C。提交前至少确认：

- 内容与当前英文界面一致，菜单路径、字段名、按钮名可核对；
- 前置条件、权限、版本要求齐全；
- 每步一个动作，有可观察结果，有验证方式；
- frontmatter 的 `title`、`description` 准确且非模板句；
- 新页面已登记 `_meta.json`，没有孤立页面；
- 图片为英文界面、已脱敏、alt 合规、编号连续；
- 站内链接可用、无 `/docs` 前缀、锚点有效；
- 术语与同模块其他页面一致；
- 无中文字符进入英文正文。

### 11.4 常见错误对照表

| 错误                                           | 后果                         | 修正                        |
| ---------------------------------------------- | ---------------------------- | --------------------------- |
| 缺少 `description` 或写模板句                  | 搜索/`llms.txt` 摘要无信息量 | 写一句具体的页面用途        |
| V5 新页未登记 `_meta.json`                     | 侧边栏找不到页面             | 登记 `_meta.json`           |
| 站内链接带 `/docs` 前缀                        | 构建死链或路径错误           | 改为版本内路径              |
| 图片引用 `/docs/images/...`                    | 构建死图                     | 改为 `/images/...`          |
| 图片文件不存在                                 | 构建失败                     | 补文件或改路径              |
| alt 为空或写文件名                             | 可访问性差、评审不过         | 写 `Figure N: ...` 描述     |
| `Steps` 内直接写段落                           | 步骤编号错位、渲染异常       | 每步包 `<div>`              |
| `Steps` 里一步写多个动作                       | 无法定位失败点               | 拆成多步                    |
| `Alert type` 用了不存在的值                    | 样式回退，语义不清           | 使用 6 种合法类型           |
| 纯文本 `Note:` 代替 Alert                      | 样式不统一                   | 改用 `<Alert type="note">`  |
| Alert 嵌套或塞入长内容                         | 阅读困难、样式异常           | 拆开，控制 1–3 句           |
| 多个 H1 / 标题跳级                             | 结构错误、锚点混乱           | 单 H1，逐级使用 H2/H3       |
| 标题加编号或句号                               | 与站点风格不一致             | 去掉编号与句末标点          |
| 界面元素未加粗、用引号代替粗体                 | 读者难以定位元素             | 按钮/菜单/字段用粗体        |
| 粗体强调普通句子                               | 视觉噪音                     | 粗体只用于界面元素          |
| 第一人称、营销词、填充词                       | 不专业、冗余                 | 按 4.11 替换                |
| 术语同义替换（asset/host、account/credential） | 概念混淆                     | 按 4.4 术语表统一           |
| "click here" 链接                              | 可访问性差、搜索不友好       | 用目标主题作链接文字        |
| 真实密码/Token/内网 IP 入文档                  | 安全事件                     | 占位符 + 演示数据           |
| 社区版页面写企业版能力                         | 误导用户                     | 加 xpack 标注或删去         |
| 企业版能力不说明前提                           | 用户按文档操作失败           | 首屏 xpack Alert + 前提说明 |
| 代码块不标语言                                 | 高亮错误、可读性差           | 标注 `sh`/`json` 等         |
| 危险命令无 warning                             | 生产事故风险                 | 加 `<Alert type="warning">` |
| 截图含中文界面或旧版本                         | 与英文文档不一致             | 重拍或标注版本              |
| 截图未脱敏                                     | 隐私/安全问题                | 按 7.6 重造或不可还原遮挡   |
| 用旧截图冒充新界面                             | 误导用户                     | 更新截图或标注版本          |
| 伪造/AI 生成截图                               | 严重违规                     | 删除，改写 TODO 并交接      |
| 一个页面复制多份相同内容                       | 维护成本高、内容漂移         | 保留权威页，其余链接        |
| 大段粘贴 UI 文案                               | 与界面更新不同步             | 表格 + 字段说明，必要时截图 |
| 修改标题后未同步锚点引用                       | 死链                         | 全局搜索锚点并修复          |
| 删除图片后未清理引用                           | 构建失败                     | 同步删除引用或改图          |

### 11.5 已知历史债务

以下问题**已存在**，不要求一次性修复；但"新增不得引入"，并且**改动到相关页面时顺手修复**：

| 债务                                                 | 现状                                                      | 处理原则                                   |
| ---------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------ |
| V4 页面模板化 `description`                          | 80+ 篇                                                    | 改到哪篇修哪篇                             |
| V4 页面普遍缺 `title`                                | 80+ 篇                                                    | 改到哪篇补哪篇                             |
| 部分 V5 章节索引页缺 `description`                   | 约 17 个                                                  | 新增/改动时补齐                            |
| 旧截图含中文界面、旧版本                             | 见 [SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md) | 按台账替换，不新增中文图                   |
| 图片命名与尺寸不统一（`V4_*`、`client_*`、多种宽度） | 历史资产                                                  | 新图按 7.4/7.2，替换时统一                 |
| alt 风格不统一（`Figure N:` 与短标签混用）           | 历史页面                                                  | 新增/改动页面统一用 `Figure N:`            |
| 部分页面使用 `<img width>` + `alt="image"`           | 历史 V4/V5 页面（如 `reference/license.mdx`）             | 改动时改为 Markdown 图片 + `Figure N:` alt |
| V5 部分功能页缺 H1 / 少量多 H1                       | 约 13 篇缺 H1，1 篇多 H1                                  | 改动时补 H1；新增页面必须符合 3.4          |
| 部分截图待补                                         | 约 19 张（以台账为准）                                    | 由人工按 7.11 流程补齐                     |

### 11.6 评审关注点

评审者优先看：

1. 事实是否准确（界面、路径、字段、版本、License）。
2. 读者能否照做（前置条件、步骤、验证）。
3. 结构与格式是否符合本规范（frontmatter、标题、Steps、Alert、链接）。
4. 截图是否符合第 7 章（英文、脱敏、alt、一致性）。
5. 是否引入新的历史债务或重复内容。
6. 构建与检查命令是否通过。

## 12. AI Agent 编写规范

本章规定 AI Agent 在本仓库写文档时的行为准则，是 Agent 的执行细则；[AGENTS.md](AGENTS.md) 是它的精简操作契约（最低要求），两者冲突时以本章为准并修正 AGENTS.md。Agent 可以直接执行的任务类型：新增/改写 V5 页面、修正链接与图片引用、补全字段表、按模板重构单个页面、生成截图待办清单。Agent 不负责：真实截图采集、生产环境验证、信息架构大调整、跨版本迁移。

### 12.1 定位与责任边界

- Agent 是**编写助手**，不是事实来源。界面事实必须能追溯到英文界面、仓库配置或源码。
- Agent 的输出默认视为**草稿**，需要人工评审后合并；Agent 不得声称"已人工验证"。
- Agent 不得代替人工做发布、部署、截图替换、删除文件等决策。
- Agent 必须遵守写作用域；跨文件"顺手优化"一律视为越界。

### 12.2 开工流程

按顺序执行，不得跳步：

1. 读 [AGENTS.md](AGENTS.md) 获取执行契约与命令。
2. 读本规范的相关章节（至少第 3–7、9、11 章；新增页面加第 2 章与附录 A）。
3. 读目标目录的 `_meta.json`，确认页面位置、`label`、顺序、是否已有同主题页面。
4. 读同目录 2–3 篇同类页面，提取实际结构与用词，不凭记忆套模板。
5. 读需要的组件源码（`src/components/docs/*.tsx`）与 [rspress.config.ts](rspress.config.ts)，确认 props 与注册方式。
6. 列出本次改动文件与写作用域，确认不与其他人冲突（尤其 `_meta.json`）。
7. 再开始写。

### 12.3 事实来源与不确定性

事实优先级（高 → 低）：

1. V5 英文界面的真实文案 + 仓库配置/组件源码（`rspress.config.ts`、`_meta.json`、`src/components/**`、`src/data/releases.json`）；
2. 本规范；
3. 现有同类英文页面；
4. 模型知识/记忆。

规则：

- 菜单路径、字段名、按钮文案、默认值、版本号**必须**来自 1–3 级来源。
- 无法确认时：不要编造；用保守表述并留下待确认说明，或按 12.9 升级人工。
- 不确定界面是否存在某功能时，不要写成肯定句；宁可少写，不可错写。
- 代码/配置类事实（组件、插件、构建行为）以仓库文件为准，不凭训练记忆。
- 引用外部事实（官方限制、版本兼容）时给出可核对的官方来源。

### 12.4 写入边界

允许：

- 任务指定的 `docs/v5/**` 页面、对应 `_meta.json` 条目；
- 任务指定的仓库级文档（由 Lead 分配）；
- 在授权范围内修正本次改动引入的格式、链接、图片引用问题。

禁止：

- 修改 `rspress.config.ts`、`src/**`、`scripts/**`、`theme/**`、`package.json`（除非任务明确授权）；
- 修改本规范与 [AGENTS.md](AGENTS.md)（发现问题只报告）；
- 删除/移动/重命名文件与图片；批量修改（一次超过 5 个页面）；重排 `_meta.json`/`_nav.json` 结构；
- 编辑 `build/`、`llms.txt`、`llms-full.txt`、`sitemap.xml`、`node_modules/`；
- 写入真实凭据、内网地址、个人信息；
- 对真实环境执行删除、改密、推送、终止会话等写操作；
- 用中文写英文页面，或在正文中保留中文注释；
- 为"让构建通过"而删除内容、注释链接、跳过校验。

### 12.5 内容硬规则（部分可自动检查）

以下规则应能被 [scripts/check-docs.mjs](scripts/check-docs.mjs) 或构建检出，Agent 必须在提交前自查：

| 规则        | 要求                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| frontmatter | 存在且合法；新页面有 `title`、`description`；概览页有 `overview: true` |
| 标题        | 单 H1；H2/H3 不跳级；标题无编号、无句末标点                            |
| 图片        | 路径为 `/images/...`；文件存在；无 `/docs` 前缀；无外链图床            |
| alt         | 非空、非文件名、非 `image`；V5 新图以 `Figure N:` 开头                 |
| 链接        | 站内链接不带 `/docs`；目标存在；跨版本链接显式且构建通过               |
| Steps       | 直接子元素均为 `<div>`；无裸文本；嵌套用 `stepLevel="2"`               |
| Alert       | `type` 只能是 6 个合法值；不嵌套；内容 1–3 句                          |
| 组件        | 需 import 的组件已 import；全局组件未重复 import                       |
| 代码块      | 标注语言；无真实凭据；版本命令用 `VersionedCommand`                    |
| 表格        | 列数一致；不手写 `<table>`；字段表首列 `Group` 时重复值一致            |
| 截图待办    | 使用页面可见的 `Screenshot TODO` Markdown 引用块，写清画面、文件名和保存路径 |
| 语言        | 英文正文无中文字符；术语按附录 B                                       |
| 页面登记    | 新页面已登记同级 `_meta.json`                                          |

当前 `scripts/check-docs.mjs` 覆盖表中可解析的规则（frontmatter/title/description、图片路径与 alt、站内链接、TODO、标题结构、代码块语言、图片文件名）；Steps 结构、Alert 类型、`_meta.json` 登记、表格列数、`VersionedCommand` 等仍需人工检查（见附录 C）。

### 12.6 截图与媒体

- Agent 默认**不生成、不替换、不删除**任何截图；没有图就写 TODO 并交接人工（见 7.10、7.13）。
- 即使具备浏览器自动化能力，也必须：英文演示环境、遵守 7.1–7.8、不写生产环境、不执行写操作；采集前确认已获授权。
- 不得用 AI 生成图、设计稿、截图拼接冒充产品截图。
- 交付说明必须单列"待人工截图清单"：页面 → 位置 → 期望画面 → 建议文件名 → 阻塞原因。

### 12.7 验证回路

按顺序执行并记录结果：

```bash
pnpm check:docs
pnpm exec prettier --check <改动文件>
pnpm build                          # 默认由 Lead 执行；Agent 获准后才运行
pnpm preview --port 4173            # 抽检改动页面
```

- `check:docs` 默认报告不阻塞；`--strict` 时 error 会退出非 0。
- 只格式化本次改动的文件。仓库存在历史格式债（旧文件未 prettier-clean、CRLF 行尾等），不得为通过检查重排无关文件。
- 构建失败先定位根因（死链/死图/MDX 语法），修复后重跑；不得绕过。
- 预览抽检：页面可打开、侧边栏位置正确、图片显示、Steps 编号连续、版本切换正常、移动端无横向滚动。
- 交付说明中写清命令与真实结果；未运行的命令必须标注"未运行"。

### 12.8 交付报告

每次任务结束按以下模板汇报（与 [AGENTS.md](AGENTS.md) 第 14 节一致）：

```markdown
## 交付说明

- 任务：<task id / 一句话目标>
- 改动文件：
  - docs/v5/features/console/example.mdx（新增，+120 行）
  - docs/v5/features/console/_meta.json（登记 example）
- 截图：无新增 / <文件名>（来源、是否入库、是否替换旧图）
- 待人工截图清单：
  - <页面> → <位置> → <期望画面>
- 验证：
  - pnpm check:docs → <通过 / 失败原因>
  - pnpm exec prettier --check <files> → <通过 / 说明>
  - pnpm build → <由 Lead 执行 / 已执行结果>
  - 预览抽检 → <页面 + 结论>
- 风险与未决：<规范歧义、事实不确定、写作用域冲突、遗留 TODO>
```

### 12.9 升级人工的条件

出现以下任一情况，停止写入并请求人工确认：

1. 需要删除、移动、重命名文件或图片；
2. 需要改动超过 5 个页面，或需要重排 `_meta.json`/`_nav.json` 结构；
3. 需要对真实环境执行写操作；
4. 界面事实无法用 12.3 的 1–3 级来源确认；
5. 需要新增依赖、修改构建配置/主题/组件；
6. `pnpm build` 或 `pnpm check:docs` 失败且原因不明；
7. 页面需要截图证据，但仓库无图且未获授权生成；
8. 发现与他人写作用域冲突，或发现规范本身需要修改；
9. 任务涉及信息架构调整、版本迁移、跨模块内容重组。

### 12.10 多 Agent 协作

- 每个 Agent 只写分配到的写作用域；不同 Agent 不同时修改同一文件。
- `_meta.json`、`_nav.json`、`rspress.config.ts` 是热点文件：同一时间只允许一个 Agent 修改，改前重新读取最新内容。
- 仓库级文档（本规范、AGENTS.md、README/CONTRIBUTING/MAINTENANCE）由 Lead 统一维护。
- 文件被他人改动时，先读取最新内容再基于最新版本修改，禁止回滚他人内容。
- 完成即更新共享任务状态并向 Lead 发送交付说明；不要等 Lead 轮询。

### 12.11 给 Agent 的任务 Prompt 模板

人工向 Agent 派活时，复制并填写：

```text
目标：<新增/改写/修正> <页面主题>
版本与路径：docs/v5/<module>/<file>.mdx（或指定目录，由你判断）
任务类型：任务页 / 概念页 / 参考页 / 概览页
参考页面：<2–3 篇同类页面路径>
事实来源：以 V5 英文界面与仓库组件源码为准；不确定的界面事实不要编造，写 TODO 或停下来问。
必须遵守：AGENTS.md、WRITING-GUIDE.md（第 3–7、9、11、12 章）、目标目录 _meta.json。
页面要求：<必要的章节、字段、示例、注意事项>
截图：<复用已有图 / 写 TODO 并列出待人工截图清单>
禁止：修改 docs 之外的文件；伪造截图；批量重排；修改 _meta.json 结构（如需要先确认）。
验收：pnpm check:docs、pnpm exec prettier --check <改动文件>、pnpm build（如获准）。
交付：按 AGENTS.md 第 14 节模板汇报。
```

### 12.12 常见失败模式

| 失败模式              | 表现                                | 纠正                                      |
| --------------------- | ----------------------------------- | ----------------------------------------- |
| 编造界面事实          | 菜单名、字段名与真实界面不符        | 回到 12.3 的来源核实；无法确认则删去/提问 |
| 编造链接              | 构建死链，或链接到不存在的页面      | 只链已存在页面；先建页再建链              |
| 复制 V4 模板句        | `description` 是 "Learn how to ..." | 写具体的页面用途                          |
| 忘记登记 `_meta.json` | 页面存在但侧边栏不可见              | 补登记                                    |
| 伪造/生成截图         | 图片与界面不符，或明显是生成图      | 删除，改写 TODO                           |
| Steps 裸文本          | 步骤编号错乱、出现空步骤            | 每步包 `<div>`                            |
| 自造 Alert 类型       | 样式异常或渲染失败                  | 只用 6 个合法值                           |
| 大批量格式化          | diff 覆盖无关文件                   | 只改任务范围                              |
| 删除内容以通过构建    | 页面信息缺失                        | 修复根因，不绕过                          |
| 声称已验证但未运行    | 交付说明与事实不符                  | 如实记录，未运行标注"未运行"              |
| 误改 V4               | 历史页面被污染                      | 新内容只写 V5，除非任务明确要求           |
| 硬编码版本号          | 补丁升级后命令过期                  | 使用 `VersionedCommand`                   |
| 复制内容而非链接      | 同一说明多页漂移                    | 保留权威页，其余链接                      |
| 中文进入英文页        | 与站点语言不一致                    | 删除中文，翻译为英文                      |

## 13. 提交与评审

### 13.1 分支与提交

- 不直接提交到 `dev`；从 `origin/dev` 创建功能分支。
- 分支命名：`docs/<scope>-<short-desc>`，例如 `docs/v5-ai-assistant`。
- 提交信息使用 Conventional Commits 变体，标注版本与范围：

  ```text
  docs(v5): add AI assistant guide
  docs(v5): fix authorization links
  docs(v4): refresh installation commands
  ```

- 文档改动与截图改动尽量分开提交；截图提交说明替换范围与来源。
- 一次提交只做一件事：新增页面、修正链接、替换截图不要混在同一个提交里。

### 13.2 PR 描述

PR 必须包含：

- 变更目的与范围（V4/V5、模块、页面列表）；
- 关键事实来源（英文界面、官方文档、源码链接）；
- 验证记录：`pnpm build`、`pnpm check:docs`、预览结论；
- 截图：新增/替换/待补清单；
- 风险与未决问题（规范歧义、版本差异、遗留 TODO）；
- 关联 Issue（如有）。

### 13.3 评审

评审者按附录 C.4 检查，重点关注：

1. 事实准确性（界面、路径、字段、版本、License）；
2. 可执行性（前置条件、步骤、验证）；
3. 结构合规（frontmatter、标题、Steps、Alert、组件）；
4. 行文（语气、术语、简洁、无营销词）；
5. 截图（英文、脱敏、alt、一致性）；
6. 链接与构建；
7. 是否引入重复内容或新债务。

评审意见按 `blocker / major / minor` 标注；blocker 必须修复后才能合并。

### 13.4 合并条件

- 构建通过，无死链、死图、锚点错误；
- `pnpm check:docs` 无新增 error；
- 至少 1 名文档 reviewer 批准（社区贡献按 [CONTRIBUTING.md](CONTRIBUTING.md) 要求）；
- 截图合规或已列 TODO 并交接；
- 未提交生成物、凭据、无关改动。

### 13.5 变更与回滚

- 内容错误优先修正，不靠回滚掩盖；需要回滚时使用 revert，不强制推送。
- 图片替换需要回滚时，恢复原文件并同步 `SCREENSHOT-REPLACEMENT.md`。
- 发现规范本身有问题，先改本规范并说明影响范围，再改页面。

## 附录 A：页面模板

以下模板可直接复制。`[方括号]` 为占位符，复制后必须全部替换；保留方括号或使用尖括号 `<...>` 占位都会导致 MDX 解析/构建失败。模板中的截图路径、菜单路径、示例值均为占位，必须按实际情况填写。

### A.1 任务页

```mdx
---
title: "[Page title]"
description: "[One sentence that says what the reader can do on this page.]"
---

# [Page title]

<Alert type="xpack">
  **[Feature]** requires JumpServer Enterprise Edition.
</Alert>

[One short paragraph: what this page is, where it is, who it is for.]

![Figure 1: What the page shows and the key areas visible.](/images/jumpserver/v5_example_01.png)

## Overview

[What the page shows and what the main controls do.]

## Before you begin

- [Environment requirement.]
- [Permission or role requirement.]
- [Edition or version requirement.]

## [Task section]

<Steps>

<div>
  <Nav name="console" />
</div>

<div>
Open **Console > [Module]**.
</div>

<div>Click **Create**.</div>

<div>In the **[Field]** field, type [example value].</div>

<div>Click **Submit**.</div>

</Steps>

## Field reference

| Group   | Field       | Description               |
| ------- | ----------- | ------------------------- |
| [Group] | [**Field**] | Required. [What it does.] |

<Alert type="warning">[What can go wrong and how to avoid it.]</Alert>

## Related topics

- [Related page](/features/console/[page])
```

### A.2 概念页

```mdx
---
title: "[Concept name]"
description: "[One sentence that defines the concept and why it matters.]"
---

# [Concept name]

[One paragraph: definition in plain terms.]

## How it works

[The parts, relationships, and constraints.]

## When to use it

- [Scenario one.]
- [Scenario two.]

## Related concepts

- [Related concept](/features/console/[page])

## Related topics

- [Related task page](/features/console/[page])
```

### A.3 参考页

```mdx
---
title: "[Reference name]"
description: "[What this reference covers.]"
---

# [Reference name]

[One paragraph: scope and when the reader needs this reference.]

## Parameters

| Group   | Field       | Description                                |
| ------- | ----------- | ------------------------------------------ |
| [Group] | [**Field**] | Required. [Type, default, allowed values.] |

## Limits

- [Limit and consequence.]

## Related topics

- [Related page](/features/console/[page])
```

### A.4 故障排查页

```mdx
---
title: "[Troubleshooting topic]"
description: "[The symptom this page helps diagnose.]"
---

# [Troubleshooting topic]

[Symptom in one or two sentences, including the exact message if there is one.]

## Diagnose

1. [Check step with expected result.]
2. [Check step with expected result.]

## Cause and resolution

| Cause   | Resolution    |
| ------- | ------------- |
| [Cause] | [Resolution.] |

<Alert type="note">
  [How to collect logs or evidence before contacting support.]
</Alert>

## Related topics

- [Related page](/operations/troubleshooting)
- [Related reference](/reference/faq)
```

### A.5 章节概览页

```mdx
---
title: "[Chapter] Overview"
description: "[One sentence that describes what this chapter covers.]"
overview: true
---
```

同级 `_meta.json` 登记示例：

```json
[
  { "type": "file", "name": "index", "label": "[Chapter]" },
  { "type": "file", "name": "[page]", "label": "[Page label]" },
  {
    "type": "dir",
    "name": "[subdir]",
    "label": "[Subdir label]",
    "collapsed": true
  }
]
```

### A.6 新增页面登记清单

1. 创建 `docs/v5/[path]/[page].mdx`，写 frontmatter、H1、正文。
2. 在同级 `_meta.json` 添加 `{ "type": "file", "name": "[page]", "label": "[Label]" }`。
3. 若新页面属于新目录，创建目录 `_meta.json` 并在上一级登记 `dir`。
4. 确认至少有一个已存在的页面链接到新页面（避免孤立页）。
5. 需要截图时写可见、可搜索的 `Screenshot TODO` 引用块，包含建议文件名，并登记到交付清单。

## 附录 B：术语表

| 术语                               | 说明                                                          | 注意                                  |
| ---------------------------------- | ------------------------------------------------------------- | ------------------------------------- |
| JumpServer                         | 开源 PAM（堡垒机）平台                                        | 不写 Jumpserver、jumpserver           |
| Console                            | 管理工作区：用户、资产、账号、授权、ACL、标签                 | 不翻译为"控制台"                      |
| PAM                                | Privileged Access Management 模块：账号自动化、账号安全、集成 | 与 Console 并列的工作区               |
| Audits                             | 审计工作区：会话、活动、作业、工单、报表                      | 不写 Audit                            |
| Workbench                          | 日常工作区：资产接入、文件传输、作业中心、工单、工具          | 不翻译为"工作台"                      |
| System Settings                    | 平台配置工作区                                                | 不写 Settings 单独指代                |
| Client                             | JumpServer Client 桌面客户端                                  | 首次出现写全称                        |
| Luna                               | Web 终端/原生客户端相关组件名称                               | 按界面与官方文档写                    |
| KoKo / Chen / Kael                 | 协议连接组件（字符协议 / Web 数据库 / AI）                    | 保留原大小写                          |
| Magnus / Razor / Nec               | 企业版数据库 / RDP / VNC 代理组件                             | 保留原大小写                          |
| JDMC                               | 主机运维与管理组件                                            | 首次出现给全称                        |
| Community Edition (CE)             | 社区版                                                        | 不写"免费版"                          |
| Enterprise Edition (EE)            | 企业版                                                        | 不写"商业版"、"专业版"                |
| user                               | JumpServer 平台用户                                           | 与 asset account 区分                 |
| account                            | 资产账号（绑定在资产上的登录凭据）                            | 不写 credential 代替 account          |
| asset                              | 受管资产（主机、网络设备、数据库、云服务、Web 等）            | host 只是资产类型之一                 |
| organization                       | 组织，用于资源隔离                                            | 不写 tenant、org（界面缩写除外）      |
| node                               | 资产节点树中的节点                                            | 不写 folder、group（用户组另有其词）  |
| zone                               | 网络区域/网关                                                 | 不写 region                           |
| platform                           | 资产平台模板（含协议与自动化）                                | 不写 type                             |
| protocol                           | 协议及其端口（如 `ssh/22`）                                   | 与连接方式区分                        |
| authorization                      | 资产授权（用户/组 → 资产/账号）                               | 不写 permission                       |
| ACL                                | Access Control List，访问控制策略                             | 首次出现给全称                        |
| role                               | 角色；必须区分 system role 与 organization role               | 单说 role 有歧义时限定                |
| session                            | 资产会话（在线/历史、可回放）                                 | 不写 connection 代替 session          |
| command                            | 会话中执行的命令；命令记录/命令存储                           | 不写 cmd                              |
| ticket                             | 工单（资产申请、登录/命令审批）                               | 不写 work order                       |
| job                                | 作业中心里的作业                                              | 与 system task 区分                   |
| playbook                           | 作业模板中的 Playbook                                         | 保留原词                              |
| adhoc                              | 临时（Adhoc）作业/命令                                        | 按界面写法 `Adhoc`                    |
| template                           | 模板（账号模板、作业模板等）                                  | 首次出现限定类型                      |
| secret                             | 账号凭据内容（密码、密钥）                                    | 不把 secret 当作"账号"                |
| MFA                                | Multi-Factor Authentication                                   | 首次给全称；不写"二次验证"            |
| OTP                                | One-Time Password                                             | 首次给全称                            |
| SSO                                | Single Sign-On                                                | 首次给全称                            |
| LDAP / SAML2 / OIDC / CAS / RADIUS | 认证后端协议                                                  | 保留官方写法，首次给全称              |
| access key                         | 访问密钥（个人设置中生成）                                    | 与 API Token 区分                     |
| connection token                   | 连接令牌（客户端连接用）                                      | 与 access key 区分                    |
| license                            | 许可证                                                        | 企业版相关，注意大小写与"License"用法 |
| recording / replay                 | 会话录像 / 回放                                               | 保留 recording、replay 用语           |

## 附录 C：检查清单

### C.1 人工提交前

- [ ] 页面归属版本正确（新增只写 V5）
- [ ] 页面类型明确，骨架符合第 3 章
- [ ] frontmatter 有 `title`、`description`；概览页有 `overview: true`
- [ ] `description` 是一句具体的页面用途，不是模板句
- [ ] 全页只有一个 H1；标题为 sentence case，无编号
- [ ] 首屏说明"是什么/在哪里/给谁用"；企业版功能已标注
- [ ] 前置条件、权限、版本要求齐全
- [ ] 步骤使用 `Steps`，每步一个 `<div>`，一步一个动作
- [ ] 每个关键操作有可观察结果，任务有验证步骤
- [ ] 字段说明用表格，必填/可选/默认值清楚
- [ ] 危险操作有 `warning` Alert
- [ ] 术语与同模块页面一致（附录 B）
- [ ] 无第一人称、营销词、填充词（4.11）
- [ ] 站内链接不带 `/docs`，目标存在，锚点有效
- [ ] 图片路径 `/images/...`，文件存在，alt 合规且 `Figure N` 连续
- [ ] 截图英文界面、已脱敏、尺寸一致
- [ ] 无法截图处已写可见、可搜索的 `Screenshot TODO` 引用块并列入交付清单
- [ ] 新页面已登记 `_meta.json`，非孤立页
- [ ] `pnpm build` 通过（或由 Lead 执行并确认）
- [ ] `pnpm check:docs` 无新增 error
- [ ] `pnpm exec prettier --check <改动文件>` 通过
- [ ] 预览相关页面：图片、表格、Steps、版本切换、移动端正常

### C.2 AI Agent 交付前

- [ ] 已按 12.2 的顺序读规范、`_meta.json`、同类页面、组件源码
- [ ] 界面事实均可溯源；不确定项已标注/升级，未编造
- [ ] 只改了写作用域内文件，未触碰 `src/**`、`scripts/**`、配置
- [ ] 未删除/移动文件或图片，未批量重排
- [ ] frontmatter、标题、链接、图片、Steps、Alert、代码块符合 12.5
- [ ] 无截图伪造；待人工截图清单已列出
- [ ] `pnpm check:docs`、`prettier --check` 结果如实记录；`pnpm build` 按授权执行
- [ ] 交付说明包含改动文件、截图、验证、风险（12.8）
- [ ] 共享任务状态已更新，未与他人写作用域冲突

### C.3 截图

- [ ] 英文界面、英文/中性演示数据、无水印
- [ ] 1600×1000 PNG（或同页一致规格），文字清晰
- [ ] 保留必要上下文，未含浏览器地址栏/任务栏
- [ ] 无密码、Token、AK/SK、内网地址、个人信息、客户信息
- [ ] 文件名 `v5_<模块>_<页面>_<序号>.png`，位于 `docs/public/images/jumpserver/`
- [ ] 引用 `/images/...`，无 `/docs` 前缀
- [ ] alt 以 `Figure N:` 开头，描述准确，编号连续
- [ ] 截图与正文步骤、字段名、版本一致
- [ ] 替换流程已执行：备份、构建、预览、更新台账、清理旧图

### C.4 PR 评审

- [ ] PR 描述包含目的、范围、事实来源、验证记录、截图说明、风险
- [ ] 事实准确（界面、路径、字段、版本、License）
- [ ] 读者可照做（前置条件、步骤、验证）
- [ ] 结构与格式合规（第 3、6、9 章）
- [ ] 行文合规（第 4 章）
- [ ] 截图合规（第 7 章）或 TODO 已交接
- [ ] 无重复内容、无新债务、无无关 diff
- [ ] `pnpm build`、`pnpm check:docs` 通过
- [ ] 已获得所需 reviewer 批准
