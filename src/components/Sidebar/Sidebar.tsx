"use client";

import { motion } from "motion/react";
import React, { useEffect, memo } from "react";
import type { SetStateAction } from "react";
import { Sidebar as SidebarRoot, SidebarBody } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebarStore } from "@/store/sidebarStore";
import { usePathname } from "next/navigation";
import { navSections, getInitialActiveItemKey } from "./constants";
import { SidebarContent } from "./SidebarContent";

const SidebarComponent = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isOpen);
  const setSidebarOpen = useSidebarStore((state) => state.setOpen);
  const expandedItems = useSidebarStore((state) => state.expandedItems);
  const activeItemKey = useSidebarStore((state) => state.activeItemKey);
  const setExpandedItems = useSidebarStore((state) => state.setExpandedItems);
  const toggleItem = useSidebarStore((state) => state.toggleItem);
  const setActiveItemKey = useSidebarStore((state) => state.setActiveItemKey);
  const pathname = usePathname();

  // Initialize expanded items on first mount
  useEffect(() => {
    if (Object.keys(expandedItems).length === 0) {
      const initial: Record<string, boolean> = {};
      navSections.forEach((section) => {
        section.items.forEach((item) => {
          if (item.children) {
            initial[item.label] = Boolean(item.active);
          }
        });
      });
      setExpandedItems(initial);
    }
  }, []);

  // Update active item when pathname changes
  useEffect(() => {
    const newActiveKey = getInitialActiveItemKey(pathname);
    if (newActiveKey !== activeItemKey) {
      setActiveItemKey(newActiveKey);
    }
  }, [pathname, activeItemKey, setActiveItemKey]);

  const handleSetOpen = (value: SetStateAction<boolean>) => {
    setSidebarOpen(
      typeof value === "function"
        ? value(useSidebarStore.getState().isOpen)
        : value
    );
  };

  return (
    <SidebarRoot open={isSidebarOpen} setOpen={handleSetOpen} animate>
      <SidebarBody className=" border-r border-border bg-sidebar h-screen max-h-screen">
        <div className="flex items-center h-16 px-5 border-b border-border">
          <h1 className="text-lg font-semibold text-sidebar-foreground">
            {isSidebarOpen ? "OnePlace" : "OP"}
          </h1>
        </div>
        <ScrollArea className=" pt-6 pr-4 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]">
          <div className="flex-1 space-y-6 pr-1 px-5">
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

const Sidebar = memo(SidebarComponent);

export default Sidebar;
