import React from "react";
import { clsx as cn } from "clsx";
import {
  Info,
  TriangleAlert,
  MessageSquareWarning,
  Lightbulb,
  CircleX,
  Crown,
  ArrowUpRight,
} from "lucide-react";

interface AlertProps {
  type?: "tip" | "note" | "warning" | "important" | "error" | "xpack";
  children: React.ReactNode;
}

interface TypeConfig {
  title: string;
  borderColor: string;
  textColor: string;
  fillColor?: string;
  icon: React.ElementType;
}

const typeConfig: Record<AlertProps["type"], TypeConfig> = {
  tip: {
    title: "Tip",
    borderColor: "border-primary",
    textColor: "text-primary",
    icon: Lightbulb,
  },
  note: {
    title: "Note",
    borderColor: "border-accent-blue",
    textColor: "text-accent-blue",
    icon: Info,
  },
  warning: {
    title: "Warning",
    borderColor: "border-accent-orange",
    textColor: "text-accent-orange",
    icon: TriangleAlert,
  },
  important: {
    title: "Important",
    borderColor: "border-accent-purple",
    textColor: "text-accent-purple",
    icon: MessageSquareWarning,
  },
  error: {
    title: "Error",
    borderColor: "border-[#C2413A]",
    textColor: "text-[#C2413A]",
    icon: CircleX,
  },
  xpack: {
    title: "Enterprise Edition",
    borderColor: "border-[#D99A2B]",
    textColor: "text-[#D99A2B]",
    fillColor: "",
    icon: Crown,
  },
};

const Alert: React.FC<AlertProps> = ({ type = "tip", children }) => {
  const {
    title,
    borderColor,
    textColor,
    fillColor = "",
    icon: Icon,
  } = typeConfig[type];

  const isXpack = type === "xpack";

  return (
    <div
      className={cn(
        "my-5 flex rounded-lg border px-4",
        isXpack
          ? "rounded-xl border-l-[3px] border-[#E8C98A] border-l-[#D99A2B] bg-[#FFFBF4] py-3.5 dark:border-[#7A5C24] dark:border-l-[#D99A2B] dark:bg-[#2C2516]"
          : "border-l-2 bg-surface py-3 dark:bg-teal-mid/30",
        !isXpack && borderColor,
      )}
    >
      <div className="flex flex-1 flex-col gap-1">
        {isXpack ? (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FDF1D8] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A66B12] dark:bg-[#4A3A1A] dark:text-[#F2C46D]">
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {title}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <Icon className={cn(textColor, fillColor)} size={16} />
            <span className={cn("text-sm font-semibold", textColor)}>
              {title}
            </span>
          </div>
        )}
        <div
          className={cn(
            "text-sm leading-6 text-slate dark:text-white/75",
            isXpack && "text-[#5E4A25] dark:text-white/75",
          )}
        >
          {children}
        </div>
        {isXpack && (
          <a
            href="https://www.jumpserver.com/free-trial"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold text-[#A66B12] !no-underline hover:!underline dark:text-[#F2C46D]"
          >
            Request 14-day free trial
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};

export default Alert;
