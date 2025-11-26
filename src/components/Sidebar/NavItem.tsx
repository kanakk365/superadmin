"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { IconChevronDown, IconDot } from "@/lib/icons";
import type { NavItem } from "./types";

interface NavItemProps {
  item: NavItem;
  sectionTitle: string;
  isSidebarOpen: boolean;
  isActive: boolean;
  isExpanded: boolean;
  activeItemKey: string;
  pathname: string;
  onToggleItem: (label: string) => void;
  onSetActiveItemKey: (key: string) => void;
}

export const NavItemComponent = ({
  item,
  sectionTitle,
  isSidebarOpen,
  isActive,
  isExpanded,
  activeItemKey,
  pathname,
  onToggleItem,
  onSetActiveItemKey,
}: NavItemProps) => {
  const router = useRouter();

  const isDotNav = item.icon === IconDot && !item.children;
  const isFavoritesSection = sectionTitle === "Favorites";
  const isDefaultItem = item.label === "Default";
  const isOrdersItem = item.label === "Orders";
  const itemKey = `${sectionTitle}-${item.label}`;
  const isRouteItem = Boolean(item.href);
  const isItemActive = isRouteItem
    ? item.href === pathname
    : activeItemKey === itemKey;

  if (isDotNav) {
    return (
      <motion.button
        key={item.label}
        type="button"
        className={`relative flex items-center gap-3 rounded-full py-1 text-sm transition-colors cursor-pointer ${
          isItemActive
            ? "text-sidebar-foreground"
            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
        } ${
          isSidebarOpen ? "pl-1 pr-2 justify-start" : "justify-center px-0"
        }`}
        onClick={() => onSetActiveItemKey(itemKey)}
      >
        {isItemActive ? (
          <span className="pointer-events-none absolute inset-0 rounded-full bg-sidebar-accent" />
        ) : null}
        {item.icon ? (
          <item.icon className="relative z-10 text-muted-foreground" />
        ) : null}
        {isSidebarOpen ? (
          <span className="relative z-10 whitespace-nowrap ">
            {item.label}
          </span>
        ) : null}
      </motion.button>
    );
  }

  const isExpandable = Boolean(item.children?.length);
  const isItemExpanded = isExpandable ? isExpanded : false;
  const isHighlighted = isItemActive || isItemExpanded;
  const containerBase = `relative flex items-center rounded-md py-2 text-sm font-medium transition-all ${
    isSidebarOpen ? "gap-3 px-3" : "justify-center px-0"
  }`;

  const stateClasses = isHighlighted
    ? "text-sidebar-foreground"
    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground";
  const iconClasses = isHighlighted
    ? "bg-sidebar-accent text-sidebar-foreground"
    : "bg-muted text-muted-foreground";
  const shouldShowChevron =
    isSidebarOpen && !isDotNav && !isFavoritesSection && !isDefaultItem && !isOrdersItem;
  const shouldReserveChevronSpace =
    isSidebarOpen && !isDotNav && !isFavoritesSection && (isDefaultItem || isOrdersItem);
  const iconOffsetClass =
    shouldShowChevron || shouldReserveChevronSpace ? "-ml-1" : "";

  const handleClick = () => {
    onSetActiveItemKey(itemKey);
    if (isExpandable) {
      onToggleItem(item.label);
    }
    if (item.href) {
      router.push(item.href);
    }
  };

  const chevronMarkup =
    isSidebarOpen && !isDotNav && !isFavoritesSection ? (
      shouldShowChevron ? (
        <span className="relative z-10 flex h-4 w-4 items-center justify-center text-muted-foreground">
          <IconChevronDown
            className={`h-4 w-4 transition-transform ${
              isExpandable && isItemExpanded ? "rotate-0" : "-rotate-90"
            }`}
          />
        </span>
      ) : shouldReserveChevronSpace ? (
        <span className="relative z-10 flex h-4 w-4" aria-hidden="true" />
      ) : null
    ) : null;

  return (
    <div key={item.label} className="flex flex-col">
      <motion.button
        type="button"
        className={`${containerBase} ${stateClasses} cursor-pointer`}
        onClick={handleClick}
        aria-expanded={isExpandable ? isItemExpanded : undefined}
      >
        {isItemActive ? (
          <span className="pointer-events-none absolute inset-0 rounded-md bg-sidebar-accent" />
        ) : null}
        {isItemActive ? (
          <motion.span
            className="pointer-events-none absolute left-1 top-1/2 h-4 w-1 -translate-y-1/2 rounded-md bg-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
          />
        ) : null}
        {chevronMarkup}
        <span
          className={`relative z-10 flex items-center justify-center rounded-md ${iconClasses} ${iconOffsetClass}`}
        >
          {item.icon ? <item.icon /> : null}
        </span>
        {isSidebarOpen ? (
          <span className="relative text-sm font-normal z-10 whitespace-nowrap text-left">
            {item.label}
          </span>
        ) : null}
      </motion.button>

      <AnimatePresence initial={false}>
        {item.children && isSidebarOpen && isItemExpanded ? (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="mt-2 flex flex-col gap-2 overflow-hidden pl-12 text-sm text-muted-foreground"
          >
            {item.children.map((child) => (
              <span
                key={child.label}
                className="transition hover:text-sidebar-foreground"
              >
                {child.label}
              </span>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
