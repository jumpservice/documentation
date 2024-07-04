import { NoPluginsIcon } from "@/icons/"

const Card = () => {
  return (
    <>
      <div className="bg-white items-center rounded-lg shadow-2xl border-2 border-green-300">
        <div> <NoPluginsIcon className="w-10" /> </div>
        <div className="w-20 text-sm text-slate-500">No Browser Plugin Required</div>
      </div>
    </>
  )
}


export default function Advantages() {
  return (
    <>
      <section className="hero-section-block">
        <h2>Advantages of JumpServer</h2>
        <Card />
      </section>
    </>
  )
}