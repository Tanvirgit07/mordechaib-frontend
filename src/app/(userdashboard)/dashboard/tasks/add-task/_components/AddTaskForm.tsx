"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Bell, CalendarDays, CircleX, CloudUpload, Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fieldClass =
  "h-14 min-w-0 rounded-xl border-0 bg-[#F5F7FF] px-4 text-base text-[#8B93B8] md:text-base shadow-none placeholder:text-[#8B93B8] focus-visible:ring-[#5B7FF0]";
const initialDependencies = [
  "Finance to provide latest numbers",
  "Supplier pricing update",
  "Customer contract finalization",
  "Ops to confirm margin rules",
  "Review compliance with pricing objectives",
];
const initialRequiredAttachments = [
  "Excel (.xlsx) file",
  "PDF copy",
  "Approval document",
  "Customer contract",
];
const initialStakeholders = [
  { id: "marketing-director", name: "Marketing director", image: 1 },
  { id: "finance-lead", name: "Finance lead", image: 2 },
  { id: "sales-manager", name: "Sales manager", image: 3 },
  { id: "operations-lead", name: "Operations lead", image: 4 },
];
const assistance = [
  "Generate AI checklist",
  "Suggest Next Steps",
  "Recommend Deadline",
  "Auto Create Subtasks",
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-base font-normal text-[#0E1224]">
      {children}
    </label>
  );
}
function FormSelect({
  placeholder,
  options,
  value,
  onValueChange,
}: {
  placeholder: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select value={value}  onValueChange={onValueChange}>
      <SelectTrigger aria-label={placeholder} className={`${fieldClass} rounded-xl`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        side="bottom"
        align="start"
        sideOffset={6}
        className="rounded-xl border-[#E4EAF8] bg-[#F5F7FF] p-1 shadow-lg"
      >
        {options.map((option) => (
          <SelectItem
            value={option}
            key={option}
            className="min-h-10 rounded-lg px-3 py-2 text-base text-[#60708E] focus:bg-white focus:text-[#0E1224]"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function AddTaskForm({ onCancel }: { onCancel: () => void }) {
  const [status, setStatus] = useState("To Do");
  const [reminder, setReminder] = useState(true);
  const [aiOptions, setAiOptions] = useState<string[]>([]);
  const [tag, setTag] = useState("Finance");
  const [required, setRequired] = useState<string[]>([]);
  const [assignTo, setAssignTo] = useState("Steve (Sales)");
  const [department, setDepartment] = useState("Finance");
  const [priority, setPriority] = useState("High");
  const [duration, setDuration] = useState("1 Hour");
  const [reminderTime, setReminderTime] = useState("1 Hour");
  const [aiAssistance, setAiAssistance] = useState("May 16, 2026");
  const [stakeholder, setStakeholder] = useState("Marketing director");
  const [subtasks, setSubtasks] = useState("03:00 PM");
  const [dependencies, setDependencies] = useState(initialDependencies);
  const [stakeholders, setStakeholders] = useState(initialStakeholders);
  const [requiredAttachments, setRequiredAttachments] = useState(initialRequiredAttachments);
  const [addTarget, setAddTarget] = useState<
    "dependency" | "stakeholder" | "attachment" | null
  >(null);
  const [newItem, setNewItem] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Task created successfully.");
    onCancel();
  };
  const toggleValue = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) =>
    setter((values) =>
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    );
  const addItem = () => {
    const item = newItem.trim();
    if (!item || !addTarget) return;

    if (addTarget === "dependency") {
      setDependencies((items) => [...items, item]);
    }
    if (addTarget === "stakeholder") {
      setStakeholders((items) => [
        ...items,
        { id: `${item}-${Date.now()}`, name: item, image: ((items.length % 4) + 1) as 1 | 2 | 3 | 4 },
      ]);
    }
    if (addTarget === "attachment") {
      setRequiredAttachments((items) => [...items, item]);
    }

    setNewItem("");
    setAddTarget(null);
  };
  const openAddDialog = (target: NonNullable<typeof addTarget>) => {
    setNewItem("");
    setAddTarget(target);
  };
  const dialogCopy = {
    dependency: { title: "Add dependency", label: "Dependency name" },
    stakeholder: { title: "Add stakeholder", label: "Stakeholder name" },
    attachment: { title: "Add required attachment", label: "Attachment name" },
  };

  return (
    <form onSubmit={submit} className="mx-auto w-full  space-y-4 bg-white px-4 pb-4 pt-8 text-[#0E1224] [&_input[type=checkbox]]:shrink-0">
      <header className="flex items-start justify-between border-b border-[#E4EAF8] pb-4">
        <div>
          <h2 className="text-xl font-medium text-[#0E1224]">Add New Task</h2>
          <p className="mt-2 text-base text-[#8B93B8]">
            Create a task manually or assign it to an AI agent
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close add task"
          className="text-[#8B93B8]"
        >
          <CircleX className="size-6" strokeWidth={1.25} />
        </button>
      </header>

      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>Task Name</FieldLabel>
            <Input
              required
              defaultValue="Prepare Q3 Pricing Sheet"
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel>Assign To</FieldLabel>
            <FormSelect
            
              placeholder="Assign to agent"
              options={[
                "Steve (Sales)",
                "Cassie (Support)",
                "Vizzy (Operations)",
                "Dexter (Strategy)",
                "Havi (Design)",
                "Marketing Team (Marketing)",
              ]}
              value={assignTo}
              onValueChange={setAssignTo}
            />
          </div>
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <div className="overflow-hidden rounded-2xl border border-[#F5F7FF] bg-[#F5F7FF]">
            <div className="flex h-12 items-center gap-2 bg-white px-4" aria-label="Description formatting">
              {[
                ["font-style.svg", 62, 15, "Bold, italic and underline"],
                ["alignment.svg", 70, 14, "Text alignment"],
                ["bullet.svg", 42, 14, "List formatting"],
                ["font.svg", 35, 15, "Font formatting"],
              ].map(([file, width, height, alt]) => (
                <Image key={file} src={`/add-task/${file}`} width={Number(width)} height={Number(height)} alt={String(alt)} unoptimized className="shrink-0" />
              ))}
            </div>
            <textarea
              defaultValue="e.g. Prepare the Philpapers Q3 Pricing Sheet using the latest supplier pricing. Validate all margin calculations before submitting for approval."
              aria-label="Description"
              className="block h-28 w-full resize-y bg-transparent px-4 py-3 text-base leading-6 text-[#8B93B8] outline-none"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 bg-[#F5F7FF] px-3 py-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col rounded-2xl bg-white p-4 sm:p-6">
          <h3 className="text-xl font-medium text-[#0E1224]">Dependencies</h3>
          <div className="my-4 flex-1 space-y-3">
            {dependencies.map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-sm text-[#0E1224]"
              >
                <label className="flex min-w-0 flex-1 items-center gap-1.5">
                  <input type="checkbox" className="size-4 accent-[#5B7FF0]" />
                  <span className="truncate">{item}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setDependencies((items) => items.filter((entry) => entry !== item))}
                  aria-label={`Remove ${item}`}
                  className="rounded p-1 text-[#8B93B8] hover:bg-[#E4EAF8] hover:text-[#0E1224]"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => openAddDialog("dependency")}
            className="mt-auto min-h-[52px] w-full whitespace-normal border-[#5B7FF0] px-2 text-base font-normal text-[#5B7FF0] shadow-none"
          >
            <Plus className="size-3" />
            Add Dependency
          </Button>
        </div>
        <div className="flex min-w-0 flex-col rounded-2xl bg-white p-4 sm:p-6">
          <h3 className="text-xl font-medium text-[#0E1224]">Stakeholder</h3>
          <div className="my-4 flex-1 space-y-3">
            {stakeholders.map((person) => (
                <div
                  className="flex h-[35px] items-center gap-2 rounded-lg bg-[#F5F7FF] pr-2 text-sm"
                  key={person.id}
                >
                  <i className="h-[18px] w-1 rounded bg-[#10B981]" />
                  <Image src={`/add-task/stakeholder-${person.image}.png`} alt={person.name} width={18} height={18} className="size-[18px] rounded-full" />
                  <span className="flex-1 text-[#8B93B8]">
                    {person.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStakeholders((items) => items.filter((item) => item.id !== person.id))}
                    aria-label={`Remove ${person.name}`}
                    className="rounded p-1 text-[#8B93B8] hover:bg-white hover:text-[#0E1224]"
                  >
                    <X className="size-3" />
                  </button>
                </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => openAddDialog("stakeholder")}
            className="mt-auto min-h-[52px] w-full whitespace-normal border-[#5B7FF0] px-2 text-base font-normal text-[#5B7FF0] shadow-none"
          >
            <Plus className="size-3" />
            Add Stakeholder
          </Button>
        </div>
      </section>

      <section className="grid gap-4 bg-[#F5F7FF] px-3 py-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col rounded-2xl bg-white p-4 sm:p-6">
          <h3 className="text-xl font-medium text-[#0E1224]">
            Attachments &amp; Links
          </h3>
          <label className="mt-4 flex min-h-[188px] cursor-pointer flex-col items-center justify-center rounded-xl bg-[#F5F7FF] p-4 text-center">
            <CloudUpload className="size-10 text-[#0E1224]" />
            <span className="mt-4 text-base text-[#8B93B8]">
              Drag &amp; drop files here or
            </span>
            <span className="text-base font-medium text-[#5B7FF0]">
              Browse File
            </span>
            <span className="mt-1 text-base text-[#8B93B8]">
              Support: PDF, JPG, PNG
            </span>
            <input type="file" className="sr-only" />
          </label>
        </div>
        <div className="flex min-w-0 flex-col rounded-2xl bg-white p-4 sm:p-6">
          <h3 className="text-xl font-medium text-[#0E1224]">
            Required Attachments
          </h3>
          <div className="my-4 flex-1 space-y-3">
            {requiredAttachments.map((item) => (
              <div
                className="flex items-center gap-1.5 text-sm text-[#0E1224]"
                key={item}
              >
                <label className="flex min-w-0 flex-1 items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={required.includes(item)}
                    onChange={() => toggleValue(item, setRequired)}
                    className="size-4 accent-[#5B7FF0]"
                  />
                  <span className="truncate">{item}</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setRequiredAttachments((items) => items.filter((entry) => entry !== item));
                    setRequired((items) => items.filter((entry) => entry !== item));
                  }}
                  aria-label={`Remove ${item}`}
                  className="rounded p-1 text-[#8B93B8] hover:bg-[#E4EAF8] hover:text-[#0E1224]"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => openAddDialog("attachment")}
            className="mt-auto min-h-[52px] w-full whitespace-normal border-[#5B7FF0] px-2 text-base font-normal text-[#5B7FF0] shadow-none"
          >
            <Plus className="size-3" />
            Add Required Attachment
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <FieldLabel>Department</FieldLabel>
          <FormSelect
            placeholder="Department"
            options={["Sales", "Finance", "Operations", "Support", "Design", "Marketing"]}
            value={department}
            onValueChange={setDepartment}
          />
        </div>
        <div>
          <FieldLabel>Priority</FieldLabel>
          <FormSelect
            placeholder="Priority"
            options={["Low", "Medium", "High"]}
            value={priority}
            onValueChange={setPriority}
          />
        </div>
        <div>
          <FieldLabel>Estimated Duration</FieldLabel>
          <FormSelect
            placeholder="Duration"
            options={["1 Hour", "30 Minutes", "2 Hours"]}
            value={duration}
            onValueChange={setDuration}
          />
        </div>
      </section>
      <section>
        <FieldLabel>Status</FieldLabel>
        <div className="grid max-w-[754px] grid-cols-2 gap-4 sm:grid-cols-5">
          {["Draft", "To Do", "In Progress", "Waiting", "Blocked"].map(
            (item) => (
              <button
                type="button"
                onClick={() => setStatus(item)}
                key={item}
                className={`min-h-9 rounded-lg px-2 py-2 text-base transition-colors ${status === item ? "bg-[#5B7FF0] text-white" : "bg-[#F5F7FF] text-[#64748B]"}`}
              >
                {item}
              </button>
            ),
          )}
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <FieldLabel>Due Date</FieldLabel>
          <div className="relative">
            <Input
              type="date"
              defaultValue="2026-05-16"
              className={`${fieldClass} pr-10`}
            />
            <CalendarDays className="pointer-events-none absolute right-4 top-3.5 size-5 text-[#8B93B8]" />
          </div>
        </div>
        <div>
          <FieldLabel>Estimated Duration</FieldLabel>
          <FormSelect
            placeholder="Duration"
            options={["1 Hour", "30 Minutes", "2 Hours"]}
            value={duration}
            onValueChange={setDuration}
          />
        </div>
        <div>
          <FieldLabel>AI Assistance</FieldLabel>
          <FormSelect
            placeholder="AI Assistance"
            options={["May 16, 2026", "No assistance"]}
            value={aiAssistance}
            onValueChange={setAiAssistance}
          />
        </div>
        <div>
          <FieldLabel>Stakeholder</FieldLabel>
          <FormSelect
            placeholder="Stakeholder"
            options={["Marketing director", "Finance lead"]}
            value={stakeholder}
            onValueChange={setStakeholder}
          />
        </div>
        <div>
          <FieldLabel>Subtasks</FieldLabel>
          <FormSelect
            placeholder="Subtasks"
            options={["03:00 PM", "No subtasks"]}
            value={subtasks}
            onValueChange={setSubtasks}
          />
        </div>
        <div>
          <FieldLabel>Tags</FieldLabel>
          <div className="flex h-14 items-center rounded-xl bg-[#F5F7FF] px-3">
            {tag && (
              <span className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-sm text-[#8B93B8]">
                #{tag}
                <button type="button" onClick={() => setTag("")}>
                  <X className="size-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="min-w-0 bg-white px-3 py-2">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-[#5B7FF0]" />
            <p className="text-xl font-medium text-[#0E1224]">
              Ai Context{" "}
              <span className="text-xs font-normal">
                (Let ai help you execute better)
              </span>
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {assistance.map((item) => (
              <label
                className="flex items-center gap-1.5 text-sm text-[#0E1224]"
                key={item}
              >
                <input
                  type="checkbox"
                  checked={aiOptions.includes(item)}
                  onChange={() => toggleValue(item, setAiOptions)}
                  className="size-4 accent-[#5B7FF0]"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="min-w-0 bg-white px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-base font-medium text-[#0E1224]"><Bell className="size-6 text-[#5B7FF0]" strokeWidth={1.25} />Reminder</p>
            <button
              type="button"
              onClick={() => setReminder((value) => !value)}
              aria-label="Reminder"
              role="switch"
              aria-checked={reminder}
              className={`relative h-6 w-12 rounded-full transition ${reminder ? "bg-[#5B7FF0]" : "bg-[#CBD5E1]"}`}
            >
              <span
                className={`absolute top-1 size-4 rounded-full bg-white transition ${reminder ? "right-1" : "left-1"}`}
              />
            </button>
          </div>
          <div className="mt-6">
            <FormSelect
              placeholder="Reminder time"
              options={["1 Hour", "30 Minutes", "1 Day"]}
              value={reminderTime}
              onValueChange={setReminderTime}
            />
          </div>
        </div>
      </section>
      <footer className="grid gap-4 sm:grid-cols-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-[52px] border-[#5B7FF0] text-base text-[#5B7FF0] shadow-none"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => toast.success("Task saved as draft.")}
          className="h-[52px] border-[#5B7FF0] text-base text-[#5B7FF0] shadow-none"
        >
          Save Draft
        </Button>
        <Button type="submit" className="h-[52px] bg-[#5B7FF0] text-base shadow-none hover:bg-[#4E6FDE]">
          Create Task
        </Button>
      </footer>
      <Dialog open={addTarget !== null} onOpenChange={(open) => !open && setAddTarget(null)}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-xl border-[#E4EAF8] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-[#0E1224]">
              {addTarget ? dialogCopy[addTarget].title : "Add item"}
            </DialogTitle>
            <DialogDescription className="text-base text-[#8B93B8]">
              Enter the item you want to add to this task.
            </DialogDescription>
          </DialogHeader>
          <Input
            autoFocus
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addItem();
              }
            }}
            placeholder={addTarget ? dialogCopy[addTarget].label : "Item name"}
            className={fieldClass}
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddTarget(null)} className="h-11 border-[#5B7FF0] text-[#5B7FF0]">
              Cancel
            </Button>
            <Button type="button" onClick={addItem} disabled={!newItem.trim()} className="h-11 bg-[#5B7FF0] hover:bg-[#4E6FDE]">
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
