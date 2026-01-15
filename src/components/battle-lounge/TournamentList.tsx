"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Gamepad2,
  Trophy,
  Swords,
  Target,
  Crosshair,
  Eye,
  ExternalLink,
} from "lucide-react";
import {
  TournamentDetailModal,
  TournamentDetail,
} from "./TournamentDetailModal";

const tournaments: TournamentDetail[] = [
  {
    id: "1",
    name: "Warzone Weekly",
    game: "Call of Duty: MW3",
    date: "Jan 15, 2026",
    prizeAmount: "$5,000",
    tournamentType: "Battle Royale",
    sponsors: ["Red Bull", "NVIDIA", "Razer"],
    totalUsers: 1250,
    revenue: "$8,500",
    totalPlayers: 256,
    playerTypes: { new: 45, ranked: 156, unranked: 55 },
    disputes: 3,
    cancellations: 2,
    playerNoShow: 12,
    status: "upcoming",
  },
  {
    id: "2",
    name: "Fortnite FNCS",
    game: "Fortnite",
    date: "Jan 12, 2026",
    prizeAmount: "$100,000",
    tournamentType: "Elimination",
    sponsors: ["Epic Games", "Samsung", "Logitech"],
    totalUsers: 8500,
    revenue: "$125,000",
    totalPlayers: 500,
    playerTypes: { new: 120, ranked: 280, unranked: 100 },
    disputes: 8,
    cancellations: 5,
    playerNoShow: 28,
    status: "live",
  },
  {
    id: "3",
    name: "Apex Legends Global",
    game: "Apex Legends",
    date: "Jan 20, 2026",
    prizeAmount: "$50,000",
    tournamentType: "Squad Battle Royale",
    sponsors: ["EA Sports", "SteelSeries"],
    totalUsers: 4200,
    revenue: "$62,000",
    totalPlayers: 300,
    playerTypes: { new: 65, ranked: 180, unranked: 55 },
    disputes: 4,
    cancellations: 1,
    playerNoShow: 15,
    status: "upcoming",
  },
  {
    id: "4",
    name: "Valorant Community Cup",
    game: "Valorant",
    date: "Jan 8, 2026",
    prizeAmount: "$2,500",
    tournamentType: "5v5 Tactical",
    sponsors: ["Riot Games", "HyperX"],
    totalUsers: 980,
    revenue: "$4,200",
    totalPlayers: 80,
    playerTypes: { new: 20, ranked: 45, unranked: 15 },
    disputes: 1,
    cancellations: 0,
    playerNoShow: 4,
    status: "completed",
  },
  {
    id: "5",
    name: "FIFA 25 Ultimate",
    game: "EA FC 25",
    date: "Jan 25, 2026",
    prizeAmount: "$10,000",
    tournamentType: "1v1 Tournament",
    sponsors: ["EA Sports", "Adidas", "PlayStation"],
    totalUsers: 2100,
    revenue: "$18,500",
    totalPlayers: 128,
    playerTypes: { new: 30, ranked: 78, unranked: 20 },
    disputes: 2,
    cancellations: 1,
    playerNoShow: 8,
    status: "upcoming",
  },
  {
    id: "6",
    name: "CS2 Major",
    game: "Counter-Strike 2",
    date: "Dec 28, 2025",
    prizeAmount: "$1,000,000",
    tournamentType: "5v5 Competitive",
    sponsors: ["Valve", "Intel", "ASUS ROG"],
    totalUsers: 25000,
    revenue: "$1,450,000",
    totalPlayers: 160,
    playerTypes: { new: 15, ranked: 125, unranked: 20 },
    disputes: 12,
    cancellations: 2,
    playerNoShow: 6,
    status: "completed",
  },
  {
    id: "7",
    name: "Tekken 8 Iron Fist",
    game: "Tekken 8",
    date: "Jan 5, 2026",
    prizeAmount: "$15,000",
    tournamentType: "1v1 Fighting",
    sponsors: ["Bandai Namco", "Hori"],
    totalUsers: 1800,
    revenue: "$22,000",
    totalPlayers: 64,
    playerTypes: { new: 12, ranked: 42, unranked: 10 },
    disputes: 0,
    cancellations: 1,
    playerNoShow: 3,
    status: "completed",
  },
  {
    id: "8",
    name: "Street Fighter 6 Evo",
    game: "SF6",
    date: "Dec 20, 2025",
    prizeAmount: "$50,000",
    tournamentType: "1v1 Fighting Championship",
    sponsors: ["Capcom", "PlayStation", "Mad Catz"],
    totalUsers: 5500,
    revenue: "$85,000",
    totalPlayers: 256,
    playerTypes: { new: 45, ranked: 168, unranked: 43 },
    disputes: 5,
    cancellations: 3,
    playerNoShow: 11,
    status: "completed",
  },
];

const getGameIcon = (game: string) => {
  if (game.includes("Call of Duty") || game.includes("CS2") || game.includes("Counter")) {
    return Crosshair;
  }
  if (game.includes("Fortnite") || game.includes("Apex")) {
    return Target;
  }
  if (game.includes("Tekken") || game.includes("SF6") || game.includes("Street Fighter")) {
    return Swords;
  }
  return Gamepad2;
};

const getGameBg = (game: string) => {
  if (game.includes("Call of Duty")) return "bg-emerald-500/10";
  if (game.includes("Fortnite")) return "bg-purple-500/10";
  if (game.includes("Apex")) return "bg-red-500/10";
  if (game.includes("Valorant")) return "bg-rose-500/10";
  if (game.includes("FC") || game.includes("FIFA")) return "bg-blue-500/10";
  if (game.includes("CS2") || game.includes("Counter")) return "bg-yellow-500/10";
  if (game.includes("Tekken")) return "bg-orange-500/10";
  if (game.includes("SF6") || game.includes("Street Fighter")) return "bg-indigo-500/10";
  return "bg-muted/50";
};

export const TournamentList = () => {
  const [filter, setFilter] = React.useState<"upcoming" | "completed" | "live">(
    "upcoming"
  );
  const [selectedTournament, setSelectedTournament] =
    React.useState<TournamentDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const filteredTournaments = tournaments.filter((t) => {
    if (filter === "live") return t.status === "live";
    if (filter === "upcoming") return t.status === "upcoming" || t.status === "live";
    return t.status === "completed";
  });

  const handleViewDetails = (tournament: TournamentDetail) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };

  return (
    <>
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
                Click to view detailed stats
              </p>
            </div>
          </div>
          <div className="flex gap-1 bg-muted/50 p-1 rounded-xl">
            <button
              onClick={() => setFilter("live")}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                filter === "live"
                  ? "bg-fuchsia-500 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              Live
            </button>
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
            {filteredTournaments.map((t) => {
              const Icon = getGameIcon(t.game);
              const bg = getGameBg(t.game);

              return (
                <div
                  key={t.id}
                  onClick={() => handleViewDetails(t)}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-muted/40 border border-transparent hover:border-border/40 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-2xl transition-colors", bg)}>
                      <Icon className="w-5 h-5" />
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
                      <span className="font-bold text-foreground">{t.prizeAmount}</span>
                    </div>

                    <div className="hidden lg:flex flex-col items-end gap-1 min-w-[70px]">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Players
                      </span>
                      <span className="font-bold text-foreground">{t.totalPlayers}</span>
                    </div>

                    <div className="flex items-center gap-4 min-w-[140px] justify-end">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border",
                          t.status === "live" &&
                          "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20 dark:text-fuchsia-400",
                          t.status === "upcoming" &&
                          "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
                          t.status === "completed" &&
                          "bg-muted text-muted-foreground border-border"
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            t.status === "live" && "bg-fuchsia-500 animate-pulse",
                            t.status === "upcoming" && "bg-purple-500",
                            t.status === "completed" && "bg-muted-foreground"
                          )}
                        ></span>
                        {t.status === "live" ? "Live Now" : t.status === "upcoming" ? "Upcoming" : "Completed"}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(t);
                        }}
                        className="p-2 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <TournamentDetailModal
        tournament={selectedTournament}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTournament(null);
        }}
      />
    </>
  );
};
