import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Mic, Sparkles, CalendarDays, PlayCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/recommendations")({
  head: () => ({ meta: [{ title: "Learning Recommendations — Interview Twin AI" }, { name: "description", content: "Personalized courses, practice topics, and a weekly improvement plan." }] }),
  component: Recs,
});

const courses = [
  { t: "System Design: From Zero to Senior", p: "Educative", d: "8h", tag: "System Design" },
  { t: "Advanced TypeScript Patterns", p: "Frontend Masters", d: "6h", tag: "TS" },
  { t: "Distributed Caching in Practice", p: "DesignGurus", d: "4h", tag: "Backend" },
  { t: "Behavioral Mastery for Engineers", p: "Interview Twin", d: "3h", tag: "Behavioral" },
];

const week = [
  { d: "Mon", t: "Mock: System design (rate limiter)" },
  { d: "Tue", t: "Read: Caching strategies (45 min)" },
  { d: "Wed", t: "Drill: 3 behavioral STAR stories" },
  { d: "Thu", t: "Mock: Mixed interview (Frontend)" },
  { d: "Fri", t: "Review: This week's report" },
  { d: "Sat", t: "Project: ship a small feature" },
  { d: "Sun", t: "Rest + reflection journal" },
];

function Recs() {
  return (
    <DashboardShell title="Learning Path" subtitle="Designed from your last 5 interviews and resume signals.">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 shadow-card lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="size-4 text-primary" /> Recommended courses</CardTitle><CardDescription>Picked to close your biggest gaps</CardDescription></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {courses.map(c => (
              <div key={c.t} className="rounded-xl border border-border/60 p-4 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full text-xs">{c.tag}</Badge>
                  <span className="text-xs text-muted-foreground">{c.d}</span>
                </div>
                <p className="mt-2 text-sm font-semibold">{c.t}</p>
                <p className="text-xs text-muted-foreground">{c.p}</p>
                <Button size="sm" variant="ghost" className="mt-2 px-2"><PlayCircle className="size-3.5" /> Start</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><Mic className="size-4 text-primary" /> Mock interview ideas</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {["System design: Notification service", "Frontend: Build a virtualized list", "Behavioral: Conflict resolution", "Backend: Idempotent payments"].map(x => (
              <div key={x} className="flex items-center justify-between rounded-lg border border-border/60 p-3 text-sm hover:bg-accent/40 transition-colors">
                {x}
                <ArrowRight className="size-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-border/60 shadow-card">
        <CardHeader><CardTitle className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> Weekly improvement plan</CardTitle><CardDescription>A balanced rhythm — practice, learn, rest</CardDescription></CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {week.map((d) => (
              <div key={d.d} className="rounded-xl border border-border/60 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.d}</p>
                <p className="mt-1 text-sm">{d.t}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 border-border/60 shadow-card">
        <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> Practice topics</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {["Hash maps", "Sliding window", "Trees & graphs", "Concurrency", "Caching", "OAuth", "WebSockets", "Pagination", "Indexes", "Backpressure"].map(t => (
            <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
