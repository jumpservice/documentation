import Link from "next/link"
import { JumpServerLogo, GitHubIcon } from "@/icons"
import { clsx } from "clsx"

export default function Hero() {
  return (
    // <div className="[background:url('/images/home/banner.jpg')] xl:py-20">
    <div className="bg-gray-900 xl:py-20">
      <div className="container py-16 lg:py-24">
        <section 
          className={clsx(
            "flex-wrap gap-14 justify-center items-center flex max-sm:flex-col",
            "[&_h3]:text-white [&_h3]:text-2xl max-lg:[&_h3]:text-center",
            "[&_pre]:!bg-transparent [&_pre]:ring-0 [&_pre_span]:text-[--shiki-dark]",
            "[&_h3]:font-extralight",
            "[&_code]:whitespace-pre-wrap" /* fix scroll on mobile for code-blocks */,
          )}
        >
          <div className="max-md:grow max-xl:w-full flex flex-col items-center gap-2">
            <JumpServerLogo className="w-24" />
            <h1 className="text-primary text-3xl">JumpServer</h1>
            <br />
            <h4 className="text-white text-2xl">An open-source PAM tool, and alternative to CyberArk.</h4>
          </div>
        </section>
        <div className="flex justify-center mt-10">
          <div className="inline-grid grid-cols-2 gap-4 items-center">
            <Link className="hero-button" href="/docs">Get Started</Link>
            <Link className="hero-button" target="_blank" href="https://github.com/jumpserver/jumpserver/">
              {/* <GitHubIcon className="inline-grid w-5 h-1"/> */}
              GitHub Star
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
