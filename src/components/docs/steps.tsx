import React from "react";

const Steps = ({
  children,
  stepLevel = "1",
}: {
  children: React.ReactNode;
  stepLevel: string;
}) => {
  const stepClassMapper = {
    "1": "mt-5",
    "2": "",
  };
  const stepIndexClassMapper = {
    "1": "w-6 h-6 text-xs mt-0.5",
    "2": "w-5 h-5 text-[11px] mt-1",
  };
  return (
    <div className={`steps flex flex-col gap-1 ${stepClassMapper[stepLevel]}`}>
      {React.Children.map(children, (child, index) => (
        <div className="mt-3 flex gap-3">
          <div
            className={`flex flex-shrink-0 select-none items-center justify-center rounded-full bg-brand-soft font-semibold text-brand-dark dark:bg-teal-mid dark:text-brand-light ${stepIndexClassMapper[stepLevel]}`}
          >
            {index + 1}
          </div>
          <div className="flex-1">{child}</div>
        </div>
      ))}
    </div>
  );
};

export default Steps;
