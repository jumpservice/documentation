import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router'
import { Banner, Logo, Footer } from '@/components/theme'

const config: DocsThemeConfig = {
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="JumpServer" />
      <meta property="og:description" content="An open-source PAM tool (Bastion Host)" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </>
  ),
  logo: Logo,
  banner: Banner,
  project: {
    link: 'https://github.com/jumpserver/jumpserver',
  },
  chat: {
    link: 'https://discord.com/invite/jcM5tKWJ',
  },
  feedback: {
    useLink: () => 'https://github.com/jumpserver/jumpserver/issues/new?labels=%F0%9F%A4%94+Question&projects=&template=3_question.yml&title=%5BQuestion%5D+'
  },
  docsRepositoryBase: 'https://github.com/ibuler/jumpserver-documentation/tree/dev',
  search: {
    placeholder: 'Search',
  },
  navbar: {
  },
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1,
    titleComponent({ title, type }) {
      let titleComponent = <>{title}</>
      if (type === 'separator') {
        titleComponent = <span className="nx-cursor-default">{title}</span>
      }
      return titleComponent
    }
  },
  toc: {
    backToTop: true
  },
  primaryHue: 150,
  primarySaturation: 50,
  darkMode: true,
  useNextSeoProps() {
    const { asPath } = useRouter()
    let titleTemplate = '%s - JumpServer'
    if (asPath == '/') {
      titleTemplate = 'An open-source PAM tool - JumpServer'
    }
    return {
      titleTemplate: titleTemplate
    }
  },
  footer: {
    text: Footer
  },
  // nextThemes: {
    // defaultTheme: 'dark',
    // forcedTheme: 'dark',
  // },
  // themeSwitch: {
  //   component: null,
  // },
}

export default config
