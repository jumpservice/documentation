import Hero from "./hero";
import ProductShowcase from "./showcase";
import Architecture from "./architecture";
import XPack from "./x-pack";
import Support from "./support";
import Edition from "./edition";
import Customer from "./customer";

function HomePage() {
  return (
    <div className="home">
      <Hero />
      <ProductShowcase />
      <Customer />
      <Architecture />
      <Edition />
      <XPack />
      <Support />
    </div>
  );
}
export default HomePage;
