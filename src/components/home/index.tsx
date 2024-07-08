import Hero from './hero'
import FlowingCard from './flowing-card'
import WhatsJumpServer from './whats'
import XPack from './x-pack'
import Support from './support'
import Edition from './edition'

function HomePage() {
  return (
    <div className="home">
      <Hero />
      <FlowingCard />
      <WhatsJumpServer />
      <Edition />
      <XPack />
      <Support />
    </div>
  )
}
export default HomePage
