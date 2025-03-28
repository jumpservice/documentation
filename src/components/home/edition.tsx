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
                <a href="https://www.lxware.hk/products/jumpserver-enterprise-edition-basic-plan" target="_blank" className="font-serif underline hover:text-primary">
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
                <a href="mailto:support@lxware.hk" className="font-serif underline hover:text-primary">Contact Sales <Icon name="send-email" /></a>
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
        <div className="mb-10 text-md">
          JumpServer EE provides  <a href="/#section-x-pack" className="font-serif text-primary hover:underline">Advanced X-Pack features</a> and <a href="/#section-support" className="font-serif text-primary hover:underline"> Enterprise support </a> for enhanced scalability, security, and reliability.
        </div>
        <TableSupport />
        <div className="mt-16 p-2 rounded-lg shadow-xl shadow-primary glow-effect">
          <div className="flex text-center justify-center text-lg theme-logo">
            <div className="px-4">
              <Icon name="xpack" />
            </div>
            <div>
              Note: To apply for a 14-day trial license of the JumpServer Enterprise Edition, please email
            </div>
            <div className="pl-2">
              <NextLink className="hover:underline ml-1 font-serif text-primary" href="mailto:support@lxware.hk">support@lxware.hk <Icon name="send" /></NextLink> .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
