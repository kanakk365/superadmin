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
    title: "",
    items: [
      {
        label: "Dashboard",
        href: "/overall",
      },
      {
        label: "Destination KP",
        icon: IconLayers,
        logo: "/sidebar/dkp_white_logo.png",
        href: "/destination-kp",
      },
      { label: "YSN", icon: IconPlay, logo: "/ysn-logo.png", href: "/ysn" },
      {
        label: "Battle Lounge",
        icon: IconUser,
        logo: "/bl-logo.png",
        href: "/battle-lounge",
      },
      // {
      //   label: "Game Reel",
      //   icon: IconGrid,
      //   logo: "/sidebar/game-reel.png",
      //   href: "/game-reel",
      // },
      {
        label: "Rivalis",
        icon: IconGrid,
        logo: "/rivalis.png",
        href: "/connected-athlete",
      },
      {
        label: "Connected",
        icon: IconLayers,
        logo: "/sidebar/connected.png",
        href: "/connected",
      },
      {
        label: "ADP",
        icon: IconBriefcase,
        logo: "/sidebar/adp.png",
        href: "/adp",
      },
      {
        label: "Chase",
        icon: IconBag,
        logo: "/sidebar/chase-logo.png",
        href: "/chase",
      },
      {
        label: "YouTube Data",
        icon: IconPlay,
        logo: "/youtube.svg", // This is missing from my file search results earlier?
        href: "/youtube-data",
      },
      {
        label: "Google Analytics",
        icon: IconGrid,
        logo: "/analytics.svg",
        href: "/google-analytics",
      },
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
  return "";
};
