"use client";

import { useState } from "react";
import { CheckCircle2, Trash2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const rows = [["27 Aug 2020","11:48 AM","Ronald Richards","participant@gmail.com","Scheduled"],["27 Aug 2020","11:48 AM","Marvin McKinney","(209) 555-0104","Completed"],["27 Aug 2020","11:48 AM","Floyd Miles","(907) 555-0101","Cancel"]] as const;

export function MeetingsTable() {
  const [filter,setFilter] = useState("All");
  const visibleRows = filter === "All" ? rows : rows.filter(row=>row[4]===filter);
  return <section><div className="mb-4 flex max-w-[480px] overflow-x-auto rounded-[8px] bg-white p-2">{["All","Completed","Scheduled","Cancel"].map(item=><button key={item} onClick={()=>setFilter(item)} className={cn("min-w-[110px] rounded-[6px] px-2 py-1 text-base",filter===item?"bg-[#5B7FF0] text-white":"text-[#0E1224]")}>{item}</button>)}</div><div className="overflow-x-auto rounded-[8px] bg-white"><table className="w-full min-w-[900px] text-sm"><thead><tr className="border-b border-[#E4EAF8] text-left">{["Date","Participant Name","Number/Email","Status","Action"].map(title=><th key={title} className="h-[52px] px-4 font-normal">{title}</th>)}</tr></thead><tbody>{visibleRows.map((row,i)=><tr key={row[2]} className={i<visibleRows.length-1?"border-b border-[#E4EAF8]/50":""}><td className="px-4 py-3"><p>{row[0]}</p><p className="mt-2 text-xs">{row[1]}</p></td><td className="px-4 text-center">{row[2]}</td><td className="px-4 text-center">{row[3]}</td><td className="px-4 text-center"><span className={cn("rounded-[13px] px-2 py-1 text-xs",row[4]==="Completed"?"bg-[#10B981]/10 text-[#10B981]":row[4]==="Cancel"?"bg-[#EF4444]/10 text-[#EF4444]":"bg-[#5B9CD5]/10 text-[#5B9CD5]")}>{row[4]}</span></td><td className="px-4"><div className="flex items-center gap-3 text-[#EF4444]">{row[4]!=="Completed"&&<CheckCircle2 className="size-5 text-[#10B981]" />}{row[4]==="Scheduled"&&<XCircle className="size-5" />}<Trash2 className="size-5" /></div></td></tr>)}</tbody></table></div></section>;
}
