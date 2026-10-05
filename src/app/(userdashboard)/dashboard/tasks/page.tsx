"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock3,
  Flag,
  ListTodo,
  Plus,
  Search,
} from "lucide-react";
import { TaskStatCard } from "./_components/TaskStatCard";
import { TaskListCard } from "./_components/TaskListCard";
import { UpcomingCalendarCard } from "./_components/UpcomingCalendarCard";
import { SummaryDonutCard } from "./_components/SummaryDonutCard";
import type { Task } from "./_components/TaskItem";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Send proposal to Johnson Construction",
    description: "Customize the Growth plan proposal with Q3 pricing",
    owner: "Cassie (Sales)",
    due: "Today 5 PM",
    tags: ["sales", "proposal"],
    priority: "High",
  },
  {
    id: 2,
    title: "Follow up: Metro Gym ticket #234",
    description: "Client requested callback regarding the billing issue",
    owner: "Cassie (Support)",
    due: "Tomorrow",
    tags: ["support", "billing"],
    priority: "Medium",
  },
  {
    id: 3,
    title: "Update CRM with Johnson notes",
    description: "Add meeting notes and next steps to CRM record",
    owner: "Steve (Sales)",
    due: "Today EOD",
    tags: ["marketing"],
    priority: "Medium",
  },
  {
    id: 4,
    title: "Draft Q3 newsletter",
    description: "First draft for the client newsletter",
    owner: "Vizzy (Operation)",
    due: "Friday",
    tags: ["marketing"],
    priority: "Low",
  },
  {
    id: 5,
    title: "Prepare social campaign brief",
    description: "Outline goals and deliverables for campaign launch",
    owner: "Soshie (Marketing)",
    due: "Tomorrow",
    tags: ["campaign"],
    priority: "High",
  },
  {
    id: 6,
    title: "Send meeting confirmation - Johnson",
    description: "Confirm Friday 2PM call details with Mike",
    owner: "Vizzy (Operation)",
    due: "Today 2 PM",
    tags: ["meeting", "sales"],
    priority: "Medium",
  },
  {
    id: 7,
    title: "Team weekly sync agenda",
    description: "Prepare agenda for 3:30 PM team meeting",
    owner: "Vizzy (Operation)",
    due: "Today",
    tags: ["internal"],
    priority: "Low",
    done: true,
  },
];

const stats = [
  {
    icon: ListTodo,
    value: "5",
    label: "To Do",
    color: "text-[#5B7FF0]",
    background: "bg-[#5B7FF0]/10",
  },
  {
    icon: CheckCircle2,
    value: "2",
    label: "Completed",
    color: "text-[#10B981]",
    background: "bg-[#10B981]/10",
  },
  {
    icon: Clock3,
    value: "3",
    label: "In Progress",
    color: "text-[#F59E0B]",
    background: "bg-[#F59E0B]/10",
  },
  {
    icon: Flag,
    value: "11",
    label: "Total Tasks",
    color: "text-[#D24FC7]",
    background: "bg-[#D24FC7]/10",
  },
];
const tabs = ["All", "To Do", "Completed", "In Progress"] as const;

export default function TaskPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");

  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesSearch = `${task.title} ${task.description}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesTab =
          activeTab === "All" ||
          (activeTab === "Completed" ? task.done : !task.done);
        return matchesSearch && matchesTab;
      }),
    [activeTab, query, tasks],
  );
  const todoTasks = visibleTasks.filter((task) => !task.done).slice(0, 4);
  const inProgressTasks = visibleTasks.filter((task) => !task.done).slice(4, 6);
  const completedTasks = visibleTasks.filter((task) => task.done);
  const toggleTask = (id: number) =>
    setTasks((items) =>
      items.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  const deleteTask = (id: number) =>
    setTasks((items) => items.filter((task) => task.id !== id));
  const addTask = () => router.push("/dashboard/tasks/add-task");

  return (
    <div className="space-y-4 p-4 pb-10">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <TaskStatCard key={stat.label} {...stat} />
        ))}
      </section>
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="flex h-11 w-full max-w-[320px] items-center gap-2 rounded-lg border border-[#8B93B8]/10 bg-white px-3">
          <Search className="size-5 text-[#8B93B8]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8B93B8]"
          />
          <kbd className="rounded bg-[#F5F7FF] px-2 py-1 text-xs text-[#8B93B8]">
            ⌘K
          </kbd>
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center rounded-lg bg-white p-1">
            {tabs.map((tab) => (
              <button
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-[12px] px-3 py-2 text-sm transition-colors ${activeTab === tab ? "bg-[#5B7FF0]/10 text-[#5B7FF0]" : "text-[#8B93B8] hover:text-[#5B7FF0]"}`}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={addTask}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#5B7FF0] px-6 text-sm font-medium text-white hover:bg-[#4E6FDE]"
          >
            <Plus className="size-5" />
            Add New Task
          </button>
        </div>
      </section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-4">
          <TaskListCard
            title="To Do"
            accent="bg-[#5B7FF0]"
            tasks={todoTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
          <TaskListCard
            title="In Progress"
            accent="bg-[#F59E0B]"
            tasks={inProgressTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
          <TaskListCard
            title="Completed"
            accent="bg-[#10B981]"
            tasks={completedTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>
        <aside className="space-y-4">
          <UpcomingCalendarCard />
          <SummaryDonutCard
            title="Productivity"
            score="78%"
            scoreLabel="Overall Score"
            legend={[
              { label: "Completed", value: "12", color: "#10B981" },
              { label: "To Do", value: "3", color: "#264AFF" },
              { label: "In Progress", value: "6", color: "#F59E0B" },
              { label: "Overdue", value: "1", color: "#EF4444" },
            ]}
          />
          <SummaryDonutCard
            title="Task Breakdown"
            score="87"
            scoreLabel="Avg Score"
            legend={[
              { label: "Sales", value: "40%", color: "#10B981" },
              { label: "Support", value: "25%", color: "#264AFF" },
              { label: "Operations", value: "20%", color: "#F59E0B" },
              { label: "Strategy", value: "0%", color: "#8B93B8" },
              { label: "Design", value: "0%", color: "#EF4444" },
              { label: "Marketing", value: "15%", color: "#D24FC7" },
            ]}
          />
        </aside>
      </section>
    </div>
  );
}
