import React from "react";
import { Layers3, Monitor } from "lucide-react";
import { JumpServerWordmarkLogoIcon } from "@/icons";
import GlobeIcon from "@/icons/lina/globe.svg";

const assets = [
  { name: "SSH", logo: "/svgs/linux.svg" },
  { name: "RDP", logo: "/svgs/windows.svg" },
  { name: "VNC", icon: Monitor },
  { name: "Database", logo: "/svgs/database.svg" },
  { name: "Web", icon: GlobeIcon },
  { name: "K8s", logo: "/svgs/kubernetes.svg" },
  { name: "RemoteApp", logo: "/svgs/remote-app.svg" },
  { name: "VirtualApp", icon: Layers3, color: "text-purple-500" },
];

const securityLayers = [
  { name: "Authentication", logo: "/svgs/authentication.svg" },
  { name: "Account", logo: "/svgs/account.svg" },
  { name: "Authorization", logo: "/svgs/authorization.svg" },
  { name: "Audit", logo: "/svgs/audit.svg" },
];

const users = [
  { name: "Admin", logo: "/svgs/system-admin.svg" },
  { name: "DBA", logo: "/svgs/dba.svg" },
  { name: "Developer", logo: "/svgs/developer.svg" },
  { name: "QA", logo: "/svgs/qa.svg" },
  { name: "Other...", logo: "/svgs/more.svg" },
];

const BuiltInAIIcon = () => {
  const gradientId = React.useId();

  return (
    <svg aria-hidden="true" className="h-6 w-6 shrink-0" viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={gradientId} x1="10" y1="36" x2="38" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16D9E3" />
          <stop offset="0.55" stopColor="#A879F7" />
          <stop offset="1" stopColor="#F37BCB" />
        </linearGradient>
      </defs>
      <path
        d="M24 10.5c.5 0 .9.3 1 .8l2 7.9a4 4 0 0 0 2.9 2.9l7.9 2c1 .3 1 1.5 0 1.8l-7.9 2a4 4 0 0 0-2.9 2.9l-2 7.9c-.3 1-1.5 1-1.8 0l-2-7.9a4 4 0 0 0-2.9-2.9l-7.9-2c-1-.3-1-1.5 0-1.8l7.9-2a4 4 0 0 0 2.9-2.9l2-7.9c.1-.5.5-.8.8-.8Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m36 8 1.1 3.1L40 12l-2.9 1-1.1 3-1-3-3-1 3-1L36 8Z"
        className="group-hover:animate-pulse motion-reduce:group-hover:animate-none"
        style={{ animationDuration: "1.1s", animationDelay: "-0.55s" }}
        stroke="#F4A940"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m11 33 1 2.9 2.9 1-2.9 1-1 2.9-1-2.9-2.9-1 2.9-1L11 33Z"
        className="group-hover:animate-pulse motion-reduce:group-hover:animate-none"
        style={{ animationDuration: "1.1s" }}
        stroke="#20CDE3"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArchitectureDiagram = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg border border-gray-400 dark:border-gray-500">

      <div className="border border-gray-400 dark:border-gray-500 rounded-lg p-4">
        <div className="text-xl text-center font-bold mb-6">IT Assets</div>
        <div className="grid grid-cols-8 gap-2 text-center">
          {assets.map(({ name, icon: Icon, logo, color }) => (
            <div key={name} className="flex aspect-square w-full max-w-[7rem] min-w-0 flex-col items-center justify-center justify-self-center rounded-xl border border-gray-400 p-0.5 dark:border-gray-500">
              {Icon ? (
                <Icon aria-hidden="true" className={`w-6 h-6 ${color ?? "text-primary"}`} />
              ) : (
                <img src={logo} alt="" className="w-6 h-6 object-contain" />
              )}
              <div className="mt-2 max-w-full whitespace-nowrap text-[9.5px] font-bold leading-tight tracking-tight">{name}</div>
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

      <div className="border border-primary rounded-lg p-4 ">
        <div className="">
          <div className="flex w-full flex-wrap items-center justify-center gap-4">
            <JumpServerWordmarkLogoIcon className="h-9" />
            <div className="text-primary font-semibold text-sm text-center">
              <span className="block font-bold">Open Source PAM Platform</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center text-primary mt-4">
            {securityLayers.map((item) => (
              <div key={item.name} className="flex flex-col items-center p-3 border border-primary rounded-lg shadow">
                <div className="w-6 h-6">
                  <img src={item.logo} alt={item.name} className="max-w-full h-auto" />
                </div>
                <div className="mt-2 text-sm font-bold">{item.name}</div>
              </div>
            ))}
          </div>
          <div className="group mt-4 flex animate-ai-colors items-center justify-center gap-2 rounded-lg border border-violet-400/60 bg-ai-flow bg-[length:200%_100%] px-4 py-1.5 text-sm font-bold text-primary motion-reduce:animate-none">
            <BuiltInAIIcon />
            <span>Built-in AI</span>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {users.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              <div className="relative flex h-12 justify-center items-center">
                <svg width="100%" height="48" className="text-black dark:text-white">
                  <defs>
                    <marker id="user-arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                    </marker>
                  </defs>
                  <line x1="50%" y1="48" x2="50%" y2="16" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" markerEnd="url(#user-arrowhead)" />
                </svg>
              </div>

              <div className="flex flex-col items-center rounded-lg px-4 pt-4">
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

export const SmartArchitectureDiagram = ArchitectureDiagram;

function Architecture() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <section>
        <h2 className="text-xl font-bold text-center my-6">JumpServer Architecture</h2>
        <SmartArchitectureDiagram />
      </section>
    </div>
  );
}

export default Architecture;
