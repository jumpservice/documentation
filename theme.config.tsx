import React from 'react'

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
    defaultMenuCollapseLevel: 1
  },
  chat: {
    link: 'https://discord.com/invite/jcM5tKWJ',
  },
  docsRepositoryBase: 'https://github.com/ibuler/jumpserver-documentation/tree/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – JumpServer'
    }
  },
  logo: (
    <>
      <img 
        src="/logo.svg" 
        style={{ 
          height: '40px',
          maskImage: 'linear-gradient(60deg, black 25%, rgba(0, 0, 0, 0.2) 50%, black 75%)',
          maskSize: '400%',
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