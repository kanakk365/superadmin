const matches = [
  {
    match: "Rockets vs Comets",
    league: "Super Cup",
    date: "Nov 28, 2025",
    time: "18:00",
  },
  {
    match: "Titans vs Giants",
    league: "Qualifier",
    date: "Nov 29, 2025",
    time: "20:00",
  },
  {
    match: "Wolves vs Bears",
    league: "Friendly",
    date: "Dec 01, 2025",
    time: "16:30",
  },
  {
    match: "Eagles vs Sharks",
    league: "Championship",
    date: "Dec 03, 2025",
    time: "19:00",
  },
  {
    match: "Tigers vs Lions",
    league: "Premier League",
    date: "Dec 05, 2025",
    time: "17:45",
  },
];

export const UpcomingMatches = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">
        Upcoming Matches
      </h3>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Match</th>
              <th className="px-6 py-4 text-sm font-normal">League</th>
              <th className="px-6 py-4 text-sm font-normal">Date</th>
              <th className="px-6 py-4 text-sm font-normal">Time</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {matches.map((item) => (
              <tr
                key={item.match}
                className="border-b border-border/60 last:border-0"
              >
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.match}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.league}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.date}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-500/20 dark:text-violet-300">
                    {item.time}
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
