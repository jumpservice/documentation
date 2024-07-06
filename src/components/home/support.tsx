function TableSupport() {
  return (
    <>
      <div className="home-table">
          <table>
              <thead>
                  <tr>
                      <th scope="col">
                        Item
                      </th>
                      <th scope="col">
                        Service Content 
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <th scope="row">
                        Customer Support
                      </th>
                      <td>
                        8x5 ticket and telephone support, tickets responding in 4 hours. After receiving the fault report, the engineer assists the customer in software faults troubleshooting in time through telephone support, remote access, etc.
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">
                        Installation and Training
                      </th>
                      <td>
                        Professional support (such as installation, assistance, software troubleshooting, training, etc.)
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">
                        Emergency
                      </th>
                      <td>
                        Professional support (such as emergency assistance, software troubleshooting, training, etc.)
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">
                        Software Upgrade
                      </th>
                      <td>
                        Provide patches and enhanced function packages to upgrade seamlessly, etc.
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">
                        Online Self-service
                      </th>
                      <td>
                        The customer support portal keeps customers posted with the latest software features, maintenance experience, use skills, and any other related knowledge.
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
      <section>
        <h2>Enterprise Support Services</h2>
        <TableSupport />
      </section>
    </>
  )
}