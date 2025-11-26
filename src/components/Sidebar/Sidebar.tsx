"use client";

import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import type { SetStateAction } from "react";
import { Sidebar as SidebarRoot, SidebarBody } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebarStore } from "@/store/sidebarStore";
import { usePathname } from "next/navigation";
import { navSections, getInitialActiveItemKey } from "./constants";
import { SidebarContent } from "./SidebarContent";

const Sidebar = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isOpen);
  const setSidebarOpen = useSidebarStore((state) => state.setOpen);
  const pathname = usePathname();
  
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      navSections.forEach((section) => {
        section.items.forEach((item) => {
          if (item.children) {
            initial[item.label] = Boolean(item.active);
          }
        });
      });
      return initial;
    }
  );
  
  const [activeItemKey, setActiveItemKey] = useState<string>(() =>
    getInitialActiveItemKey(pathname)
  );

  useEffect(() => {
    setActiveItemKey(getInitialActiveItemKey(pathname));
  }, [pathname]);

  const handleSetOpen = (value: SetStateAction<boolean>) => {
    setSidebarOpen(
      typeof value === "function"
        ? value(useSidebarStore.getState().isOpen)
        : value
    );
  };

  const toggleItem = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <SidebarRoot open={isSidebarOpen} setOpen={handleSetOpen} animate>
      <SidebarBody className=" border-r border-border bg-sidebar py-6 h-screen max-h-screen">
        <div className="flex items-center gap-3 px-5">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
            alt="Avatar"
            className="h-9 w-9 rounded-full object-cover"
          />
          {isSidebarOpen ? (
            <div className="leading-tight">
              <p className="text-sm font-semibold text-sidebar-foreground">
                ByeWind
              </p>
            </div>
          ) : null}
        </div>
        <ScrollArea className=" h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]">
          <div className="mt-7 flex-1 space-y-6 pr-1 px-5">
            {navSections.map((section) => (
              <SidebarContent
                key={section.title}
                section={section}
                isSidebarOpen={isSidebarOpen}
                expandedItems={expandedItems}
                activeItemKey={activeItemKey}
                pathname={pathname}
                onToggleItem={toggleItem}
                onSetActiveItemKey={setActiveItemKey}
              />
            ))}
          </div>
        </ScrollArea>
      </SidebarBody>
    </SidebarRoot>
  );
};

export default Sidebar;
