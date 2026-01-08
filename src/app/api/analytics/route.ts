import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken, fetchWithTimeout } from "@/lib/google-auth";

const GA_API_BASE = "https://analyticsdata.googleapis.com/v1beta";

interface AnalyticsResponse {
  connected: boolean;
  data?: {
    overview: {
      totalUsers: number;
      activeUsers: number;
      sessions: number;
      bounceRate: number;
      avgSessionDuration: number;
    };
    dailyData: Array<{
      date: string;
      users: number;
      sessions: number;
      pageViews: number;
    }>;
    trafficSources: Array<{
      source: string;
      users: number;
      percentage: number;
    }>;
    topPages: Array<{
      page: string;
      views: number;
      avgTime: number;
    }>;
  };
  error?: string;
}

async function getValidAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("google_access_token")?.value;
  const refreshToken = cookieStore.get("google_refresh_token")?.value;

  if (!accessToken && refreshToken) {
    try {
      const tokens = await refreshAccessToken(refreshToken);
      accessToken = tokens.access_token;
      // Note: In a real app, you'd want to update the cookie here
    } catch {
      return null;
    }
  }

  return accessToken || null;
}

export async function GET(): Promise<NextResponse<AnalyticsResponse>> {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return NextResponse.json({
        connected: false,
        error: "Not connected to Google Analytics",
      });
    }

    // First, get the list of GA4 properties
    const accountsResponse = await fetchWithTimeout(
      "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!accountsResponse.ok) {
      const error = await accountsResponse.text();
      console.error("Failed to fetch accounts:", error);
      return NextResponse.json({
        connected: true,
        error:
          "Failed to fetch analytics accounts. Make sure you have GA4 properties set up.",
      });
    }

    const accountsData = await accountsResponse.json();

    // Get the first property (you might want to let users select)
    const property = accountsData.accountSummaries?.[0]?.propertySummaries?.[0];

    if (!property) {
      return NextResponse.json({
        connected: true,
        error:
          "No Google Analytics properties found. Please set up a GA4 property first.",
      });
    }

    const propertyId = property.property.replace("properties/", "");

    // Fetch analytics data
    const reportResponse = await fetchWithTimeout(
      `${GA_API_BASE}/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "date" }],
          metrics: [
            { name: "totalUsers" },
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
            { name: "bounceRate" },
            { name: "averageSessionDuration" },
          ],
          orderBys: [{ dimension: { dimensionName: "date" } }],
        }),
      }
    );

    if (!reportResponse.ok) {
      const error = await reportResponse.text();
      console.error("Failed to fetch report:", error);
      return NextResponse.json({
        connected: true,
        error: "Failed to fetch analytics data",
      });
    }

    const reportData = await reportResponse.json();

    // Fetch traffic sources
    const sourcesResponse = await fetchWithTimeout(
      `${GA_API_BASE}/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "sessionSource" }],
          metrics: [{ name: "totalUsers" }],
          orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
          limit: 5,
        }),
      }
    );

    const sourcesData = sourcesResponse.ok
      ? await sourcesResponse.json()
      : { rows: [] };

    // Parse the data
    const rows = reportData.rows || [];
    let totalUsers = 0;
    let activeUsers = 0;
    let totalSessions = 0;
    let totalBounceRate = 0;
    let totalDuration = 0;

    const dailyData = rows.map(
      (row: {
        dimensionValues: Array<{ value: string }>;
        metricValues: Array<{ value: string }>;
      }) => {
        const users = parseInt(row.metricValues[0]?.value || "0");
        const active = parseInt(row.metricValues[1]?.value || "0");
        const sessions = parseInt(row.metricValues[2]?.value || "0");
        const pageViews = parseInt(row.metricValues[3]?.value || "0");
        const bounce = parseFloat(row.metricValues[4]?.value || "0");
        const duration = parseFloat(row.metricValues[5]?.value || "0");

        totalUsers += users;
        activeUsers += active;
        totalSessions += sessions;
        totalBounceRate += bounce;
        totalDuration += duration;

        return {
          date: row.dimensionValues[0]?.value || "",
          users,
          sessions,
          pageViews,
        };
      }
    );

    const avgBounceRate = rows.length > 0 ? totalBounceRate / rows.length : 0;
    const avgDuration = rows.length > 0 ? totalDuration / rows.length : 0;

    // Parse traffic sources
    const sourceRows = sourcesData.rows || [];
    const totalSourceUsers = sourceRows.reduce(
      (sum: number, row: { metricValues: Array<{ value: string }> }) =>
        sum + parseInt(row.metricValues[0]?.value || "0"),
      0
    );

    const trafficSources = sourceRows.map(
      (row: {
        dimensionValues: Array<{ value: string }>;
        metricValues: Array<{ value: string }>;
      }) => {
        const users = parseInt(row.metricValues[0]?.value || "0");
        return {
          source: row.dimensionValues[0]?.value || "Unknown",
          users,
          percentage:
            totalSourceUsers > 0 ? (users / totalSourceUsers) * 100 : 0,
        };
      }
    );

    return NextResponse.json({
      connected: true,
      data: {
        overview: {
          totalUsers,
          activeUsers,
          sessions: totalSessions,
          bounceRate: Math.round(avgBounceRate * 100) / 100,
          avgSessionDuration: Math.round(avgDuration),
        },
        dailyData,
        trafficSources,
        topPages: [], // Would need another API call
      },
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({
      connected: false,
      error: "Failed to fetch analytics data",
    });
  }
}
