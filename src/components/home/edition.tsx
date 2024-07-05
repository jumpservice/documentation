function TableSupport() {
  return (
    <>
      <table className="home-table edition-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Number of IT assets</th>
            <th>Deployment Methods Supported</th>
            <th>How to Order</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basic</td>
            <td>50</td>
            <td>Standalone</td>
            <td>3 years Subscription</td>
          </tr>
          <tr>
            <td>Standard</td>
            <td>500</td>
            <td>Standalone <br/> Active-standby</td>
            <td rowSpan={3}>Annual Subscription</td>
          </tr>
          <tr>
            <td>Professional</td>
            <td>5000</td>
            <td>Standalone <br/> Active-standby</td>
          </tr>
          <tr>
            <td>Ultimate</td>
            <td>Unlimited</td>
            <td>Standalone <br/> Active-standby <br/> High availability</td>
          </tr>
        </tbody>
      </table>
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