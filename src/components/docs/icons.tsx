import React from "react";
import { 
  Settings, Crown, CircleHelp, ArrowRightLeft, Plus, SquareTerminal
} from 'lucide-react';

function IconTips({ Icon, tooltip = "", iconColor = "" }) {
  if (tooltip === "") {
    return <Icon className={`w-4 inline-block ${iconColor}`} />;
  } else {
    return (
      <div className="relative group inline-block">
        <Icon className={`w-4 inline-block cursor-pointer ${iconColor}`} />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block
                        bg-primary text-white text-xs rounded px-2 py-1 whitespace-nowrap">
          {tooltip}
        </span>
      </div>
    );
  }
}

interface IconProps {
  name: "settings"| "help" | "xpack" | "xpackTip" | "switch";
}

const iconConfig = {
  settings: <Settings className="w-4 pb-1 inline-block" />,
  xpack: <IconTips Icon={Crown} iconColor={"text-yellow-500 fill-yellow-500"} />,
  xpackTip: <IconTips Icon={Crown} tooltip={"Enterprise"} iconColor={"text-yellow-500 fill-yellow-500"} />,
  help: <CircleHelp className="w-4 pb-1 inline-block" />,
  switch: <ArrowRightLeft className="w-4 pb-1 inline-block" />,
  plus: <Plus className="w-4 pb-1 inline-block" />,
  "square-terminal": <SquareTerminal className="w-4 pb-1 inline-block" />,
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return iconConfig[name];
}

export default Icon;