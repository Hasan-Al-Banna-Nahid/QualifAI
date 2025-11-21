"use client";

import clsx from "clsx";
import { useTheme } from "@/app/context/ThemeContext";
import { IoMenu, IoClose } from "react-icons/io5";

export default function SidebarToggle({ open, setOpen }: any) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={clsx(
        "md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg",
        isDark ? "bg-slate-800 text-white" : "bg-white text-gray-900"
      )}
      onClick={() => setOpen(!open)}
    >
      {open ? <IoClose size={26} /> : <IoMenu size={26} />}
    </button>
  );
}
