import React from "react";
import { JumpServerWordmarkLogoIcon } from "@/icons";

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
  { name: "Other...", logo: "/svgs/more.svg" },
];

const ArchitectureDiagram = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-md shadow-primary/90">

      <div className="border border-gray-500 dark:border-gray-400 rounded-lg p-4">
        <div className="text-xl font-serif text-center mb-6">IT Assets</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {assets.map((item) => (
            <div key={item.name} className="flex flex-col items-center p-4 border border-black dark:border-gray-400 rounded-lg">
              <div className="w-8 h-8">
                <img src={item.logo} alt={item.name} className="max-w-full h-auto" />
              </div>
              <div className="mt-2 text-sm font-semibold">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex h-20 justify-center items-center">
        <svg width="100%" height="110" className="text-black dark:text-white">
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
            </marker>
          </defs>
          <line x1="50%" y1="80" x2="50%" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
          <line x1="50%" y1="80" x2="10%" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
          <line x1="50%" y1="80" x2="90%" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
        </svg>
      </div>

      <div className="border border-primary rounded-lg p-4 shadow-[0_0_10px_3px] shadow-primary">
        <div className="theme-logo">
          <div className="flex w-full flex-wrap justify-center gap-4">
            <JumpServerWordmarkLogoIcon className="h-9" />
            <div className="text-primary font-semibold text-md text-center">
              <span className="block font-bold">An open-source PAM tool</span>
              <span className="block font-bold">( Bastion Host )</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center text-primary mt-4">
            {securityLayers.map((item) => (
              <div key={item.name} className="flex flex-col items-center p-4 border border-primary rounded-lg shadow">
                <div className="w-8 h-8">
                  <img src={item.logo} alt={item.name} className="max-w-full h-auto" />
                </div>
                <div className="mt-2 text-md font-bold">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {users.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              <div className="relative flex h-18 justify-center items-center">
                <svg width="100%" height="80" className="text-black dark:text-white">
                  <defs>
                    <marker id="user-arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                    </marker>
                  </defs>
                  <line x1="50%" y1="80" x2="50%" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" markerEnd="url(#user-arrowhead)" />
                </svg>
              </div>

              <div className="p-4 flex flex-col items-center rounded-lg">
                <div className="w-8 h-8">
                  <img src={item.logo} alt={item.name} className="max-w-full h-auto" />
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
    <div className="max-w-6xl mx-auto px-4">
      <section>
        <h2 className="text-xl font-bold text-center my-6">JumpServer Architecture</h2>
        <ArchitectureDiagram />
      </section>
    </div>
  );
}

export default Architecture;