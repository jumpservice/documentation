import { 
  Hero, 
  WhatsJumpServer, 
  Advantages, 
  XPack,
  Support,
  Edition,
  ContactUs
} from "@/components/home"

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
