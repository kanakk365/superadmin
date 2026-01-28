import DashboardLayout from "@/components/main/DashboardLayout";
import { YSNAdmin } from "@/components/ysn/admin/YSNAdmin";

export default function YSNAdminPage() {
  return (
    <DashboardLayout pageLabel="YSN Admin">
      <YSNAdmin />
    </DashboardLayout>
  );
}
