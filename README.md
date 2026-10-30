# The JumpServer Docs

The source for the JumpServer documentation site, built with [Rspress 2](https://rspress.rs/).

The site serves two documentation versions:

- **V5** (default) at `/docs/`
- **V4** at `/docs/v4/`

A version selector is rendered in the top navigation. The V4 tree is based on the
last V4 documentation snapshot (`v4.10.19`), with its release-specific install
and upgrade commands updated to `v4.10.20`. V5 keeps the Feature Modules /
Role Guides / Operations information architecture; V4 keeps the legacy structure.

## Visual design

The docs theme follows the `theme-jumpserver` design system
(`DESIGN.md`): Inter typography with `ss03`, JumpServer brand green `#2B937C`,
hairline `#E1E5E8` borders, light canvas/surface surfaces, and deep-teal
`#0F2E29` dark sections. Rspress CSS variables, Tailwind tokens, and component
styles live in `src/styles/globals.css`, `tailwind.config.cjs`, and `theme/`.

## Requirements

- Node.js `>= 20.19.0`
- pnpm `11.x` (the project declares `pnpm@11.15.1` in `package.json`)

## Local development

```bash
pnpm install
pnpm dev
```

The dev server serves the site under `/docs/`, for example
`http://localhost:3000/docs/quickstart` and
`http://localhost:3000/docs/v4/quickstart`. Static images and SVGs are served
from `/docs/images/*` and `/docs/svgs/*`.

## Build and preview

```bash
pnpm build
pnpm preview --port 4173
```

`pnpm preview` runs `scripts/preview.mjs`, a small static server that mounts the
build output at `/docs/`, redirects `/` to `/docs/`, and maps clean URLs such as
`/docs/quickstart` and `/docs/v4/quickstart` to the generated `.html` files.
Rspress' own `preview` command does not perform this mapping.

The production output is written to `build/`. Deploy the **contents of `build/`
at the `/docs` mount point** (for example with a reverse-proxy rewrite from
`/docs/*` to the build root). The generated URLs already include the `/docs`
base path. The hosting platform must support clean URLs: `/docs/quickstart`
must serve the generated page without requiring `/docs/quickstart.html` in the
address bar.

## Project structure

```text
docs/
├── v4/                    # V4 documentation tree
│   ├── _nav.json
│   ├── _meta.json
│   ├── index.mdx
│   └── ...
├── v5/                    # V5 (default) documentation tree
│   ├── _nav.json
│   ├── _meta.json
│   ├── index.mdx
│   └── ...
└── public/                # favicon, images, svgs, logo
src/
├── components/            # MDX components and global component wrappers
├── data/releases.json     # changelog data and version-aware release lookups
├── data/release-notes.json # detailed per-version release notes data
├── icons/                 # SVG icons imported as React components
├── styles/globals.css     # Tailwind entry + Rspress theme overrides
└── types/svg.d.ts
theme/
├── index.tsx              # Rspress Layout: version-aware banner + footer
└── Footer.tsx
rspress.config.ts
scripts/
├── preview.mjs            # clean-URL preview server mounted at /docs
└── remark-base-images.mjs # prefixes absolute image URLs with /docs
```

## V5 information architecture

V5 is organized by **Feature Modules**, **Role Guides**, and **Operations**, with
role-specific paths as a second lens:

```text
docs/v5/
├── index.mdx                 # Introduction
├── quickstart.mdx            # Get Started
├── installation.mdx
├── upgrade.mdx
├── features/                 # Feature Modules
│   ├── general/              # personal workspace
│   ├── console/              # users, assets, accounts, policies
│   ├── pam/                  # account automation, security, integration
│   ├── audits/               # sessions, activities, jobs, reports
│   ├── workbench/            # assets, terminals, job center, tickets
│   ├── client/               # JumpServer Client
│   └── system-settings/      # platform configuration
├── roles/                    # Role Guides
├── operations/               # Deployment, maintenance, security
├── developer-guide/          # API and integrations
└── reference/                # What's new, changelog, editions, license, glossary
```

- The **Feature Modules** sidebar section mirrors the JumpServer V5 English
  console: General, Console, PAM, Audits, Workbench, Client, and System Settings.
- The **Role Guides** section explains system roles vs organization roles and
  maps Administrator, Operator, and Auditor to the corresponding built-in roles.
  Role pages link to the canonical feature pages instead of duplicating procedures.
- Chapter index pages use Rspress `overview: true` to render a Halo-style card
  index with search. The Feature Modules section uses a custom module card grid.
  Overview search text is overridden in `i18n.json`.
- Module and nested chapter overviews are not repeated as sidebar children:
  the group title (for example **General**) links directly to the overview page.
- V5 feature, operations, developer, and reference pages are populated with
  English content adapted from the Chinese JumpServer documentation, the V5
  English UI, and the Lina/JumpServer source trees. Source screenshots are stored
  under `docs/public/images/jumpserver/`; some show the Chinese UI or an older
  release and can be replaced later.
- A few pages still need a final screenshot. Find them with:

  ```bash
  grep -rn "//TODO" docs/v5
  ```

  The `//TODO` comments are MDX comments, so they do not render on the site.

V4 keeps the previous information architecture at `/docs/v4/`. Version
switching preserves the current path; when a path does not exist in the target
version, the 404 fallback redirects to that version's home instead of showing a
dead end.

## Writing documentation

- Add or edit pages under `docs/v4` or `docs/v5`. V4 keeps the legacy
  structure; V5 uses the audience-first structure described below. Add each page
  to the version where it belongs.
- For V5, put product features under `docs/v5/{general,workbench,client}` or `docs/v5/{console,pam,audits,system-settings}` and
  role-oriented indexes in `docs/v5/roles/<role>.mdx`. Prefer a feature page as
  the canonical source and link to it from role pages.
- Page order and sidebar groups come from the `_meta.json` file in each version
  root. Use `{ "type": "file", "name": "...", "label": "..." }`,
  `{ "type": "dir", "name": "...", "label": "..." }`,
  `{ "type": "dir", "name": "...", "label": "...", "collapsed": true }` entries. V5 groups by real directories; use a separate `index.mdx` as the group landing page.
- Pages omitted from `_meta.json` are still routable but hidden from the
  sidebar.
- Top navigation lives in `docs/v4/_nav.json` and `docs/v5/_nav.json`.
- Put static assets in `docs/public` and reference them with absolute paths
  such as `/images/docs/example.png`. Rspress' base path handling prefixes the
  generated URLs with `/docs`.
- MDX components are available globally: `Icon`, `Alert`, `Steps`, `Nav`,
  `ApplyTrialLicense`, `DataTable`, and `VersionBadge`. They are registered in
  `rspress.config.ts` via `markdown.globalComponents`.
- Use Rspress built-in `Tabs`/`Tab` from `@rspress/core/theme` when a page needs
  tabs. Code-block titles use `title="..."` in the fence info string.
- Page structure, tone, component usage, screenshot rules, and link conventions
  are defined in [WRITING-GUIDE.md](WRITING-GUIDE.md). AI agents working in this
  repository must also follow [AGENTS.md](AGENTS.md), which records the
  executable rules, write boundaries, and validation loop.

## LLM support (llms.txt / Markdown)

`llms: true` is enabled in `rspress.config.ts`. `pnpm build` generates, for each
version:

- `llms.txt` — an index of pages with descriptions and Markdown links
- `llms-full.txt` — the full Markdown content of all pages
- a `.md` file next to each page, e.g. `/docs/quickstart.md` and
  `/docs/v4/quickstart.md`

The default version writes `llms.txt` / `llms-full.txt` at the site root under
`/docs`; V4 writes `v4/llms.txt` and `v4/llms-full.txt`. The doc outline also
shows "Copy Markdown" and "Open in chat" actions below the on-page outline.

## Release updates

The upstream JumpServer release Action calls `utils/update_changelog.sh` with
`TAG_NAME`. The script reads published v4 and v5 Releases from GitHub, adds any
missing entries to `src/data/releases.json`, and pushes a
`pr@dev@changelog-<tag>` branch only when that file changes. The latest release
for the active version supplies the version shown in the release banner and in
the installation/upgrade commands.

For a local data-only sync, run `node utils/sync-release.mjs v5.0.1` with an
existing published tag; this does not commit or push. A v4-only release is
picked up on the next v5-triggered sync, not immediately when v4 is published.

## License & Attribution

The icon used in this project is licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license.
Original icon by [Iconduck - HfG Schwäbisch Gmünd](https://iconduck.com/designers/hff-schwabisch-gmund).

The icons used in this project are licensed under the [GNU General Public License v2.0 (GPL-2.0)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html).
Original icons from [Iconduck - Ardis](https://iconduck.com/sets/ardis-icon-theme).
