import { normalizeImagePath } from "@rspress/core/runtime";
import {
  DiscordIcon,
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "@/icons";

type FooterLink = {
  title: string;
  url: string;
};

const linkClassName =
  "text-sm text-white/60 transition-colors duration-200 hover:text-white";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={`${link.title}-${link.url}`}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const socialLinks = [
  {
    url: "https://github.com/jumpserver/jumpserver",
    label: "GitHub",
    icon: GitHubIcon,
  },
  {
    url: "https://x.com/lxware_x",
    label: "X",
    icon: XIcon,
  },
  {
    url: "https://www.linkedin.com/company/lingxia",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    url: "https://discord.gg/W6vYXmAQG2",
    label: "Discord",
    icon: DiscordIcon,
  },
  {
    url: "https://chat.whatsapp.com/D0oLXazgT5K3hrHEqylJHi",
    label: "WhatsApp",
    icon: WhatsAppIcon,
  },
];

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Features",
    links: [
      { title: "Overview", url: "https://www.jumpserver.com/features" },
      {
        title: "Authentication",
        url: "https://www.jumpserver.com/features#authentication",
      },
      {
        title: "Authorization",
        url: "https://www.jumpserver.com/features#authorization",
      },
      {
        title: "Account Management",
        url: "https://www.jumpserver.com/features#account-management",
      },
      { title: "Audit", url: "https://www.jumpserver.com/features#audit" },
    ],
  },
  {
    title: "Compare",
    links: [
      {
        title: "vs CyberArk",
        url: "https://www.jumpserver.com/jumpserver-vs-cyberark",
      },
      {
        title: "vs BeyondTrust",
        url: "https://www.jumpserver.com/jumpserver-vs-beyondtrust",
      },
      {
        title: "vs Teleport",
        url: "https://www.jumpserver.com/jumpserver-vs-teleport",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Blog", url: "https://www.jumpserver.com/blog" },
      { title: "Documentation", url: "https://www.jumpserver.com/docs" },
      {
        title: "Customer Stories",
        url: "https://www.jumpserver.com/categories/case-studies",
      },
      {
        title: "Gartner Peer Insights",
        url: "https://www.gartner.com/reviews/product/jumpserver",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Us", url: "https://www.jumpserver.com/about" },
      {
        title: "Security Statement",
        url: "https://www.jumpserver.com/security",
      },
      {
        title: "Privacy Policy",
        url: "https://www.jumpserver.com/privacy-policy",
      },
      {
        title: "Terms of Service",
        url: "https://www.jumpserver.com/terms-of-service",
      },
      { title: "Contact Us", url: "https://www.jumpserver.com/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-teal-mid bg-teal-deep text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="shrink-0 lg:w-[240px]">
            <a
              href="https://www.jumpserver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <img
                src={normalizeImagePath("/jumpserver-wordmark-white.svg")}
                alt="JumpServer"
                className="h-7 w-auto"
              />
            </a>
            <p className="mt-3 text-sm text-white/60">
              Open-source privileged access management platform
            </p>
            <p className="mt-2 text-xs text-white/45">
              500,000+ deployments · 30k+ GitHub Stars
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ url, label, icon: Icon }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/10 text-white/55 transition-colors duration-200 hover:border-primary/50 hover:bg-primary/25 hover:text-white"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-[18px] w-[18px] fill-current"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-12">
            {columns.map((column) => (
              <FooterColumn
                key={column.title}
                title={column.title}
                links={column.links}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-teal-mid pt-6 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Lingxia (Hong Kong) Software Co., Ltd.
            (LXware)
          </p>
        </div>
      </div>
    </footer>
  );
}
