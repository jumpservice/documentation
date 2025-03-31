# The JumpServer Docs

This is the source code for The JumpServer’s documentation, accessible at [Docs dev](https://documentation-git-dev-jumpserversites-projects.vercel.app/)

## Contributing

Please read [`CONTRIBUTING.md`](https://github.com/jumpservice/documentation/blob/dev/CONTRIBUTING.md). Thank you ❤️

## Local Setup

This project is built on [Next.js](https://nextra.site/). You can run it on your machine, provided you have [Node 20+](https://nodejs.org/en/) and [`pnpm`](https://pnpm.io) installed.

First, clone the repo:

```bash
git clone git@github.com:jumpservice/documentation.git
```

Make sure you are inside the folder:

```bash
cd documentation
```

Install the dependencies:

```bash
pnpm i
```

Then, run the project:

```bash
pnpm dev
```

If an error occurs during startup, try the following steps:
```bash
rm -rf .next/ node_modules/
pnpm install
pnpm dev
```

That’s it! Go to http://localhost:3000 to see it in action. Any change you make to a file in `pages` should be refreshed automatically in your browser.

## License & Attribution

The icon used in this project is licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license.  
Original icon by [Iconduck - HfG Schwäbisch Gmünd](https://iconduck.com/designers/hff-schwabisch-gmund).

The icons used in this project are licensed under the [GNU General Public License v2.0 (GPL-2.0)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html).  
Original icons from [Iconduck - Ardis](https://iconduck.com/sets/ardis-icon-theme).