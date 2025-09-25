import NextLink from "next/link";
import Icon from "../docs/icons";
import ApplyTrialLicense from "../docs/apply-trial-license";

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
                <div className="flex flex-col gap-2">
                  <a href="https://www.lxware.hk/products/jumpserver-enterprise-edition-basic-plan" target="_blank" className="hover:underline hover:text-primary">
                    Buy Now <Icon name="link" />
                  </a>
                  <a href="https://aws.amazon.com/marketplace/pp/prodview-vapdbpzpdbjam" target="_blank" className="hover:underline hover:text-primary">
                    Buy With AWS <Icon name="link" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Standard</th>
              <td>500</td>
              <td>Standalone | Active-Standby</td>
              <td>Annual Subscription</td>
              <td rowSpan={3} className="border-l dark:border-l dark:border-gray-700">
                <a href="mailto:sales@lxware.hk" className="hover:underline hover:text-primary">Contact Sales <Icon name="send-email" /></a>
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
        <TableSupport />
        <ApplyTrialLicense showBorder={false} />
      </section>
    </>
  );
}
