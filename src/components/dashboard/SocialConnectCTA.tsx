"use client";

import { cn } from "@/lib/utils";
import { Link2, X, Sparkles } from "lucide-react";
import { useState } from "react";

interface SocialConnectCTAProps {
    platform: "analytics" | "youtube";
    onConnect: () => void;
    className?: string;
}

export function SocialConnectCTA({
    platform,
    onConnect,
    className,
}: SocialConnectCTAProps) {
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed) return null;

    const platformConfig = {
        analytics: {
            title: "Connect Google Analytics",
            description:
                "Link your Google Analytics to track website traffic, user behavior, and performance metrics in real-time.",
            gradient: "from-purple-600 via-indigo-600 to-blue-600",
            iconBg: "bg-white/20",
            buttonGradient: "from-white to-white/90",
            buttonText: "text-purple-600",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M22.84 12.13c0-.76-.07-1.53-.2-2.25H12v4.26h6.08c-.25 1.37-1.04 2.54-2.23 3.32v2.75h3.6c2.12-1.95 3.34-4.83 3.34-8.08z"
                    />
                    <path
                        fill="currentColor"
                        d="M12 23c3.02 0 5.55-.99 7.4-2.68l-3.6-2.76c-1 .67-2.28 1.07-3.8 1.07-2.92 0-5.4-1.97-6.28-4.63H2v2.84C3.85 20.53 7.61 23 12 23z"
                        opacity="0.7"
                    />
                    <path
                        fill="currentColor"
                        d="M5.72 14c-.23-.67-.36-1.39-.36-2.13s.13-1.46.36-2.13V6.9H2c-.77 1.53-1.21 3.25-1.21 5.1s.44 3.57 1.21 5.1l3.72-2.9z"
                        opacity="0.5"
                    />
                    <path
                        fill="currentColor"
                        d="M12 4.87c1.65 0 3.13.57 4.3 1.68l3.21-3.21C17.55 1.59 15.02.5 12 .5 7.61.5 3.85 2.97 2 6.66l3.72 2.9c.88-2.66 3.36-4.63 6.28-4.63z"
                        opacity="0.9"
                    />
                </svg>
            ),
        },
        youtube: {
            title: "Connect YouTube Channel",
            description:
                "Link your YouTube channel to view analytics, track video performance, and monitor subscriber growth.",
            gradient: "from-red-500 via-rose-500 to-pink-500",
            iconBg: "bg-white/20",
            buttonGradient: "from-white to-white/90",
            buttonText: "text-red-600",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M23.5 6.2c-.3-1-1-1.7-2-2C19.8 3.7 12 3.7 12 3.7s-7.8 0-9.5.5c-1 .3-1.7 1-2 2C0 7.9 0 12 0 12s0 4.1.5 5.8c.3 1 1 1.7 2 2 1.7.5 9.5.5 9.5.5s7.8 0 9.5-.5c1-.3 1.7-1 2-2 .5-1.7.5-5.8.5-5.8s0-4.1-.5-5.8z"
                    />
                    <path fill="#fff" d="M9.5 15.5l6.5-3.5-6.5-3.5v7z" />
                </svg>
            ),
        },
    };

    const config = platformConfig[platform];

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[32px] p-8 lg:p-10",
                `bg-gradient-to-br ${config.gradient}`,
                "animate-in fade-in slide-in-from-bottom-4 duration-500",
                className
            )}
        >
            {/* Background decorations */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-white/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute top-6 right-6 opacity-20">
                <Sparkles className="w-24 h-24" />
            </div>

            {/* Dismiss button */}
            <button
                onClick={() => setIsDismissed(true)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
                aria-label="Dismiss"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                {/* Icon */}
                <div
                    className={cn(
                        "flex-shrink-0 p-5 rounded-3xl",
                        config.iconBg,
                        "backdrop-blur-md text-white shadow-lg"
                    )}
                >
                    {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                        <Link2 className="w-5 h-5 text-white/70" />
                        <span className="text-sm font-medium text-white/70 uppercase tracking-wider">
                            Connect Social Media
                        </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                        {config.title}
                    </h2>
                    <p className="text-white/80 max-w-xl leading-relaxed">
                        {config.description}
                    </p>
                </div>

                {/* Connect Button */}
                <div className="flex-shrink-0">
                    <button
                        onClick={onConnect}
                        className={cn(
                            "group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg",
                            `bg-gradient-to-r ${config.buttonGradient}`,
                            config.buttonText,
                            "shadow-xl shadow-black/20",
                            "hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5",
                            "active:scale-100",
                            "transition-all duration-300"
                        )}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span>Connect with Google</span>
                        <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Features list */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/80 text-sm">
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span>Secure OAuth Connection</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span>Real-time Data Sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span>Revoke Access Anytime</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
