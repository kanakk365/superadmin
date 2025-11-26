import DashboardLayout from "@/components/main/DashboardLayout";
import { BattleLounge } from "@/components/battle-lounge/BattleLounge";

export default function Page() {
  return (
    <DashboardLayout pageLabel="Battle Lounge">
      <BattleLounge />
    </DashboardLayout>
  );
}

