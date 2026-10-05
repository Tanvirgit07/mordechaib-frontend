"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DeleteReportModal } from "./DeleteReportModal";
import { ReportDetailsModal } from "./ReportDetailsModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SupportStatus = "Open" | "Resolved" | "Closed" | "Inprogress";

type SupportRequest = {
  id: string;
  date: string;
  subject: string;
  status: SupportStatus;
  updated: string;
};

const requests: SupportRequest[] = [
  {
    id: "INV-2026-7",
    date: "Jul 1, 2026",
    subject: "July 2026",
    status: "Open",
    updated: "2h ago",
  },
  {
    id: "INV-2026-7",
    date: "Jul 1, 2026",
    subject: "June 2026",
    status: "Resolved",
    updated: "3h ago",
  },
  {
    id: "INV-2026-7",
    date: "Jul 1, 2026",
    subject: "May 2026",
    status: "Closed",
    updated: "6h ago",
  },
  {
    id: "INV-2026-7",
    date: "Jul 1, 2026",
    subject: "April 2026",
    status: "Closed",
    updated: "2d ago",
  },
  {
    id: "INV-2026-7",
    date: "Jul 1, 2026",
    subject: "March 2026",
    status: "Inprogress",
    updated: "5d ago",
  },
];

const statusStyles: Record<
  SupportStatus,
  { badge: string; dot: string; text: string }
> = {
  Open: {
    badge: "bg-[#5B9CD5]/10",
    dot: "bg-[#5B7FF0]",
    text: "text-[#5B7FF0]",
  },
  Resolved: {
    badge: "bg-[#10B981]/10",
    dot: "bg-[#10B981]",
    text: "text-[#10B981]",
  },
  Closed: {
    badge: "bg-[#ADAAAA]/15",
    dot: "bg-[#8B93B8]",
    text: "text-[#8B93B8]",
  },
  Inprogress: {
    badge: "bg-[#F59E0B]/10",
    dot: "bg-[#F59E0B]",
    text: "text-[#F59E0B]",
  },
};

function StatusBadge({ status }: { status: SupportStatus }) {
  const styles = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-normal leading-none",
        styles.badge,
        styles.text,
      )}
    >
      <span className={cn("size-2 rounded-full", styles.dot)} />
      {status}
    </span>
  );
}

export function SupportRequestsTable() {
  const [visibleRequests, setVisibleRequests] = useState(requests);
  const [detailsRequest, setDetailsRequest] = useState<SupportRequest | null>(null);
  const [deleteRequest, setDeleteRequest] = useState<SupportRequest | null>(null);

  const confirmDelete = () => {
    if (!deleteRequest) return;

    setVisibleRequests((current) =>
      current.filter((request) => request !== deleteRequest),
    );
    setDeleteRequest(null);
  };

  return (
    <>
      <section className="overflow-hidden rounded-lg bg-white">
      <header className="border-b border-[#E4EAF8] p-4">
        <h2 className="text-xl font-medium text-[#0E1224]">
          Recent Support Requests
        </h2>
      </header>

      <div className="p-4">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow className="border-b border-[#F5F7FF] hover:bg-transparent">
              <TableHead className="h-10 px-0 pb-4 pt-0 text-sm font-normal text-[#0E1224]">
                Ticket ID
              </TableHead>
              <TableHead className="h-10 px-0 pb-4 pt-0 text-sm font-normal text-[#0E1224]">
                Subject
              </TableHead>
              <TableHead className="h-10 px-0 pb-4 pt-0 text-center text-sm font-normal text-[#0E1224]">
                Status
              </TableHead>
              <TableHead className="h-10 px-0 pb-4 pt-0 text-center text-sm font-normal text-[#0E1224]">
                Updated
              </TableHead>
              <TableHead className="h-10 px-0 pb-4 pt-0 text-center text-sm font-normal text-[#0E1224]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRequests.map((request, index) => (
              <TableRow
                key={`${request.subject}-${index}`}
                className="border-0 hover:bg-transparent"
              >
                <TableCell className="w-1/5 px-0 py-2 align-middle">
                  <p className="whitespace-nowrap text-sm font-medium leading-normal text-[#141936]">
                    {request.id}
                  </p>
                  <p className="whitespace-nowrap text-sm font-normal leading-normal text-[#6B7280]">
                    {request.date}
                  </p>
                </TableCell>
                <TableCell className="w-1/5 px-0 py-2 align-middle">
                  <p className="text-sm font-medium text-[#141936]">
                    {request.subject}
                  </p>
                </TableCell>
                <TableCell className="w-1/5 px-0 py-2 text-center align-middle">
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell className="w-1/5 px-0 py-2 text-center align-middle">
                  <span className="whitespace-nowrap text-sm font-normal text-[#8B93B8]">
                    {request.updated}
                  </span>
                </TableCell>
                <TableCell className="w-1/5 px-0 py-2 align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDetailsRequest(request)}
                      className="inline-flex h-[29px] items-center gap-[5px] rounded-[11px] border border-[#5B7FF0] bg-[#5B9CD5]/10 px-3 text-[10px] font-normal text-[#5B7FF0] underline underline-offset-2"
                    >
                      <Image
                        src="/support-eye.svg"
                        alt=""
                        width={16}
                        height={16}
                        unoptimized
                        className="size-4"
                      />
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteRequest(request)}
                      aria-label={`Delete ${request.subject} request`}
                      className="flex size-5 items-center justify-center"
                    >
                      <Image
                        src="/task-actions/delete-task.svg"
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                        className="size-5"
                      />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </section>

      <ReportDetailsModal
        open={detailsRequest !== null}
        onOpenChange={(open) => !open && setDetailsRequest(null)}
        subject={detailsRequest?.subject}
      />
      <DeleteReportModal
        open={deleteRequest !== null}
        onOpenChange={(open) => !open && setDeleteRequest(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
