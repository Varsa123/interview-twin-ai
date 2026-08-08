import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

export const Route = createFileRoute("/employability")({
  head: () => ({ meta: [{ title: "Employability Score — Interview Twin AI" }, { name: "description", content: "Your overall industry readiness across technical, behavioral, and communication dimensions." }] }),
  component: Emp,
});

const history = Array.from({ length: 12 }, (_, i) => ({
  m: `M${i + 1}`,
  you: 50 + i * 3 + Math.sin(i) * 4,
  benchmark: 60 + i * 1.5,
}));

function Gauge({ value, label, color }: { value: number; label: string; color: string }) {
  const data = [{ name: label, value, fill: color }];
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-44 w-44">
        <ResponsiveContainer>
          <RadialBarChart innerRadius="75%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background={{ fill: "var(--color-muted)" }} dataKey="value" cornerRadius={20} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-4xl font-bold gradient-text">{value}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Emp() {
  return (
    <DashboardShell title="Employability Score" subtitle="A holistic measure of your interview readiness.">
      <Card className="border-border/60 shadow-card overflow-hidden">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-4">
          <div className="grid place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-info/5 p-4">
            <Gauge value={84} label="Overall" color="var(--color-chart-1)" />
            <Badge className="mt-2 rounded-full bg-success/15 text-success border-0">Industry-ready</Badge>
          </div>
          <Gauge value={82} label="Technical" color="var(--color-chart-2)" />
          <Gauge value={78} label="Communication" color="var(--color-chart-3)" />
          <Gauge value={88} label="Industry fit" color="var(--color-chart-4)" />
        </CardContent>
      </Card>

      <Card className="mt-6 border-border/60 shadow-card">
        <CardHeader><CardTitle>You vs. industry benchmark</CardTitle><CardDescription>Last 12 months</CardDescription></CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer>
              <LineChart data={history} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="you" stroke="var(--color-chart-1)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="benchmark" stroke="var(--color-chart-5)" strokeWidth={2} strokeDasharray="6 6" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
