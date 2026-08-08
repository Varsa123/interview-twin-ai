import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { Bell, Lock, Palette, FileText, User2 } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Interview Twin AI" }, { name: "description", content: "Manage profile, resume, notifications, theme, and privacy." }] }),
  component: SettingsPage,
});

function Section({ icon: Icon, title, desc, children }: { icon: any; title: string; desc: string; children: React.ReactNode }) {
  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg gradient-primary text-primary-foreground shadow-glow"><Icon className="size-4" /></div>
          <div><CardTitle>{title}</CardTitle><CardDescription>{desc}</CardDescription></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <DashboardShell title="Settings" subtitle="Manage your profile, plan, and preferences.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Section icon={User2} title="Profile" desc="Your public details">
          <div className="flex items-center gap-4">
            <Avatar className="size-14"><AvatarFallback className="gradient-primary text-primary-foreground">AR</AvatarFallback></Avatar>
            <Button variant="outline" size="sm">Change photo</Button>
          </div>
          <Separator />
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label htmlFor="n">Full name</Label><Input id="n" defaultValue="Alex Rivera" className="mt-1.5" /></div>
            <div><Label htmlFor="e">Email</Label><Input id="e" defaultValue="alex@example.com" className="mt-1.5" /></div>
          </div>
          <Button className="gradient-primary text-primary-foreground shadow-glow">Save changes</Button>
        </Section>

        <Section icon={FileText} title="Resume" desc="Used to personalize interviews">
          <Row label="alex_rivera_resume.pdf" hint="Uploaded 3 days ago">
            <Button variant="outline" size="sm">Replace</Button>
          </Row>
          <Row label="Auto-update from LinkedIn" hint="Refresh weekly"><Switch defaultChecked /></Row>
        </Section>

        <Section icon={Bell} title="Notifications" desc="Stay in the loop, on your terms">
          <Row label="Weekly progress email"><Switch defaultChecked /></Row>
          <Row label="Skill gap alerts"><Switch defaultChecked /></Row>
          <Row label="New interview tips"><Switch /></Row>
        </Section>

        <Section icon={Palette} title="Appearance" desc="Choose your theme">
          <div className="grid grid-cols-2 gap-3">
            {(["light","dark"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`rounded-xl border p-4 text-left capitalize transition-all ${theme === t ? "border-primary bg-primary/5 shadow-glow" : "border-border/60 hover:border-primary/40"}`}
              >
                <div className={`h-16 rounded-lg ${t === "dark" ? "bg-zinc-900" : "bg-zinc-100"}`} />
                <p className="mt-3 text-sm font-medium">{t}</p>
              </button>
            ))}
          </div>
        </Section>

        <Section icon={Lock} title="Privacy" desc="You're in control">
          <Row label="Allow recruiters to view profile"><Switch defaultChecked /></Row>
          <Row label="Store voice recordings (30 days)"><Switch /></Row>
          <Row label="Anonymous benchmark contribution"><Switch defaultChecked /></Row>
          <Separator />
          <Button variant="destructive" className="w-full sm:w-auto">Delete account</Button>
        </Section>
      </div>
    </DashboardShell>
  );
}
