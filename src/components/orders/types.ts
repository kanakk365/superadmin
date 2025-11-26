export type OrderStatus = "in-progress" | "complete" | "pending" | "approved" | "rejected";

export type Order = {
  id: string;
  user: {
    name: string;
    badge?: string;
    color: string;
    avatarUrl?: string;
  };
  project: string;
  address: string;
  dateLabel: string;
  status: OrderStatus;
  selected?: boolean;
};
