"use client";

import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type ReportDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject?: string;
};

export function ReportDetailsModal({
  open,
  onOpenChange,
  subject = "Subject",
}: ReportDetailsModalProps) {
  return (
    <Dialog modal={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showClose={false}
        nonModalOverlay
        overlayClassName="bg-black/10 backdrop-blur-[5px]"
        className="max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[511px] gap-0 overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-[0_1px_4px_rgba(107,107,107,0.7)] sm:rounded-2xl"
      >
        <div className="flex items-center justify-between rounded-t-2xl bg-white p-4 shadow-[0_1px_4px_rgba(107,107,107,0.7)] sm:p-6">
          <DialogTitle className="text-xl font-medium leading-none text-[#0E1224]">
            Report Details
          </DialogTitle>
          <DialogDescription className="sr-only">
            Details for the selected support report
          </DialogDescription>
          <DialogClose className="flex size-6 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B7FF0] focus-visible:ring-offset-2">
            <Image
              src="/support-close-circle.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
              className="size-6"
            />
            <span className="sr-only">Close report details</span>
          </DialogClose>
        </div>

        <div className="p-4 sm:p-6">
          <div className="space-y-4 sm:p-4">
            <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
              <DetailField label="Category" value="Report" />
              <DetailField label="Subject" value={subject} />
            </div>

            <div>
              <p className="mb-2 text-base font-medium leading-none text-[#0E1224]">
                Description
              </p>
              <div className="min-h-[140px] rounded-2xl border border-[#F5F7FF] bg-[#F5F7FF] p-4 text-base leading-normal text-[#0E1224] sm:min-h-[160px]">
                Describe your issue in details.............
              </div>
            </div>

            <div>
              <p className="mb-4 text-xl font-medium leading-none text-[#0E1224]">
                Attachments &amp; Links
              </p>
              <button
                type="button"
                className="flex min-h-[88px] w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#F5F7FF] p-4 text-base leading-[1.2] text-[#264AFF] transition-colors hover:bg-[#EEF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B7FF0] sm:min-h-[120px]"
              >
                <Image
                  src="/support-view-file.svg"
                  alt=""
                  width={48}
                  height={48}
                  unoptimized
                  className="size-12"
                />
                View File
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-base leading-[1.2] text-[#8B93B8]">{label}</p>
      <div className="truncate rounded-xl bg-[#F5F7FF] p-4 text-base leading-[1.2] text-[#0E1224]">
        {value}
      </div>
    </div>
  );
}
