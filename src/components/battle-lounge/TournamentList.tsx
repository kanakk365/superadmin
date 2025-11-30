"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Gamepad2,
  Trophy,
  Swords,
  Target,
  Crosshair,
  Crown,
  Medal,
  ArrowRight,
} from "lucide-react";

const tournaments = [
  {
    name: "Warzone Weekly",
    game: "Call of Duty: MW3",
    prize: "$5,000",
    status: "Registration Open",
    type: "upcoming",
    icon: Crosshair,
    bg: "bg-emerald-500/10",
  },
  {
    name: "Fortnite FNCS",
    game: "Fortnite",
    prize: "$100,000",
    status: "Live Now",
    type: "upcoming",
    icon: Target,
    bg: "bg-purple-500/10",
  },
  {
    name: "Apex Legends Global",
    game: "Apex Legends",
    prize: "$50,000",
    status: "Coming Soon",
    type: "upcoming",
    icon: Swords,
    bg: "bg-red-500/10",
  },
  {
    name: "Valorant Community Cup",
    game: "Valorant",
    prize: "$2,500",
    status: "Completed",
    type: "completed",
    icon: Crosshair,
    bg: "bg-rose-500/10",
  },
  {
    name: "FIFA 25 Ultimate",
    game: "EA FC 25",
    prize: "$10,000",
    status: "Registration Open",
    type: "upcoming",
    icon: Gamepad2,
    bg: "bg-blue-500/10",
  },
  {
    name: "CS2 Major",
    game: "Counter-Strike 2",
    prize: "$1,000,000",
    status: "Completed",
    type: "completed",
    icon: Crosshair,
    bg: "bg-yellow-500/10",
  },
  {
    name: "Tekken 8 Iron Fist",
    game: "Tekken 8",
    prize: "$15,000",
    status: "Completed",
    type: "completed",
    icon: Swords,
    bg: "bg-orange-500/10",
  },
  {
    name: "Street Fighter 6 Evo",
    game: "SF6",
    prize: "$50,000",
    status: "Completed",
    type: "completed",
    icon: Swords,
    bg: "bg-indigo-500/10",
  },
];

export const TournamentList = () => {
  const [filter, setFilter] = React.useState<"upcoming" | "completed">(
    "upcoming"
  );

  const filteredTournaments = tournaments.filter((t) => t.type === filter);

  return (
    <div className="flex flex-col h-full rounded-[32px] bg-card border border-border/40 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-8 py-6 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Tournaments
            </h3>
            <p className="text-sm text-muted-foreground">
              Join competitive events
            </p>
          </div>
        </div>
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl">
          <button
            onClick={() => setFilter("upcoming")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
              filter === "upcoming"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
              filter === "completed"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex flex-col p-4 gap-2">
          {filteredTournaments.map((t) => (
            <div
              key={t.name}
              className="group flex items-center justify-between p-4 rounded-2xl hover:bg-muted/40 border border-transparent hover:border-border/40 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl transition-colors", t.bg)}>
                  <t.icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {t.name}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {t.game}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 md:gap-12">
                <div className="hidden md:flex flex-col items-end gap-1 min-w-[80px]">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Prize Pool
                  </span>
                  <span className="font-bold text-foreground">{t.prize}</span>
                </div>

                <div className="flex items-center gap-4 min-w-[140px] justify-end">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border",
                      t.status === "Live Now" &&
                        "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
                      t.status === "Registration Open" &&
                        "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
                      t.status === "Coming Soon" &&
                        "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
                      t.status === "Completed" &&
                        "bg-muted text-muted-foreground border-border"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        t.status === "Live Now" && "bg-red-500 animate-pulse",
                        t.status === "Registration Open" && "bg-emerald-500",
                        t.status === "Coming Soon" && "bg-blue-500",
                        t.status === "Completed" && "bg-muted-foreground"
                      )}
                    ></span>
                    {t.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
