import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { 
  JumpServerWordmarkLogoIcon 
} from './src/icons'


const JumpServerLogo = (
  <JumpServerWordmarkLogoIcon className="h-8 nextra-logo" title="JumpServer" />
)

const Footer = () => (
  <> 
    <div className='w-full'>
      <div className="flex justify-between items-start mb-24 flex-wrap gap-10">
        <NextLink href="/" className='max-lg:w-full'>
          {JumpServerLogo}
        </NextLink>
        top
      </div>
      <div>bottom</div>
    </div>
  </>
)

const capitalizeFirstLetter = (string) => {
  const words = string.split('-')
  const capitalizedWords = words.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ')
}

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
      console.log(title, type)
      if (type === 'separator') {
        return <span className="nx-cursor-default">{title}</span>
      }
      return <>{capitalizeFirstLetter(title)}</>
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