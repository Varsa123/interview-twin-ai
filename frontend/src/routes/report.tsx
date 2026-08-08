import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatCard } from "@/components/stat-card";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
} from "recharts";
import { Award, MessageSquare, Brain, Lightbulb, Gauge, Download, ThumbsUp, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Interview Report — Interview Twin AI" }, { name: "description", content: "Detailed analytics and feedback from your latest interview." }] }),
  component: Report,
});

const radar = [
  { k: "Technical", v: 84 }, { k: "Communication", v: 78 }, { k: "Confidence", v: 88 },
  { k: "Problem Solving", v: 81 }, { k: "Clarity", v: 75 }, { k: "Depth", v: 82 },
];
const emotion = Array.from({ length: 12 }, (_, i) => ({
  t: `${i}m`,
  confidence: 60 + Math.sin(i / 2) * 15 + i,
  nervousness: 50 - i * 1.5 + Math.cos(i) * 6,
  focus: 70 + Math.sin(i / 1.5) * 10,
  engagement: 65 + i + Math.cos(i / 2) * 8,
}));
const qWise = [
  { q: "Project deep-dive", score: 88, type: "Technical" },
  { q: "Collaborative canvas design", score: 76, type: "System Design" },
  { q: "Disagreement resolution", score: 92, type: "Behavioral" },
  { q: "API rate-limiting", score: 71, type: "Technical" },
];

function Report() {
  return (
    <DashboardShell
      title="Interview Report"
      subtitle="Frontend Developer · Mixed · Today, 2:14pm"
      actions={<Button variant="outline" className="hidden sm:inline-flex"><Download /> Export PDF</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Overall" value="83" delta="+5" icon={Gauge} accent="primary" hint="Out of 100" />
        <StatCard label="Technical" value="84" icon={Brain} accent="info" />
        <StatCard label="Communication" value="78" icon={MessageSquare} accent="success" />
        <StatCard label="Confidence" value="88" icon={Award} accent="primary" />
        <StatCard label="Problem solving" value="81" icon={Lightbulb} accent="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 shadow-card lg:col-span-2">
          <CardHeader><CardTitle>Emotion timeline</CardTitle><CardDescription>How you felt across the session</CardDescription></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer>
                <LineChart data={emotion} margin={{ left: -20, right: 8, top: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" vertical={false}/>
                  <XAxis dataKey="t" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                  <Line type="monotone" dataKey="confidence" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="nervousness" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="focus" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="engagement" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              {[
                { c: "var(--color-chart-1)", l: "Confidence" },
                { c: "var(--color-chart-5)", l: "Nervousness" },
                { c: "var(--color-chart-2)", l: "Focus" },
                { c: "var(--color-chart-3)", l: "Engagement" },
              ].map(s => (
                <span key={s.l} className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full" style={{ background: s.c }} /> {s.l}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle>Skill snapshot</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer>
                <RadarChart data={radar}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="k" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} />
                  <Radar dataKey="v" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.35} strokeWidth={2}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><ThumbsUp className="size-4 text-success" /> Strengths</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Crisp project narration with clear trade-offs</p>
            <p>• Strong recovery after a tough follow-up</p>
            <p>• Behavioral answers used the STAR framework well</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="size-4 text-warning" /> Areas to improve</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Slow down on technical deep-dives (pace +14% over ideal)</p>
            <p>• Add quantified outcomes to project stories</p>
            <p>• System design: discuss bottlenecks before solutions</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-border/60 shadow-card">
        <CardHeader><CardTitle>AI feedback summary</CardTitle><CardDescription>Synthesized from this session</CardDescription></CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Alex delivered a confident interview with strong technical depth on frontend topics and excellent behavioral answers.
            Communication is clear but occasionally rushed during system design — pacing exercises and explicit trade-off framing
            will move the overall score from <b className="text-foreground">83</b> to the <b className="gradient-text">90+</b> range
            within 2 weeks of focused practice.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6 border-border/60 shadow-card">
        <CardHeader><CardTitle>Question-wise analysis</CardTitle><CardDescription>Score and tags per question</CardDescription></CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="bars">Bars</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-3 mt-4">
              {qWise.map((q) => (
                <div key={q.q} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 p-4">
                  <div>
                    <p className="text-sm font-medium">{q.q}</p>
                    <p className="text-xs text-muted-foreground">{q.type}</p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Progress value={q.score} className="h-2 w-40" />
                    <Badge className={`rounded-full ${q.score >= 85 ? "bg-success/15 text-success" : q.score >= 75 ? "bg-info/15 text-info" : "bg-warning/15 text-warning"}`}>{q.score}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="bars" className="mt-4">
              <div className="h-64">
                <ResponsiveContainer>
                  <AreaChart data={qWise}>
                    <defs>
                      <linearGradient id="rg" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.6}/>
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" vertical={false}/>
                    <XAxis dataKey="q" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                    <Area type="monotone" dataKey="score" stroke="var(--color-chart-1)" fill="url(#rg)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
