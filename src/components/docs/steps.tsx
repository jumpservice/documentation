import React from "react";

export const Steps = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">
      {React.Children.map(children, (child, index) => (
        <div className="flex gap-2 mt-3 ml-1">
          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm mt-1">
            {index + 1}
          </div>
          <div className="flex-1">{child}</div>
        </div>
      ))}
    </div>
  );
};
