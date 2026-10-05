import { TrendingUp, type LucideIcon } from "lucide-react";

type TaskStatCardProps = { icon: LucideIcon; value: string; label: string; color: string; background: string };

export function TaskStatCard({ icon: Icon, value, label, color, background }: TaskStatCardProps) {
  return <article className="relative h-[156px] overflow-hidden rounded-lg bg-white p-4">
    <span className={`flex size-10 items-center justify-center rounded-xl ${background} ${color}`}><Icon className="size-5" /></span>
    <div className="mt-2"><p className="text-2xl font-bold text-[#0E1224]">{value}</p><p className="mt-1 text-sm text-[#8B93B8]">{label}</p><div className="mt-1 flex items-center gap-1"><span className={`rounded-lg px-1 py-1 text-[10px] font-bold ${background} ${color}`}>18%</span><span className="text-xs text-[#8B93B8]">vs last week</span></div></div>
    <TrendingUp className={`absolute bottom-4 right-4 size-9 ${color}`} strokeWidth={2} />
  </article>;
}
