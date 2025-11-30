import { DestinationKPStats } from "./Stats";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UpcomingEvents } from "./UpcomingEvents";
import { GuestChannelsChart } from "./GuestChannelsChart";
import { JobsList } from "./JobsList";
import { EventsChart } from "./EventsChart";

export const DestinationKP = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex flex-col gap-8 px-3 sm:px-8 py-8">
        <DestinationKPStats />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <GuestChannelsChart />
          <JobsList />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <UpcomingEvents />
          <EventsChart />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
