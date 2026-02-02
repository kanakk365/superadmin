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
