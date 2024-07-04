import InfiniteMovingCards from "../public/infinite-moving-cards"
import { ImageComponent } from "@/components/public"

export default function FlowingCard() {
  return (
    <>
      <InfiniteMovingCards 
        direction="right"
        speed="normal"
        className="mt-10 mx-auto [&_pre]:h-[calc(100%-48px)] [&_div.nextra-code]:h-full"
      >
        <ImageComponent src="/images/home/assets.png" alt="Asset" />
        <ImageComponent src="/images/home/audits.png" alt="Audits" />
        <ImageComponent src="/images/home/assets.png" alt="Asset" />
        <ImageComponent src="/images/home/audits.png" alt="Audits" />
      </InfiniteMovingCards>
    </>
  )
}
