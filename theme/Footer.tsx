import { Link } from "@rspress/core/theme-original";
import { normalizeImagePath, useVersion } from "@rspress/core/runtime";
import { DiscordIcon, GitHubIcon, XIcon } from "@/icons";

type FooterLink = {
  title: string;
  url: string;
  external?: boolean;
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
            {link.external ? (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                {link.title}
              </a>
            ) : (
              <Link href={link.url} className={linkClassName}>
                {link.title}
              </Link>
            )}
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
    url: "https://discord.gg/W6vYXmAQG2",
    label: "Discord",
    icon: DiscordIcon,
  },
  { url: "https://x.com/lxware_x", label: "X", icon: XIcon },
];

export default function Footer() {
  const version = useVersion();
  const isV4 = version === "v4";

  const documentation: FooterLink[] = [
    { title: "Introduction", url: "/" },
    { title: "Quickstart", url: "/quickstart" },
    { title: "Installation", url: "/installation" },
    { title: "Upgrade", url: "/upgrade" },
  ];

  const features: FooterLink[] = isV4
    ? [
        { title: "Users", url: "/users/create-user" },
        { title: "Assets", url: "/assets/create-web" },
        { title: "Applications", url: "/applications/create-application" },
        { title: "Authentication", url: "/authentication/basic" },
        { title: "Security", url: "/security/auth-security" },
      ]
    : [
        { title: "Console", url: "/features/console/" },
        { title: "PAM", url: "/features/pam/" },
        { title: "Audits", url: "/features/audits/" },
        { title: "Workbench", url: "/features/workbench/" },
        { title: "System Settings", url: "/features/system-settings/" },
      ];

  const roles: FooterLink[] = [
    { title: "Administrator", url: "/roles/administrator" },
    { title: "Operator", url: "/roles/operator" },
    { title: "Auditor", url: "/roles/auditor" },
  ];

  const resources: FooterLink[] = isV4
    ? [
        { title: "Changelog", url: "/changelog" },
        { title: "FAQ", url: "/faq" },
        { title: "Compare Editions", url: "/compare-versions" },
        { title: "License", url: "/license" },
        { title: "Pricing", url: "https://www.jumpserver.com/pricing", external: true },
        { title: "Free Trial", url: "https://www.jumpserver.com/free-trial", external: true },
      ]
    : [
        { title: "Changelog", url: "/reference/changelog" },
        { title: "FAQ", url: "/reference/faq" },
        { title: "Compare Editions", url: "/reference/compare-editions" },
        { title: "License", url: "/reference/license" },
        { title: "Pricing", url: "https://www.jumpserver.com/pricing", external: true },
        { title: "Free Trial", url: "https://www.jumpserver.com/free-trial", external: true },
      ];

  return (
    <footer className="mt-24 border-t border-teal-mid bg-teal-deep text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
        <div
          className={`grid gap-12 ${
            isV4
              ? "lg:grid-cols-[1.25fr_repeat(3,1fr)]"
              : "lg:grid-cols-[1.25fr_repeat(4,1fr)]"
          }`}
        >
          <div>
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
            <p className="mt-4 max-w-[240px] text-sm leading-6 text-white/60">
              Open-source privileged access management platform.
            </p>
            <p className="mt-2 max-w-[240px] text-xs leading-5 text-white/45">
              500,000+ deployments · 30k+ GitHub stars
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map(({ url, label, icon: Icon }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/10 text-white/60 transition-colors duration-200 hover:border-primary/50 hover:bg-primary/25 hover:text-white"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-[18px] w-[18px] fill-current"
                  />
                </a>
              ))}
              <a
                href="https://jumpserver.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[38px] items-center justify-center rounded-[10px] border border-white/10 px-3 text-xs text-white/60 transition-colors duration-200 hover:border-primary/50 hover:bg-primary/25 hover:text-white"
              >
                中文
              </a>
            </div>
          </div>

          <FooterColumn title="Documentation" links={documentation} />
          <FooterColumn
            title={isV4 ? "Administration" : "Features"}
            links={features}
          />
          {!isV4 && <FooterColumn title="Roles" links={roles} />}
          <FooterColumn title="Resources" links={resources} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <a
              className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white"
              href="https://lxware.hk"
              target="_blank"
              rel="noopener noreferrer"
            >
              LXware
            </a>
            , Inc. All rights reserved.
          </p>
          <a
            href="https://www.jumpserver.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            www.jumpserver.com
          </a>
        </div>
      </div>
    </footer>
  );
}
