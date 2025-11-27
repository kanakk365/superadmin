const players = [
  { name: "Alex Johnson", team: "Tigers", goals: 15, assists: 8 },
  { name: "Sam Smith", team: "Eagles", goals: 12, assists: 10 },
  { name: "Chris Lee", team: "Rockets", goals: 10, assists: 12 },
  { name: "Pat Taylor", team: "Wolves", goals: 14, assists: 5 },
  { name: "Jordan Brown", team: "Titans", goals: 11, assists: 9 },
  { name: "Morgan Davis", team: "Lions", goals: 13, assists: 7 },
];

export const TopPlayers = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">
        Top Players
      </h3>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Player</th>
              <th className="px-6 py-4 text-sm font-normal">Team</th>
              <th className="px-6 py-4 text-sm font-normal">Goals</th>
              <th className="px-6 py-4 text-sm font-normal">Assists</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {players.map((item) => (
              <tr
                key={item.name}
                className="border-b border-border/60 last:border-0"
              >
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.name}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.team}
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-500/20 dark:text-blue-300">
                    {item.goals}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">
                  {item.assists}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
