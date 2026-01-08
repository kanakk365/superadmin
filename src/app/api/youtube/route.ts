import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken, fetchWithTimeout } from "@/lib/google-auth";

const YT_API_BASE = "https://www.googleapis.com/youtube/v3";
const YT_ANALYTICS_API = "https://youtubeanalytics.googleapis.com/v2";

interface YouTubeResponse {
  connected: boolean;
  data?: {
    channel: {
      id: string;
      title: string;
      description: string;
      thumbnail: string;
      subscriberCount: number;
      videoCount: number;
      viewCount: number;
    };
    analytics: {
      views: number;
      watchTimeMinutes: number;
      subscribersGained: number;
      subscribersLost: number;
      estimatedRevenue?: number;
      averageViewDuration: number;
    };
    dailyData: Array<{
      date: string;
      views: number;
      watchTimeMinutes: number;
    }>;
    recentVideos: Array<{
      id: string;
      title: string;
      thumbnail: string;
      views: number;
      likes: number;
      comments: number;
      publishedAt: string;
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
    } catch {
      return null;
    }
  }

  return accessToken || null;
}

export async function GET(): Promise<NextResponse<YouTubeResponse>> {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return NextResponse.json({
        connected: false,
        error: "Not connected to YouTube",
      });
    }

    // Get channel info
    const channelResponse = await fetchWithTimeout(
      `${YT_API_BASE}/channels?part=snippet,statistics&mine=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!channelResponse.ok) {
      const error = await channelResponse.text();
      console.error("Failed to fetch channel:", error);
      return NextResponse.json({
        connected: true,
        error: "Failed to fetch YouTube channel data",
      });
    }

    const channelData = await channelResponse.json();
    const channel = channelData.items?.[0];

    if (!channel) {
      return NextResponse.json({
        connected: true,
        error: "No YouTube channel found for this account",
      });
    }

    // Get recent videos
    const videosResponse = await fetchWithTimeout(
      `${YT_API_BASE}/search?part=snippet&channelId=${channel.id}&order=date&maxResults=10&type=video`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const videosData = videosResponse.ok
      ? await videosResponse.json()
      : { items: [] };

    // Get video statistics
    const videoIds = videosData.items
      ?.map((v: { id: { videoId: string } }) => v.id.videoId)
      .join(",");

    let videoStats: Record<
      string,
      { viewCount: string; likeCount: string; commentCount: string }
    > = {};
    if (videoIds) {
      const statsResponse = await fetchWithTimeout(
        `${YT_API_BASE}/videos?part=statistics&id=${videoIds}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        videoStats = statsData.items?.reduce(
          (
            acc: Record<
              string,
              { viewCount: string; likeCount: string; commentCount: string }
            >,
            v: {
              id: string;
              statistics: {
                viewCount: string;
                likeCount: string;
                commentCount: string;
              };
            }
          ) => {
            acc[v.id] = v.statistics;
            return acc;
          },
          {}
        );
      }
    }

    // Try to get YouTube Analytics (may fail if not set up)
    let analyticsData = {
      views: 0,
      watchTimeMinutes: 0,
      subscribersGained: 0,
      subscribersLost: 0,
      averageViewDuration: 0,
    };

    // Get date range for analytics (last 30 days)
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    try {
      const analyticsResponse = await fetchWithTimeout(
        `${YT_ANALYTICS_API}/reports?ids=channel==MINE&startDate=${startDate}&endDate=${endDate}&metrics=views,estimatedMinutesWatched,subscribersGained,subscribersLost,averageViewDuration`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (analyticsResponse.ok) {
        const analyticsResult = await analyticsResponse.json();
        const row = analyticsResult.rows?.[0];
        if (row) {
          analyticsData = {
            views: row[0] || 0,
            watchTimeMinutes: row[1] || 0,
            subscribersGained: row[2] || 0,
            subscribersLost: row[3] || 0,
            averageViewDuration: row[4] || 0,
          };
        }
      }
    } catch (e) {
      console.error("YouTube Analytics API error:", e);
      // Continue without analytics data
    }

    // Get daily views data
    let dailyData: Array<{
      date: string;
      views: number;
      watchTimeMinutes: number;
    }> = [];
    try {
      const dailyResponse = await fetchWithTimeout(
        `${YT_ANALYTICS_API}/reports?ids=channel==MINE&startDate=${startDate}&endDate=${endDate}&metrics=views,estimatedMinutesWatched&dimensions=day&sort=day`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (dailyResponse.ok) {
        const dailyResult = await dailyResponse.json();
        dailyData =
          dailyResult.rows?.map((row: [string, number, number]) => ({
            date: row[0],
            views: row[1] || 0,
            watchTimeMinutes: row[2] || 0,
          })) || [];
      }
    } catch (e) {
      console.error("Daily analytics error:", e);
    }

    // Format recent videos
    const recentVideos =
      videosData.items?.map(
        (video: {
          id: { videoId: string };
          snippet: {
            title: string;
            thumbnails: { medium: { url: string } };
            publishedAt: string;
          };
        }) => {
          const stats = videoStats[video.id.videoId] || {};
          return {
            id: video.id.videoId,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails?.medium?.url || "",
            views: parseInt(stats.viewCount || "0"),
            likes: parseInt(stats.likeCount || "0"),
            comments: parseInt(stats.commentCount || "0"),
            publishedAt: video.snippet.publishedAt,
          };
        }
      ) || [];

    return NextResponse.json({
      connected: true,
      data: {
        channel: {
          id: channel.id,
          title: channel.snippet.title,
          description: channel.snippet.description,
          thumbnail: channel.snippet.thumbnails?.medium?.url || "",
          subscriberCount: parseInt(channel.statistics.subscriberCount || "0"),
          videoCount: parseInt(channel.statistics.videoCount || "0"),
          viewCount: parseInt(channel.statistics.viewCount || "0"),
        },
        analytics: analyticsData,
        dailyData,
        recentVideos,
      },
    });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json({
      connected: false,
      error: "Failed to fetch YouTube data",
    });
  }
}
