"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Calendar, Trophy } from "lucide-react";
import {
  getYSNOrganizerMatches,
  type Match,
  type MatchesData,
} from "@/lib/api/ysn-organizer";

// Fallback mock data
const fallbackUpcomingMatches = [
  {
    match: "Rockets vs Comets",
    league: "Super Cup",
    date: "Nov 28, 2025",
    time: "18:00",
  },
  {
    match: "Titans vs Giants",
    league: "Qualifier",
    date: "Nov 29, 2025",
    time: "20:00",
  },
  {
    match: "Wolves vs Bears",
    league: "Friendly",
    date: "Dec 01, 2025",
    time: "16:30",
  },
  {
    match: "Eagles vs Sharks",
    league: "Championship",
    date: "Dec 03, 2025",
    time: "19:00",
  },
];

const fallbackRecentMatches = [
  {
    match: "Tigers vs Lions",
    league: "Premier League",
    viewers: "12.5K",
    result: "2 - 1",
  },
  {
    match: "Eagles vs Sharks",
    league: "Championship",
    viewers: "8.2K",
    result: "0 - 0",
  },
  {
    match: "Rockets vs Comets",
    league: "Super Cup",
    viewers: "15.1K",
    result: "Pending",
  },
  {
    match: "Titans vs Giants",
    league: "Qualifier",
    viewers: "5.6K",
    result: "3 - 2",
  },
];

export const MatchesTable = () => {
  const [matchType, setMatchType] = React.useState<"upcoming" | "recent">(
    "upcoming",
  );
  const [matchesData, setMatchesData] = React.useState<MatchesData | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [hasData, setHasData] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getYSNOrganizerMatches();
        if (response.status && response.data) {
          setMatchesData(response.data);
          // Check if there's any actual data
          const hasRecents =
            response.data.recents && response.data.recents.length > 0;
          const hasUpcoming =
            response.data.upcoming && response.data.upcoming.length > 0;
          setHasData(hasRecents || hasUpcoming);
        }
      } catch (error) {
        console.error("Failed to fetch matches data:", error);
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get current matches based on type
  const getCurrentMatches = () => {
    if (!hasData || !matchesData) {
      return matchType === "upcoming"
        ? fallbackUpcomingMatches
        : fallbackRecentMatches;
    }

    const data =
      matchType === "upcoming" ? matchesData.upcoming : matchesData.recents;
    if (!data || data.length === 0) {
      return matchType === "upcoming"
        ? fallbackUpcomingMatches
        : fallbackRecentMatches;
    }

    return data;
  };

  const currentMatches = getCurrentMatches();

  return (
    <div className="rounded-3xl bg-card py-6 px-3 border border-border/40 shadow-sm">
      <div className="flex items-center justify-between px-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10">
            <Trophy className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Matches</h3>
            <p className="text-xs text-muted-foreground">
              {hasData
                ? "Live data from API"
                : "Sample data - API returned empty"}
            </p>
          </div>
        </div>
        <Select
          value={matchType}
          onValueChange={(value) =>
            setMatchType(value as "upcoming" | "recent")
          }
        >
          <SelectTrigger className="w-[160px] rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="upcoming" className="rounded-lg">
              Upcoming
            </SelectItem>
            <SelectItem value="recent" className="rounded-lg">
              Recent
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : currentMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Calendar className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No matches available</p>
            <p className="text-sm">
              {matchType === "upcoming"
                ? "Upcoming matches will appear here"
                : "Recent matches will appear here"}
            </p>
          </div>
        ) : matchType === "upcoming" ? (
          <table className="w-full table-fixed border-collapse text-sm">
            <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
              <tr>
                <th className="px-6 py-4 text-sm font-normal">Match</th>
                <th className="px-6 py-4 text-sm font-normal">League</th>
                <th className="px-6 py-4 text-sm font-normal">Date</th>
                <th className="px-6 py-4 text-sm font-normal">Time</th>
              </tr>
            </thead>
            <tbody className="text-sm text-foreground">
              {currentMatches.map((item: any, index: number) => (
                <tr
                  key={item.match || item.id || index}
                  className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-3 text-sm font-medium text-foreground">
                    {item.match || `${item.team1} vs ${item.team2}`}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.league}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.date}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-500/20 dark:text-purple-300">
                      {item.time}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full table-fixed border-collapse text-sm">
            <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
              <tr>
                <th className="px-6 py-4 text-sm font-normal">Match</th>
                <th className="px-6 py-4 text-sm font-normal">League</th>
                <th className="px-6 py-4 text-sm font-normal">Viewers</th>
                <th className="px-6 py-4 text-sm font-normal">Result</th>
              </tr>
            </thead>
            <tbody className="text-sm text-foreground">
              {currentMatches.map((item: any, index: number) => (
                <tr
                  key={item.match || item.id || index}
                  className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-3 text-sm font-medium text-foreground">
                    {item.match || `${item.team1} vs ${item.team2}`}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.league}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.viewers}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        item.result === "Pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
                      )}
                    >
                      {item.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
