import { LineChart } from "./LineChart";

export const RevenueChart = () => {
  return (
    <div className="rounded-3xl bg-card py-6 px-3">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <p className="text-blg font-semibold text-foreground">Revenue</p>
        <span className="hidden h-4 w-px bg-border md:block" />
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-foreground" />
            <span className="text-sm  text-foreground ">Current Week</span>
            <span className="text-sm font-semibold text-foreground">$58,211</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-foreground " />
            <span className="text-sm  text-foreground">Previous Week</span>
            <span className="text-sm font-semibold text-foreground">$68,768</span>
          </span>
        </div>
      </div>
      <div className="mt-8 h-96  w-full">
        <LineChart className="h-full w-full" />
      </div>
    </div>
  );
};
