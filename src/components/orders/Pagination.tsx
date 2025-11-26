import { cn } from "@/lib/utils";

export const Pagination = () => (
  <div className="flex items-center justify-between px-6 pb-6 pt-4 text-sm text-muted-foreground">
    <span>Showing 1-10 of 32 results</span>
    <div className="flex items-center gap-2">
      {[
        { label: "Prev", content: "<" },
        { label: "1", content: "1", active: true },
        { label: "2", content: "2" },
        { label: "3", content: "3" },
        { label: "4", content: "4" },
        { label: "5", content: "5" },
        { label: "Next", content: ">" },
      ].map((item) => (
        <button
          key={item.label}
          type="button"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition",
            item.active
              ? " bg-card text-foreground"
              : " text-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {item.content}
        </button>
      ))}
    </div>
  </div>
);
