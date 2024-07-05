function TableSupport() {
  return (
    <>
      <table className="home-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Service Content</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Customer Support</td>
            <td>8x5 ticket and telephone support, tickets responding in 4 hours. After receiving the fault report, the engineer assists the customer in software faults troubleshooting in time through telephone support, remote access, etc.</td>
          </tr>
          <tr>
            <td>Installation and Training</td>
            <td rowSpan={2}>Professional support (such as installation, emergency assistance, software troubleshooting, training, etc.)</td>
          </tr>
          <tr>
            <td>Emergency</td>
          </tr>
          <tr>
            <td>Software Upgrade</td>
            <td>Provide patches and enhanced function packages to upgrade seamlessly, etc.</td>
          </tr>
          <tr>
            <td>Online Self-service</td>
            <td>The customer support portal keeps customers posted with the latest software features, maintenance experience, use skills, and any other related knowledge.</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}


export default function Support() {
  return (
    <>
      <section>
        <h2>Enterprise Support Services</h2>
        <TableSupport />
      </section>
    </>
  )
}