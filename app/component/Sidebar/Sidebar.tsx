"use client";

import { useState } from "react";
import SidebarContainer from "./SidebarContainer";
import SidebarToggle from "./SidebarToggle";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  routes: {
    name: string;
    href: string;
    icon?: React.ReactNode;
    show?: boolean;
  }[];
}

export default function Sidebar({ routes }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SidebarToggle open={open} setOpen={setOpen} />

      <SidebarContainer open={open}>
        <div className="flex flex-col space-y-2 font-bold">
          {routes.map(
            (route) =>
              route.show !== false && (
                <SidebarItem
                  key={route.href}
                  name={route.name}
                  href={route.href}
                  icon={route.icon}
                />
              )
          )}
        </div>
      </SidebarContainer>
    </>
  );
}
