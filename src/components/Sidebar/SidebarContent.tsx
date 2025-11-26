"use client";

import type { NavSection } from "./types";
import { NavItemComponent } from "./NavItem";

interface SidebarContentProps {
  section: NavSection;
  isSidebarOpen: boolean;
  expandedItems: Record<string, boolean>;
  activeItemKey: string;
  pathname: string;
  onToggleItem: (label: string) => void;
  onSetActiveItemKey: (key: string) => void;
}

export const SidebarContent = ({
  section,
  isSidebarOpen,
  expandedItems,
  activeItemKey,
  pathname,
  onToggleItem,
  onSetActiveItemKey,
}: SidebarContentProps) => {
  // Don't render Favorites section when sidebar is collapsed
  if (!isSidebarOpen && section.title === "Favorites") {
    return null;
  }

  return (
    <div key={section.title} className="space-y-3">
      {isSidebarOpen ? (
        section.title === "Favorites" ? (
          <div className="flex items-center gap-8 text-sm text-muted-foreground ">
            <span>Favorites</span>
            <span className="text-muted-foreground ">Recently</span>
          </div>
        ) : (
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            {section.title}
          </div>
        )
      ) : null}
      <div className="space-y-2">
        {section.items.map((item) => (
          <NavItemComponent
            key={item.label}
            item={item}
            sectionTitle={section.title}
            isSidebarOpen={isSidebarOpen}
            isActive={false}
            isExpanded={Boolean(expandedItems[item.label])}
            activeItemKey={activeItemKey}
            pathname={pathname}
            onToggleItem={onToggleItem}
            onSetActiveItemKey={onSetActiveItemKey}
          />
        ))}
      </div>
    </div>
  );
};
