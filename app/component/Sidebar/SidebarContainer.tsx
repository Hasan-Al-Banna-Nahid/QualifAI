"use client";

import clsx from "clsx";
import { useTheme } from "@/app/context/ThemeContext";

interface SidebarContainerProps {
  open: boolean;
  children: React.ReactNode;
}

export default function SidebarContainer({
  open,
  children,
}: SidebarContainerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 h-full w-64 flex flex-col pt-20 px-4 border-r transition-all duration-300 z-40",
        isDark
          ? "bg-slate-900 border-slate-700 text-gray-200"
          : "bg-white border-gray-200 text-gray-900",
        open ? "translate-x-0" : "-translate-x-72 md:translate-x-0"
      )}
    >
      {children}
    </aside>
  );
}
