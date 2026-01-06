"use client";

import { Watch, Smartphone, Activity, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const integrations = [
    {
        name: "Fitbit",
        status: "Connected",
        lastSync: "Just now",
        description: "Activity tracking, heart rate, and sleep monitoring.",
        logoText: "Fit",
        color: "from-[#00B0B9] to-[#00B0B9]/60", // Fitbit Teal
    },
    {
        name: "Polar",
        status: "Sync Required",
        lastSync: "2 hours ago",
        description: "Professional sports watches and heart rate monitors.",
        logoText: "Pol",
        color: "from-[#E30613] to-[#E30613]/60", // Polar Red
    },
    {
        name: "Garmin",
        status: "Connected",
        lastSync: "5 mins ago",
        description: "GPS technology for automotive, aviation, marine, outdoor, and sport.",
        logoText: "Gar",
        color: "from-[#000000] to-[#444444]", // Garmin Black
    },
];

export const Integrations = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7.5">
            {integrations.map((item, index) => (
                <IntegrationCard key={item.name} {...item} index={index} />
            ))}

            {/* Add New Integration Card */}
            <div className="group relative flex flex-col items-center justify-center p-6 h-full min-h-[220px] rounded-[32px] border-2 border-dashed border-border/60 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 cursor-pointer">
                <div className="h-14 w-14 rounded-full bg-muted group-hover:bg-emerald-500/10 flex items-center justify-center mb-4 transition-colors">
                    <span className="text-3xl text-muted-foreground group-hover:text-emerald-500 font-light">+</span>
                </div>
                <h4 className="font-semibold text-lg text-foreground mb-1">Connect Device</h4>
                <p className="text-sm text-muted-foreground text-center max-w-[200px]">
                    Add a new wearable to track more stats
                </p>
            </div>
        </div>
    );
};

const IntegrationCard = ({
    name,
    status,
    lastSync,
    description,
    logoText,
    color,
    index,
}: any) => {
    const isConnected = status === "Connected";

    return (
        <div
            className="group relative flex flex-col justify-between p-6 lg:p-8 rounded-[32px] bg-card border border-border/40 hover:shadow-lg transition-all duration-500 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Gradient Blob Background */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${color} rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {logoText}
                    </div>
                    <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold border",
                        isConnected
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
                    )}>
                        {status}
                    </div>
                </div>

                <h4 className="text-xl font-bold text-foreground mb-2">{name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {description}
                </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-border/40">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Activity className="w-3.5 h-3.5" />
                    Last sync: {lastSync}
                </div>
                <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/btn">
                    Manage
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
            </div>
        </div>
    );
};
