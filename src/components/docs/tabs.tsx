import { useState } from "react";

export function Tabs({ titlesMap, children }: { titlesMap: Record<string, string>; children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(Object.keys(titlesMap)[0]);

  return (
    <div>
      <div className="flex mt-5 border-b dark:border-gray-700 gap-4">
        {Object.entries(titlesMap).map(([key, title]) => (
          <button
            key={key}
            className={`p-2 font-bold text-sm ${activeTab === key ? 'border-b-2 border-orange-400' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="pt-2">  
        {children &&
          Array.isArray(children) &&
          children.find((child: any) => child.props.titleKey === activeTab)}
      </div>
    </div>
  );
}

export function Tab({ children }: { titleKey: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}