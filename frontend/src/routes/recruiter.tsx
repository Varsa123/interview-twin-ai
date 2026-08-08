import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, ArrowUpRight, Filter, Trophy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Cell } from "recharts";

export const Route = createFileRoute("/recruiter")({
  head: () => ({ meta: [{ title: "Recruiter View — Interview Twin AI" }, { name: "description", content: "Compare candidates, view interview reports, and rank top fits." }] }),
  component: Recruiter,
});

const candidates = [
  { n: "Priya Sharma", r: "Frontend", s: 92, t: 88, c: 94, status: "Top" },
  { n: "Marcus Lin", r: "Full Stack", s: 88, t: 91, c: 84, status: "Strong" },
  { n: "Ana Rivera", r: "ML Engineer", s: 86, t: 90, c: 79, status: "Strong" },
  { n: "Tom Becker", r: "Backend", s: 81, t: 84, c: 78, status: "Good" },
  { n: "Jiwoo Han", r: "Frontend", s: 78, t: 75, c: 82, status: "Good" },
  { n: "Sara El-Amin", r: "Software", s: 73, t: 70, c: 79, status: "Review" },
];

const compare = candidates.slice(0, 5).map(c => ({ name: c.n.split(" ")[0], score: c.s }));
const palette = ["var(--color-chart-1)","var(--color-chart-2)","var(--color-chart-3)","var(--color-chart-4)","var(--color-chart-5)"];

function Recruiter() {
  return (
    <DashboardShell title="Recruiter Dashboard" subtitle="Compare candidates and surface top fits in seconds.">
      <Card className="border-border/60 shadow-card">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="relative flex-1 min-w-60">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search candidates, roles, skills…" className="pl-9" />
          </div>
          <Button variant="outline"><Filter /> Filters</Button>
          <Button className="gradient-primary text-primary-foreground shadow-glow">Invite candidate</Button>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 shadow-card lg:col-span-2">
          <CardHeader><CardTitle>Candidates</CardTitle><CardDescription>{candidates.length} active this week</CardDescription></CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {candidates.map((c, i) => (
                <div key={c.n} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-8 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">#{i+1}</div>
                    <Avatar><AvatarFallback className="gradient-primary text-primary-foreground text-xs">{c.n.split(" ").map(x=>x[0]).join("")}</AvatarFallback></Avatar>
                    <div>
                      <p className="text-sm font-medium">{c.n}</p>
                      <p className="text-xs text-muted-foreground">{c.r}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-auto">
                    <div className="hidden md:flex gap-3 text-xs">
                      <Mini l="Tech" v={c.t} />
                      <Mini l="Comm" v={c.c} />
                    </div>
                    <Badge className={`rounded-full ${c.status === "Top" ? "bg-success/15 text-success" : c.status === "Strong" ? "bg-info/15 text-info" : c.status === "Good" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"}`}>
                      <Trophy className="size-3 mr-1" /> {c.s}
                    </Badge>
                    <Button size="sm" variant="ghost">View <ArrowUpRight className="size-3" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle>Top 5 — overall score</CardTitle><CardDescription>Live ranking</CardDescription></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={compare} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" horizontal={false}/>
                  <XAxis type="number" domain={[0,100]} tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false}/>
                  <YAxis dataKey="name" type="category" tick={{ fill: "var(--color-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} width={70}/>
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="score" radius={[0,8,8,0]}>
                    {compare.map((_, i) => <Cell key={i} fill={palette[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

function Mini({ l, v }: { l: string; v: number }) {
  return (
    <div className="text-right">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</p>
      <p className="text-sm font-semibold">{v}</p>
    </div>
  );
}
