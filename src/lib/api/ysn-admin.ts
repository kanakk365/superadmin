import { apiClient } from "@/lib/api-client";

// ===== Admin Count Stats =====
export interface YSNAdminCountStat {
  label: string;
  count: number;
  badge_count: number;
}

export const getYSNAdminCount = async () => {
  return apiClient<YSNAdminCountStat[]>("/api/ysn/admin/count");
};

// ===== Revenue Sources =====
export interface RevenueSource {
  label: string;
  value: number;
}

export const getYSNAdminRevenueSources = async () => {
  return apiClient<RevenueSource[]>("/api/ysn/admin/revenue-sources");
};

// ===== Total Revenue Trends =====
export interface TrendDataPoint {
  label?: string; // Some have label, some have key like "Sun"
  [key: string]: string | number | undefined;
  value: number;
}

export interface BreakDownData {
  day: TrendDataPoint[];
  week: TrendDataPoint[];
  month: TrendDataPoint[];
  year: TrendDataPoint[];
}

export interface RevenueTrendsData {
  platform_total: BreakDownData;
  by_organization: BreakDownData;
  by_team: BreakDownData;
}

export const getYSNAdminTotalRevenueTrends = async () => {
  return apiClient<RevenueTrendsData>("/api/ysn/admin/total-revenue-trends");
};

// ===== Streaming Performance =====
export interface StreamingPerfPoint {
  label?: string;
  [key: string]: string | number | undefined;
  value: number;
}

export interface StreamingPerfData {
  day: StreamingPerfPoint[];
  week: StreamingPerfPoint[];
  month: StreamingPerfPoint[];
  year: StreamingPerfPoint[];
}

export const getYSNAdminStreamingPerformance = async () => {
  return apiClient<StreamingPerfData>("/api/ysn/admin/streaming-performance");
};

// ===== Recent Streamed Events =====
export interface StreamedEventMinutes {
  viewed: number;
  streamed: number;
}

export interface StreamedEvent {
  date: string;
  organization: string;
  team: string;
  sponsors: string[];
  viewers: number;
  minutes: StreamedEventMinutes;
  revenue: number;
}

export const getYSNAdminRecentStreamedEvents = async () => {
  return apiClient<StreamedEvent[]>("/api/ysn/admin/recent-streamed-events");
};

// ===== New Users Acquisition =====
export interface NewUserPoint {
  label: string;
  total: number;
}

export interface NewUserAcquisitionData {
  day: NewUserPoint[];
  week: NewUserPoint[];
  month: NewUserPoint[];
  year: NewUserPoint[];
}

export const getYSNAdminNewUserAcquisition = async () => {
  return apiClient<NewUserAcquisitionData>(
    "/api/ysn/admin/new-users-acquisition",
  );
};

// ===== Top Advertiser Revenue =====
export interface AdvertiserRevenue {
  advertiser: string;
  active_campaigns: number;
  revenue: number;
}

export const getYSNAdminTopAdvertiserRevenue = async () => {
  return apiClient<AdvertiserRevenue[]>(
    "/api/ysn/admin/top-advertiser-revenue",
  );
};
