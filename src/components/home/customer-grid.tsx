import React from "react";

const logos = [
  "/images/home/customer-logos/cosco.jpg",
  "/images/home/customer-logos/oppo.png",
  "/images/home/customer-logos/tencent.png",
  "/images/home/customer-logos/decathlon.png",
  "/images/home/customer-logos/ikea.webp",
  "/images/home/customer-logos/uniqlo.png",
  "/images/home/customer-logos/daimler.png",
  "/images/home/customer-logos/deloitte.jpg",
  "/images/home/customer-logos/vivo.jpg",
  "/images/home/customer-logos/denso.jpg",
  "/images/home/customer-logos/dyson.jpg",
  "/images/home/customer-logos/ford.png",
  "/images/home/customer-logos/huashuo.jpg",
  "/images/home/customer-logos/lenovo.png",
  "/images/home/customer-logos/mcdonald.jpg",
  "/images/home/customer-logos/misumi.png",
  "/images/home/customer-logos/msd.jpg",
  "/images/home/customer-logos/ntt.png",
  "/images/home/customer-logos/shangri-la.jpg",
  "/images/home/customer-logos/siemens.jpg",
  "/images/home/customer-logos/tcl.png",
  "/images/home/customer-logos/versace.jpg",
  "/images/home/customer-logos/vw.jpg",
  "/images/home/customer-logos/fuji-xerox.png",
  "/images/home/customer-logos/mihoyo.png",
];

const CustomerLogos = () => {
  return (
    <div className="pt-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-3 bg-white rounded-lg border shadow-md min-h-[80px]"
            >
              <img
                src={logo}
                alt={`Client Logo ${index + 1}`}
                className="h-16 max-h-20 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Customer() {
  return (
    <>
      <div className="">
        <section>
          <h2>Trusted by Global Industry Leaders</h2>
          <CustomerLogos />
        </section>
      </div>
    </>
  );
}

export default Customer;
