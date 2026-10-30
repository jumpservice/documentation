# JumpServer 文档站维护指南

本文档面向后续负责 JumpServer 文档新增、修改、截图和发布的人员。

写作规范以 [WRITING-GUIDE.md](WRITING-GUIDE.md) 为准（页面结构、行文、步骤、组件、截图、链接、校验等 13 章 + 附录）；使用 AI Agent 或自动化脚本执行本文档前，必须先读 [AGENTS.md](AGENTS.md)。本文档只保留维护流程与操作步骤，规范细节不再重复。

## 1. 项目概况

- 项目目录：`C:\workspace\jumpserver-com-docs-new`
- Git 仓库：`https://github.com/jumpservice/documentation`
- 当前迁移分支：`feat/rspress-v5-docs`
- 生产分支：`dev`
- 技术栈：Rspress 2 + React 19 + Tailwind CSS 3
- 站点路径：`/docs/`
- 构建输出：`build/`
- 构建页数：约 222 页（以实际 `pnpm build` 输出为准）
- Node.js：`>= 20.19.0`
- pnpm：`11.x`

当前站点同时提供两个版本文档：

- V5（默认）：`docs/v5`，访问路径 `/docs/...`
- V4（历史版本）：`docs/v4`，访问路径 `/docs/v4/...`

## 2. 目录结构

```text
docs/
  v4/                 # V4 历史文档
  v5/                 # V5 当前文档
    _nav.json         # V5 顶部导航
    _meta.json        # V5 侧边栏分组和顺序
    getting-started/  # 快速开始、安装、升级
    user-guide/       # General、Workbench、Client
    administration/   # Console、PAM、Audits、System Settings
    roles/            # 角色指南
    operations/       # 运维指南
    developer-guide/  # API 与集成
    reference/        # 参考、术语表、版本对比
  public/
    images/jumpserver/ # 文档截图和图片
    svgs/              # 图标资源
src/
  components/         # 自定义组件
  styles/             # 全局样式
theme/                # Rspress 主题组件
scripts/
  preview.mjs         # 本地静态预览服务器
wrangler.jsonc        # Cloudflare Workers 配置
worker/index.js       # /docs 前缀重写和 clean URL 处理
```

## 3. 新增一篇文档

### 3.1 创建 MDX 文件

在对应目录创建 `.mdx` 文件，例如：

```text
docs/v5/administration/console/example.mdx
```

文件开头必须有 frontmatter：

```mdx
---
title: "Example"
description: "One-sentence description used by search and page metadata."
---

# Example

正文内容。
```

要求：

- `title`：页面标题，简短明确
- `description`：一句话说明页面用途，不要省略
- 一级标题只保留一个 `#`
- 正文使用英文标题和界面术语，与现有文档保持一致
- 产品名称、菜单路径使用粗体，例如 **Console > Assets**

### 3.2 注册到侧边栏

只创建文件还不够，必须在同级 `_meta.json` 中登记，否则侧边栏可能不显示。

例如在 `docs/v5/administration/console/_meta.json` 中加入：

```json
{
  "type": "file",
  "name": "example",
  "label": "Example"
}
```

目录级页面使用：

```json
{
  "type": "dir",
  "name": "example-dir",
  "label": "Example",
  "collapsed": true
}
```

V5 不再使用 `section-header` 或 `dir-section-header`：所有有子页面的分组都必须是真实目录，并在目录内提供 `index.mdx` 作为概览页。`index.mdx` 不登记到 `_meta.json`，分组标题会直接链接到它。只有一个页面的主题直接登记为 `file`，不要再包目录。

修改 `_meta.json` 后要检查本地侧边栏顺序和链接。

### 3.3 顶部导航

只有新增一级导航时才修改 `_nav.json`：

```text
docs/v5/_nav.json
docs/v4/_nav.json
```

普通功能页面不需要改顶部导航。

### 3.4 内部链接

使用站点内绝对路径，不要带 `/docs` 前缀：

```mdx
[Assets](/administration/console/assets/)
```

不要写成：

```mdx
[Assets](/docs/administration/console/assets/)
```

V4 页面同样写版本内路径（如 `/notifications/email`），由多版本路由自动加 `/v4` 前缀；只有显式跨版本引用时才手写 `/v4/...`。

链接和图片在 `pnpm build` 时会做死链检查，构建失败通常意味着：

- 目标文件路径写错
- 目标页面尚未创建
- 锚点不存在
- 图片路径错误

## 4. 内容规范

页面结构、术语、行文、步骤、组件、截图与链接的完整规则见 [WRITING-GUIDE.md](WRITING-GUIDE.md)（第 3–9 章）。本节只列维护时最容易出错的几条：

- 使用英文界面术语：**Create**、**Submit**、**Confirm**、**Console**、**PAM**
- 菜单路径统一写 **Console > Assets**；按钮、菜单、字段名用粗体
- GUI 多步骤操作使用 `<Steps>`，每个步骤用 `<div>` 包裹；命令行操作使用有序列表 + fenced code block
- 注意事项、前置条件、企业版限制使用 `<Alert>`，`type` 只能是 `tip`、`note`、`warning`、`important`、`error`、`xpack`
- 企业版功能使用 xpack Alert / Enterprise CTA，不要描述成社区版可用
- 截图、图片路径、alt 文本规则见 WRITING-GUIDE 第 7 章；替换进度统一维护在 [SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md)

示例：

```mdx
<Alert type="warning">
  This operation changes the account secret. Validate it on a test asset first.
</Alert>

<Steps>

<div>
Open **Console > Accounts**.
</div>

<div>Click **Create**.</div>

<div>Click **Submit**.</div>

</Steps>
```

现有全局组件（完整清单与 props 见 WRITING-GUIDE 6.1）：

- `<Alert type="tip" | "note" | "warning" | "important" | "error" | "xpack">`
- `<Steps>`、`<Nav>`
- `<Icon>`、`<ApplyTrialLicense>`、`<DataTable>`、`<VersionBadge>`

### 4.1 图片与截图

图片统一写 `![Figure N: 描述](/images/jumpserver/<file>.png)`，文件放在 `docs/public/images/jumpserver/`，不要写 `/docs` 前缀；截图采集、脱敏、命名与替换规则见 WRITING-GUIDE 第 7 章，当前截图清单与人工待办见 [SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md)。

### 4.2 代码和表格

命令行使用 fenced code block 并标注语言；密码、Token、AK/SK 使用占位符；表格列数保持一致。完整规则见 WRITING-GUIDE 第 5、8 章。

## 5. 截图维护

截图资源目录：

```text
docs/public/images/jumpserver/
```

当前截图清单和人工待办记录在：

```text
SCREENSHOT-REPLACEMENT.md
```

维护流程：

1. 用英文演示环境截图
2. 保持原文件名，直接覆盖目标图片
3. 原始中文截图备份到工作目录，不要提交到仓库
4. 执行 `pnpm build`，检查死图
5. 打开对应文档页面确认图片已更新
6. 更新 `SCREENSHOT-REPLACEMENT.md` 的替换数量和人工清单

截图替换进度不是固定值，具体数量以 [SCREENSHOT-REPLACEMENT.md](SCREENSHOT-REPLACEMENT.md) 为准。当前参考：被引用 153 张截图中已替换 134 张、待人工 19 张（其中桌面客户端 4 张）。

如果浏览器仍显示旧图，先确认 `build/` 已重新生成，再做强制刷新；本地预览服务器读取的是构建产物，不是 `docs/public` 原文件。

演示环境注意事项：

- 截图环境中的 License、AI Assistant、报表需要处于可用状态
- AI 配置只放在运行环境，不提交 API Key
- 水印应关闭后再截图
- 不要在生产环境执行删除、改密、推送等写操作
- 测试环境可以创建用户、资产、组织用于截图，但完成后要记录并清理

## 6. V4 / V5 版本维护

- V5 是默认版本，新增功能优先写入 `docs/v5`
- V4 是历史版本，除明确要求外不要修改
- 同一功能如果两个版本都要保留，分别维护：
  - `docs/v5/...`
  - `docs/v4/...`
- V4 的安装、升级命令如果跟随补丁版本更新，需要同步 `v4.10.x` 相关命令
- 版本选择器由 `rspress.config.ts` 的 `multiVersion` 控制
- V4 导航和侧边栏分别由 `docs/v4/_nav.json`、`docs/v4/_meta.json` 控制

## 7. 本地开发与构建

```bash
cd C:\workspace\jumpserver-com-docs-new
pnpm install
pnpm dev
```

开发服务器地址：

```text
http://localhost:3000/docs/
```

质量检查与构建：

```bash
pnpm check:docs        # 文档规范检查（规则见 WRITING-GUIDE 第 11 章）
pnpm build             # 构建 + 死链/死图检查
```

预览生产构建：

```bash
pnpm preview --port 4173
```

访问：

```text
http://127.0.0.1:4173/docs/
```

注意：

- `rspress preview` 不会自动处理 clean URL，必须使用 `pnpm preview`
- `build/` 是生成物，不提交 Git
- 构建输出包含 `llms.txt`、`llms-full.txt`、`sitemap.xml`，不要手工编辑这些生成文件
- 页面出现 404 时，先检查 `base`、链接前缀和 `_meta.json`

## 8. 部署与 Cloudflare

当前仓库已增加：

```text
wrangler.jsonc
worker/index.js
```

Cloudflare Workers Builds 建议参数：

| 参数              | 值                                                  |
| ----------------- | --------------------------------------------------- |
| Repository        | `jumpservice/documentation`                         |
| Production branch | `dev`（稳定后）/ `feat/rspress-v5-docs`（预览阶段） |
| Build command     | `pnpm run build`                                    |
| Deploy command    | `npx wrangler deploy`                               |
| Root directory    | `/`                                                 |
| Watch include     | `*`                                                 |
| Watch exclude     | `node_modules/**,.git/**`                           |

当前 Worker 按 `/docs` 子路径部署：

- Rspress `base` 为 `/docs/`
- Worker 将 `/docs/*` 重写到 `build/*`
- clean URL 由 `worker/index.js` 处理
- 需要配置 Cloudflare Route：`www.jumpserver.com/docs/*`

如果改为部署到 `docs.jumpserver.com/` 根路径：

- 将 `rspress.config.ts` 的 `base` 改为 `/`
- 更新 `siteOrigin`、sitemap、`remark-base-images` 的 base
- 去掉 Worker 的 `/docs` 前缀重写
- 重新验证图片、内部链接和 `llms.txt`

Cloudflare 常见阻塞：

- GitHub 授权失败：重新授权 Cloudflare GitHub App，授予 `jumpservice` 组织仓库权限
- API Token unavailable：重新创建或更新 Cloudflare API Token
- Build 成功但页面空白：检查 `base`、Worker 重写和 Route 是否匹配
- 资源 404：检查 `build/` 中是否有对应文件，以及路径是否带 `/docs`

## 9. Git 工作流

- 不直接提交到 `dev`
- 从 `origin/dev` 创建功能分支
- 文档改动和截图改动尽量分开提交
- 提交前执行 `pnpm build`
- 不提交 `node_modules/`、`build/`、`.next/`、本地日志和截图备份
- PR 标题说明版本和范围，例如：
  - `docs(v5): add AI assistant guide`
  - `docs(v4): refresh installation commands`
- 合并前至少确认：
  - 构建通过
  - 链接检查通过
  - 截图显示正常
  - V4/V5 没有被意外串改

当前迁移分支：

```text
feat/rspress-v5-docs
```

## 10. 发布前检查清单

- [ ] frontmatter 有 `title` 和 `description`
- [ ] 新页面已加入 `_meta.json`
- [ ] 内部链接使用版本内路径（如 `/administration/...`）而不是 `/docs/...`
- [ ] 图片文件位于 `docs/public/images/jumpserver/`
- [ ] 截图为英文界面，无水印、无敏感信息
- [ ] `pnpm check:docs` 无新增 error（收尾时可用 `pnpm check:docs --strict`）
- [ ] 改动文件 `pnpm exec prettier --check` 通过
- [ ] `pnpm build` 成功
- [ ] 本地预览 `/docs/` 页面正常
- [ ] 移动端宽度下没有横向滚动或遮挡
- [ ] V4/V5 版本切换正常
- [ ] 搜索索引和 `llms.txt` 正常生成
- [ ] 没有提交构建产物或真实凭据
- [ ] PR 已请求文档 reviewer

## 11. 当前遗留事项

- 19 张截图仍待处理，主要集中在：
  - 桌面 JumpServer 客户端 4 张
  - Ticket / Job / Cloud Sync 等需要构造业务数据的流程页
  - 少量旧版 V4 页面
- Cloudflare 的 GitHub 授权和 API Token 需要确认
- 如果正式合并到 `dev`，将 `rspress.config.ts` 中的 `editLink.docRepoBaseUrl` 确认指向 `dev` 分支
- 正式发布前确认 Cloudflare 的 `/docs` 路径与 Rspress `base` 一致
