import DashboardLayout from "@/components/main/DashboardLayout";
import { DestinationKP } from "@/components/destination-kp/DestinationKP";

export default function Page() {
  return (
    <DashboardLayout pageLabel="Destination KP">
      <DestinationKP />
    </DashboardLayout>
  );
}

