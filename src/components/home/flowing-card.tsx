import { ImageComponent, InfiniteMovingCards } from "@/components/public"

const Moving = () => {
  return (
    <>
      <div className="">
        <InfiniteMovingCards 
          direction="right"
          speed="normal"
          className="mx-auto [&_pre]:h-[calc(100%-48px)] [&_div.nextra-code]:h-full"
        >
          <ImageComponent src="/images/home/moving-system-settings.png" alt="SystemSettings" />
          <ImageComponent src="/images/home/moving-workbench.png" alt="Workbench" />
          <ImageComponent src="/images/home/moving-audits.png" alt="Audits" />
          <ImageComponent src="/images/home/moving-console.png" alt="Console" />
        </InfiniteMovingCards>
      </div>
    </>
  )

}

export default function FlowingCard() {
  return (
    <>
      <Moving />
    </>
  )
}
