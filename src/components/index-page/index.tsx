import { Hero } from "./hero"
import { InfiniteMovingCards } from "./infinite-moving-cards"

export function IndexPage() {
  return (
    <div className="index">
      <Hero />
      <section className="text-center flex flex-col container items-center conf-block max-w-3xl">
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
        <img src="/img/demo-moving.png" alt="" />
        <img src="/img/demo-moving.png" alt="" />
        <img src="/img/demo-moving.png" alt="" />
        <img src="/img/demo-moving.png" alt="" />
      </InfiniteMovingCards>
    </div>
  )
}
