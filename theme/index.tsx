import {
  Banner,
  Layout as BasicLayout,
  NotFoundLayout as BasicNotFoundLayout,
} from "@rspress/core/theme-original";
import { useEffect } from "react";
import { useVersion } from "@rspress/core/runtime";
import releases from "../src/data/releases.json";
import Footer from "./Footer";
import NavActions from "./NavActions";

const latestForVersion = (version: string) =>
  releases.find((release) => release.version.startsWith(`${version}.`))
    ?.version ?? releases[0].version;

const Layout = () => {
  const version = useVersion() || "v5";
  const latestVersion = latestForVersion(version);
  const releaseUrl = `https://github.com/jumpserver/jumpserver/releases/tag/${latestVersion}`;

  return (
    <BasicLayout
      afterRightNavItems={<NavActions />}
      beforeNav={
        <Banner
          href={releaseUrl}
          message={`🎉 JumpServer ${latestVersion} is available. See what's new →`}
          storageKey={`jumpserver-release-${latestVersion}`}
        />
      }
      bottom={<Footer />}
    />
  );
};

const v5OnlyPrefixes = [
  "/docs/v4/features",
  "/docs/v4/roles",
  "/docs/v4/operations",
  "/docs/v4/developer-guide",
  "/docs/v4/reference",
];

const v5LegacyPrefixes = [
  "/docs/users",
  "/docs/groups",
  "/docs/assets",
  "/docs/applications",
  "/docs/authentication",
  "/docs/backup-accounts",
  "/docs/change-secrets",
  "/docs/discover-accounts",
  "/docs/push-accounts",
  "/docs/risk-detection",
  "/docs/features",
  "/docs/roles",
  "/docs/import-export",
  "/docs/notifications",
  "/docs/remoteapp",
  "/docs/security",
  "/docs/storage",
  "/docs/system-tasks",
  "/docs/troubleshooting",
  "/docs/general",
  "/docs/organizations",
  "/docs/appearance",
  "/docs/tools",
  "/docs/components",
  "/docs/configuration",
  "/docs/enable-https",
  "/docs/compare-versions",
  "/docs/changelog",
  "/docs/faq",
  "/docs/license",
  "/docs/docs-dev-guide",
  "/docs/connect-web",
];

const NotFoundLayout = () => {
  useEffect(() => {
    const { pathname } = window.location;
    const isV5OnlyPage = v5OnlyPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
    if (isV5OnlyPage) {
      window.location.replace("/docs/v4/");
      return;
    }

    const isMergedQuickstartPage = [
      "/docs/first-login",
      "/docs/console-overview",
    ].some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
    if (isMergedQuickstartPage) {
      window.location.replace("/docs/quickstart");
      return;
    }

    const isLegacyV5Page = v5LegacyPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );
    if (isLegacyV5Page) {
      window.location.replace("/docs/");
    }
  }, []);

  return <BasicNotFoundLayout />;
};

export { Layout, NotFoundLayout };

export * from "@rspress/core/theme-original";
