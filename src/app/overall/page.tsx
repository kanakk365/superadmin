import DashboardLayout from "@/components/main/DashboardLayout";
import { OverallDashboard } from "@/components/overall/OverallDashboard";

export default function OverallPage() {
    return (
        <DashboardLayout pageLabel="Overview">
            <OverallDashboard />
        </DashboardLayout>
    );
}
