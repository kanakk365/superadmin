import { apiClient } from "@/lib/api-client";

// ===== DKP Count Stats =====
export interface DKPCountStat {
  label: string;
  count: number;
  badge_count: number;
}

export const getDKPCount = async () => {
  return apiClient<DKPCountStat[]>("/api/dkp/count");
};

// ===== Active Jobs =====
export interface ActiveJob {
  title: string;
  dept_name: string;
  type: string;
  application_count: number;
}

export const getActiveJobs = async () => {
  return apiClient<ActiveJob[]>("/api/dkp/active-jobs");
};

// ===== Upcoming Events =====
export interface UpcomingEvent {
  title: string;
  date: string;
  excepted_visitors: number;
  status: string;
}

export const getUpcomingEvents = async () => {
  return apiClient<UpcomingEvent[]>("/api/dkp/upcoming-events");
};

// ===== Revenue =====
export interface RevenueDataPoint {
  key: number;
  value: number;
}

export interface DKPRevenue {
  lable: string;
  total_amt: number;
  growth_percentage: number;
  tourism: number;
  events: number;
  facilities: number;
  data: RevenueDataPoint[];
}

export const getDKPRevenue = async () => {
  return apiClient<DKPRevenue>("/api/dkp/revenue");
};

// ===== Guest Channel =====
export interface GuestChannelData {
  label: string;
  digital: number;
  on_site: number;
}

export const getGuestChannel = async () => {
  return apiClient<GuestChannelData[]>("/api/dkp/guest-channel");
};

// ===== Event Attendance Trends =====
export interface EventAttendanceTrend {
  label: string;
  attendees: number;
  projected: number;
}

export const getEventAttendanceTrends = async () => {
  return apiClient<EventAttendanceTrend[]>("/api/dkp/event-attendance-trends");
};
