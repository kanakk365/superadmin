import DashboardLayout from "@/components/main/DashboardLayout";
import { GameReel } from "@/components/game-reel/GameReel";

export default function Page() {
  return (
    <DashboardLayout pageLabel="Game Reel">
      <GameReel />
    </DashboardLayout>
  );
}

