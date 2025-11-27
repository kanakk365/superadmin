"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const tournaments = [
  { name: "Warzone Weekly", game: "Call of Duty: MW3", prize: "$5,000", status: "Registration Open", type: "upcoming" },
  { name: "Fortnite FNCS", game: "Fortnite", prize: "$100,000", status: "Live Now", type: "upcoming" },
  { name: "Apex Legends Global", game: "Apex Legends", prize: "$50,000", status: "Coming Soon", type: "upcoming" },
  { name: "Valorant Community Cup", game: "Valorant", prize: "$2,500", status: "Completed", type: "completed" },
  { name: "FIFA 25 Ultimate", game: "EA FC 25", prize: "$10,000", status: "Registration Open", type: "upcoming" },
  { name: "CS2 Major", game: "Counter-Strike 2", prize: "$1,000,000", status: "Completed", type: "completed" },
  { name: "Tekken 8 Iron Fist", game: "Tekken 8", prize: "$15,000", status: "Completed", type: "completed" },
  { name: "Street Fighter 6 Evo", game: "SF6", prize: "$50,000", status: "Completed", type: "completed" },
];

export const TournamentList = () => {
  const [filter, setFilter] = React.useState<"upcoming" | "completed">("upcoming");

  const filteredTournaments = tournaments.filter((t) => t.type === filter);

  return (
    <div className="rounded-3xl bg-card py-6 px-3 h-full">
      <div className="flex items-center justify-between px-6 mb-4">
        <h3 className="text-lg font-semibold text-foreground">Tournaments</h3>
        <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
          <button
            onClick={() => setFilter("upcoming")}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-colors",
              filter === "upcoming"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-colors",
              filter === "completed"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Completed
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Tournament</th>
              <th className="px-6 py-4 text-sm font-normal">Game</th>
              <th className="px-6 py-4 text-sm font-normal">Prize Pool</th>
              <th className="px-6 py-4 text-sm font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {filteredTournaments.map((t) => (
              <tr key={t.name} className="border-b border-border/60 last:border-0">
                <td className="px-6 py-3 text-sm font-normal text-foreground">{t.name}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{t.game}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{t.prize}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      t.status === "Live Now" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                      t.status === "Registration Open" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                      t.status === "Coming Soon" && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                      t.status === "Completed" && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                    )}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
