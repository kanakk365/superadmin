"use client";

import Link from "next/link";
import { Gamepad2, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BattleLoungeLogin() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center gap-8 p-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-4 bg-primary/10 rounded-2xl mb-4">
            <Gamepad2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Battle Lounge</h1>
          <p className="text-muted-foreground">
            Select your portal to continue
          </p>
        </div>

        <div className="grid gap-4 w-full">
          <Link href="/battle-lounge/admin" className="w-full">
            <div className="group relative flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-all hover:scale-[1.02] cursor-pointer">
              <div className="p-3 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Admin Portal</span>
                <span className="text-xs text-muted-foreground">
                  Manage ecosystem & analytics
                </span>
              </div>
            </div>
          </Link>

          <Link href="/battle-lounge/organizer" className="w-full">
            <div className="group relative flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-all hover:scale-[1.02] cursor-pointer">
              <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Organizer Portal</span>
                <span className="text-xs text-muted-foreground">
                  Manage your tournaments
                </span>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground/50">
          Powered by Oneplace Dashboard
        </p>
      </div>
    </div>
  );
}
