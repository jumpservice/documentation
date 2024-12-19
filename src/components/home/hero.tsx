import { GitHubStars } from "../public/";
import { HeroGitHubStarIcon, HeroDocsIcon, HeroLinkIcon } from "@/icons";

export default function Hero() {
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <a
            href="https://github.com/jumpserver/jumpserver/releases/v4.5.0"
            className="mb-7 inline-flex items-center justify-between rounded-full bg-gray-100 px-1 py-1 pr-4 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="mr-3 rounded-full bg-primary px-4 py-1.5 text-xs text-white">
              New
            </span>
            <span className="text-sm font-medium">
              JumpServer v4.5.0 is released !
              <span className="hidden pl-2 underline after:font-sans after:content-['_→'] md:inline">
                Read more
              </span>
            </span>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            An open-source PAM tool alternative to CyberArk
          </h1>
          <p className="mb-8 mt-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            JumpServer is an open-source Privileged Access Management (PAM) tool
            that provides DevOps and IT teams with on-demand and secure access
            to SSH, RDP, Kubernetes, Database and RemoteApp endpoints through a
            web browser.
          </p>
          <div className="mb-8 mt-20 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
            <div className="inline-flex w-1/3 items-center gap-4 ">
              <a
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-light focus:ring-4 focus:ring-primary dark:focus:ring-primary"
                href="/docs/quickstart"
              >
                <div className="inline-flex gap-2">
                  <span>Quickstart</span>
                  <HeroLinkIcon className="h-5 w-5" />
                </div>
              </a>
              <a
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                target="_blank"
                href="https://github.com/jumpserver/jumpserver/"
              >
                <div className="inline-flex gap-2">
                  <span>GitHub</span>
                  <GitHubStars owner="jumpserver" repo="jumpserver" />
                  <HeroGitHubStarIcon className="h-5 w-5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
