"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mic2,
  PhoneMissed,
  Search,
  Settings2,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

type CallStatus = "Received" | "AI Answered" | "Missed Call";

type CallRecord = {
  id: number;
  date: string;
  time: string;
  caller: string;
  number: string;
  duration: string;
  status: CallStatus;
};

const initialCalls: CallRecord[] = [
  {
    id: 1,
    date: "27 Aug 2020",
    time: "11:48 AM",
    caller: "Marvin McKinney",
    number: "(209) 555-0104",
    duration: "15m 00s",
    status: "Received",
  },
  {
    id: 2,
    date: "27 Aug 2020",
    time: "11:48 AM",
    caller: "Ronald Richards",
    number: "(217) 555-0113",
    duration: "15m 00s",
    status: "AI Answered",
  },
  {
    id: 3,
    date: "27 Aug 2020",
    time: "11:48 AM",
    caller: "Floyd Miles",
    number: "(907) 555-0101",
    duration: "15m 00s",
    status: "Missed Call",
  },
  {
    id: 4,
    date: "27 Aug 2020",
    time: "11:48 AM",
    caller: "Cameron Williamson",
    number: "(603) 555-0123",
    duration: "15m 00s",
    status: "AI Answered",
  },
  {
    id: 5,
    date: "27 Aug 2020",
    time: "11:48 AM",
    caller: "Arlene McCoy",
    number: "(684) 555-0102",
    duration: "15m 00s",
    status: "Received",
  },
  {
    id: 6,
    date: "28 Aug 2020",
    time: "2:15 PM",
    caller: "John Doe",
    number: "(684) 555-0103",
    duration: "10m 30s",
    status: "Missed Call",
  },
  {
    id: 7,
    date: "29 Aug 2020",
    time: "9:00 AM",
    caller: "Jane Smith",
    number: "(684) 555-0104",
    duration: "7m 45s",
    status: "Received",
  },
  {
    id: 8,
    date: "30 Aug 2020",
    time: "4:45 PM",
    caller: "Mark Johnson",
    number: "(684) 555-0105",
    duration: "12m 15s",
    status: "AI Answered",
  },
  {
    id: 9,
    date: "29 Aug 2020",
    time: "9:00 AM",
    caller: "Jane Smith",
    number: "(684) 555-0104",
    duration: "7m 45s",
    status: "Received",
  },
];

const metrics = [
  {
    value: "50",
    label: "Total Call",
    icon: "/call-intelligence/total-call.svg",
    chart: "/call-intelligence/total-call-chart.svg",
    iconBackground: "bg-[#F2F6FF]",
  },
  {
    value: "15",
    label: "AI Auto-Answered",
    icon: "/call-intelligence/ai-answered.svg",
    chart: "/call-intelligence/ai-answered-chart.svg",
    iconBackground: "bg-[#E8FAF5]",
  },
  {
    value: "3.5 min",
    label: "Avg Call Duration",
    icon: "/call-intelligence/duration.svg",
    chart: "/call-intelligence/duration-chart.svg",
    iconBackground: "bg-[#FFF6E7]",
  },
] as const;

const statusStyles: Record<CallStatus, string> = {
  Received: "bg-[#10B981]/10 text-[#10B981]",
  "AI Answered": "bg-[#5B9CD5]/10 text-[#5B9CD5]",
  "Missed Call": "bg-[#EF4444]/10 text-[#EF4444]",
};

function StatusBadge({ status }: { status: CallStatus }) {
  const Icon =
    status === "Received"
      ? CheckCircle2
      : status === "AI Answered"
        ? Mic2
        : PhoneMissed;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      <Icon className="size-4" strokeWidth={1.7} />
      {status}
    </span>
  );
}

export default function CallIntelligencePage() {
  const [calls, setCalls] = useState(initialCalls);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CallStatus | "All">("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);

  const visibleCalls = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return calls.filter((call) => {
      const matchesStatus =
        statusFilter === "All" || call.status === statusFilter;
      const matchesSearch =
        !normalizedSearch ||
        [call.caller, call.number, call.date, call.status].some((value) =>
          value.toLowerCase().includes(normalizedSearch)
        );

      return matchesStatus && matchesSearch;
    });
  }, [calls, search, statusFilter]);

  const deleteCall = (call: CallRecord) => {
    setCalls((current) => current.filter((item) => item.id !== call.id));
    toast.success(`${call.caller}'s call was removed.`);
  };

  return (
    <div className="min-h-[calc(100vh-83px)] p-4 text-[#141936]">
      <section
        aria-label="Call summary"
        className="grid gap-4 md:grid-cols-3"
      >
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="relative h-[132px] min-w-0 overflow-hidden rounded-lg bg-white p-4"
          >
            <div
              className={`flex size-10 items-center justify-center rounded-xl ${metric.iconBackground}`}
            >
              <Image
                src={metric.icon}
                alt=""
                width={20}
                height={20}
                unoptimized
              />
            </div>
            <p className="mt-2 text-2xl font-bold leading-none text-[#0E1224]">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-[#8B93B8]">{metric.label}</p>
            <div className="absolute bottom-4 right-4 h-[66px] w-[108px]">
              <Image
                src={metric.chart}
                alt=""
                width={108}
                height={66}
                unoptimized
              />
            </div>
          </article>
        ))}
      </section>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex h-11 w-full max-w-[320px] items-center gap-2 rounded-lg bg-white px-4 text-[#8B93B8]">
          <Search className="size-5 shrink-0" strokeWidth={1.5} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            aria-label="Search calls"
            className="min-w-0 flex-1 bg-transparent text-xs text-[#141936] outline-none placeholder:text-[#8B93B8]"
          />
          <kbd className="rounded border border-[#8B93B8]/5 px-2 py-1 text-[10px]">
            ⌘K
          </kbd>
        </label>

        <div className="relative flex items-center gap-3 self-end sm:self-auto">
          <Link
            href="/dashboard/settings"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-base text-[#6B6B6B] transition hover:text-[#5B7FF0]"
          >
            <Settings2 className="size-5" strokeWidth={1.5} />
            Setting
          </Link>
          <button
            type="button"
            onClick={() => setFilterOpen((current) => !current)}
            aria-expanded={filterOpen}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-base text-[#6B6B6B] transition hover:text-[#5B7FF0]"
          >
            <SlidersHorizontal className="size-5" strokeWidth={1.5} />
            Filter
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-12 z-20 w-44 rounded-lg border border-[#E4EAF8] bg-white p-2 shadow-lg">
              {(["All", "Received", "AI Answered", "Missed Call"] as const).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setFilterOpen(false);
                    }}
                    className={`block h-9 w-full rounded-md px-3 text-left text-sm transition ${
                      statusFilter === status
                        ? "bg-[#5B7FF0]/10 text-[#5B7FF0]"
                        : "text-[#141936] hover:bg-[#F5F7FF]"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <section className="mt-4 overflow-hidden bg-white" aria-label="Call history">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] table-fixed">
            <thead>
              <tr className="h-[52px] border-b border-[#E4EAF8] text-left text-base font-normal text-[#141936]">
                <th className="w-[19%] px-4 font-normal">Date</th>
                <th className="w-[18%] px-4 text-center font-normal">
                  Caller Name
                </th>
                <th className="w-[18%] px-4 text-center font-normal">Number</th>
                <th className="w-[16%] px-4 text-center font-normal">
                  Duration
                </th>
                <th className="w-[16%] px-4 text-center font-normal">Status</th>
                <th className="w-[13%] px-4 text-center font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleCalls.map((call) => (
                <tr key={call.id} className="h-[67px] text-sm text-[#141936]">
                  <td className="px-4">
                    <span className="block">{call.date}</span>
                    <span className="mt-2 block text-xs">{call.time}</span>
                  </td>
                  <td className="truncate px-4 text-center">{call.caller}</td>
                  <td className="px-4 text-center">{call.number}</td>
                  <td className="px-4 text-center">{call.duration}</td>
                  <td className="px-4 text-center">
                    <StatusBadge status={call.status} />
                  </td>
                  <td className="px-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCall(call)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-[#5B7FF0] bg-[#5B9CD5]/10 px-3 text-[10px] text-[#5B7FF0] transition hover:bg-[#5B7FF0]/15"
                      >
                        <Eye className="size-4" strokeWidth={1.6} />
                        <span className="underline">Details</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCall(call)}
                        aria-label={`Delete ${call.caller}'s call`}
                        className="flex size-8 items-center justify-center text-[#FF3B3B] transition hover:bg-[#EF4444]/5"
                      >
                        <Trash2 className="size-5" strokeWidth={1.7} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visibleCalls.length === 0 && (
            <div className="flex h-40 items-center justify-center text-sm text-[#8B93B8]">
              No calls found.
            </div>
          )}
        </div>
      </section>

      <footer className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#8B93B8] sm:text-base">
          Showing {visibleCalls.length ? 1 : 0} to {visibleCalls.length} of 120
          results
        </p>
        <nav className="flex items-center gap-2" aria-label="Call pages">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="flex size-10 items-center justify-center rounded border border-[#8B93B8] text-[#8B93B8] disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`size-10 rounded border text-sm ${
                currentPage === page
                  ? "border-[#5B7FF0] bg-[#5B7FF0] text-white"
                  : "border-[#8B93B8] text-[#8B93B8]"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="flex size-10 items-center justify-center rounded border border-[#8B93B8] text-sm text-[#8B93B8]">
            ...
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage(17)}
            className={`size-10 rounded border text-sm ${
              currentPage === 17
                ? "border-[#5B7FF0] bg-[#5B7FF0] text-white"
                : "border-[#8B93B8] text-[#8B93B8]"
            }`}
          >
            17
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(17, page + 1))}
            disabled={currentPage === 17}
            aria-label="Next page"
            className="flex size-10 items-center justify-center rounded border border-[#8B93B8] text-[#8B93B8] disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </nav>
      </footer>

      {selectedCall && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0E1224]/35 p-4">
          <button
            type="button"
            aria-label="Close call details"
            onClick={() => setSelectedCall(null)}
            className="absolute inset-0"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="call-details-title"
            className="relative z-10 w-full max-w-md rounded-lg bg-white p-5 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="call-details-title"
                  className="text-xl font-medium text-[#0E1224]"
                >
                  {selectedCall.caller}
                </h2>
                <p className="mt-1 text-sm text-[#8B93B8]">
                  {selectedCall.number}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCall(null)}
                aria-label="Close"
                className="flex size-9 items-center justify-center rounded-lg text-[#8B93B8] hover:bg-[#F5F7FF]"
              >
                <X className="size-5" />
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[#8B93B8]">Date</dt>
                <dd className="mt-1 text-[#141936]">
                  {selectedCall.date}, {selectedCall.time}
                </dd>
              </div>
              <div>
                <dt className="text-[#8B93B8]">Duration</dt>
                <dd className="mt-1 text-[#141936]">{selectedCall.duration}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[#8B93B8]">Status</dt>
                <dd className="mt-2">
                  <StatusBadge status={selectedCall.status} />
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </div>
  );
}
