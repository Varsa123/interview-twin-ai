import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, Mic, BarChart3, Target, GraduationCap, Gauge, Users, Settings, LogOut, ChevronRight,
} from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type ReactNode, useState } from "react";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Analysis", icon: FileText },
  { to: "/interview/setup", label: "New Interview", icon: Mic },
  { to: "/report", label: "Interview Report", icon: BarChart3 },
  { to: "/skill-gap", label: "Skill Gaps", icon: Target },
  { to: "/recommendations", label: "Learning Path", icon: GraduationCap },
  { to: "/employability", label: "Employability", icon: Gauge },
  { to: "/recruiter", label: "Recruiter View", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children, title, subtitle, actions }: { children: ReactNode; title?: string; subtitle?: string; actions?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      {/* sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border/60 bg-sidebar transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center px-5 border-b border-border/60">
          <Logo />
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  active
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="size-4" />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="size-3.5 opacity-80" />}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-3 bottom-3 rounded-xl glass p-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-9"><AvatarFallback className="gradient-primary text-primary-foreground text-xs">AR</AvatarFallback></Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Alex Rivera</p>
              <p className="truncate text-xs text-muted-foreground">Pro plan</p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Sign out"><LogOut className="size-4" /></Button>
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 glass border-b border-border/60">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              <LayoutDashboard className="size-4" />
            </Button>
            <div className="flex-1">
              {title && <h1 className="text-base font-semibold leading-tight sm:text-lg">{title}</h1>}
              {subtitle && <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">
              {actions}
              <ThemeToggle />
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
          {children}
        </div>
      </div>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden" />}
    </div>
  );
}
