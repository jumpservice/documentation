import { 
  ContactEmailIcon,
  ContactTelIcon,
  ContactLinkIcon
} from "@/icons/"

const cardData = [
  {icon: ContactLinkIcon, text: "Quick Start Guide", link: "/docs/quick-start"},
  {icon: ContactEmailIcon, text: "support@fit2cloud.com", link: "mailto:support@fit2cloud.com"},
  {icon: ContactTelIcon, text: "+86 400 052 0755", link: "tel:400-052-0755"  },
]


const Card = ({icon: IconComponent, text, link}) => {
  return (
    <>
      <div className="border px-4 py-2 flex rounded-md items-center hover:shadow-lg hover:border-primary hover:text-primary">
        <IconComponent className="w-8 h-8 mr-2" />
        <div className="text-center">
          <a href={link}>{text}</a>
        </div>
      </div>
    </>
  )
}

const Contact = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {
          cardData.map((card, index) => (
            <Card key={index} icon={card.icon} text={card.text} link={card.link}/>
          ))
        }
      </div>
    </>
  )
}

export default function ContactUs() {
  return (
    <>
      <section>
        <h2>CONTACT INFO</h2>
        <Contact />
      </section>
    </>
  )
}