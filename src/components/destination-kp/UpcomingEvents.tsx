const events = [
  {
    name: "Summer Music Fest",
    date: "July 15, 2025",
    visitors: "5,000",
    status: "Confirmed",
  },
  {
    name: "Tech Expo 2025",
    date: "Aug 20, 2025",
    visitors: "12,000",
    status: "Planning",
  },
  {
    name: "Food Truck Rally",
    date: "Sept 05, 2025",
    visitors: "3,500",
    status: "Confirmed",
  },
  {
    name: "Art in the Park",
    date: "Oct 10, 2025",
    visitors: "2,000",
    status: "Tentative",
  },
  {
    name: "Winter Gala",
    date: "Dec 12, 2025",
    visitors: "800",
    status: "Planning",
  },
];

export const UpcomingEvents = () => {
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
            {events.map((event) => (
              <tr
                key={event.name}
                className="border-b border-border/60 last:border-0"
              >
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {event.name}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {event.date}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {event.visitors}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      event.status === "Confirmed"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                        : event.status === "Planning"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
