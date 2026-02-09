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
export interface NewUserGrowthItem {
  label: string | number;
  total: number;
}

export interface NewUserGrowthData {
  day: NewUserGrowthItem[];
  week: NewUserGrowthItem[];
  month: NewUserGrowthItem[];
  year: NewUserGrowthItem[];
}

export const getYSNOrganizerNewUserGrowth = async () => {
  return apiClient<NewUserGrowthData>("/api/ysn/organizer/new-user-growth");
};

// ===== Matches =====
export interface Match {
  id?: number;
  match?: string;
  // API fields
  team_name?: string;
  opt_team_name?: string;
  match_team1_score?: number;
  match_team2_score?: number;
  // Legacy/Fallback fields
  team1?: string;
  team2?: string;

  league?: string;
  date?: string;
  time?: string;
  viewers?: number; // changed from string to number based on API (0)
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
  // api returns array of objects directly
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
