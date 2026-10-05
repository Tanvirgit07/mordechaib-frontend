"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  BarChart3,
  Bot,
  CalendarDays,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Crown,
  Headphones,
  LayoutGrid,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  {
    name: "Call Intelligence",
    href: "/dashboard/call-intelligence",
    icon: Headphones,
  },
  {
    name: "Ai Chief of Staff",
    href: "/dashboard/chief-of-staff",
    icon: Sparkles,
  },
  { name: "AI Agents", href: "/dashboard/agents", icon: Bot },
  { name: "CRM", href: "/dashboard/crm", icon: Users },
  { name: "ROI Dashboard", href: "/dashboard/roll-dashboard", icon: BarChart3 },
  { name: "Task", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    localStorage.removeItem("accessToken");
    queryClient.clear();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-40 flex size-10 items-center justify-center rounded-lg bg-white text-[#0E1224] shadow md:hidden"
      >
        <Menu className="size-5" />
      </button>
      {open && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#0E1224]/35 md:hidden"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col gap-4 overflow-hidden bg-white p-4 transition-transform duration-300 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-8 items-center justify-between border-b border-[#F5F7FF] pb-4 box-content">
          <Link href="/" aria-label="Go to Noltra.ai home page">
            <Image
              src="/logo2.png"
              alt="Noltra.ai"
              width={105}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Collapse navigation"
            className="flex size-8 items-center justify-center rounded-lg bg-[#F5F7FF]/50 text-[#C6CCE2]"
          >
            <ChevronLeft className="hidden size-5 md:block" />
            <X className="size-5 md:hidden" />
          </button>
        </div>
        <label className="flex h-10 items-center gap-2 rounded-lg border border-[#8B93B8]/10 px-[13px] text-[#8B93B8]">
          <Search className="size-5 shrink-0" />
          <input
            aria-label="Search navigation"
            placeholder="Search..."
            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#8B93B8]"
          />
          <kbd className="rounded border border-[#8B93B8]/5 px-2 py-1 text-[10px]">
            ⌘K
          </kbd>
        </label>
        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col gap-2 border-b border-[#E4EAF8] pb-4">
            {navigation.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex h-12 items-center gap-2 rounded-lg px-4 text-base font-medium transition-colors",
                    active
                      ? "border-l-2 border-[#5B7FF0] bg-[#5B7FF0]/10 text-[#5B7FF0]"
                      : "text-[#6B6B6B] hover:bg-[#F5F7FF] hover:text-[#5B7FF0]",
                  )}
                >
                  <item.icon className="size-6 shrink-0" strokeWidth={1.6} />
                  {item.name}
                </Link>
              );
            })}
          </div>
          <Link
            href="/dashboard/support"
            className={cn("flex h-12 items-center gap-2 rounded-lg px-4 text-base font-medium hover:bg-[#F5F7FF]", pathname.startsWith("/dashboard/support") ? "border-l-2 border-[#5B7FF0] bg-[#5B7FF0]/10 text-[#5B7FF0]" : "text-[#6B6B6B]")}
          >
            <Headphones className="size-6" strokeWidth={1.6} />
            Help &amp; Support
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isSigningOut}
            className="flex h-12 items-center gap-2 rounded-lg px-4 text-base font-medium text-[#6B6B6B] hover:bg-[#F5F7FF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="size-6" strokeWidth={1.6} />
            {isSigningOut ? "Logging out..." : "Log out"}
          </button>
        </nav>
        <div className="rounded-lg bg-[linear-gradient(100deg,#5F08FA_34%,#D946EF_148%)] p-4 text-white">
          <div className="flex items-center gap-2">
            <Crown className="size-5 fill-white" />
            <span className="text-base">Upgrade Plan</span>
          </div>
          <p className="mt-2 text-xs leading-normal text-white/80">
            Unlock Premium features and advanced integrations.
          </p>
          <button
            type="button"
            className="mt-2 flex h-10 w-full items-center justify-between rounded-lg bg-white px-4 text-sm font-medium text-[#5B7FF0]"
          >
            Manage Subscription
            <ChevronRight className="size-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
