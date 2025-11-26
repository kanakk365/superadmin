import DashboardLayout from "@/components/main/DashboardLayout";
import { YSN } from "@/components/ysn/YSN";

export default function Page() {
  return (
    <DashboardLayout pageLabel="YSN">
      <YSN />
    </DashboardLayout>
  );
}

