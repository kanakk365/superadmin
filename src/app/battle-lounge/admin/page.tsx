import DashboardLayout from "@/components/main/DashboardLayout";
import { BattleLoungeAdmin } from "@/components/battle-lounge/admin/BattleLoungeAdmin";

export default function BattleLoungeAdminPage() {
  return (
    <DashboardLayout pageLabel="Battle Lounge Admin">
      <BattleLoungeAdmin />
    </DashboardLayout>
  );
}
