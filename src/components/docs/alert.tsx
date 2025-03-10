import React from "react";
import { clsx as cn } from "clsx";
import { Info, TriangleAlert, MessageSquareWarning, Lightbulb } from "lucide-react";

interface AlertProps {
  type?: "tip" | "note" | "warning" | "important";
  children: React.ReactNode;
}

const typeConfig = {
  tip: { title: "Tip", borderColor: "border-primary", textColor: "text-primary", icon: Lightbulb },
  note: { title: "Note", borderColor: "border-blue-500", textColor: "text-blue-500", icon: Info },
  warning: { title: "Warning", borderColor: "border-yellow-600", textColor: "text-yellow-600", icon: TriangleAlert },
  important: { title: "Important", borderColor: "border-purple-500", textColor: "text-purple-500", icon: MessageSquareWarning },
};

export const Alert: React.FC<AlertProps> = ({ type = "note", children }) => {
  const { title, borderColor, textColor, icon: Icon } = typeConfig[type];

  return (
    <div className={cn("flex border-l-4 p-2 px-4 mt-5 mb-5", `${borderColor}`)}>
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2">
          <Icon className={cn(`${textColor}`)} size={18} />
          <span className={cn("font-bold", `${textColor}`)}>{title}</span>
        </div>
        <div className="text-gray-800">{children}</div>
      </div>
    </div>
  );
};