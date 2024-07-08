import { 
  ContactEmailIcon,
  ContactTelIcon,
  ContactLinkIcon
} from "@/icons/"

const cardData = [
  {icon: ContactLinkIcon, text: "Quickstart Guide", link: "/docs/quickstart"},
  {icon: ContactEmailIcon, text: "support@fit2cloud.com", link: "mailto:support@fit2cloud.com"},
  {icon: ContactTelIcon, text: "+86 400 052 0755", link: "tel:400-052-0755"  },
]


const Card = ({icon: IconComponent, text, link}) => {
  return (
    <>
      <a href={link} className="border w-full sm:w-auto bg-text hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 text-slate-500 rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:text-white dark:bg-gray-800 dark:hover:text-primary dark:hover:border-primary  dark:focus:ring-gray-700">
          <IconComponent className="me-3 w-7 h-7" />
          <div className="text-left rtl:text-right">
              <div className="-mt-1 text-sm font-semibold">{text}</div>
          </div>
      </a>
    </>
  )
}

const Contact = () => {
  return (
    <>
      <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
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