import { getAuthToken } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://oneplace.io";

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

async function fetchWithAuth<T>(
  endpoint: string,
): Promise<{ status: boolean; data: T; message: string }> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`; // Use just token because saved token might include scheme or not.
    // Wait, let's verify how the token is saved.
    // In auth.ts: localStorage.setItem("auth_token", data.token);
    // The user provided: "token": "10|DjZY..."
    // So it's just the token. The header should be `Bearer ${token}`.
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.statusText}`);
  }

  return response.json();
}

export const getOrganizerStats = async () => {
  return fetchWithAuth<OrganizerStats>("/api/battle-lounge/organizer/count");
};

export const getStatusBasedTournaments = async () => {
  return fetchWithAuth<StatusBasedTournaments>(
    "/api/battle-lounge/organizer/status-based-tournaments",
  );
};

export const getPopularGames = async () => {
  return fetchWithAuth<PopularGamesData>(
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

// New API Functions
export const getTournamentStatistics = async () => {
  return fetchWithAuth<TournamentStatistics>(
    "/api/battle-lounge/organizer/tournament-statistics",
  );
};

export const getLiveTournamentDetails = async () => {
  return fetchWithAuth<Tournament[]>(
    "/api/battle-lounge/organizer/live-tournament-details",
  );
};

export const getReachImpression = async () => {
  return fetchWithAuth<ReachImpressionData>(
    "/api/battle-lounge/organizer/reach-impression",
  );
};

export const getOrganizerUsers = async () => {
  return fetchWithAuth<OrganizerUsersData>(
    "/api/battle-lounge/organizer/users",
  );
};
