import React from "react";
// import { ThemeSwitch } from "nextra-theme-docs";
import ThemeSwitch from "@/components/public/theme-switch";
import { GitHubIcon, DiscordIcon, XIcon } from "@/icons";

const NavbarExtra = () => {
  return (
    <ul className="ml-2 flex items-center justify-center gap-4 text-center">
      {[
        { url: "https://github.com/jumpserver/jumpserver", icon: GitHubIcon },
        { url: "https://discord.gg/W6vYXmAQG2", icon: DiscordIcon },
        { url: "https://x.com/lxware_x", icon: XIcon },
      ].map(({ url, icon: Icon }) => (
        <li key={url}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="block transition-colors hover:text-primary"
          >
            <Icon className="h-6 w-auto fill-current" />
          </a>
        </li>
      ))}
      <li className="hidden sm:block" key="https://jumpserver.org">
        <a
          href="https://jumpserver.org"
          target="_blank"
          rel="noreferrer"
          className="block transition-colors hover:text-primary"
        >
          <span className="h-6 w-auto fill-current text-sm font-serif">中文</span>
        </a>
      </li>
      <li className="hidden sm:block" key="theme-switch">
        <ThemeSwitch />
      </li>
    </ul>
  );
};

export default NavbarExtra;
