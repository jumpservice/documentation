import React from "react";
import Icon from "./icons";
import { iconConfig } from "./icons"; // 需要将 iconConfig 导出

const AllIcons: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.keys(iconConfig).map((key) => (
        <div key={key} className="flex items-center space-x-2">
          <Icon name={key} />
          <span className="text-xs">{key}</span>
        </div>
      ))}
    </div>
  );
};

export default AllIcons;