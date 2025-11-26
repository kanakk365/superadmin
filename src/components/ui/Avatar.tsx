import Image from "next/image";
import type { Order } from "../orders/types";

export const Avatar = ({ name, badge, color, avatarUrl }: Order["user"]) => (
  <span
    className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-foreground overflow-hidden"
    style={avatarUrl ? undefined : { backgroundColor: color }}
  >
    {avatarUrl ? (
      <Image 
        src={avatarUrl} 
        alt={name} 
        width={40}
        height={40}
        className="h-full w-full rounded-full object-cover"
      />
    ) : (
      (badge || name.slice(0, 2)).toUpperCase()
    )}
  </span>
);
