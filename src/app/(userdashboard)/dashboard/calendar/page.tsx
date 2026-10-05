import { CalendarBoard } from "./_components/CalendarBoard";
import { CalendarSidebar } from "./_components/CalendarSidebar";
import { CalendarStats } from "./_components/CalendarStats";
import { ConflictIntegration } from "./_components/ConflictIntegration";
import { MeetingsTable } from "./_components/MeetingsTable";
import { PriorityAutomation } from "./_components/PriorityAutomation";

export default function CalendarPage() {
  return (
    <div className="space-y-4 p-4 pb-10">
      <CalendarStats />
      <section className="grid grid-cols-12 items-start gap-4">
        <div className="col-span-12 xl:col-span-9">
          <CalendarBoard />
        </div>

        <div className="col-span-12 xl:col-span-3">
          <CalendarSidebar />
        </div>
      </section>
      <ConflictIntegration />
      <PriorityAutomation />
      <MeetingsTable />
    </div>
  );
}
