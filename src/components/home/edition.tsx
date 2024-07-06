function TableSupport() {
  return (
    <>
     <div className="home-table">
          <table>
              <thead>
                  <tr>
                      <th scope="col">
                        SKU
                      </th>
                      <th scope="col">
                        Number of IT assets
                      </th>
                      <th scope="col">
                        Deployment Methods Supported
                      </th>
                      <th scope="col">
                        How to Order
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <th scope="row">
                        Basic
                      </th>
                      <td>
                        50 
                      </td>
                      <td>
                        Standalone
                      </td>
                      <td>
                        3 years Subscription
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">
                        Standard 
                      </th>
                      <td>
                        500 
                      </td>
                      <td>
                        Standalone / Active-standby
                      </td>
                      <td>
                        Annual Subscription
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">
                        Professional 
                      </th>
                      <td>
                        5000 
                      </td>
                      <td>
                        Standalone / Active-standby
                      </td>
                      <td>
                        Annual Subscription
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">
                        Ultimate
                      </th>
                      <td>
                        Unlimited
                      </td>
                      <td>
                        Standalone / Active-standby / High availability
                      </td>
                      <td>
                        Annual Subscription
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </>
  );
}

export default function Edition() {
  return (
    <>
      <section>
        <h2>JumpServer Enterprise Edition SKUs</h2>
        <TableSupport />
      </section>
    </>
  )
}