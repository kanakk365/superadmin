"use client";

import React, { useEffect, memo, useMemo, useRef } from "react";
import type { SetStateAction } from "react";
import { Sidebar as SidebarRoot, SidebarBody } from "@/components/ui/sidebar";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebarStore } from "@/store/sidebarStore";
import { usePathname } from "next/navigation";
import { navSections, getInitialActiveItemKey } from "./constants";
import { SidebarContent } from "./SidebarContent";
import { useAuthStore, AuthUser } from "@/store/auth-store";
import type { NavSection } from "./types";

/**
 * Filter navigation sections based on user permissions
 */
function getFilteredNavSections(
  sections: NavSection[],
  user: AuthUser | null,
): NavSection[] {
  if (!user) {
    return sections;
  }

  // Admin users (user_type === 1) see everything
  if (user.user_type === 1 || user.role === "admin") {
    return sections;
  }

  // Filter sections based on user permissions
  return sections.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      const label = item.label.toLowerCase();

      // Dashboard is always visible
      if (label === "dashboard") return true;

      // Battle Lounge visibility
      if (label === "battle lounge") return user.is_battlelounge;

      // YSN visibility
      if (label === "ysn") return user.is_ysn;

      // Destination KP visibility
      if (label === "destination kp") return user.is_dkp;

      // Rivalis visibility
      if (label === "rivalis") return user.is_rivalis;

      // Other items (Connected, ADP, Chase, YouTube, Google Analytics)
      // These are hidden for non-admin users unless they have specific access
      // For now, admins see them, others don't
      if (
        [
          "connected",
          "adp",
          "chase",
          "youtube data",
          "google analytics",
        ].includes(label)
      ) {
        return user.role === "admin";
      }

      return true;
    }),
  }));
}

const SidebarComponent = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isOpen);
  const setSidebarOpen = useSidebarStore((state) => state.setOpen);
  const expandedItems = useSidebarStore((state) => state.expandedItems);
  const activeItemKey = useSidebarStore((state) => state.activeItemKey);
  const setExpandedItems = useSidebarStore((state) => state.setExpandedItems);
  const toggleItem = useSidebarStore((state) => state.toggleItem);
  const setActiveItemKey = useSidebarStore((state) => state.setActiveItemKey);
  const pathname = usePathname();

  // Track if expanded items have been initialized
  const initializedRef = useRef(false);

  // Get user from auth store for permission filtering
  const user = useAuthStore((state) => state.user);

  // Filter nav sections based on user permissions
  const filteredNavSections = useMemo(
    () => getFilteredNavSections(navSections, user),
    [user],
  );

  // Initialize expanded items on first mount only
  useEffect(() => {
    if (!initializedRef.current && Object.keys(expandedItems).length === 0) {
      initializedRef.current = true;
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
        : value,
    );
  };

  return (
    <SidebarRoot open={isSidebarOpen} setOpen={handleSetOpen} animate>
      <SidebarBody className=" border-r border-border bg-sidebar h-screen max-h-screen">
        <div className="flex items-center h-16 px-5 border-b border-border">
          <Link
            href="/overall"
            className="text-2xl font-medium text-sidebar-foreground hover:opacity-80 transition-opacity"
          >
            Oneplace
          </Link>
        </div>
        <ScrollArea className=" pt-6 pr-4 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]">
          <div className="flex-1 space-y-6 pr-1 px-5">
            {filteredNavSections.map((section) => (
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
