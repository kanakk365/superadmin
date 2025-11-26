const jobs = [
  { title: "Event Coordinator", department: "Events", type: "Full-time", applicants: 45 },
  { title: "Facility Manager", department: "Operations", type: "Full-time", applicants: 28 },
  { title: "Marketing Specialist", department: "Marketing", type: "Part-time", applicants: 12 },
  { title: "Guest Services Rep", department: "Service", type: "Full-time", applicants: 67 },
  { title: "IT Support Specialist", department: "IT", type: "Contract", applicants: 8 },
];

export const JobsList = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">Active Job Openings</h3>
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
            {jobs.map((job) => (
              <tr key={job.title} className="border-b border-border/60 last:border-0">
                <td className="px-6 py-3 text-sm font-normal text-foreground">{job.title}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{job.department}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{job.type}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{job.applicants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

