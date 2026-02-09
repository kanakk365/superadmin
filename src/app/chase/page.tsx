import DashboardLayout from "@/components/main/DashboardLayout";

export default function ChasePage() {
  return (
    <DashboardLayout pageLabel="Chase">
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Chase
          </h1>
          <p className="text-lg text-muted-foreground">
            No data available yet.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
