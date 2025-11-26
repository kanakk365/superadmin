import { DashboardStats } from "./DashboardStats";
import { ProjectionsChart } from "./ProjectionsChart";
import { RevenueChart } from "./RevenueChart";
import { RevenueByLocation } from "./RevenueByLocation";
import { TopSellingProducts } from "./TopSellingProducts";
import { TotalSalesDonut } from "./TotalSalesDonut";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const Dashboard = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        <div>
          <h1 className="text-lg font-semibold text-foreground">eCommerce</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <DashboardStats />
          <ProjectionsChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <RevenueChart />
          <RevenueByLocation />
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <TopSellingProducts />
          <TotalSalesDonut />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
