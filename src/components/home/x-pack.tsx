import {
  XPackAccountAutomationIcon,
  XPackAssetSyncIcon,
  XPackDBIcon,
  XPackOrgIcon,
  XPackRBACIcon,
  XPackRemoteAppIcon,
  XPackSSOIcon,
  XPackThemeIcon,
  XPackTicketIcon,
} from "@/icons/";

import Icon from "../docs/icons";

const cardData = [
  {
    icon: XPackOrgIcon,
    title: "Multi-Organizations",
    description: "Supports resource isolation with multi-tenant architecture.",
  },
  {
    icon: XPackRBACIcon,
    title: "Role-Based Access Control",
    description:
      "Assigning permissions to users based on their role within an organization.",
  },
  {
    icon: XPackSSOIcon,
    title: "Single Sign-On (SSO)",
    description: "Supports Active Directory / LDAP, SAML2, OAuth2 and OAuth/OpenID Connect.",
    href: "/docs/system-settings/authentication",
  },
  {
    icon: XPackAssetSyncIcon,
    title: "Multi-Cloud Asset Synchronization",
    description:
      "Supports AWS, Azure, Google Cloud Platform (GCP) and other platforms.",
  },
  {
    icon: XPackAccountAutomationIcon,
    title: "Account automation",
    description:
      "Supports automatic discovery and collection, automatic credentials updates.",
  },
  {
    icon: XPackDBIcon,
    title: "More Databases Support",
    description: "Supports Oracle and SQL Server, etc.",
  },
  {
    icon: XPackRemoteAppIcon,
    title: "Remote Application Access",
    description:
      "Supports connecting assets using various Microsoft Remote Applications.",
  },
  {
    icon: XPackTicketIcon,
    title: "Ticket Management",
    description:
      "Support using Ticket for approval of user login, asset access requests.",
  },
  {
    icon: XPackThemeIcon,
    title: "Custom Theme",
    description: "Supports customization of theme colors, product logo, etc.",
  },
];

const Card = ({ icon: IconComponent, title, description, href }) => {
  return (
    <>
      <a href={href} 
        target="_blank"
        onClick={(e) => { if (!href) e.preventDefault(); }}
        className="box-border flex border-spacing-1 flex-col rounded-lg border p-4 shadow-md hover:border-primary dark:bg-gray-800 group"
      >
        <div className="relative flex justify-start">
          <IconComponent className="h-8 w-8 object-contain" />
          { href &&
            <div className="absolute top-0 right-0 hidden group-hover:block group-hover:text-primary">
              <Icon name="link-square" />
            </div>
          }
        </div>
        <div className="">
          <div className="mt-3 text-left font-bold text-primary">{title}</div>
          <div className="w-22 mt-3 text-left text-sm font-semibold text-slate-500 dark:text-slate-50">
            {description}
          </div>
        </div>
      </a>
    </>
  );
};

const FeatureList = () => {
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cardData.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            title={card.title}
            href={card.href || ""}
            description={card.description}
          />
        ))}
      </div>
    </>
  );
};

export default function XPack() {
  return (
    <>
      <section id="section-x-pack">
        <h2>X-Pack Enhancement Packages</h2>
        <FeatureList />
      </section>
    </>
  );
}
