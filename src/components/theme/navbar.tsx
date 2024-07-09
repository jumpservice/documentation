import React from 'react';
import { ThemeSwitch } from 'nextra-theme-docs';
import { GitHubIcon, DiscordIcon } from '@/icons';

interface PublicNavbarProps {
  hasThemeSwitch?: boolean;
}

const PublicNavbar: React.FC<PublicNavbarProps> = ({ hasThemeSwitch = true }) => {
  return (
    <ul className="ml-2 flex gap-5 justify-center text-center items-center">
      {[
        { url: "https://github.com/jumpserver/jumpserver", icon: GitHubIcon },
        { url: "https://discord.gg/W6vYXmAQG2", icon: DiscordIcon },
      ].map(({ url, icon: Icon }) => (
        <li key={url}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors block"
          >
            <Icon className="h-5 w-auto fill-current" />
          </a>
        </li>
      ))}
      <li key="https://jumpserver.org">
        <a
          href="https://jumpserver.org"
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary transition-colors block"
        >
          <span className="h-5 w-auto fill-current text-sm">中文</span>
        </a>
      </li>
      {hasThemeSwitch && (
        <li key="theme-switch">
          <ThemeSwitch lite className="[&_span]:hidden" />
        </li>
      )}
    </ul>
  );
};

export default PublicNavbar;