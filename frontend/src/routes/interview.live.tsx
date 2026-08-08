import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { AIOrb } from "@/components/ai-orb";
import { useEffect, useState } from "react";
import { Mic, Send, Timer, Sparkles, Volume2, Pause, SkipForward } from "lucide-react";

export const Route = createFileRoute("/interview/live")({
  head: () => ({ meta: [{ title: "Live Interview — Interview Twin AI" }, { name: "description", content: "Your live AI interview session." }] }),
  component: Live,
});

const questions = [
  "Walk me through a recent project you're proud of. What were the trade-offs?",
  "How would you design the rendering pipeline for a Figma-like collaborative canvas?",
  "Tell me about a time you disagreed with a teammate. How did you resolve it?",
];

function Live() {
  const [q, setQ] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [confidence, setConfidence] = useState(72);
  const [pace, setPace] = useState(140);
  const [clarity, setClarity] = useState(81);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => s + 1);
      setConfidence((c) => Math.max(50, Math.min(95, c + (Math.random() * 6 - 3))));
      setPace((p) => Math.max(110, Math.min(180, p + (Math.random() * 10 - 5))));
      setClarity((c) => Math.max(60, Math.min(95, c + (Math.random() * 5 - 2.5))));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <DashboardShell title="Live interview" subtitle={`Frontend Developer · Mixed · ${fmt(seconds)} elapsed`}>
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Left: interviewer + question */}
        <Card className="border-border/60 shadow-card lg:col-span-3">
          <CardContent className="p-5">
            <div className="grid place-items-center pt-2">
              <AIOrb size={180} className="animate-float" />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Badge variant="secondary" className="rounded-full"><Volume2 className="size-3 mr-1" /> Speaking</Badge>
              <Badge variant="secondary" className="rounded-full"><Timer className="size-3 mr-1" /> {fmt(seconds)}</Badge>
            </div>
            <div className="mt-5 rounded-xl border border-border/60 bg-accent/30 p-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Question {q + 1} / {questions.length}</p>
              <p className="mt-1 text-sm leading-relaxed">{questions[q]}</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span><span className="text-muted-foreground">{Math.round(((q+1)/questions.length)*100)}%</span>
              </div>
              <Progress value={((q+1)/questions.length)*100} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Center: candidate area */}
        <Card className="border-border/60 shadow-card lg:col-span-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle>Your answer</CardTitle><CardDescription>Speak or type — we'll listen either way.</CardDescription></div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" aria-label="Pause"><Pause className="size-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Skip" onClick={() => setQ((v) => (v + 1) % questions.length)}><SkipForward className="size-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid place-items-center rounded-2xl border border-dashed border-border/80 p-8 bg-accent/20">
              <button
                aria-label="Record"
                className="relative grid size-20 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                <Mic className="size-7" />
                <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse-ring" />
              </button>
              <p className="mt-4 text-sm font-medium">Recording…</p>
              <p className="text-xs text-muted-foreground">We're transcribing live</p>
            </div>
            <div>
              <Textarea
                rows={4}
                placeholder="Or type your answer here…"
                className="resize-none bg-card"
                defaultValue="The trickiest call was choosing between Server Components and a fully client-rendered editor. We benchmarked perceived latency and chose…"
              />
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="secondary" className="rounded-full"><Sparkles className="size-3 mr-1" /> AI follow-ups enabled</Badge>
                <Button onClick={() => setQ((v) => Math.min(questions.length - 1, v + 1))} className="gradient-primary text-primary-foreground shadow-glow">
                  Submit <Send className="ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: live metrics */}
        <Card className="border-border/60 shadow-card lg:col-span-3">
          <CardHeader><CardTitle>Live coaching</CardTitle><CardDescription>What we're hearing right now</CardDescription></CardHeader>
          <CardContent className="space-y-5">
            <Meter label="Confidence" value={Math.round(confidence)} suffix="%" color="var(--color-chart-1)" />
            <Meter label="Speaking pace" value={Math.round(pace)} suffix=" wpm" color="var(--color-chart-2)" max={200} ideal="120–160" />
            <Meter label="Clarity" value={Math.round(clarity)} suffix="%" color="var(--color-chart-3)" />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suggestions</p>
              <Tip text="Slow down — pace is 8% above ideal" tone="warning" />
              <Tip text="Strong structure: problem → approach → trade-off" tone="success" />
              <Tip text="Mention a metric to anchor the impact" tone="info" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button asChild variant="outline"><Link to="/report">End & view report</Link></Button>
      </div>
    </DashboardShell>
  );
}

function Meter({ label, value, suffix, color, max = 100, ideal }: { label: string; value: number; suffix?: string; color: string; max?: number; ideal?: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-display text-base font-semibold">{value}{suffix}</span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (value/max)*100)}%`, background: `linear-gradient(90deg, ${color}, var(--color-primary-glow))` }} />
      </div>
      {ideal && <p className="mt-1 text-[10px] text-muted-foreground">Ideal {ideal}</p>}
    </div>
  );
}

function Tip({ text, tone }: { text: string; tone: "success" | "warning" | "info" }) {
  const map = { success: "bg-success/15 text-success", warning: "bg-warning/15 text-warning", info: "bg-info/15 text-info" };
  return <div className={`rounded-lg px-3 py-2 text-xs ${map[tone]}`}>{text}</div>;
}
