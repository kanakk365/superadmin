"use client";

import { useEffect, useState } from "react";
import { getActiveJobs, ActiveJob } from "@/lib/api/dkp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Briefcase } from "lucide-react";

const VISIBLE_JOBS_COUNT = 5;

const JobRow = ({ job }: { job: ActiveJob }) => (
  <tr className="border-b border-border/60 last:border-0">
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
);

const JobsTable = ({
  jobs,
  showAll = false,
}: {
  jobs: ActiveJob[];
  showAll?: boolean;
}) => {
  const displayJobs = showAll ? jobs : jobs.slice(0, VISIBLE_JOBS_COUNT);

  return (
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
        {displayJobs.map((job) => (
          <JobRow key={job.title} job={job} />
        ))}
      </tbody>
    </table>
  );
};

const LoadingSkeleton = () => (
  <>
    {[...Array(VISIBLE_JOBS_COUNT)].map((_, i) => (
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
    ))}
  </>
);

export const JobsList = () => {
  const [jobs, setJobs] = useState<ActiveJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const hasMoreJobs = jobs.length > VISIBLE_JOBS_COUNT;

  return (
    <>
      <div className="rounded-3xl bg-card py-6 px-3">
        <div className="flex items-center justify-between px-6 mb-2">
          <h3 className="text-lg font-semibold text-foreground">
            Active Job Openings
          </h3>
          {hasMoreJobs && !loading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
            >
              See All ({jobs.length})
            </Button>
          )}
        </div>
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
                <LoadingSkeleton />
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
                jobs
                  .slice(0, VISIBLE_JOBS_COUNT)
                  .map((job) => <JobRow key={job.title} job={job} />)
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Jobs Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] rounded-2xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-500/20">
                <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  All Job Openings
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  Showing all {jobs.length} active job openings
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="overflow-auto max-h-[calc(85vh-140px)]">
            <JobsTable jobs={jobs} showAll />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
