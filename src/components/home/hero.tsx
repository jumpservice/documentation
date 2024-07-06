import { GitHubStars } from '../public/'
import { HeroGitHubStarIcon, HeroDocsIcon } from "@/icons"


export default function Hero() {
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a href="https://github.com/jumpserver/jumpserver/releases/v4.0.0" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
              <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">New</span> 
              <span className="text-sm font-medium">
                JumpServer v4.0 is released !
                <span className="pl-2 hidden md:inline underline after:content-['_→'] after:font-sans">
                  Read more
                </span>
              </span> 
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            An open-source PAM tool, and alternative to CyberArk
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 mt-6">
            JumpServer is an open-source Privileged Access Management (PAM) tool that provides DevOps and IT teams with on-demand and secure access to SSH, RDP, Kubernetes, Database and RemoteApp endpoints through a web browser.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mt-20">
            <div className="inline-flex gap-4 items-center">
              <a className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary dark:focus:ring-primary" href="/docs">
                <div className="inline-flex gap-2">
                  <span>Get Started</span>
                  <HeroDocsIcon className="w-5 h-5" />
                </div>
              </a>
              <a className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800" target="_blank" href="https://github.com/jumpserver/jumpserver/">
                <div className="inline-flex gap-2">
                  <span>GitHub</span>
                  <GitHubStars owner="jumpserver" repo="jumpserver" />
                  <HeroGitHubStarIcon className="w-5 h-5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
