"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IconDot,
} from "@/lib/icons";
import { Bug, User, Radio } from "lucide-react";
import { useNotificationPanelStore } from "@/store/notificationPanelStore";
import { cn } from "@/lib/utils";

type PanelItem = {
  id: string;
  title: string;
  timestamp: string;
  icon?: ReactNode;
  image?: string;
  accent: string;
};

type ContactItem = {
  id: string;
  name: string;
  role?: string;
  accent: string;
  image?: string;
};

const notifications: PanelItem[] = [
  {
    id: "bug-1",
    title: "You have a bug that needs attention",
    timestamp: "Just now",
    icon: <Bug className="h-4 w-4 text-neutral-900" />,
    accent: "bg-[#E5ECF6]",
  },
  {
    id: "user-registered",
    title: "New user registered",
    timestamp: "59 minutes ago",
    icon: <User className="h-4 w-4 text-neutral-900" />,
    accent: "bg-[#E5ECF6]",
  },
  {
    id: "bug-2",
    title: "You have a bug that needs attention",
    timestamp: "12 hours ago",
    icon: <Bug className="h-4 w-4 text-neutral-900" />,
    accent: "bg-[#E5ECF6]",
  },
  {
    id: "subscription",
    title: "Andi Lane subscribed to you",
    timestamp: "Today, 11:59 AM",
    icon: <Radio className="h-4 w-4 text-neutral-900" />,
    accent: "bg-[#E5ECF6]",
  },
];

const activities: PanelItem[] = [
  {
    id: "bug-activity",
    title: "You have a bug that needs attention",
    timestamp: "Just now",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    accent: "bg-[#EEF1FF]",
  },
  {
    id: "release",
    title: "Released a new version",
    timestamp: "59 minutes ago",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    accent: "bg-[#FFF4E5]",
  },
  {
    id: "bug-submitted",
    title: "Submitted a bug",
    timestamp: "12 hours ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    accent: "bg-[#EEF1FF]",
  },
  {
    id: "modify",
    title: "Modified A data in Page X",
    timestamp: "Today, 11:59 AM",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    accent: "bg-[#E8F3FF]",
  },
  {
    id: "delete",
    title: "Deleted a page in Project X",
    timestamp: "Feb 2, 2023",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    accent: "bg-[#F2EBFF]",
  },
];

const contacts: ContactItem[] = [
  {
    id: "natali",
    name: "Natali Craig",
    role: "Design",
    accent: "bg-[#1C1F2E]",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: "drew",
    name: "Drew Cano",
    role: "Product",
    accent: "bg-[#F25F4C]",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: "orlando",
    name: "Orlando Diggs",
    role: "Sales",
    accent: "bg-[#FFB400]",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: "andi",
    name: "Andi Lane",
    role: "Marketing",
    accent: "bg-[#0FA3B1]",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: "kate",
    name: "Kate Morrison",
    role: "Support",
    accent: "bg-[#3C6EEF]",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: "koray",
    name: "Koray Okumus",
    role: "Engineering",
    accent: "bg-[#6C5CE7]",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};


const PanelList = ({ items }: { items: PanelItem[] }) => (
  <div className="mt-4 space-y-4">
    {items.map((item) => (
      <div
        key={item.id}
        className="flex items-start gap-3 "
      >
        {item.image ? (
          <Image
            src={item.image}
            alt="User avatar"
            width={32}
            height={32}
            className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full flex-shrink-0 dark:bg-card",
              item.accent
            )}
          >
            {item.icon}
          </span>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-[#1A1F36] dark:text-white leading-snug">
            {item.title}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-[#8D95A5] dark:text-gray-400">
            <IconDot className="h-1.5 w-1.5 text-[#C6CBD9] dark:text-gray-500" />
            {item.timestamp}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const ContactsList = ({ items }: { items: ContactItem[] }) => (
  <div className="mt-4 space-y-3">
    {items.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between "
      >
        <div className="flex items-center gap-4">
          {item.image ? (
            <Image
              src={item.image}
              alt="User avatar"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full text-xs font-semibold uppercase text-white ",
                item.accent
              )}
            >
              {getInitials(item.name)}
            </span>
          )}
          <div>
            <p className="text-sm font-medium text-[#1A1F36] dark:text-white">{item.name}</p>
            {item.role ? (
              <p className="text-xs text-[#8D95A5] dark:text-gray-400">{item.role}</p>
            ) : null}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const PanelContent = ({ onClose }: { onClose: () => void }) => (
  <div className="flex h-full w-full flex-col border-l border-[#E5EAF3] dark:border-[#3a3a3a] bg-white dark:bg-[#1c1c1c]">
    <div className="flex md:hidden items-center justify-between px-6 py-4 border-b border-[#E5EAF3] dark:border-[#3a3a3a]">
      <h2 className="text-lg font-semibold text-black dark:text-white">Panel</h2>
      <button
        onClick={onClose}
        className="text-foreground hover:opacity-80 transition"
        aria-label="Close notifications panel"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div className="flex-1">
      <div className="px-6 py-6">
        <section>
          <h3 className="text-base font-semibold text-black dark:text-white">Notifications</h3>
          <PanelList items={notifications} />
        </section>

        <section className="mt-8">
            <h3 className="text-base font-semibold text-black dark:text-white">Activities</h3>
          <PanelList items={activities} />
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold text-black dark:text-white">Contacts</h2>
          <ContactsList items={contacts} />
        </section>
      </div>
    </div>
  </div>
);

export const NotificationPanel = () => {
  const isOpen = useNotificationPanelStore((state) => state.isOpen);
  const close = useNotificationPanelStore((state) => state.close);

  return (
    <ScrollArea className=" h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]">
      <motion.aside
        aria-hidden={!isOpen}
        initial={false}
        animate={{ width: isOpen ? 340 : 0, borderLeftWidth: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="relative hidden flex-shrink-0 overflow-hidden bg-white dark:bg-[#1c1c1c] md:block"
      >
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              key="panel-desktop"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="flex h-full w-[340px]"
            >
              <PanelContent onClose={close} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.aside>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="panel-mobile"
            className="fixed inset-0 z-40 flex justify-end bg-black/40 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="h-full w-full max-w-sm"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <PanelContent onClose={close} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ScrollArea>
  );
};

export default NotificationPanel;
