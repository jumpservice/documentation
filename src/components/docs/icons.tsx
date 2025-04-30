import React from "react";
import { 
  Settings, Crown, CircleHelp, ArrowRightLeft, Plus, SquareTerminal, ChevronDown,
  ExternalLink, Upload, X, Download, Mail, Send, SquareArrowOutUpRight, Ellipsis, UserRound,
  PictureInPicture2, Asterisk
} from 'lucide-react';

function IconTips({ Icon, tooltip = "", iconColor = "" }) {
  if (tooltip === "") {
    return <Icon className={`${iconColor} inline-block`} />;
  } else {
    return (
      <span className="relative group inline-block">
        <Icon className={`${iconColor} inline-block cursor-pointer`} />
        <span className="absolute bottom-full left-1/2 -translate-x-1/3 mb-1 hidden group-hover:block
                        bg-primary text-white text-xs rounded px-2 py-1 whitespace-nowrap">
          {tooltip}
        </span>
      </span>
    );
  }
}

interface IconProps {
  name: "";
}

const iconConfig = {
  settings: <Settings className="w-4 pb-1 inline-block" />,
  xpack: <IconTips Icon={Crown} tooltip={"Enterprise"} iconColor={"w-4 text-yellow-500 fill-yellow-500"} />,
  xpackTip: <IconTips Icon={Crown} tooltip={"Enterprise"} iconColor={"w-4 text-yellow-500 fill-yellow-500"} />,
  xpackMenu: <IconTips Icon={Crown} tooltip={"Enterprise"} iconColor={"w-2 text-yellow-500 fill-yellow-500"} />,
  help: <CircleHelp className="w-4 pb-1 inline-block" />,
  switch: <ArrowRightLeft className="w-4 pb-1 inline-block" />,
  plus: <Plus className="w-4 pb-1 inline-block" />,
  "square-terminal": <SquareTerminal className="w-4 pb-1 inline-block" />,
  "chevron-down": <ChevronDown className="w-4 inline-block" />,
  link: <ExternalLink className="w-3 mb-2 inline-block" />,
  upload: <Upload className="w-4 mb-1 inline-block" />,
  x: <X className="w-5 text-red-500 inline-block" />,
  download: <Download className="w-4 pb-1 inline-block" />,
  "send-email": <Mail className="w-3 mb-2 inline-block" />,
  send: <Send className="w-3 mb-2 inline-block" />,
  "link-square": <SquareArrowOutUpRight className="w-4 pb-1 inline-block" />,
  "...": <Ellipsis className="w-5 h-4 inline-block text-primary border border-primary"/>,
  user: <UserRound className="w-4 pb-1 inline-block" />,
  "popup-window": <IconTips Icon={PictureInPicture2} tooltip={"In the pop-up window"} iconColor={"w-4 text-primary"} />,
  "*": <IconTips Icon={Asterisk} tooltip={"Required"} iconColor={"w-2 pb-1 inline-block text-red-500"} />
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return iconConfig[name];
}

export default Icon;