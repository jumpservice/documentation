import React from "react";

const Steps = ({ children, stepLevel = "1"}: { children: React.ReactNode, stepLevel: string}) => {
  const stepLevelThemeMap = {
    "1": "primary",
    "2": "black",
  }
  const indexThemeMap = {
    primary: "bg-primary text-white",
    black: "bg-black text-white dark:bg-white dark:text-black ",
  }
  const borderThemeMap= {
    primary: "border-primary",
    black: "border-black dark:border-white",
  }
  const theme = stepLevelThemeMap[stepLevel];
  const indexTheme = `w-5 h-5 flex items-center justify-center rounded-full ${indexThemeMap[theme]} font-bold text-sm mt-1`
  const haveBorder = stepLevel === "2";
  const borderTheme = haveBorder ? `border-2 pl-3 border-t-2 border-b-2 mt-3 pb-3 border-dashed ${borderThemeMap[theme]}` : "";

  return (
    <div className={`steps flex flex-col gap-1 ${borderTheme}`}>
      {React.Children.map(children, (child, index) => (
        <div className="flex gap-2 mt-3">
          <div className={`${indexTheme}`}>
            {index + 1}
          </div>
          <div className="flex-1">{child}</div>
        </div>
      ))}
    </div>
  );
};


export default Steps;