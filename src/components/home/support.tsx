function TableSupport() {
  return (
    <>
      <div className="home-table">
        <table>
          <thead>
            <tr>
              <th scope="col" className="w-[30%] text-center">Service</th>
              <th scope="col" className="text-center">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="text-center">Customer Support</th>
              <td>
                Provides 8×5 email support. Upon receiving a fault report, engineers promptly assist customers in troubleshooting to ensure stable product operation.
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">Software Upgrade</th>
              <td>
                Provides the latest version of the Enterprise Edition offline installation package and enhanced features package <span className="text-nowrap">(X-Pack)</span>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function Support() {
  return (
    <>
      <section id="section-support">
        <h2>Enterprise Support Services</h2>
        <TableSupport />
      </section>
    </>
  );
}
