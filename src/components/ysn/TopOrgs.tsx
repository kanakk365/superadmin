const orgs = [
  { name: "Elite Sports Academy", players: 120, matches: 45, wins: 32 },
  { name: "Future Stars Club", players: 95, matches: 38, wins: 25 },
  { name: "Pro Training Center", players: 88, matches: 42, wins: 28 },
  { name: "Youth Athletic League", players: 150, matches: 50, wins: 35 },
  { name: "Champion's Hub", players: 75, matches: 30, wins: 18 },
];

export const TopOrgs = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">
        Top Organizations
      </h3>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Organization</th>
              <th className="px-6 py-4 text-sm font-normal">Players</th>
              <th className="px-6 py-4 text-sm font-normal">Matches</th>
              <th className="px-6 py-4 text-sm font-normal">Wins</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {orgs.map((item) => (
              <tr
                key={item.name}
                className="border-b border-border/60 last:border-0"
              >
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.name}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.players}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.matches}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
                    {item.wins}
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
