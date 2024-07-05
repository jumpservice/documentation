import { 
  XPackAccountAutomationIcon,
  XPackAssetSyncIcon,
  XPackDBIcon,
  XPackOrgIcon,
  XPackRBACIcon,
  XPackRemoteAppIcon,
  XPackSSOIcon,
  XPackThemeIcon,
  XPackTicketIcon
} from "@/icons/"

const cardData = [
  { 
    icon: XPackOrgIcon, 
    title: "Multi-Organizations",
    description: "Supports resource isolation within a multi-tenant architecture."
  },
  { 
    icon: XPackRBACIcon, 
    title: "Role-Based Access Control (RBAC)",
    description: "Assigning permissions to users based on their role within an organization."
  },
  { 
    icon: XPackSSOIcon, 
    title: "Single Sign-On (SSO)",
    description: "Supports Active Directory / LDAP, SAML2, OAuth2 and OAuth/OpenID Connect.",
  },
  { 
    icon: XPackAssetSyncIcon, 
    title: "Multi-Cloud Asset Synchronization",
    description: "Supports AWS, Azure, Google Cloud Platform (GCP) and other platforms.",
  },
  { 
    icon: XPackAccountAutomationIcon, 
    title: "Account automation",
    description: "Supports automatic discovery and collection, automatic credentials updates, and automatic pushing."
  },
  { 
    icon: XPackDBIcon, 
    title: "Multiple Databases",
    description: "Supports Oracle and SQLServer."
  },
  { 
    icon: XPackRemoteAppIcon, 
    title: "Remote Application Access",
    description: "Supports connecting assets using various Microsoft Remote Applications."
  },
  { 
    icon: XPackTicketIcon, 
    title: "Ticket Management",
    description: "Support using Ticket for approval of user login, asset access and asset requests."
  },
  { 
    icon: XPackThemeIcon, 
    title: "Custom Theme",
    description: "Supports customization of theme colors, product logo, login titles, website icons, etc."
  },
];

const Card = ({ icon: IconComponent, title, description }) => {
  return (
    <>
      <div className="box-border border-spacing-1 hover:border-primary flex flex-col border rounded-lg shadow-md p-4">
        <div className="flex justify-start"><IconComponent className="w-12 h-12 object-contain" /></div>
        <div className="hover:text-primary">
          <div className="mt-3 font-sans text-left">{title}</div>
          <div className="mt-3 w-22 text-sm text-slate-500 text-left">{description}</div>
        </div>
      </div>
    </>
  )
}

export default function XPack() {
  return (
    <>
      <section>
        <h2>X-Pack Enhancement Packages</h2>
        <p>
          Compared with the Community Edition, 
          <span className="pl-3 pr-3 font-bold text-primary">JumpServer Enterprise Edition</span> 
          provides X-Pack enhancement packages and enterprise support services.  
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {
            cardData.map((card, index) => (
              <Card key={index} icon={card.icon} title={card.title} description={card.description}/>
            ))
          }
        </div>
      </section>
    </>
  )
}