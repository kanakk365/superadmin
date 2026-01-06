import DashboardLayout from "@/components/main/DashboardLayout";
import { ConnectedAthlete } from "@/components/connected-athlete/ConnectedAthlete";

export default function ConnectedAthletePage() {
    return (
        <DashboardLayout pageLabel="Connected Athlete">
            <ConnectedAthlete />
        </DashboardLayout>
    );
}
