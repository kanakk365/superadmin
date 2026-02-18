import { apiClient, ApiResponse } from "@/lib/api-client";

export interface OrganizerStats {
  total: number;
  upcomming: number;
  live: number;
  completed: number;
  canceled: number;
}

export interface PlayerType {
  new_players: number;
  ranked: number;
  un_ranked: number;
}

export interface Tournament {
  id: number;
  name: string;
  date_time: string;
  tournament_type: number;
  game_id: number;
  prize_pool: string | null;
  players: number;
  game_name: string;
  status: string;
  disputes: number;
  cancel: number;
  player_no_shows: number;
  revenue: number;
  sponsors: any[];
  player_type: PlayerType;
}

export interface StatusBasedTournaments {
  upcoming: Tournament[];
  live: Tournament[];
  completed: Tournament[];
}

export interface PopularGamesData {
  games: any[];
  total_players: number;
}

export const getOrganizerStats = async () => {
  return apiClient<OrganizerStats>("/api/battle-lounge/organizer/count");
};

export const getStatusBasedTournaments = async () => {
  return apiClient<StatusBasedTournaments>(
    "/api/battle-lounge/organizer/status-based-tournaments",
  );
};

export const getPopularGames = async () => {
  return apiClient<PopularGamesData>(
    "/api/battle-lounge/organizer/popular-games",
  );
};

// New API Interfaces
export interface StatData {
  label: string | number;
  total: number;
  played: number;
  canceled: number;
}

export interface PeriodStats {
  total_created: number;
  total_played: number;
  total_canceled: number;
  data: StatData[];
}

export interface TournamentStatistics {
  days: PeriodStats;
  weeks: PeriodStats;
  months: PeriodStats;
  yearTournaments: PeriodStats;
}

export interface ReachData {
  label: string;
  reaches: number;
  impressions: number;
}

export interface ReachImpressionData {
  last_7_days: ReachData[];
  last_30_days: ReachData[];
  last_3months: ReachData[];
}

export interface UserCount {
  count: number;
  growth: number;
}

export interface OrganizerUsersData {
  totalParticipatedUsers: UserCount;
  totalActiveUsers: UserCount;
  totalOrganizerPlayer: UserCount;
}

export interface NewUserStats {
  label: string;
  total: number;
}

export interface NewUserPeriodStats {
  total_created: number;
  data: NewUserStats[];
}

export interface NewUsersData {
  days: NewUserPeriodStats;
  weeks: NewUserPeriodStats;
  months: NewUserPeriodStats;
  years: NewUserPeriodStats;
}

// New API Functions
export const getTournamentStatistics = async () => {
  return apiClient<TournamentStatistics>(
    "/api/battle-lounge/organizer/tournament-statistics",
  );
};

export const getLiveTournamentDetails = async () => {
  return apiClient<Tournament[]>(
    "/api/battle-lounge/organizer/live-tournament-details",
  );
};

export const getReachImpression = async () => {
  return apiClient<ReachImpressionData>(
    "/api/battle-lounge/organizer/reach-impression",
  );
};

export const getOrganizerUsers = async () => {
  return apiClient<OrganizerUsersData>("/api/battle-lounge/organizer/users");
};

export const getNewUsersStats = async () => {
  return apiClient<NewUsersData>("/api/battle-lounge/organizer/new-users");
};
