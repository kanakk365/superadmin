import type { Order, OrderStatus } from "./types";

export const orders: Order[] = [
  {
    id: "#CMP801",
    user: { name: "Natali Craig", badge: "NC", color: "#F4F0FF", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    dateLabel: "Just now",
    status: "in-progress",
  },
  {
    id: "#CMP802",
    user: { name: "Kate Morrison", badge: "KM", color: "#E8F8E4", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    dateLabel: "A minute ago",
    status: "complete",
  },
  {
    id: "#CMP803",
    user: { name: "Drew Cano", badge: "DC", color: "#FFE9D6", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    dateLabel: "1 hour ago",
    status: "pending",
  },
  {
    id: "#CMP804",
    user: { name: "Orlando Diggs", badge: "OD", color: "#E4E9FF", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    dateLabel: "Yesterday",
    status: "approved",
  },
  {
    id: "#CMP805",
    user: { name: "Andi Lane", badge: "AL", color: "#FFE4E8", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    dateLabel: "Feb 2, 2023",
    status: "rejected",
  },
  {
    id: "#CMP801",
    user: { name: "Natali Craig", badge: "NC", color: "#F4F0FF", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    dateLabel: "Just now",
    status: "in-progress",
  },
  {
    id: "#CMP802",
    user: { name: "Kate Morrison", badge: "KM", color: "#E8F8E4", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    dateLabel: "A minute ago",
    status: "complete",
  },
  {
    id: "#CMP803",
    user: { name: "Drew Cano", badge: "DC", color: "#FFE9D6", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    dateLabel: "1 hour ago",
    status: "pending",
  },
  {
    id: "#CMP804",
    user: { name: "Orlando Diggs", badge: "OD", color: "#E4E9FF", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    dateLabel: "Yesterday",
    status: "approved",
  },
  {
    id: "#CMP805",
    user: { name: "Andi Lane", badge: "AL", color: "#FFE4E8", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    dateLabel: "Feb 2, 2023",
    status: "rejected",
  },
];

export const statusTokens: Record<
  OrderStatus,
  {
    label: string;
    dot: string;
    text: string;
    background: string;
    darkBackground?: string;
    darkText?: string;
  }
> = {
  "in-progress": {
    label: "In Progress",
    dot: "bg-[#8A8CD9]",
    text: "text-[#8A8CD9] dark:text-[#B9C1FF]",
    background: "bg-[#F4F5FC]",
    darkBackground: "dark:bg-[#2B2D45]",
  },
  complete: {
    label: "Complete",
    dot: "bg-[#4AA785]",
    text: "text-[#4AA785] dark:text-[#A0E8AE]",
    background: "bg-[#F0F7F4]",
    darkBackground: "dark:bg-[#1F3A28]",
  },
  pending: {
    label: "Pending",
    dot: "bg-[#59A8D4]",
    text: "text-[#59A8D4] dark:text-[#A0D8FF]",
    background: "bg-[#F0F8FC]",
    darkBackground: "dark:bg-[#1A2A35]",
  },
  approved: {
    label: "Approved",
    dot: "bg-[#FFC555]",
    text: "text-[#FFC555] dark:text-[#FFD580]",
    background: "bg-[#FFF9F0]",
    darkBackground: "dark:bg-[#3A2E10]",
  },
  rejected: {
    label: "Rejected",
    dot: "bg-gray-500",
    text: "text-gray-500 dark:text-gray-400",
    background: "bg-gray-100 dark:bg-gray-900",
    darkBackground: "dark:bg-gray-800",
  },
};

export const actionButtonClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground hover:bg-muted/70 dark:hover:bg-muted/40 cursor-pointer";
