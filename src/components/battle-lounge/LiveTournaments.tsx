"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Radio,
  Users,
  Eye,
  Clock,
  Trophy,
  Gamepad2,
  DollarSign,
} from "lucide-react";

import { Tournament } from "@/lib/api/battle-lounge/organizer";

interface LiveTournamentsProps {
  tournaments?: Tournament[];
}

export function LiveTournaments({ tournaments = [] }: LiveTournamentsProps) {
  const totalViewers = 0; // API doesn't provide viewers count per tournament in list
  const totalPlayers = tournaments.reduce((acc, t) => acc + t.players, 0);

  return (
    <div className="rounded-[32px] bg-gradient-to-br from-fuchsia-500/5 via-purple-500/5 to-indigo-500/5 border border-purple-500/20 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border/40 bg-gradient-to-r from-fuchsia-500/10 to-transparent">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 bg-fuchsia-500/20 rounded-2xl">
              <Radio className="w-6 h-6 text-fuchsia-500" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-fuchsia-500"></span>
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
              Live Tournaments
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-fuchsia-500 text-white text-xs font-bold animate-pulse">
                {tournaments.length} LIVE
              </span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Currently active gaming events
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Viewers</span>
              <span className="text-lg font-bold text-foreground">
                {totalViewers.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Players</span>
              <span className="text-lg font-bold text-foreground">
                {totalPlayers.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Tournaments Grid */}
      {/* Live Tournaments Grid */}
      {tournaments.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4 p-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="group relative p-5 rounded-2xl bg-card border border-border/40 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
            >
              {/* Live Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-fuchsia-500">
                  LIVE
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {/* Tournament Name & Game */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-purple-500 transition-colors pr-16 line-clamp-1">
                    {tournament.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Gamepad2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {tournament.game_name}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Prize</p>
                      <p className="text-sm font-bold text-foreground">
                        {tournament.prize_pool || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <Users className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Players</p>
                      <p className="text-sm font-bold text-foreground">
                        {tournament.players}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Viewers</p>
                      <p className="text-sm font-bold text-foreground">--</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Started</p>
                      <p className="text-sm font-bold text-foreground line-clamp-1">
                        {new Date(tournament.date_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stage Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 text-sm font-medium text-purple-500">
                    Group Stage
                  </span>
                  <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-sm font-medium hover:from-purple-600 hover:to-fuchsia-600 transition-colors">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border/50">
            No active live tournaments
          </div>
        </div>
      )}
    </div>
  );
}
