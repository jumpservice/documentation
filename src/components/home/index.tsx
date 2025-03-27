import Hero from "./hero";
import FlowingCard from "./flowing-card";
import Architecture from "./architecture";
import XPack from "./x-pack";
import Support from "./support";
import Edition from "./edition";
import Customer from "./customer";
// import Customer from "./customer-grid";

function HomePage() {
  return (
    <div className="home">
      <Hero />
      <FlowingCard />
      <Customer />
      <Architecture />
      <Edition />
      <XPack />
      <Support />
    </div>
  );
}
export default HomePage;
