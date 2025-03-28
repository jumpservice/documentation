import React from "react";
import { JumpServerWordmarkLogoIcon } from "@/icons";
import { ImageComponent } from "../public";
import ArrowLine from "../public/arrow-line";

const assets = [
  { name: "SSH", logo: "/svgs/linux.svg" },
  { name: "Windows", logo: "/svgs/windows.svg" },
  { name: "Kubernetes", logo: "/svgs/kubernetes.svg" },
  { name: "Database", logo: "/svgs/database.svg" },
  { name: "RemoteApp", logo: "/svgs/remote-app.svg" },
];

const securityLayers = [
  { name: "Authentication", logo: "/svgs/authentication.svg" },
  { name: "Account", logo: "/svgs/account.svg" },
  { name: "Authorization", logo: "/svgs/authorization.svg" },
  { name: "Audit", logo: "/svgs/audit.svg" },
];

const users = [
  { name: "System Admin", logo: "/svgs/system-admin.svg" },
  { name: "DBA", logo: "/svgs/dba.svg" },
  { name: "Developer", logo: "/svgs/developer.svg" },
  { name: "QA", logo: "/svgs/qa.svg" },
  { name: "...", logo: "/svgs/more.svg" },
];


const ArchitectureDiagram = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg shadow-primary">

      <div className="border border-gray-500 dark:border-gray-600 rounded-lg p-4">
        <div className="text-2xl font-semibold text-center mb-10">IT Assets</div>
        <div className="grid grid-cols-5 gap-4 text-center">
          {assets.map((item) => (
            <div key={item.name} className="flex flex-col items-center p-4 border border-black dark:border-gray-600 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src={item.logo} alt="x" />
              </div>
              <div className="mt-2 text-sm font-semibold">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex h-20 justify-center items-center">
        <svg width="300" height="200" className="text-black dark:text-white">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="7" refY="3.5" orient="auto" >
              <polygon points="0 0, 10 3.5, 0 7" fill="black" className="dark:fill-gray-400 dark:stroke-gray-400" />
            </marker>
          </defs>
          <line x1="150" y1="135" x2="150" y2="70" stroke="black" stroke-width="1" stroke-dasharray="5,5" className="dark:stroke-gray-400" markerEnd="url(#arrowhead)" />
          <line x1="150" y1="135" x2="20" y2="70" stroke="black" strokeWidth="1" stroke-dasharray="5,5" className="dark:stroke-gray-400" markerEnd="url(#arrowhead)" />
          <line x1="150" y1="135" x2="280" y2="70" stroke="black" strokeWidth="1" stroke-dasharray="5,5" className="dark:stroke-gray-400" markerEnd="url(#arrowhead)" />
        </svg>
      </div>

      <div className="border border-primary rounded-lg p-4">
        <div className="flex w-full">
          <div className="flex flex-1 justify-end pr-4">
            <JumpServerWordmarkLogoIcon className="theme-logo h-9" />
          </div>
          <div className="flex flex-1 justify-start pl-4">
            <div className="flex flex-col text-primary font-semibold text-md">
              <span className="font-bold">An open-source PAM tool</span>
              <span className="font-bold">( Bastion Host )</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center text-primary mt-4">
          {securityLayers.map((item) => (
            <div key={item.name} className="flex flex-col items-center p-4 border border-primary rounded-lg shadow">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src={item.logo} alt="x" className=""/>
              </div>
              <div className="mt-2 text-md font-bold">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="grid grid-cols-5 gap-4 text-center">
          {users.map((item) => (
            <div>
              <div className="relative flex h-20 justify-center items-center">
                <svg width="100" height="200" className="text-black dark:text-white">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="7" refY="3.5" orient="auto" >
                      <polygon points="0 0, 10 3.5, 0 7" fill="black" className="dark:fill-gray-400 dark:stroke-gray-400" />
                    </marker>
                  </defs>
                  <line x1="50" y1="135" x2="50" y2="70" stroke="black" stroke-width="1" stroke-dasharray="5,5" className="dark:stroke-gray-400" markerEnd="url(#arrowhead)" />
                </svg>
              </div>

              <div key={item.name} className="flex flex-col items-center p-4 border border-gray-500 dark:border-gray-600 rounded-lg shadow">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src={item.logo} alt="x" className=""/>
                </div>
                <div className="mt-2 text-sm font-semibold">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Architecture() {
  return (
    <>
      <div className="">
        <section>
          <h2>JumpServer Architecture</h2>
          <ArchitectureDiagram />
          <ImageComponent
            src="/images/jumpserver-overview.png"
            alt="jumpserver-overview"
            width={1000}
            height={800}
          />
        </section>
      </div>
    </>
  );
}

export default Architecture;
