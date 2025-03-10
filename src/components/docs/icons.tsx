import React from "react";
import { Settings } from 'lucide-react';

interface IconProps {
  name: "settings";
}

const iconConfig = {
  settings: <Settings className="w-4 inline-block"/>
}

export const Icon: React.FC<IconProps> = ({ name }) => {
  return iconConfig[name];
}