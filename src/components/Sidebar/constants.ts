import {
  IconBag,
  IconBriefcase,
  IconChat,
  IconDot,
  IconDocument,
  IconGrid,
  IconLayers,
  IconPlay,
  IconSettings,
  IconUser,
} from "@/lib/icons";
import type { NavSection } from "./types";

export const navSections: NavSection[] = [
  {
    title: "Projects",
    items: [
      {
        label: "Battle Lounge",
        icon: IconUser,
        logo: "/bl-logo.png",
        href: "/battle-lounge",
      },
      {
        label: "Connected Athlete",
        icon: IconGrid,
        logo: "/sidebar/connected-athelete.png",
        href: "/game-reel",
      },
      {
        label: "Destination KP",
        icon: IconLayers,
        logo: "/sidebar/dkp_white_logo.png",
        href: "/destination-kp",
      },
      { label: "YSN", icon: IconPlay, logo: "/ysn-logo.png", href: "/ysn" },
    ],
  },
];

export const getInitialActiveItemKey = (pathname: string) => {
  for (const section of navSections) {
    for (const item of section.items) {
      const itemKey = `${section.title}-${item.label}`;
      if (item.href && item.href === pathname) {
        return itemKey;
      }
      if (item.active) {
        return itemKey;
      }
    }
  }
  const firstSection = navSections[0];
  const firstItem = firstSection?.items[0];
  return firstItem ? `${firstSection.title}-${firstItem.label}` : "";
};
