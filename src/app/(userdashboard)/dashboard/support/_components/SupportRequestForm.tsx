"use client";

import Image from "next/image";
import { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fieldClass =
  "h-11 rounded-xl border-0 bg-[#F5F7FF] px-4 text-base text-[#0E1224] shadow-none placeholder:text-[#8B93B8] focus-visible:ring-[#5B7FF0] sm:h-14 md:text-base";

const toolbarItems = [
  ["font-style.svg", 62, 15, "Bold, italic and underline"],
  ["alignment.svg", 70, 14, "Text alignment"],
  ["bullet.svg", 42, 14, "List formatting"],
  ["font.svg", 35, 15, "Font formatting"],
] as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-base font-normal leading-[1.2] text-[#8B93B8]">
      {children}
    </label>
  );
}

export function SupportRequestForm() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Support request submitted.");
  };

  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <header className="border-b border-[#E4EAF8] p-4">
        <h2 className="text-xl font-medium text-[#0E1224]">
          Submit a Support Request
        </h2>
      </header>

      <form onSubmit={submit}>
        <div className="space-y-4 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel>Category</FieldLabel>
              <Input
                name="category"
                placeholder="Enter first name......"
                className={fieldClass}
              />
            </div>
            <div>
              <FieldLabel>Subject</FieldLabel>
              <Input
                name="subject"
                placeholder="Enter last name......"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="support-description"
              className="mb-2 block text-base font-medium text-[#0E1224]"
            >
              Description
            </label>
            <div className="overflow-hidden rounded-2xl border border-[#F5F7FF] bg-[#F5F7FF]">
              <div
                className="flex min-h-10 items-center gap-2 overflow-x-auto rounded-t-2xl border border-[#F5F7FF] bg-white px-4 py-3 sm:h-12 sm:py-0"
                aria-label="Description formatting"
              >
                {toolbarItems.map(([file, width, height, alt]) => (
                  <Image
                    key={file}
                    src={`/add-task/${file}`}
                    width={width}
                    height={height}
                    alt={alt}
                    unoptimized
                    className="shrink-0"
                  />
                ))}
              </div>
              <textarea
                id="support-description"
                name="description"
                placeholder="Describe your issue in details............."
                className="block h-[100px] w-full resize-y bg-transparent px-4 py-3 text-base leading-normal text-[#0E1224] outline-none placeholder:text-[#8B93B8] sm:h-[100px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-[#0E1224]">
              Attachments &amp; Links
            </h3>
            <label className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-[#F5F7FF] p-4 text-center text-base leading-[1.2] text-[#8B93B8] transition-colors hover:bg-[#EEF2FF]">
              <input
                type="file"
                name="attachment"
                accept=".pdf,.jpg,.jpeg,.png"
                className="sr-only"
              />
              <Image
                src="/support-upload.svg"
                alt=""
                width={48}
                height={48}
                unoptimized
                className="size-12"
              />
              <span>Drag &amp; drop files here or</span>
              <span className="text-[#264AFF]">Brows File</span>
              <span>Support: PDF, JPG, PNG</span>
            </label>
          </div>
        </div>

        <footer className="border-t border-[#E4EAF8] p-4">
          <Button
            type="submit"
            className="h-11 rounded-lg bg-[#5B7FF0] px-8 text-sm font-normal text-white shadow-none hover:bg-[#4E6FDE] sm:h-11 sm:min-w-[150px]"
          >
            Submit Request
          </Button>
        </footer>
      </form>
    </section>
  );
}
