import { AlertTriangle } from "lucide-react";

const conflicts = [
  ["9:00 AM", "Client Review Call", "Ownership with", "Sales Standup", "warning"],
  ["1:00 PM", "Follow-up Call", "No buffer time", "(15m Needed)", "error"],
  ["3:00 PM", "Proposal Review", "Travel time Conflict", "(45m Needed)", "warning"],
] as const;

const integration = [
  ["Task Created From Calls", "12"],
  ["Upcoming Deadlines", "8"],
  ["Follow-ups pending", "15"],
  ["CRM Updates Today", "7"],
  ["AI Remiders", "9"],
] as const;

function CardHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="border-b border-[#F5F7FF] pb-4 text-xl font-medium text-[#0E1224]">{children}</h2>;
}

export function ConflictIntegration() {
  return <section className="grid gap-4 lg:grid-cols-2">
    <article className="rounded-[16px] bg-white p-6"><CardHeading>Conflict Detection</CardHeading><p className="my-2 text-sm font-medium">3 Conflicts Detected</p><div className="space-y-2">{conflicts.map(([time,title,cause,detail,type])=><div key={title} className="grid grid-cols-[1fr_1fr_36px] items-center gap-2 rounded-[8px] bg-[#F5F7FF] p-2"><div className="min-w-0"><p className="text-xs text-[#8B93B8]">{time}</p><p className="mt-2 truncate text-sm">{title}</p></div><div className="min-w-0"><p className="truncate text-xs text-[#8B93B8]">{cause}</p><p className="mt-2 truncate text-sm">{detail}</p></div><span className={`flex size-9 items-center justify-center rounded-[10px] ${type==="error"?"bg-[#EF4444]/10 text-[#EF4444]":"bg-[#F59E0B]/10 text-[#F59E0B]"}`}><AlertTriangle className="size-5" /></span></div>)}</div></article>
    <article className="rounded-[16px] bg-white p-6"><CardHeading>Task &amp; Calls Integration</CardHeading><div className="mt-4 space-y-2">{integration.map(([label,value])=><div key={label} className="flex h-[35px] items-center gap-2 rounded-[8px] bg-[#F5F7FF] pr-2 text-sm"><span className="h-full w-1 rounded-[2px] bg-[#10B981]" /><span className="flex-1">{label}</span><strong className="font-medium">{value}</strong></div>)}</div></article>
  </section>;
}
