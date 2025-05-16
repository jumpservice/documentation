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
                <a href="https://www.lxware.hk/products/jumpserver-enterprise-edition-basic-plan" target="_blank" className="underline hover:text-primary">
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
                <a href="mailto:sales@lxware.hk" className="underline hover:text-primary">Contact Sales <Icon name="send-email" /></a>
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
          JumpServer EE provides  <a href="/#section-x-pack" className="text-primary hover:underline">Advanced X-Pack features</a> and <a href="/#section-support" className="text-primary hover:underline"> Enterprise support </a> for enhanced scalability, security, and reliability.
        </div>
        <TableSupport />
        <div className="grid grid-cols-[4%_auto] mt-16 p-2 items-start justify-start">
          <div className="">
            <Icon name="xpack" />
          </div>
          <div className="text-lg">
            Note: To apply for a <span className="text-nowrap">14-day</span> trial license of the JumpServer Enterprise Edition, please email
            <NextLink className="hover:underline text-nowrap ml-1 text-primary hover" href="mailto:sales@lxware.hk">sales@lxware.hk <Icon name="send" /></NextLink>.
          </div>
        </div>
      </section>
    </>
  );
}
