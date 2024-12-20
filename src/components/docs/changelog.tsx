const changelogData = [
    { date: '2024-12-20', version: 'v4.5.0'},
    { date: '2024-12-19', version: 'v4.5.0'},
    { date: "2024-11-21", version: "v4.4.0"},
    { date: "2024-10-17", version: "v4.3.0"},
    { date: "2024-09-19", version: "v4.2.0"},
    { date: "2024-08-15", version: "v4.1.0"},
    { date: "2024-08-01", version: "v4.0.2"},
    { date: "2024-07-18", version: "v4.0.1"},
    { date: "2024-07-04", version: "v4.0.0"},
  ];
  
  function ChangelogTable() {
    const baseUrl = "https://github.com/jumpserver/jumpserver/releases/";
    return (
      <div className="changelog-table">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Version</th>
              <th scope="col">Release Note</th>
            </tr>
          </thead>
          <tbody>
            {changelogData.map((log, index) => (
              <tr key={index}>
                <th scope="row">{log.date}</th>
                <td>{log.version}</td>
                <td>
                  <a href={`${baseUrl}${log.version}`} target="_blank" rel="noopener">
                    Read More →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default function Changelog() {
    return (
        <>
            <div className="changelog">
                <h1>Changelogs</h1>
                <ChangelogTable />
            </div>
        </>
    );
}
