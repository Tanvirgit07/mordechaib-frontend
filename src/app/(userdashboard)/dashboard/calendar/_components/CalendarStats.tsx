import Image from "next/image";

const stats = [
  ["50", "Total Meeting", "/calendar/total.svg", "/calendar/total-chart.svg", "bg-[#5B9CD5]/10"],
  ["15", "Scheduled", "/calendar/pending.svg", "/calendar/pending-chart.svg", "bg-[#F59E0B]/10"],
  ["15", "Completed Meeting", "/calendar/confirmed.svg", "/calendar/confirmed-chart.svg", "bg-[#10B981]/10"],
  ["15", "Cancel Meeting", "/calendar/cancelled.svg", "/calendar/cancelled-chart.svg", "bg-[#EF4444]/10"],
] as const;

export function CalendarStats() {
  return <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([value,label,icon,chart,tint]) => <article key={label} className="relative min-h-[132px] overflow-hidden rounded-[8px] bg-white p-4"><span className={`flex size-10 items-center justify-center rounded-[12px] ${tint}`}><Image src={icon} alt="" width={20} height={20} unoptimized className="size-5" /></span><div className="relative z-10 mt-2"><p className="text-2xl font-bold leading-normal text-[#0E1224]">{value}</p><p className="text-sm text-[#8B93B8]">{label}</p></div><Image src={chart} alt="" width={108} height={65} unoptimized className="absolute bottom-4 right-4 h-[65px] w-[108px]" /></article>)}</section>;
}
