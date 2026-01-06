"use client";

import { GameReelStats } from "./Stats";
import { ReachChart } from "./ReachChart";
import { ImpressionsBarChart } from "./ImpressionsBarChart";
import { UserDemographicsPie } from "./UserDemographicsPie";
import { TopPosts } from "./TopPosts";

export const GameReel = () => {
    return (
        <div className="space-y-5 lg:space-y-7.5">
            <GameReelStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5 items-stretch">
                <ReachChart />
                <ImpressionsBarChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
                <div className="lg:col-span-1">
                    <UserDemographicsPie />
                </div>
                <div className="lg:col-span-2">
                    <TopPosts />
                </div>
            </div>
        </div>
    );
};
