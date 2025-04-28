import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Logo, Footer, NavbarExtra } from "@/components/theme";
import NextLink from "next/link";
import { 
  Icon, Steps, Alert, Cards, Card, WaitForCompletion, Nav, Tabs, Tab, HorizontalTable, DataTable, ApplyTrialLicense
} from "@/components/docs";


const config: DocsThemeConfig = {
  components: { 
    Icon, Alert, Cards, Card,
    Steps, Nav, WaitForCompletion, 
    Tabs, Tab, HorizontalTable, DataTable, ApplyTrialLicense
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
        content="An open-source PAM tool (Bastion Host)"
      />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </>
  ),
  logo: Logo,
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
    toggleButton: true,
    defaultMenuCollapseLevel: 1,
    titleComponent({ title, type}) {
      let titleComponent = <>{title}</>;
      if (type === "divider") {
        titleComponent = <span className="nx-cursor-default">--------------</span>;
      }
      if (type === "separator") {
        titleComponent = <span className="nx-cursor-default">{title}</span>;
      }
      if (title.startsWith("xpack.")) {
        titleComponent = (
          <div className="flex items-center gap-1">
            <Icon name="xpack"/>
            {title.replace("xpack.", "")}
          </div>
        );
      }
      if (title.startsWith("link.")) {
        titleComponent = (
          <div className="flex w-full items-center gap-2" onClick={() => {window.open('https://deepwiki.com/jumpserver/jumpserver/', '_blank')}} >
            {title.replace("link.", "")}
            <Icon name="link"/>
          </div>
        )
      }
      return titleComponent;
    },
  },
  toc: {
    backToTop: true,
  },
  primaryHue: 150,
  primarySaturation: 50,
  darkMode: true,
  useNextSeoProps() {
    const { asPath } = useRouter();
    let titleTemplate = "%s - JumpServer";
    if (asPath == "/") {
      titleTemplate = "An open-source PAM tool - JumpServer";
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
