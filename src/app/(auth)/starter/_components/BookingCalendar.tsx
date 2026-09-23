"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const timeSlots = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM"];

type BookingCalendarProps = { onNext: () => void };

function getMonthCells(year: number, month: number) {
  const firstWeekDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  return [...Array.from({ length: firstWeekDay }, () => null), ...Array.from({ length: totalDays }, (_, index) => index + 1)];
}

export default function BookingCalendar({ onNext }: BookingCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate());
  const [selectedTime, setSelectedTime] = useState("12:00 AM");
  const monthCells = useMemo(() => getMonthCells(visibleMonth.getFullYear(), visibleMonth.getMonth()), [visibleMonth]);
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(visibleMonth);

  const changeMonth = (offset: number) => {
    const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + offset, 1);
    const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();

    setSelectedDay((currentDay) => Math.min(currentDay, lastDay));
    setVisibleMonth(nextMonth);
  };

  return (
    <div className="mt-5 flex flex-1 flex-col sm:mt-6">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_88px] sm:gap-5">
        <section className="rounded-[8px] bg-[#fcfcfe] p-2.5 sm:p-3" aria-label="Choose a date">
          <div className="flex h-8 items-center justify-between">
            <p className="text-[13px] font-medium text-[#1e2434]">{monthLabel}</p>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="grid h-7 w-7 place-items-center rounded-[6px] text-[#6281ef] transition-colors hover:bg-[#eef2ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6281ef]">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="grid h-7 w-7 place-items-center rounded-[6px] text-[#6281ef] transition-colors hover:bg-[#eef2ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6281ef]">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-7" aria-hidden="true">
            {weekDays.map((day) => <span key={day} className="text-center text-[8px] font-medium text-[#9ba4bf]">{day}</span>)}
          </div>

          <div className="mt-2 grid min-h-[270px] grid-cols-7 grid-rows-6 place-items-center sm:min-h-[292px]">
            {monthCells.map((day, index) => day ? (
              <button key={day} type="button" onClick={() => setSelectedDay(day)} aria-label={`Select ${monthLabel} ${day}`} aria-pressed={selectedDay === day} className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6281ef] focus-visible:ring-offset-1 sm:h-9 sm:w-9 sm:text-xs ${selectedDay === day ? "bg-[#6382f1] text-white" : "text-[#252a39] hover:bg-[#edf1ff]"}`}>
                {day}
              </button>
            ) : <span key={`empty-${index}`} aria-hidden="true" />)}
          </div>
        </section>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:content-start sm:gap-4" aria-label="Choose a time">
          {timeSlots.map((time) => (
            <button key={time} type="button" onClick={() => setSelectedTime(time)} aria-pressed={selectedTime === time} className={`h-12 rounded-[8px] border text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6281ef] focus-visible:ring-offset-1 sm:h-[52px] sm:text-xs ${selectedTime === time ? "border-[#6382f1] bg-[#6382f1] text-white" : "border-[#7893f4] bg-white text-[#6281ef] hover:bg-[#f3f5ff]"}`}>
              {time}
            </button>
          ))}
        </div>
      </div>

      <button type="button" onClick={onNext} className="mt-4 h-11 w-full rounded-[8px] bg-[#5f7ff0] text-sm font-medium text-white transition-colors hover:bg-[#526fdb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f7ff0] focus-visible:ring-offset-2">Next</button>
    </div>
  );
}
