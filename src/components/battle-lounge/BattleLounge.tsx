"use client";

import { useEffect, useState } from "react";
import { BattleLoungeStats, UsersCard } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TournamentList } from "./TournamentList";
import { BattleLoungeReachChart } from "./BattleLoungeReachChart";
import { PopularGamesPie } from "./PopularGamesPie";
import { NewUsersChart } from "./NewUsersChart";
import { TournamentsStatsChart } from "./TournamentsStatsChart";
import { LiveTournaments } from "./LiveTournaments";
import { AdvertiserStats } from "./AdvertiserStats";
import {
  getOrganizerStats,
  getStatusBasedTournaments,
  getPopularGames,
  getTournamentStatistics,
  getLiveTournamentDetails,
  getReachImpression,
  getOrganizerUsers,
  getNewUsersStats,
  OrganizerStats,
  StatusBasedTournaments,
  PopularGamesData,
  TournamentStatistics,
  Tournament,
  ReachImpressionData,
  OrganizerUsersData,
  NewUsersData,
} from "@/lib/api/battle-lounge/organizer";
import { Loader2 } from "lucide-react";

export const BattleLounge = () => {
  const [stats, setStats] = useState<OrganizerStats | undefined>(undefined);
  const [tournaments, setTournaments] = useState<
    StatusBasedTournaments | undefined
  >(undefined);
  const [popularGames, setPopularGames] = useState<
    PopularGamesData | undefined
  >(undefined);
  const [tournamentStats, setTournamentStats] = useState<
    TournamentStatistics | undefined
  >(undefined);
  const [liveDetails, setLiveDetails] = useState<Tournament[] | undefined>(
    undefined,
  );
  const [reachData, setReachData] = useState<ReachImpressionData | undefined>(
    undefined,
  );
  const [usersData, setUsersData] = useState<OrganizerUsersData | undefined>(
    undefined,
  );
  const [newUsersData, setNewUsersData] = useState<NewUsersData | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [
          statsRes,
          tournamentsRes,
          popularGamesRes,
          tournamentStatsRes,
          liveDetailsRes,
          reachRes,
          usersRes,
          newUsersRes,
        ] = await Promise.all([
          getOrganizerStats(),
          getStatusBasedTournaments(),
          getPopularGames(),
          getTournamentStatistics(),
          getLiveTournamentDetails(),
          getReachImpression(),
          getOrganizerUsers(),
          getNewUsersStats(),
        ]);

        if (statsRes.status) setStats(statsRes.data);
        if (tournamentsRes.status) setTournaments(tournamentsRes.data);
        if (popularGamesRes.status) setPopularGames(popularGamesRes.data);
        if (tournamentStatsRes.status)
          setTournamentStats(tournamentStatsRes.data);
        if (liveDetailsRes.status) setLiveDetails(liveDetailsRes.data);
        if (reachRes.status) setReachData(reachRes.data);
        if (usersRes.status) setUsersData(usersRes.data);
        if (newUsersRes.status) setNewUsersData(newUsersRes.data);
      } catch (err) {
        console.error("Failed to fetch battle lounge data", err);
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate total revenue from tournaments if available
  const allTournaments = tournaments
    ? [...tournaments.upcoming, ...tournaments.live, ...tournaments.completed]
    : [];
  const totalRevenue = allTournaments.reduce(
    (acc, t) => acc + (t.revenue || 0),
    0,
  );

  return (
    <ScrollArea className="h-full w-full bg-gradient-to-b from-muted/20 to-background">
      <div className="flex flex-col gap-6 lg:gap-8 px-4 sm:px-8 py-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Battle Lounge
          </h1>
          <p className="text-muted-foreground">
            Manage tournaments, track revenue, and analyze user engagement.
          </p>
        </div>

        {/* Stats Section - Bento Grid Layout */}
        <BattleLoungeStats stats={stats} totalRevenue={totalRevenue} />

        {/* Second Row - Users Card and Chart */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-1">
            <UsersCard data={usersData} />
          </div>
          <div className="lg:col-span-2">
            <BattleLoungeReachChart data={reachData} />
          </div>
        </div>

        {/* New Users Chart - Day/Week/Month/Year */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <NewUsersChart data={newUsersData} />
          <TournamentsStatsChart stats={tournamentStats} />
        </div>

        {/* Live Tournaments Section */}
        {/* Pass liveDetails preferably, duplicate fallback to tournaments.live */}
        <LiveTournaments
          tournaments={
            liveDetails && liveDetails.length > 0
              ? liveDetails
              : tournaments?.live || []
          }
        />

        {/* Tournament List and Popular Games */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[2fr_1fr]">
          <TournamentList
            upcoming={tournaments?.upcoming}
            live={tournaments?.live}
            completed={tournaments?.completed}
          />
          <PopularGamesPie data={popularGames} />
        </div>

        {/* Advertiser Stats Section */}
        <AdvertiserStats />
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
