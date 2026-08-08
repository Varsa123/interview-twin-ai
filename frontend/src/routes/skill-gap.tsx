import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/skill-gap")({
  head: () => ({ meta: [{ title: "Skill Gap Analysis — Interview Twin AI" }, { name: "description", content: "What you have, what you're missing, and how to close the gap." }] }),
  component: SkillGap,
});

const have = ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Jest", "Tailwind", "Next.js"];
const missing = ["System Design", "Kubernetes", "GraphQL Federation", "Distributed Caching"];
const recommended = ["DSA refresh", "AWS Solutions Architect basics", "Behavioral leadership stories"];

const roadmap = [
  { week: "Week 1", title: "Foundations", items: ["DSA: arrays & hash maps", "REST vs GraphQL trade-offs"] },
  { week: "Week 2", title: "System design", items: ["Rate limiting", "Caching strategies"] },
  { week: "Week 3", title: "Cloud", items: ["AWS core services", "IAM & networking"] },
  { week: "Week 4", title: "Mock & polish", items: ["3 mixed interviews", "Behavioral STAR drill"] },
];

function SkillGap() {
  return (
    <DashboardShell title="Skill Gap Analysis" subtitle="Target role: Software Engineer (Senior)">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><Check className="size-4 text-success" /> You have</CardTitle><CardDescription>{have.length} skills detected</CardDescription></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {have.map(s => <Badge key={s} className="rounded-full bg-success/10 text-success border-success/20">{s}</Badge>)}
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><X className="size-4 text-destructive" /> Missing</CardTitle><CardDescription>Critical for this role</CardDescription></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {missing.map(s => <Badge key={s} className="rounded-full bg-destructive/10 text-destructive border-destructive/20">{s}</Badge>)}
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-card">
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> Recommended</CardTitle><CardDescription>Boost your edge</CardDescription></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {recommended.map(s => <Badge key={s} className="rounded-full bg-primary/10 text-primary border-primary/20">{s}</Badge>)}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-border/60 shadow-card">
        <CardHeader><CardTitle>4-week skill roadmap</CardTitle><CardDescription>An adaptive plan that updates after every interview</CardDescription></CardHeader>
        <CardContent>
          <div className="relative grid gap-6 md:grid-cols-4">
            <div className="hidden md:block absolute top-6 left-6 right-6 h-px bg-gradient-to-r from-primary via-info to-success" />
            {roadmap.map((r, i) => (
              <div key={r.week} className="relative rounded-2xl border border-border/60 bg-card p-4 shadow-card">
                <div className="relative z-10 grid size-9 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow text-xs font-bold">{i+1}</div>
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{r.week}</p>
                <h4 className="mt-1 text-base font-semibold">{r.title}</h4>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {r.items.map(x => <li key={x} className="flex items-start gap-2"><ArrowRight className="size-3.5 mt-0.5 text-primary shrink-0" /> {x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
