"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const engagementData = [
  { month: "Jan", likes: 4000, favorites: 2400, comments: 1200 },
  { month: "Feb", likes: 3000, favorites: 1398, comments: 980 },
  { month: "Mar", likes: 5000, favorites: 3800, comments: 1800 },
  { month: "Apr", likes: 2780, favorites: 3908, comments: 1500 },
  { month: "May", likes: 1890, favorites: 4800, comments: 2100 },
  { month: "Jun", likes: 2390, favorites: 3800, comments: 1600 },
  { month: "Jul", likes: 3490, favorites: 4300, comments: 2200 },
  { month: "Aug", likes: 5200, favorites: 5100, comments: 2800 },
  { month: "Sep", likes: 8500, favorites: 6200, comments: 3500 },
  { month: "Oct", likes: 10500, favorites: 7800, comments: 4200 },
  { month: "Nov", likes: 9500, favorites: 7200, comments: 3900 },
  { month: "Dec", likes: 12500, favorites: 8900, comments: 5100 },
];

export const PostEngagementChart = () => {
  return (
    <div className="rounded-[32px] bg-card border border-border/40 p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Post Engagement Overview
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Likes, Favorites, and Comments over time
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Likes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ec4899]"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Favorites
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Comments
              </span>
            </div>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={engagementData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorFavorites" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#ec4899"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#ec4899"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#3b82f6"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#3b82f6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{
                  color: "hsl(var(--foreground))",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
                itemStyle={{
                  color: "hsl(var(--muted-foreground))",
                  fontSize: "14px",
                }}
              />
              <Area
                type="monotone"
                dataKey="likes"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLikes)"
              />
              <Area
                type="monotone"
                dataKey="favorites"
                stroke="#ec4899"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorFavorites)"
              />
              <Area
                type="monotone"
                dataKey="comments"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorComments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
