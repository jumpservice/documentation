import { ImageComponent } from "@/components/public"

function WhatsJumpServer() {
  return (
    <>
      <section className="hero-section-block">
        <h2>What's is JumpServer?</h2>
        <p>
          JumpServer is an open-source Privileged Access Management (PAM) tool 
          that provides DevOps and IT teams with on-demand and secure access to 
          SSH, RDP, K8s, Remote Apps and Database endpoints through a web browser.
        </p>
      </section>
      <ImageComponent src="/images/jumpserver-overview.png" alt="jumpserver-overview" width={1000} height={800}/>
    </>
  )
}

export default WhatsJumpServer
