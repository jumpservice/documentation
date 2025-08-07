import React from "react";
import { clsx as cn } from "clsx";
import { Info, TriangleAlert, MessageSquareWarning, Lightbulb, CircleX } from "lucide-react";

interface AlertProps {
  type?: "tip" | "note" | "warning" | "important" | "error";
  children: React.ReactNode;
}

const typeConfig = {
  tip: { title: "Tip", borderColor: "border-primary", textColor: "text-primary", icon: Lightbulb },
  note: { title: "Note", borderColor: "border-blue-500", textColor: "text-blue-500", icon: Info },
  warning: { title: "Warning", borderColor: "border-yellow-600", textColor: "text-yellow-600", icon: TriangleAlert },
  important: { title: "Important", borderColor: "border-purple-500", textColor: "text-purple-500", icon: MessageSquareWarning },
  error: { title: "Error", borderColor: "border-red-800", textColor: "text-red-800", icon: CircleX },
};

const Alert: React.FC<AlertProps> = ({ type = "tip", children }) => {
  const { title, borderColor, textColor, icon: Icon } = typeConfig[type];

  return (
    <div className={cn("flex border-l-4 py-2 px-4 mt-5 mb-5 ", `${borderColor}`)}>
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2">
          <Icon className={cn(`${textColor}`)} size={18} />
          <span className={cn("font-bold", `${textColor}`)}>{title}</span>
        </div>
        <div className="text-gray-800 dark:text-white">{children}</div>
      </div>
    </div>
  );
};

export default Alert;