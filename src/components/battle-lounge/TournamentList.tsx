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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  TournamentDetailModal,
  TournamentDetail,
} from "./TournamentDetailModal";

import { Tournament } from "@/lib/api/battle-lounge/organizer";

interface TournamentListProps {
  upcoming?: Tournament[];
  live?: Tournament[];
  completed?: Tournament[];
}

const mapTournamentToDetail = (t: Tournament): TournamentDetail => ({
  id: t.id.toString(),
  name: t.name,
  game: t.game_name,
  date: new Date(t.date_time).toLocaleDateString(),
  prizeAmount: t.prize_pool || "N/A",
  tournamentType: `Type ${t.tournament_type}`,
  sponsors: t.sponsors || [],
  totalUsers: 0, // Not provided by API
  revenue: `$${t.revenue}`,
  totalPlayers: t.players,
  playerTypes: {
    new: t.player_type?.new_players || 0,
    ranked: t.player_type?.ranked || 0,
    unranked: t.player_type?.un_ranked || 0,
  },
  disputes: t.disputes,
  cancellations: t.cancel,
  playerNoShow: t.player_no_shows,
  status: t.status.toLowerCase() as "live" | "upcoming" | "completed",
});

const getGameIcon = (game: string) => {
  if (
    game.includes("Call of Duty") ||
    game.includes("CS2") ||
    game.includes("Counter")
  ) {
    return Crosshair;
  }
  if (game.includes("Fortnite") || game.includes("Apex")) {
    return Target;
  }
  if (
    game.includes("Tekken") ||
    game.includes("SF6") ||
    game.includes("Street Fighter")
  ) {
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
  if (game.includes("CS2") || game.includes("Counter"))
    return "bg-yellow-500/10";
  if (game.includes("Tekken")) return "bg-orange-500/10";
  if (game.includes("SF6") || game.includes("Street Fighter"))
    return "bg-indigo-500/10";
  return "bg-muted/50";
};

export const TournamentList = ({
  upcoming = [],
  live = [],
  completed = [],
}: TournamentListProps) => {
  const [filter, setFilter] = React.useState<"upcoming" | "completed" | "live">(
    "upcoming",
  );
  const [selectedTournament, setSelectedTournament] =
    React.useState<TournamentDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemsPerPage = 10;

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const currentList = React.useMemo(() => {
    if (filter === "live") return live;
    if (filter === "upcoming") return upcoming;
    return completed;
  }, [filter, upcoming, live, completed]);

  const filteredTournaments = currentList.map(mapTournamentToDetail);

  const totalPages = Math.ceil(filteredTournaments.length / itemsPerPage) || 1;
  const paginatedTournaments = filteredTournaments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
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
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
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
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto flex flex-col">
          {filteredTournaments.length > 0 ? (
            <>
              <div className="flex flex-col p-4 gap-2 flex-grow">
                {paginatedTournaments.map((t) => {
                  const Icon = getGameIcon(t.game);
                  const bg = getGameBg(t.game);

                  return (
                    <div
                      key={t.id}
                      onClick={() => handleViewDetails(t)}
                      className="group flex items-center justify-between p-4 rounded-2xl hover:bg-muted/40 border border-transparent hover:border-border/40 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "p-3 rounded-2xl transition-colors",
                            bg,
                          )}
                        >
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
                          <span className="font-bold text-foreground">
                            {t.prizeAmount}
                          </span>
                        </div>

                        <div className="hidden lg:flex flex-col items-end gap-1 min-w-[70px]">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Players
                          </span>
                          <span className="font-bold text-foreground">
                            {t.totalPlayers}
                          </span>
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
                                "bg-muted text-muted-foreground border-border",
                            )}
                          >
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                t.status === "live" &&
                                  "bg-fuchsia-500 animate-pulse",
                                t.status === "upcoming" && "bg-purple-500",
                                t.status === "completed" &&
                                  "bg-muted-foreground",
                              )}
                            ></span>
                            {t.status === "live"
                              ? "Live Now"
                              : t.status === "upcoming"
                                ? "Upcoming"
                                : "Completed"}
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

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border/40 bg-muted/10 mt-auto">
                  <div className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-foreground">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredTournaments.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                      {filteredTournaments.length}
                    </span>{" "}
                    results
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-border/40 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-foreground"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </button>
                    <div className="text-sm font-medium px-2 text-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-border/40 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-foreground"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-4">
              <span className="text-muted-foreground">
                No tournaments found
              </span>
            </div>
          )}
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
