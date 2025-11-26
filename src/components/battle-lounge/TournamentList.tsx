const tournaments = [
  { name: "Warzone Weekly", game: "Call of Duty: MW3", prize: "$5,000", status: "Registration Open" },
  { name: "Fortnite FNCS", game: "Fortnite", prize: "$100,000", status: "Live Now" },
  { name: "Apex Legends Global", game: "Apex Legends", prize: "$50,000", status: "Coming Soon" },
  { name: "Valorant Community Cup", game: "Valorant", prize: "$2,500", status: "Completed" },
  { name: "FIFA 25 Ultimate", game: "EA FC 25", prize: "$10,000", status: "Registration Open" },
];

export const TournamentList = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <h3 className="px-6 text-lg font-semibold text-foreground">Tournaments</h3>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="border-b border-border text-left text-sm font-thin text-muted-foreground">
            <tr>
              <th className="px-6 py-4 text-sm font-normal">Tournament</th>
              <th className="px-6 py-4 text-sm font-normal">Game</th>
              <th className="px-6 py-4 text-sm font-normal">Prize Pool</th>
              <th className="px-6 py-4 text-sm font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {tournaments.map((t) => (
              <tr key={t.name} className="border-b border-border/60 last:border-0">
                <td className="px-6 py-3 text-sm font-normal text-foreground">{t.name}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{t.game}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{t.prize}</td>
                <td className="px-6 py-3 text-sm font-normal text-foreground">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

