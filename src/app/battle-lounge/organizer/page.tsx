import DashboardLayout from "@/components/main/DashboardLayout";
import { BattleLounge } from "@/components/battle-lounge/BattleLounge";

export default function OrganizerPage() {
  return (
    <DashboardLayout pageLabel="Battle Lounge Organizer">
      <BattleLounge />
    </DashboardLayout>
  );
}
