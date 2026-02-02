import { apiClient } from "@/lib/api-client";

// ===== Admin Count Stats =====
export interface AdminCountStat {
  label: string;
  count: number | string;
  badge_count: number;
}

export const getAdminCount = async () => {
  return apiClient<AdminCountStat[]>("/api/battle-lounge/admin/count");
};

// ===== User Growth =====
export interface UserGrowthDataPoint {
  label: string;
  total: number;
}

export interface UserGrowthData {
  day: UserGrowthDataPoint[];
  week: UserGrowthDataPoint[];
  month: UserGrowthDataPoint[];
  year: UserGrowthDataPoint[];
}

export const getUserGrowth = async () => {
  return apiClient<UserGrowthData>("/api/battle-lounge/admin/user-growth");
};

// ===== Tournament Overview =====
export interface TournamentOverview {
  total: number;
  created: number;
  played: number;
  canceled: number;
}

export const getTournamentOverview = async () => {
  return apiClient<TournamentOverview>(
    "/api/battle-lounge/admin/tournament-overview",
  );
};

// ===== Recent Tournaments =====
export interface RecentTournament {
  id: number;
  name: string;
  no_of_players: number;
  prize_amount: string;
  status: string;
  disputes: number;
  no_showes: number;
  new: number;
  un_ranked: number;
  ranked: number;
  app: number;
  web: number;
}

export const getRecentTournaments = async () => {
  return apiClient<RecentTournament[]>(
    "/api/battle-lounge/admin/recent-tournaments",
  );
};

// ===== Live Twitch Streams =====
export interface LiveTwitchStream {
  label: string;
  user: string;
  count: number;
}

export const getLiveTwitchStreams = async () => {
  return apiClient<LiveTwitchStream[]>(
    "/api/battle-lounge/admin/live-twitch-streams",
  );
};
