import { useRouter } from 'next/router'

const capitalizeFirstLetter = (string) => {
  const words = string.split('-')
  const capitalizedWords = words.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ')
}

export default {
  banner: {
    key: '4.0-release',
    text: (
      <a href="https://github.com/jumpserver/jumpserver" target="_blank">
        🎉 JumpServer 4.0 is released. Read more →
      </a>
    )
  },
  project: {
    link: 'https://github.com/jumpserver/jumpserver',
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
  feedback: {
    useLink: () => 'https://github.com/jumpserver/jumpserver/issues/new?labels=%F0%9F%A4%94+Question&projects=&template=3_question.yml&title=%5BQuestion%5D+'
  },
  chat: {
    link: 'https://discord.com/invite/jcM5tKWJ',
  },
  docsRepositoryBase: 'https://github.com/ibuler/jumpserver-documentation/tree/dev',
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
  logo: (
    <>
      <img 
        src="/logo.svg" 
        style={{ 
          height: '36px',
          maskImage: 'linear-gradient(60deg, black 25%, rgba(0, 0, 0, 0.2) 50%, black 75%)',
          maskSize: '500%',
          maskPosition: '0%',
          transition: 'mask-position 1s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.maskPosition = '100%'}
        onMouseOut={(e) => e.currentTarget.style.maskPosition = '0%'}
      />
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="JumpServer" />
      <meta property="og:description" content="An open-source PAM tool (Bastion Host)" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </>
  ),
  primaryHue: 150,
  primarySaturation: 50,
  search: {
    placeholder: 'Search...',
  },
  navbar: {
  },
  darkMode: true,
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} The JumpServer Project.
        </p>
      </div>
    )
  },
  toc: {
    backToTop: true
  }
}