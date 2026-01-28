import DashboardLayout from "@/components/main/DashboardLayout";
import { YSN } from "@/components/ysn/YSN";

export default function YSNOrganizerPage() {
  return (
    <DashboardLayout pageLabel="YSN Organizer">
      <YSN />
    </DashboardLayout>
  );
}
