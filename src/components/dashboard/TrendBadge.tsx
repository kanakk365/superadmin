import { TrendingUp, TrendingDown } from "lucide-react";

export const TrendBadge = ({
  change,
  tone,
  className,
}: {
  change: string;
  tone: "positive" | "negative";
  className?: string;
}) => (
  <div
    className={`trend flex items-center gap-1.5 text-base font-medium textwhite ${
      className ?? ""
    }`}
  >
    <span>{change}</span>
    {tone === "positive" ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    )}
  </div>
);
