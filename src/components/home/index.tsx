import Hero from "./hero"
import WhatsJumpServer from './whats'
import Advantages from './advantages'
import XPack from './x-pack'
import Support from "./support"
import Edition from "./edition"
import ContactUs from "./contact-us"

function HomePage() {
  return (
    <div className="index">
      <Hero />
      <WhatsJumpServer />
      <Advantages />
      <XPack />
      <Support />
      <Edition />
      <ContactUs />
    </div>
  )
}
export default HomePage
