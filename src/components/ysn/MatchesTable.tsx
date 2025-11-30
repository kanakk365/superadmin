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

const upcomingMatches = [
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

const recentMatches = [
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
    "upcoming"
  );

  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <div className="flex items-center justify-between px-6 mb-4">
        <h3 className="text-lg font-semibold text-foreground">Matches</h3>
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
        {matchType === "upcoming" ? (
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
              {upcomingMatches.map((item) => (
                <tr
                  key={item.match}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.match}
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
              {recentMatches.map((item) => (
                <tr
                  key={item.match}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.match}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.league}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.viewers}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {item.result}
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
