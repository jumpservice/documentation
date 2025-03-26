import NextLink from "next/link";
import Icon from "../docs/icons";

function TableSupport() {
  return (
    <>
      <div className="home-table">
        <table>
          <thead>
            <tr>
              <th scope="col">SKU</th>
              <th scope="col">Maximum IT Assets</th>
              <th scope="col">Deployment</th>
              <th scope="col">Subscription</th>
              <th scope="col">Purchase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Basic</th>
              <td>50</td>
              <td>Standalone</td>
              <td>Annual Subscription</td>
              <td className="border-l dark:border-l dark:border-gray-700">
                {/* TODO: add link to purchase page */}
                <a href="https://www.lxware.hk/" target="_blank" className="underline hover:text-primary">
                  Buy Now <Icon name="link" />
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">Standard</th>
              <td>500</td>
              <td>Standalone | Active-Standby</td>
              <td>Annual Subscription</td>
              <td rowSpan={3} className="border-l dark:border-l dark:border-gray-700">
                <a href="mailto:support@lxware.hk" className="underline hover:text-primary">Contact Sales <Icon name="send-email" /></a>
              </td>
            </tr>
            <tr>
              <th scope="row">Professional</th>
              <td>5000</td>
              <td>Standalone | Active-Standby</td>
              <td>Annual Subscription</td>
            </tr>
            <tr>
              <th scope="row">Ultimate</th>
              <td>Unlimited</td>
              <td>Standalone | Active-Standby | High Availability</td>
              <td>Annual Subscription</td>
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
      <section id="section-edition">
        <h2>JumpServer Enterprise Edition</h2>
        <p className="mb-10">
          Compared with the Community Edition,
          <span className="pl-3 pr-3 font-bold text-primary">
            JumpServer Enterprise Edition
          </span>
          provides X-Pack enhancement packages and enterprise support services.
        </p>
        <TableSupport />
        <p className="mt-10">
          <span className="text-lg">
            Note: To apply for a 14-day trial license of the JumpServer Enterprise Edition, please email
            <NextLink className="underline ml-1 text-primary" href="mailto:support@lxware.hk">support@lxware.hk</NextLink>
          </span>
        </p>
      </section>
    </>
  );
}
