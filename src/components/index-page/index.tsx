import { Hero } from "./hero"

export function IndexPage() {
  return (
    <div className="index">
      <Hero />
      <section className="text-center flex flex-col container items-center conf-block max-w-3xl">
        <h2>An open-source PAM tool</h2>
        <p>
          JumpServer is an open-source Privileged Access Management (PAM) tool 
          that provides DevOps and IT teams with on-demand and secure access to 
          SSH, RDP, K8s, Remote Apps and Database endpoints through a web browser.
        </p>
      </section>
    </div>
  )
}
