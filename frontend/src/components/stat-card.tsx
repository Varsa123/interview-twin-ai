import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { type ReactNode } from "react";

export function StatCard({
  label, value, delta, deltaPositive = true, icon: Icon, hint, accent = "primary",
}: {
  label: string; value: ReactNode; delta?: string; deltaPositive?: boolean; icon?: LucideIcon; hint?: string;
  accent?: "primary" | "success" | "warning" | "info";
}) {
  const accentMap = {
    primary: "from-primary/20 to-primary-glow/10 text-primary",
    success: "from-success/20 to-success/5 text-success",
    warning: "from-warning/20 to-warning/5 text-warning",
    info: "from-info/20 to-info/5 text-info",
  } as const;
  return (
    <Card className="relative overflow-hidden border-border/60 shadow-card transition-all hover:shadow-elevated hover:-translate-y-0.5">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent]} opacity-60 pointer-events-none`} />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</p>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
          {Icon && (
            <div className={`grid size-10 place-items-center rounded-xl bg-background/60 backdrop-blur border border-border/60`}>
              <Icon className="size-5" />
            </div>
          )}
        </div>
        {delta && (
          <div className={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${deltaPositive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
            {deltaPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {delta}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
