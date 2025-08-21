import React from "react";

const Steps = ({ children, stepLevel = "1"}: { children: React.ReactNode, stepLevel: string}) => {
  const stepClassMapper = {
    "1": "mt-5",
    "2": ""
  };
  const stepIndexClassMapper = {
    "1": "w-5 h-5 text-md mt-1 font-semibold text-black dark:text-white",
    "2": "w-5 h-5 text-sm mt-1 text-black dark:text-white",
  }
  return (
    <div className={`steps flex flex-col gap-1 ${stepClassMapper[stepLevel]}`}>
      {React.Children.map(children, (child, index) => (
        <div className="flex gap-2 mt-3">
          <div className={ 
              `flex items-center justify-center rounded-full select-none flex-shrink-0 ${stepIndexClassMapper[stepLevel]}` 
            } 
          >
            {index + 1}{stepLevel === "1" ? "." : "."}
          </div>
          <div className="flex-1">{child}</div>
        </div>
      ))}
    </div>
  );
};


export default Steps;