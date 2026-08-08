import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Legend,
} from "recharts";
import { Gauge, Mic, Brain, MessageSquare, Target, Award, ArrowRight, Trophy, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Interview Twin AI" }, { name: "description", content: "Your employability score, recent interviews, and progress at a glance." }] }),
  component: Dashboard,
});

const trend = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  confidence: 50 + i * 3 + (i % 3) * 2,
  technical: 45 + i * 3.2,
  communication: 55 + i * 2.6,
}));

const radar = [
  { metric: "Technical", value: 82 },
  { metric: "Communication", value: 76 },
  { metric: "Confidence", value: 88 },
  { metric: "Problem-solving", value: 79 },
  { metric: "Behavioral", value: 84 },
  { metric: "System design", value: 68 },
];

const recent = [
  { role: "Frontend Developer", type: "Technical", score: 86, date: "Today, 2:14pm", level: "Intermediate" },
  { role: "Full Stack Developer", type: "Mixed", score: 72, date: "Yesterday", level: "Advanced" },
  { role: "Software Engineer", type: "Behavioral", score: 91, date: "Tue", level: "Intermediate" },
  { role: "Backend Developer", type: "Technical", score: 78, date: "Mon", level: "Advanced" },
];

function Dashboard() {
  return (
    <DashboardShell
      title="Welcome back, Alex 👋"
      subtitle="Here's how your interview game is trending this week."
      actions={
        <Button asChild className="gradient-primary text-primary-foreground shadow-glow hidden sm:inline-flex">
          <Link to="/interview/setup"><Mic /> Start interview</Link>
        </Button>
      }
    >
      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Employability" value="84" delta="+6 this week" icon={Gauge} accent="primary" hint="Industry-ready" />
        <StatCard label="Interviews" value="27" delta="+4" icon={Trophy} accent="info" hint="Last 30 days" />
        <StatCard label="Confidence" value="88%" delta="+12%" icon={Award} accent="success" />
        <StatCard label="Skill gaps" value="5" delta="-2 closed" icon={Target} accent="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Trend */}
        <Card className="lg:col-span-2 border-border/60 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Performance trend</CardTitle>
              <CardDescription>Weekly scores across core metrics</CardDescription>
            </div>
            <Badge variant="secondary" className="rounded-full">Last 12 weeks</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.6}/>
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="g3" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" vertical={false}/>
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}/>
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}/>
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="confidence" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#g1)" />
                  <Area type="monotone" dataKey="technical" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#g2)" />
                  <Area type="monotone" dataKey="communication" stroke="var(--color-chart-3)" strokeWidth={2} fill="url(#g3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar */}
        <Card className="border-border/60 shadow-card">
          <CardHeader>
            <CardTitle>Skill profile</CardTitle>
            <CardDescription>Where you stand right now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radar}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.35} strokeWidth={2}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Score breakdown */}
        <Card className="border-border/60 shadow-card lg:col-span-2">
          <CardHeader><CardTitle>Score breakdown</CardTitle><CardDescription>Per-skill detail with targets</CardDescription></CardHeader>
          <CardContent className="space-y-5">
            {[
              { l: "Technical knowledge", v: 82, c: "var(--color-chart-1)" },
              { l: "Communication", v: 76, c: "var(--color-chart-2)" },
              { l: "Confidence", v: 88, c: "var(--color-chart-3)" },
              { l: "Problem solving", v: 79, c: "var(--color-chart-4)" },
              { l: "System design", v: 68, c: "var(--color-chart-5)" },
            ].map((s) => (
              <div key={s.l}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.l}</span>
                  <span className="text-muted-foreground">{s.v}/100</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: `linear-gradient(90deg, ${s.c}, var(--color-primary-glow))` }}/>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Up next */}
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle>This week's plan</CardTitle><CardDescription>3 actions to boost your score</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {[
              { t: "Practice 2 system design rounds", d: "Closes biggest gap", icon: Brain },
              { t: "Behavioral STAR drill", d: "Avg session 18 min", icon: MessageSquare },
              { t: "Speak slower in answer 3", d: "Detected 6 pace warnings", icon: Mic },
            ].map((a) => (
              <div key={a.t} className="flex items-center gap-3 rounded-xl border border-border/60 p-3 hover:bg-accent/50 transition-colors">
                <div className="grid size-9 place-items-center rounded-lg gradient-primary text-primary-foreground">
                  <a.icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.t}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.d}</p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent interviews */}
      <Card className="mt-6 border-border/60 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle>Recent interviews</CardTitle><CardDescription>Replay or compare your last sessions</CardDescription></div>
          <Button variant="ghost" asChild><Link to="/report">View all <ArrowRight /></Link></Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border/60">
            {recent.map((r) => (
              <div key={r.role + r.date} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-accent">
                    <Mic className="size-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.role}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2"><Clock className="size-3" /> {r.date} · {r.type} · {r.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-36 hidden md:block">
                    <Progress value={r.score} className="h-2" />
                  </div>
                  <Badge variant="secondary" className={`rounded-full ${r.score >= 85 ? "text-success bg-success/15" : r.score >= 75 ? "text-info bg-info/15" : "text-warning bg-warning/15"}`}>
                    <CheckCircle2 className="size-3 mr-1" /> {r.score}
                  </Badge>
                  <Button size="sm" variant="ghost">Replay</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
