import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { 
  JumpServerWordmarkLogoIcon 
} from './src/icons'


const JumpServerLogo = (
  <JumpServerWordmarkLogoIcon className="h-8 nextra-logo" title="JumpServer" />
)

const classes = {
  link: "hover:underline decoration-from-font [text-underline-position:from-font]",
}


function List({
  title,
  items,
}: {
  title: string,
  items: { title: string, url: string }[],
}) {
  return (
    <ul className='text-sm flex flex-col gap-4 max-lg:w-[46%]'>
      <h3 className='text-lg font-bold'>{title}</h3>
      {items.map(item => (
        <li key='item.title'>
          <NextLink href={item.url} target="_blank" className={classes.link}>
            {item.title}
          </NextLink>
        </li>
      ))}
    </ul>
  )
}

const Footer = () => (
  <> 
    <div className='w-full'>
      <div className="flex justify-between items-start mb-24 flex-wrap gap-10">
        <NextLink href="/" target="_blank" className='max-lg:w-full'>
          {JumpServerLogo}
        </NextLink>
        <List
          title="Learn"
          items={[
            { title: "Introduction", url: "/docs" },
            { title: "Best Practices", url: "/docs/best-practices" },
            { title: "Frequently Asked Questions", url: "/faq" },
            { title: "Developers", url: "/developers" }
          ]}
        />
        <List
          title="GitHub"
          items={[
            { title: "Organization", url: "https://github.com/JumpServer" },
            { title: "Release Notes", url: "https://github.com/jumpserver/jumpserver/releases" },
            { title: "Contribute to JumpServer", url: "https://github.com/jumpserver/jumpserver/blob/dev/CONTRIBUTING.md" },
          ]}
        />
        <List
          title="Resources"
          items={[
            { title: "Community", url: "https://community.fit2cloud.com/#/products/jumpserver/information" },
            { title: "Blog", url: "https://blog.fit2cloud.com/categories/jumpserver" },
            { title: "BBS", url: "https://bbs.fit2cloud.com/c/js/5"},
            { title: "Knowledge", url: "https://kb.fit2cloud.com/categories/jumpserver"},
          ]}
        />
        <List 
          title="Support"
          items={[
            { title: "Issues", url: "https://github.com/jumpserver/jumpserver/issues" },
            { title: "Discord", url: "https://discord.com/invite/jcM5tKWJ" },
            { title: "Concat Us", url: "https://jinshuju.net/f/sQ91MK" },
          ]}
        />
        <List
          title="& More"
          items={[
            { title: "RemoteApp Store", url: "https://apps.fit2cloud.com/jumpserver" },
          ]}
        />
      </div>
      <div>bottom</div>
    </div>
  </>
)

const Banner = {
  key: '4.0-release',
  text: (
    <a href="https://github.com/jumpserver/jumpserver" target="_blank">
      🎉 JumpServer 4.0 is released. Read more →
    </a>
  )
}

const config: DocsThemeConfig = {
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="JumpServer" />
      <meta property="og:description" content="An open-source PAM tool (Bastion Host)" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </>
  ),
  banner: Banner,
  logo: JumpServerLogo,
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
    placeholder: 'Search...',
  },
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1,
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="nx-cursor-default">{title}</span>
      }
      return <>{title}</>
    }
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath == '/') {
      return {
        titleTemplate: 'JumpServer | An open-source PAM tool'
      }
    } else {
      return {
        titleTemplate: 'JumpServer | %s'
      }
    }
  },
  primaryHue: 150,
  primarySaturation: 50,
  navbar: {
  },
  darkMode: true,
  toc: {
    backToTop: true
  },
  footer: {
    text: Footer
  },
}

export default config

// text: (
//   <div className="flex w-full flex-col items-center sm:items-start">
//     <p className="mt-6 text-xs">
//       © {new Date().getFullYear()} The JumpServer Project.
//     </p>
//   </div>
// )