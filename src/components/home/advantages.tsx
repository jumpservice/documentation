import { 
  AdvOpenSourceIcon,
  AdvNoPluginsIcon,
  AdvCloudStorageIcon,
  AdvCloudSupportIcon,
  AdvDistributedIcon,
  AdvMultiTenantIcon,

} from "@/icons/"

const cardData = [
  { icon: AdvOpenSourceIcon, text: "Rich Protocols & Resources Supported" },
  { icon: AdvDistributedIcon, text: "Distributed Deployment Supported" },
  { icon: AdvNoPluginsIcon, text: "No Browser Plugin Required" },
  { icon: AdvCloudStorageIcon, text: "Auditing Record Synced to Cloud" },
  { icon: AdvCloudSupportIcon, text: "Multi-Clouds Supported" },
  { icon: AdvMultiTenantIcon, text: "Multi-Organizations Supported" }
];

const Card = ({ icon: IconComponent, text }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div><IconComponent className="h-16" /></div>
        <div className="mt-3 w-22 text-sm font-semibold text-slate-500 dark:text-slate-50">{text}</div>
      </div>
    </>
  )
}

export default function Advantages() {
  return (
    <>
      <section>
        <h2>Advantages of JumpServer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-5">
          {
            cardData.map((card, index) => (
              <Card key={index} icon={card.icon} text={card.text} />
            ))
          }
        </div>
      </section>
    </>
  )
}