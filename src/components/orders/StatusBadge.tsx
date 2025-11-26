import { cn } from "@/lib/utils";
import type { OrderStatus } from "./types";
import { statusTokens } from "./constants";

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const token = statusTokens[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs",
        token.text
      )}
    >
      <span className={cn("h-1 w-1 rounded-full", token.dot)} />
      {token.label}
    </span>
  );
};
