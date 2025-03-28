import { ImageComponent, InfiniteMovingCards } from "@/components/public";

const images = [
  { src: "/images/home/moving-system-settings.png", alt: "SystemSettings" },
  { src: "/images/home/moving-workbench.png", alt: "Workbench" },
  { src: "/images/home/moving-audits.png", alt: "Audits" },
  { src: "/images/home/moving-console.png", alt: "Console" },
];

const ProductShowcase = () => (
  <InfiniteMovingCards
    direction="right"
    speed="normal"
    className="mx-auto [&_div.nextra-code]:h-full [&_pre]:h-[calc(100%-48px)]"
  >
    { images.map(({ src, alt }) => ( 
        <ImageComponent key={alt} src={src} alt={alt} />
      )) 
    }
  </InfiniteMovingCards>
);

export default ProductShowcase;