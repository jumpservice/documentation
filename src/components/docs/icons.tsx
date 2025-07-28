import React from "react";
import * as LucideIcons from 'lucide-react';
import * as SvgIcons from "@/icons/lina";

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

function SvgIcon({ Icon }) {
  return (
    <span>
      <Icon className="w-4 pb-1 inline-block select-none pointer-events-none" />
    </span>
  )

}

export const iconConfig = {
  greyBan: <LucideIcons.Ban className="w-4 pb-1 inline-block text-gray-500" />,
  greenHook: <LucideIcons.Check className="w-4 pb-1 inline-block text-green-500" />,
  application: <LucideIcons.LayoutGrid className="w-4 pb-1 inline-block" />,
  riskDetection: <LucideIcons.GaugeCircleIcon className="w-4 pb-1 inline-block" />,
  changeSecret: <LucideIcons.LockKeyholeOpen className="w-4 pb-1 inline-block" />,
  discover: <LucideIcons.Search className="w-4 pb-1 inline-block" />,
  backup: <LucideIcons.Files className="w-4 pb-1 inline-block" />,
  push: <LucideIcons.Send className="w-4 pb-1 inline-block" />,
  pam: <LucideIcons.LockKeyhole className="w-4 pb-1 inline-block" />,
  settings: <LucideIcons.Settings className="w-4 pb-1 inline-block" />,
  xpack: <IconTips Icon={LucideIcons.Crown} tooltip={"Enterprise"} iconColor={"w-4 text-yellow-500 fill-yellow-500"} />,
  xpackTip: <IconTips Icon={LucideIcons.Crown} tooltip={"Enterprise"} iconColor={"w-4 text-yellow-500 fill-yellow-500"} />,
  xpackMenu: <IconTips Icon={LucideIcons.Crown} tooltip={"Enterprise"} iconColor={"w-2 text-yellow-500 fill-yellow-500"} />,
  help: <LucideIcons.CircleHelp className="w-4 pb-1 inline-block" />,
  plus: <LucideIcons.Plus className="w-4 pb-1 inline-block" />,
  "square-terminal": <LucideIcons.SquareTerminal className="w-4 pb-1 inline-block" />,
  "chevron-down": <LucideIcons.ChevronDown className="w-4 inline-block" />,
  link: <LucideIcons.ExternalLink className="w-3 mb-2 inline-block" />,
  upload: <LucideIcons.Upload className="w-4 mb-1 inline-block" />,
  x: <LucideIcons.X className="w-5 text-red-500 inline-block" />,
  download: <LucideIcons.Download className="w-4 pb-1 inline-block" />,
  "send-email": <LucideIcons.Mail className="w-3 mb-2 inline-block" />,
  send: <LucideIcons.Send className="w-3 mb-2 inline-block" />,
  "link-square": <LucideIcons.SquareArrowOutUpRight className="w-4 pb-1 inline-block" />,
  "...": <LucideIcons.Ellipsis className="w-5 h-4 inline-block text-primary border border-primary"/>,
  user: <LucideIcons.UserRound className="w-4 pb-1 inline-block" />,
  "popup-window": <IconTips Icon={LucideIcons.PictureInPicture2} tooltip={"In the pop-up window"} iconColor={"w-4 text-primary"} />,
  "*": <IconTips Icon={LucideIcons.Asterisk} tooltip={"Required"} iconColor={"w-2 pb-1 inline-block text-red-500"} />,
  "arrow-left": <LucideIcons.ArrowLeft className="w-4 pb-1 inline-block" />,
  ChevronDownWithBgColor: <LucideIcons.ChevronDown className="w-5 h-5 px-1 inline-block bg-primary text-white" />,
  Trash2: <LucideIcons.Trash2 className="w-4 pb-1 inline-block" />,
  Ban: <LucideIcons.Ban className="w-4 pb-1 inline-block" />,
  CircleCheck: <LucideIcons.CircleCheck className="w-4 pb-1 inline-block" />,
  CircleMinus: <LucideIcons.CircleMinus className="w-4 pb-1 inline-block" />,

  // svg icons
  Console: <SvgIcon Icon={SvgIcons.Console} />,
  Assets: <SvgIcon Icon={SvgIcons.Asset} />,
  Globe: <SvgIcon Icon={SvgIcons.Globe} />,
  Application: <SvgIcon Icon={SvgIcons.Application} />,
  Platform: <SvgIcon Icon={SvgIcons.Platform} />,
  Switch: <SvgIcon Icon={SvgIcons.Switch} />,
  Feature: <SvgIcon Icon={SvgIcons.Feature} />,
  UserO: <SvgIcon Icon={SvgIcons.UserO} />,
  Discovery: <SvgIcon Icon={SvgIcons.Discovery} />,
  Push: <SvgIcon Icon={SvgIcons.Push} />,
  Backup: <SvgIcon Icon={SvgIcons.Backup} />,
}

interface IconProps {
  name: "";
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return iconConfig[name]
}

export default Icon;