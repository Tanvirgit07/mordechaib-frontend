"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewMeetingModal } from "./NewMeetingModal";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = Array.from({ length: 21 }, (_, index) => 2020 + index);
const times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
const events = [[0,0,"Team sync","9:00 AM","blue"],[2,0,"Product Demo","9:00 AM","pink"],[5,0,"Client Call","9:00 AM","green"],[3,2,"Budget Review","11:00 AM","orange"],[0,4,"Deal Review","1:00 PM","blue"],[6,4,"Follow Up","1:00 PM","green"],[3,6,"Strategy Call","3:00 PM","pink"],[0,8,"Onboarding","5:00 PM","orange"],[6,8,"Proposal","5:00 PM","blue"]] as const;
const eventColor = { blue:"border-[#5B9CD5] bg-[#5B9CD5]/10", pink:"border-[#D24FC7] bg-[#D24FC7]/10", green:"border-[#10B981] bg-[#10B981]/10", orange:"border-[#F59E0B] bg-[#F59E0B]/10" };

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function monthCells(date: Date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
}

function weekCells(date: Date) {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return Array.from({ length: 7 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
}

export function CalendarBoard() {
  const [view, setView] = useState("Week");
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 27));
  const miniDays = useMemo(() => monthCells(selectedDate), [selectedDate]);
  const week = useMemo(() => weekCells(selectedDate), [selectedDate]);

  const movePeriod = (direction: number) => {
    const next = new Date(selectedDate);
    if (view === "Day") next.setDate(next.getDate() + direction);
    else if (view === "Week") next.setDate(next.getDate() + direction * 7);
    else if (view === "Month") next.setMonth(next.getMonth() + direction);
    else next.setFullYear(next.getFullYear() + direction);
    setSelectedDate(next);
  };

  const changeMonth = (month: number) => setSelectedDate(new Date(selectedDate.getFullYear(), month, Math.min(selectedDate.getDate(), 28)));
  const changeYear = (year: number) => setSelectedDate(new Date(year, selectedDate.getMonth(), Math.min(selectedDate.getDate(), 28)));

  return <section className="w-full min-w-0 overflow-hidden rounded-[8px] bg-white p-4">
    <header className="flex flex-col gap-3 border-b border-[#E4EAF8] pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => movePeriod(-1)} aria-label="Previous period" className="flex size-8 items-center justify-center rounded-[8px] bg-[#F5F7FF]"><ChevronLeft className="size-4" /></button>
        <button type="button" onClick={() => setSelectedDate(new Date())} className="rounded-[8px] bg-[#F5F7FF] px-2 py-1 text-xs">Today</button>
        <button type="button" onClick={() => movePeriod(1)} aria-label="Next period" className="flex size-8 items-center justify-center rounded-[8px] bg-[#F5F7FF]"><ChevronRight className="size-4" /></button>
        <select aria-label="Month" value={selectedDate.getMonth()} onChange={(event) => changeMonth(Number(event.target.value))} className="ml-2 rounded-[8px] bg-[#F5F7FF] px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#5B7FF0]">{months.map((month,index) => <option key={month} value={index}>{month}</option>)}</select>
        <select aria-label="Year" value={selectedDate.getFullYear()} onChange={(event) => changeYear(Number(event.target.value))} className="rounded-[8px] bg-[#F5F7FF] px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#5B7FF0]">{years.map(year => <option key={year}>{year}</option>)}</select>
      </div>
      <div className="flex flex-wrap items-center gap-2"><div className="flex rounded-[8px] bg-[#F5F7FF] p-1">{["Day","Week","Month","Year"].map(item => <button type="button" key={item} onClick={() => setView(item)} className={cn("rounded-[6px] px-2 py-1 text-sm", view === item ? "bg-[#5B7FF0] text-white" : "text-[#8B93B8]")}>{item}</button>)}</div><NewMeetingModal><button className="flex h-11 items-center gap-2 rounded-[8px] bg-[#5B7FF0] px-6 text-sm text-white"><Plus className="size-5" />New Meeting</button></NewMeetingModal></div>
    </header>

    <div className="mt-4 grid gap-4 lg:grid-cols-[234px_minmax(550px,1fr)]">
      <aside className="border-b border-[#E4EAF8] pb-4 lg:border-b-0 lg:border-r lg:pr-4">
        <div className="flex items-center justify-between text-sm font-medium"><button type="button" onClick={() => movePeriod(-1)}><ChevronLeft className="size-4" /></button><span>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</span><button type="button" onClick={() => movePeriod(1)}><ChevronRight className="size-4" /></button></div>
        <div className="mt-4 grid grid-cols-7 text-center text-[10px] text-[#8B93B8]">{["S","M","T","W","T","F","S"].map((day,index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
        <div className="mt-2 grid grid-cols-7 gap-y-2 text-center text-xs">{miniDays.map(day => <button type="button" key={day.toISOString()} onClick={() => setSelectedDate(day)} className={cn("mx-auto flex size-6 items-center justify-center rounded-[6px]", sameDay(day,selectedDate) ? "bg-[#5B7FF0] text-white" : day.getMonth() !== selectedDate.getMonth() ? "text-[#C6CCE2]" : "text-[#0E1224]")}>{day.getDate()}</button>)}</div>
        <div className="mt-6 space-y-3 border-t border-[#E4EAF8] pt-4 text-sm">{[["#5B9CD5","Work Meetings"],["#D24FC7","Client Calls"],["#10B981","Personal"]].map(([color,label]) => <p key={label} className="flex items-center gap-2"><span className="size-2 rounded-[4px]" style={{backgroundColor:color}} />{label}</p>)}</div>
      </aside>

      <div className="min-w-0 overflow-x-auto"><div className="min-w-[550px]"><div className="ml-12 grid grid-cols-7 border-b border-[#E4EAF8] pb-3 text-center text-xs text-[#8B93B8]">{week.map(day => <button type="button" onClick={() => setSelectedDate(day)} key={day.toISOString()} className={sameDay(day,selectedDate) ? "font-medium text-[#5B7FF0]" : ""}><span className="block text-[10px] font-medium text-[#0E1224]">{day.toLocaleDateString("en-US",{weekday:"short"}).toUpperCase()}</span>{months[day.getMonth()].slice(0,3)} {day.getDate()}</button>)}</div><div className="relative mt-2 grid grid-cols-[48px_repeat(7,minmax(68px,1fr))]">{times.map((time,row) => <div key={time} className="contents"><span className="h-[64px] border-r border-[#E4EAF8] pr-2 pt-1 text-[10px] text-[#8B93B8]">{time}</span>{week.map(day => <div key={`${time}-${day.toISOString()}`} className="h-[64px] border-b border-r border-[#E4EAF8]" />)}{events.filter(event => event[1] === row).map(([col,,title,eventTime,color]) => <div key={`${title}-${col}`} style={{gridColumn:Number(col)+2,gridRow:row+1}} className={cn("z-10 mx-1 my-1 h-[51px] overflow-hidden border-l-[3px] p-1 text-[10px]",eventColor[color])}><p className="flex items-center gap-1 font-medium"><span>{eventTime}</span><Video className="size-3" /></p><p className="mt-1 truncate">{title}</p></div>)}</div>)}</div></div></div>
    </div>
  </section>;
}
