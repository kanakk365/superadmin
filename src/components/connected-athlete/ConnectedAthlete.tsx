"use client";

import { ConnectedAthleteStats } from "./Stats";
import { GenderDistribution } from "./GenderDistribution";
import { DeviceUsageChart } from "./DeviceUsageChart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const ConnectedAthlete = () => {
    return (
        <ScrollArea className="h-full w-full">
            <div className="flex flex-col gap-6 lg:gap-8 p-4 lg:p-8 pb-20">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <p className="text-muted-foreground">Monitor your performance metrics and connected devices.</p>
                </div>

                <ConnectedAthleteStats />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <GenderDistribution />
                    <DeviceUsageChart />
                </div>
            </div>
            <ScrollBar />
        </ScrollArea>
    );
};
