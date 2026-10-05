import { TaskItem, type Task } from "./TaskItem";

type TaskListCardProps = {
  title: string;
  accent: string;
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TaskListCard({
  title,
  accent,
  tasks,
  onToggle,
  onDelete,
}: TaskListCardProps) {
  return (
    <section className="rounded-xl bg-white p-6">
      <header className="flex items-center justify-between border-b border-[#E4EAF8] pb-4">
        <div className="flex items-center gap-2">
          <i className={`h-7 w-1 rounded-full ${accent}`} />
          <h2 className="text-xl font-medium text-[#0E1224]">{title}</h2>
          <span className="rounded-lg bg-[#F5F7FF] px-2 py-1 text-sm text-[#8B93B8]">
            {tasks.length}
          </span>
        </div>
        <div className="hidden gap-8 text-sm text-[#8B93B8] sm:flex">
          <span>Priority</span>
          <span>Action</span>
        </div>
      </header>
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
