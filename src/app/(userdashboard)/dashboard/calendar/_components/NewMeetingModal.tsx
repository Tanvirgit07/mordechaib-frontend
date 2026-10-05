"use client";

import { FormEvent, ReactNode, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const fieldClassName = "h-[51px] w-full rounded-[12px] border-0 bg-[#F5F7FF] px-4 text-base text-[#0E1224] outline-none placeholder:text-[#8B93B8] focus:ring-1 focus:ring-[#5B7FF0]";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block min-w-0"><span className="mb-2 block text-base leading-[1.2] text-[#8B93B8]">{label}</span>{children}</label>;
}

export function NewMeetingModal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
    toast.success("Meeting scheduled successfully.");
  };

  return <Dialog modal={false} open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent showClose={false} nonModalOverlay overlayClassName="bg-[#0E1224]/20 backdrop-blur-[5px]" className="max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-[566px] gap-4 overflow-y-auto rounded-[16px] border-0 bg-white p-4 shadow-xl sm:p-6">
      <header className="flex items-start justify-between border-b border-[#F5F7FF] pb-4">
        <DialogTitle className="text-xl font-medium leading-normal text-[#0E1224]">Schedule Meeting</DialogTitle>
        <DialogClose className="flex size-6 shrink-0 items-center justify-center rounded-[12px] text-[#8B93B8] outline-none hover:bg-[#F5F7FF] focus-visible:ring-2 focus-visible:ring-[#5B7FF0]" aria-label="Close schedule meeting modal"><X className="size-5" /></DialogClose>
      </header>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Field label="Meeting Title*"><input required name="title" placeholder="e.g Product Demo with Blue Stone" className={fieldClassName} /></Field>
          <Field label="With(participant)"><input name="participant" placeholder="e.g james Okafor" className={fieldClassName} /></Field>
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Date*"><input required name="date" placeholder="mm/dd/yyyy" className={fieldClassName} /></Field>
            <Field label="Time"><input name="time" placeholder="10:00 am" className={fieldClassName} /></Field>
          </div>
          <Field label="Meeting Type"><span className="relative block"><select name="type" defaultValue="Video call" className={`${fieldClassName} appearance-none pr-12 text-[#8B93B8]`}><option>Video call</option><option>Phone call</option><option>In person</option></select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 text-[#0E1224]" /></span></Field>
          <Field label="Meeting Urgency"><span className="relative block"><select name="urgency" defaultValue="High" className={`${fieldClassName} appearance-none pr-12 text-[#8B93B8]`}><option>High</option><option>Medium</option><option>Low</option></select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 text-[#0E1224]" /></span></Field>
        </div>
        <footer className="grid gap-3 pt-0 sm:grid-cols-2 sm:gap-4">
          <DialogClose type="button" className="h-[52px] rounded-[8px] border border-[#5B7FF0] text-base font-medium text-[#5B7FF0] transition-colors hover:bg-[#5B7FF0]/5">Cancel</DialogClose>
          <button type="submit" className="h-[52px] rounded-[8px] bg-[#5B7FF0] text-base font-medium text-white transition-colors hover:bg-[#4E6FDE]">Schedule</button>
        </footer>
      </form>
    </DialogContent>
  </Dialog>;
}
