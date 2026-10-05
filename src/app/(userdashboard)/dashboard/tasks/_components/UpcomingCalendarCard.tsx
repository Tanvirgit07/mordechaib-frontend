import { ArrowRight } from "lucide-react";

const meetings = [["14", "Johnson Construction - Deal Review", "2:00pm", "30min"], ["15", "Green Tech - Budget Meeting", "4:00pm", "45min"], ["16", "Smith & Co. - Project Kickoff", "3:00pm", "1hr"], ["17", "Creative Designs - Client Presentation", "5:00pm", "1hr 30min"]];

export function UpcomingCalendarCard() {
  return <section className="rounded-xl bg-white p-6"><header className="flex items-center justify-between border-b border-[#E4EAF8] pb-4"><h2 className="text-xl font-medium text-[#0E1224]">Calendar (Upcoming)</h2><button className="flex items-center gap-2 text-sm font-medium text-[#5B7FF0]">View All<ArrowRight className="size-4" /></button></header><div className="mt-4 space-y-4">{meetings.map(([day, title, time, duration], index) => <div key={title} className="flex gap-2"><i className={`w-1.5 rounded-full ${index % 2 ? "bg-[#D24FC7]" : "bg-[#5B7FF0]"}`} /><div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-[#F5F7FF] text-xs text-[#8B93B8]"><span>MAY</span><strong className="text-sm text-[#0E1224]">{day}</strong></div><div className="min-w-0 pt-1"><p className="truncate text-sm font-medium text-[#0E1224]">{title}</p><p className="mt-1 text-sm text-[#8B93B8]">{time}<span className="mx-3">•</span>{duration}</p></div></div>)}</div></section>;
}
