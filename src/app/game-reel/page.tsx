import DashboardLayout from "@/components/main/DashboardLayout";
// import { GameReel } from "@/components/game-reel/GameReel";

export default function Page() {
  return (
    <DashboardLayout pageLabel="Game Reel">
      <div className="flex items-center justify-center h-[50vh]">
        <h2 className="text-xl text-slate-400">Game Reel Dashboard</h2>
      </div>
    </DashboardLayout>
  );
}

