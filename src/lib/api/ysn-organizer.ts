import { apiClient } from "@/lib/api-client";

// ===== Count Stats =====
export interface YSNOrganizerCountStat {
  label: string;
  count: number;
  badge_count: number;
}

export const getYSNOrganizerCount = async () => {
  return apiClient<YSNOrganizerCountStat[]>("/api/ysn/organizer/count");
};

// ===== New User Growth =====
export interface NewUserGrowthData {
  label: string | number;
  value: number;
}

export const getYSNOrganizerNewUserGrowth = async () => {
  return apiClient<NewUserGrowthData[]>("/api/ysn/organizer/new-user-growth");
};

// ===== Matches =====
export interface Match {
  id?: number;
  match?: string;
  team1?: string;
  team2?: string;
  league?: string;
  date?: string;
  time?: string;
  viewers?: string;
  result?: string;
  status?: string;
}

export interface MatchesData {
  recents: Match[];
  upcoming: Match[];
}

export const getYSNOrganizerMatches = async () => {
  return apiClient<MatchesData>("/api/ysn/organizer/matches");
};

// ===== Match Statistics =====
export interface MatchStatisticsData {
  label: string;
  played?: number;
  scheduled?: number;
  count?: number;
}

export const getYSNOrganizerMatchStatistics = async () => {
  return apiClient<MatchStatisticsData[]>(
    "/api/ysn/organizer/match-statistics",
  );
};

// ===== Total Revenue =====
export interface RevenueDataPoint {
  label: number;
  value: number;
}

export interface TeamRevenue {
  team_name: string;
  revenue_percentage: number;
}

export interface TotalRevenueData {
  growth_count: number;
  data: {
    day: RevenueDataPoint[];
    week: RevenueDataPoint[];
    month: RevenueDataPoint[];
    year: RevenueDataPoint[];
  };
  team_data: TeamRevenue[];
}

export const getYSNOrganizerTotalRevenue = async () => {
  return apiClient<TotalRevenueData>("/api/ysn/organizer/total-revenue");
};
