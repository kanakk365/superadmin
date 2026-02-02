"use client";

import { useEffect, useState } from "react";
import { getActiveJobs, ActiveJob } from "@/lib/api/dkp";

export const JobsList = () => {
  const [jobs, setJobs] = useState<ActiveJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getActiveJobs();
        if (response.status && response.data) {
          setJobs(response.data);
        }
      } catch (err) {
        setError("Failed to load jobs");
        console.error("Error fetching active jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">
        Active Job Openings
      </h3>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Title</th>
              <th className="px-6 py-4 text-sm font-normal">Department</th>
              <th className="px-6 py-4 text-sm font-normal">Type</th>
              <th className="px-6 py-4 text-sm font-normal">Applicants</th>
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
                    <div className="h-5 bg-muted/50 rounded-full w-16" />
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-4 bg-muted/50 rounded w-8" />
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
            ) : jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No active job openings
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.title}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {job.title}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {job.dept_name}
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        job.type === "Full-Time"
                          ? "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300"
                          : job.type === "Part-Time"
                            ? "bg-pink-100 text-pink-800 dark:bg-pink-500/20 dark:text-pink-300"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300"
                      }`}
                    >
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm font-normal text-foreground">
                    {job.application_count}
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
