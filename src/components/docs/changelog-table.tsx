import { useVersion } from "@rspress/core/runtime";
import DataTable from "./datatable";
import { changelogData } from "./changelog";

const headers = ["Version", "Date", "Release Note"];

export default function ChangelogTable() {
  const version = useVersion() || "v5";
  const prefix = `${version}.`;
  const rows = changelogData
    .filter((release) => release.version.startsWith(prefix))
    .map((release) => [
      { content: release.version },
      { content: release.date },
      {
        content: "Read More",
        link: `https://github.com/jumpserver/jumpserver/releases/${release.version}`,
      },
    ]);

  return <DataTable headers={headers} rows={rows} />;
}
