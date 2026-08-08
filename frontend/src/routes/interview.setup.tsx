import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArrowRight, Code, Server, Layers, Database, Brain as BrainIcon, LineChart, ClipboardList, Briefcase, Sparkles } from "lucide-react";

export const Route = createFileRoute("/interview/setup")({
  head: () => ({ meta: [{ title: "New Interview — Interview Twin AI" }, { name: "description", content: "Set up a personalized mock interview." }] }),
  component: Setup,
});

const roles = [
  { id: "swe", label: "Software Engineer", icon: Code },
  { id: "fe", label: "Frontend Developer", icon: Layers },
  { id: "be", label: "Backend Developer", icon: Server },
  { id: "fs", label: "Full Stack Developer", icon: ClipboardList },
  { id: "ds", label: "Data Scientist", icon: LineChart },
  { id: "ml", label: "ML Engineer", icon: BrainIcon },
  { id: "pm", label: "Product Manager", icon: Briefcase },
];

const levels = [
  { id: "beg", label: "Beginner", desc: "0–1 yrs experience" },
  { id: "int", label: "Intermediate", desc: "2–4 yrs experience" },
  { id: "adv", label: "Advanced", desc: "5+ yrs experience" },
];

const types = [
  { id: "tech", label: "Technical", desc: "Coding, system design, fundamentals" },
  { id: "hr", label: "HR", desc: "Background, motivation, fit" },
  { id: "beh", label: "Behavioral", desc: "STAR stories, leadership, conflict" },
  { id: "mix", label: "Mixed", desc: "A realistic blend of all three" },
];

function Setup() {
  const [role, setRole] = useState("fe");
  const [level, setLevel] = useState("int");
  const [type, setType] = useState("mix");

  const SectionTitle = ({ n, t }: { n: string; t: string }) => (
    <div className="flex items-center gap-3">
      <span className="grid size-7 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">{n}</span>
      <h3 className="font-display text-lg font-semibold">{t}</h3>
    </div>
  );

  return (
    <DashboardShell title="Set up your interview" subtitle="Choose a role, level, and format. We'll tailor every question.">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 shadow-card">
            <CardHeader><SectionTitle n="1" t="Pick a role" /></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`group flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all ${role === r.id ? "border-primary bg-primary/5 shadow-glow" : "border-border/60 hover:border-primary/40 hover:bg-accent/40"}`}
                >
                  <div className={`grid size-9 place-items-center rounded-lg ${role === r.id ? "gradient-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                    <r.icon className="size-4" />
                  </div>
                  <span className="text-sm font-medium">{r.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-card">
            <CardHeader><SectionTitle n="2" t="Pick a difficulty" /></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {levels.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${level === l.id ? "border-primary bg-primary/5 shadow-glow" : "border-border/60 hover:border-primary/40 hover:bg-accent/40"}`}
                >
                  <p className="text-sm font-medium">{l.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l.desc}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-card">
            <CardHeader><SectionTitle n="3" t="Interview type" /></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {types.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${type === t.id ? "border-primary bg-primary/5 shadow-glow" : "border-border/60 hover:border-primary/40 hover:bg-accent/40"}`}
                >
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60 shadow-card lg:sticky lg:top-24 h-fit">
          <CardHeader>
            <CardTitle>Your session</CardTitle>
            <CardDescription>Review and start when ready</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <Row k="Role" v={roles.find(r=>r.id===role)?.label || "—"} />
            <Row k="Level" v={levels.find(l=>l.id===level)?.label || "—"} />
            <Row k="Type" v={types.find(t=>t.id===type)?.label || "—"} />
            <Row k="Duration" v="~25 min" />
            <Row k="Questions" v="6 + dynamic follow-ups" />
            <div className="rounded-xl border border-border/60 bg-accent/30 p-3 text-xs text-muted-foreground flex gap-2">
              <Sparkles className="size-4 text-primary shrink-0" />
              Tailored to your latest resume — Frontend Developer track.
            </div>
            <Button asChild className="w-full gradient-primary text-primary-foreground shadow-glow">
              <Link to="/interview/live">Start interview <ArrowRight /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <Badge variant="secondary" className="rounded-full">{v}</Badge>
    </div>
  );
}
