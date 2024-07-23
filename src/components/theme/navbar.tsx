import React from "react";
import { ThemeSwitch } from "nextra-theme-docs";
import { GitHubIcon, DiscordIcon } from "@/icons";

interface PublicNavbarProps {
  hasThemeSwitch?: boolean;
}

const PublicNavbar: React.FC<PublicNavbarProps> = ({
  hasThemeSwitch = true,
}) => {
  return (
    <ul className="ml-2 flex items-center justify-center gap-5 text-center">
      {[
        { url: "https://github.com/jumpserver/jumpserver", icon: GitHubIcon },
        { url: "https://discord.gg/W6vYXmAQG2", icon: DiscordIcon },
      ].map(({ url, icon: Icon }) => (
        <li key={url}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="block transition-colors hover:text-primary"
          >
            <Icon className="h-5 w-auto fill-current" />
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
          <span className="h-5 w-auto fill-current text-sm">中文</span>
        </a>
      </li>
      {hasThemeSwitch && (
        <li className="hidden sm:block" key="theme-switch">
          <ThemeSwitch lite className="[&_span]:hidden" />
        </li>
      )}
    </ul>
  );
};

export default PublicNavbar;
