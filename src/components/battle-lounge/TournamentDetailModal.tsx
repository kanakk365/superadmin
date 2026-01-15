"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import {
    X,
    Calendar,
    Trophy,
    Gamepad2,
    Users,
    DollarSign,
    Shield,
    AlertTriangle,
    UserX,
    Ban,
    Crown,
    Target,
    Medal,
    Building2,
} from "lucide-react";

export interface TournamentDetail {
    id: string;
    name: string;
    game: string;
    date: string;
    prizeAmount: string;
    tournamentType: string;
    sponsors: string[];
    totalUsers: number;
    revenue: string;
    totalPlayers: number;
    playerTypes: {
        new: number;
        ranked: number;
        unranked: number;
    };
    disputes: number;
    cancellations: number;
    playerNoShow: number;
    status: "completed" | "live" | "upcoming" | "cancelled";
}

interface TournamentDetailModalProps {
    tournament: TournamentDetail | null;
    isOpen: boolean;
    onClose: () => void;
}

const PLAYER_TYPE_COLORS = ["#bd5bf1", "#22c55e", "#3b82f6"];

export function TournamentDetailModal({
    tournament,
    isOpen,
    onClose,
}: TournamentDetailModalProps) {
    if (!isOpen || !tournament) return null;

    const playerTypeData = [
        { name: "New Players", value: tournament.playerTypes.new, color: "#bd5bf1" },
        { name: "Ranked", value: tournament.playerTypes.ranked, color: "#3b82f6" },
        { name: "Unranked", value: tournament.playerTypes.unranked, color: "#8b5cf6" },
    ];

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "live":
                return "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20";
            case "completed":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "upcoming":
                return "bg-purple-500/10 text-purple-500 border-purple-500/20";
            case "cancelled":
                return "bg-gray-500/10 text-gray-500 border-gray-500/20";
            default:
                return "bg-muted text-muted-foreground border-border";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto m-4 rounded-[32px] bg-card border border-border/40 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border/40 bg-card/95 backdrop-blur-md rounded-t-[32px]">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl">
                            <Trophy className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">{tournament.name}</h2>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Gamepad2 className="w-4 h-4" />
                                    {tournament.game}
                                </span>
                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border capitalize",
                                        getStatusStyles(tournament.status)
                                    )}
                                >
                                    {tournament.status === "live" && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                                    )}
                                    {tournament.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-purple-500" />
                                <span className="text-xs font-medium text-muted-foreground uppercase">Date</span>
                            </div>
                            <p className="text-lg font-bold text-foreground">{tournament.date}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="w-4 h-4 text-amber-500" />
                                <span className="text-xs font-medium text-muted-foreground uppercase">Prize</span>
                            </div>
                            <p className="text-lg font-bold text-foreground">{tournament.prizeAmount}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 border border-fuchsia-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-4 h-4 text-fuchsia-500" />
                                <span className="text-xs font-medium text-muted-foreground uppercase">Revenue</span>
                            </div>
                            <p className="text-lg font-bold text-foreground">{tournament.revenue}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-medium text-muted-foreground uppercase">Players</span>
                            </div>
                            <p className="text-lg font-bold text-foreground">{tournament.totalPlayers}</p>
                        </div>
                    </div>

                    {/* Tournament Info & Player Types */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Tournament Details */}
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Tournament Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Tournament Type</span>
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">{tournament.tournamentType}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Total Users</span>
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">{tournament.totalUsers.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-border/40" />
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Building2 className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">Sponsors</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {tournament.sponsors.map((sponsor, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-foreground"
                                            >
                                                {sponsor}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Player Types Pie Chart */}
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Player Types</h3>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={playerTypeData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {playerTypeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "hsl(var(--card))",
                                                borderRadius: "12px",
                                                border: "1px solid hsl(var(--border))",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-6 mt-2">
                                {playerTypeData.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-xs text-muted-foreground">{item.name}</span>
                                        <span className="text-xs font-bold text-foreground">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Issues Section */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-amber-500/10">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Disputes</p>
                                    <p className="text-2xl font-bold text-foreground">{tournament.disputes}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-purple-500/10">
                                    <Ban className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Cancellations</p>
                                    <p className="text-2xl font-bold text-foreground">{tournament.cancellations}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-indigo-500/10">
                                    <UserX className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Player No-Shows</p>
                                    <p className="text-2xl font-bold text-foreground">{tournament.playerNoShow}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
