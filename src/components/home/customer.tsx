import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";

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

// 将 logos 分成三行交错排列
const rowCount = 3;
const rows = Array.from({ length: rowCount }, (_, i) =>
  logos.filter((_, idx) => idx % rowCount === i)
);

const ScrollRow = ({ logos, speed = 0.5, reverse = false }: { logos: string[]; speed?: number; reverse?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let requestId: number;
    const scroll = () => {
      if (!container) return;
      container.scrollLeft += reverse ? -speed : speed;

      // 如果滚动到一半，就重置 scrollLeft 实现循环
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else if (container.scrollLeft <= 0 && reverse) {
        container.scrollLeft = container.scrollWidth / 2;
      }

      requestId = requestAnimationFrame(scroll);
    };

    requestId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestId);
  }, [speed, reverse]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden whitespace-nowrap no-scrollbar"
    >
      {/* 双份 logo 实现无缝滚动 */}
      {[...logos, ...logos].map((logo, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center p-2 min-w-[160px] bg-white rounded-lg border shadow-md mx-2"
        >
          <img src={logo} alt={`Client Logo ${idx}`} className="h-16" />
        </div>
      ))}
    </div>
  );
};

function Customer() {
  return (
    <div>
      <h2 className="text-center mt-20 text-balance text-2xl font-extrabold lg:text-3xl;">Trusted by Global Industry Leaders</h2>
      <div className="container text-center py-20 max-w-7xl">
        <div className={clsx("space-y-10 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]")}>
          {rows.map((row, index) => (
            <ScrollRow key={index} logos={row} speed={0.5 + index * 0.2} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Customer;