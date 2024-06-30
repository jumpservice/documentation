import { Hero } from "./hero"
import { InfiniteMovingCards } from "./infinite-moving-cards"
import { ImageComponent } from "../image-blocks"
import { FourA } from "./fourA"
import { XPACKFeature } from "./xpack-feature"

export function IndexPage() {
  return (
    <div className="index">
      <Hero />
      <section className="what-jumsperver text-center flex flex-col container items-center conf-block max-w-3xl">
        <h2>What's is JumpServer?</h2>
        <p>
          JumpServer is an open-source Privileged Access Management (PAM) tool 
          that provides DevOps and IT teams with on-demand and secure access to 
          SSH, RDP, K8s, Remote Apps and Database endpoints through a web browser.
        </p>
      </section>
      <InfiniteMovingCards 
        direction="right"
        speed="normal"
        className="mx-auto [&_pre]:h-[calc(100%-48px)] [&_div.nextra-code]:h-full"
      >
        <ImageComponent src="/img/moving-audits.png" alt="Audits" />
        <ImageComponent src="/img/moving-rdp.png" alt="RDP" />
        <ImageComponent src="/img/moving-assets.png" alt="Asset" />
        <ImageComponent src="/img/moving-ssh.png" alt="SSH" />
      </InfiniteMovingCards>
      <FourA />
      <XPACKFeature />
    </div>
  )
}
