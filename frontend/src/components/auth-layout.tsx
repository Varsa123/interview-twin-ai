import { Link, type LinkProps } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { AIOrb } from "@/components/ai-orb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

export function AuthLayout({
  title, subtitle, children, footer,
}: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="min-h-dvh grid lg:grid-cols-2 bg-background">
      <div className="relative hidden overflow-hidden hero-bg lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <Logo />
        <div className="relative grid place-items-center py-10">
          <AIOrb size={320} className="animate-float" />
        </div>
        <div className="relative max-w-md">
          <p className="font-display text-2xl font-semibold leading-snug">
            "Two weeks with Interview Twin and I had two offers. The real-time feedback is unfair."
          </p>
          <p className="mt-3 text-sm text-muted-foreground">— Priya S., SWE @ Stripe</p>
        </div>
      </div>
      <div className="flex flex-col p-6 sm:p-10">
        <div className="lg:hidden"><Logo /></div>
        <div className="m-auto w-full max-w-sm animate-fade-up">
          <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
        </div>
      </div>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="w-full">
        <svg viewBox="0 0 24 24" className="size-4"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.1 14.6 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c6.9 0 9.2-4.8 9.2-7.3 0-.5 0-.9-.1-1.3H12z"/></svg>
        Google
      </Button>
      <Button variant="outline" className="w-full">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.1-.9-1.6 0-3 .9-3.9 2.4-1.6 2.9-.4 7.1 1.2 9.4.8 1.1 1.7 2.4 3 2.3 1.2-.1 1.6-.8 3-.8s1.8.8 3.1.8c1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1-.1-2.4-.9-2.4-3.6zM14 4.7c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.9-1.4z"/></svg>
        Apple
      </Button>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
      <Separator className="flex-1" />
    </div>
  );
}

export function PrimaryButton({ children, to }: { children: ReactNode; to?: LinkProps["to"] }) {
  if (to) return <Button asChild className="w-full gradient-primary text-primary-foreground shadow-glow"><Link to={to}>{children}</Link></Button>;
  return <Button className="w-full gradient-primary text-primary-foreground shadow-glow">{children}</Button>;
}

export function Field({ id, label, type = "text", placeholder }: { id: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}
