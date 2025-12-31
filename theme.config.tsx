import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Logo, Footer, NavbarExtra, TOC } from "@/components/theme";
import { 
  Icon, Steps, Alert, Cards, Card, WaitForCompletion, Nav, Tabs, 
  Tab, DataTable, ApplyTrialLicense, ResourceAttributeTable
} from "@/components/docs";

interface LinkTitleProps {
  title: string;
  url: string;
}

export const LinkTitle: React.FC<LinkTitleProps> = ({ title, url }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="flex w-full items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <span>{title}</span>
      <span className="ml-auto">
        <Icon name="link-square" />
      </span>
    </div>
  );
};

const config: DocsThemeConfig = {
  components: { 
    Icon, Alert, Cards, Card,
    Steps, Nav, WaitForCompletion, 
    Tabs, Tab, DataTable, ApplyTrialLicense, ResourceAttributeTable
  },
  head: (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
      ></meta>
      <meta property="og:title" content="JumpServer" />
      <meta
        property="og:description"
        content="An open-source PAM platform (Bastion Host)"
      />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </>
  ),
  logo: Logo,
  logoLink: "https://www.jumpserver.com/",
  feedback: {
    useLink: () =>
      "https://github.com/jumpserver/jumpserver/issues/new?labels=%F0%9F%A4%94+Question&projects=&template=3_question.yml&title=%5BQuestion%5D+",
  },
  docsRepositoryBase: "https://github.com/jumpservice/documentation/tree/dev",
  search: {
    placeholder: "Search",
  },
  navbar: {
    extraContent: NavbarExtra,
  },
  sidebar: {
    // toggleButton: true,
    defaultMenuCollapseLevel: 1,
    titleComponent({ title, type }) {
      let titleComponent = <>{title}</>;
      if (type === "separator") {
        titleComponent = (
          <div className="w-full border-b pb-3 dark:border-[#262626]">
            <span className="nx-cursor-default font-semibold">{title}</span>
          </div>
        )
      }
      if (title === "DeepWiki") {
        const URL = "https://deepwiki.com/jumpserver/jumpserver/"
        titleComponent = <LinkTitle title={title} url={URL} />
      }
      return titleComponent;
    },
  },
  toc: {
    component: TOC,
  },
  primaryHue: 150,
  primarySaturation: 50,
  darkMode: false,
  useNextSeoProps() {
    const { asPath } = useRouter();
    let titleTemplate = "%s - JumpServer";
    if (asPath == "/") {
      titleTemplate = "An open-source PAM platform - JumpServer";
    }
    return {
      titleTemplate: titleTemplate,
    };
  },
  footer: {
    text: Footer,
  },
};

export default config;
