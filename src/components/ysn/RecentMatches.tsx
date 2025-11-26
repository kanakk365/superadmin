const matches = [
  { match: "Tigers vs Lions", league: "Premier League", viewers: "12.5K", result: "2 - 1" },
  { match: "Eagles vs Sharks", league: "Championship", viewers: "8.2K", result: "0 - 0" },
  { match: "Rockets vs Comets", league: "Super Cup", viewers: "15.1K", result: "Pending" },
  { match: "Titans vs Giants", league: "Qualifier", viewers: "5.6K", result: "3 - 2" },
  { match: "Wolves vs Bears", league: "Friendly", viewers: "2.1K", result: "1 - 4" },
];

export const RecentMatches = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">Recent Matches</h3>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Match</th>
              <th className="px-6 py-4 text-sm font-normal">League</th>
              <th className="px-6 py-4 text-sm font-normal">Viewers</th>
              <th className="px-6 py-4 text-sm font-normal">Result</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {matches.map((item) => (
              <tr key={item.match} className="border-b border-border/60 last:border-0">
                <td className="px-6 py-3 text-sm font-normal text-foreground">{item.match}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{item.league}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{item.viewers}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{item.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

