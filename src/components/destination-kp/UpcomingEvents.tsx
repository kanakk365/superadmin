"use client";

import { useEffect, useState } from "react";
import { getUpcomingEvents, UpcomingEvent } from "@/lib/api/dkp";

export const UpcomingEvents = () => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getUpcomingEvents();
        if (response.status && response.data) {
          setEvents(response.data);
        }
      } catch (err) {
        setError("Failed to load events");
        console.error("Error fetching upcoming events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get status badge styling
  const getStatusStyle = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "confirmed" || lowerStatus === "normal") {
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300";
    }
    if (lowerStatus === "planning") {
      return "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300";
    }
    if (lowerStatus === "tentative") {
      return "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300";
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300";
  };

  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">
        Upcoming Events
      </h3>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Event Name</th>
              <th className="px-6 py-4 text-sm font-normal">Date</th>
              <th className="px-6 py-4 text-sm font-normal">
                Expected Visitors
              </th>
              <th className="px-6 py-4 text-sm font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {loading ? (
              // Loading skeleton
              [...Array(5)].map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-border/60 last:border-0 animate-pulse"
                >
                  <td className="px-6 py-3">
                    <div className="h-4 bg-muted/50 rounded w-32" />
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-muted/50 rounded w-24" />
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-muted/50 rounded w-16" />
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-5 bg-muted/50 rounded-full w-16" />
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  {error}
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No upcoming events
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event.title}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {event.title}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {event.date}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {event.excepted_visitors.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(
                        event.status,
                      )}`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
