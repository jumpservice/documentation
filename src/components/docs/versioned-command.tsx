import { CodeBlockRuntime } from "@rspress/core/theme";
import { useVersion } from "@rspress/core/runtime";
import releases from "@/data/releases.json";

const latestForVersion = (version: string) =>
  releases.find((release) => release.version.startsWith(`${version}.`))?.version ??
  releases[0].version;

export default function VersionedCommand({ template }: { template: string }) {
  const version = useVersion() || "v5";
  const latestVersion = latestForVersion(version);
  const command = template.replace(/\{version\}/g, latestVersion);

  return <CodeBlockRuntime lang="sh" code={command} wrapCode />;
}
