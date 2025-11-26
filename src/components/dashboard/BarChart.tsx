export const BarChart = ({ values }: { values: number[] }) => {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-56 items-end justify-between gap-4">
      {values.map((value, index) => (
        <div key={index} className="flex w-full flex-col items-center gap-2">
          <div
            className="w-full rounded-lg bg-[#D8E5FF]"
            style={{ height: `${(value / max) * 100}%` }}
          />
          <span className="text-xs text-slate-400">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}</span>
        </div>
      ))}
    </div>
  );
};
