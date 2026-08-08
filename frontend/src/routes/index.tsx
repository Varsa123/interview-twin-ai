import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav } from "@/components/marketing-nav";
import { Footer } from "@/components/footer";
import { AIOrb } from "@/components/ai-orb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight, Sparkles, Mic, Brain, BarChart3, Target, ShieldCheck, Zap, FileText, Check, Star, Upload,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interview Twin AI — Practice. Improve. Get hired." },
      { name: "description", content: "AI-powered interview coach with real-time feedback, skill gap analysis, and personalized learning paths." },
      { property: "og:title", content: "Interview Twin AI" },
      { property: "og:description", content: "Practice interviews. Discover skill gaps. Get job-ready." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Mic, title: "Realistic AI interviews", desc: "Voice or text mock interviews tailored to your role, level, and target company." },
  { icon: Brain, title: "Real-time intelligence", desc: "Live confidence, pace, and clarity metrics — coached as you speak." },
  { icon: BarChart3, title: "Premium analytics", desc: "Beautiful reports with question-wise breakdowns and progress over time." },
  { icon: Target, title: "Skill gap engine", desc: "Pinpoint exactly what's missing for your target role and how to close it." },
  { icon: FileText, title: "Resume X-ray", desc: "Upload a PDF and we extract skills, projects, and a quality score in seconds." },
  { icon: ShieldCheck, title: "Private by design", desc: "Your recordings and resume stay yours. Encrypted end-to-end." },
];

const stats = [
  { v: "92%", l: "Offer rate after 4 weeks" },
  { v: "150k+", l: "Mock interviews run" },
  { v: "4.9/5", l: "Candidate rating" },
  { v: "60s", l: "To your first feedback" },
];

const steps = [
  { n: "01", t: "Upload your resume", d: "Drop a PDF and we instantly parse your skills, projects, and experience." },
  { n: "02", t: "Pick a role & level", d: "From Frontend to ML — choose technical, behavioral, HR or mixed." },
  { n: "03", t: "Interview with your twin", d: "Voice or text. Dynamic follow-ups. Real-time feedback as you go." },
  { n: "04", t: "Close your gaps", d: "Get a roadmap with courses, drills, and weekly improvement plans." },
];

const testimonials = [
  { name: "Priya S.", role: "SWE @ Stripe", quote: "I went from freezing on system design to landing 3 offers. The live confidence meter is wild." },
  { name: "Marcus L.", role: "Frontend @ Vercel", quote: "It's like having a senior interviewer on call 24/7. The reports are absurdly detailed." },
  { name: "Ana R.", role: "ML Engineer @ Anthropic", quote: "Skill gap analysis told me exactly what to study. Two weeks later, I had the offer." },
];

const pricing = [
  { name: "Starter", price: "$0", desc: "For exploring the platform", features: ["3 mock interviews / mo", "Basic feedback", "Resume parsing"], cta: "Start free" },
  { name: "Pro", price: "$19", featured: true, desc: "For serious job seekers", features: ["Unlimited interviews", "Real-time coach metrics", "Full reports & skill gaps", "Personalized learning path"], cta: "Go Pro" },
  { name: "Teams", price: "$49", desc: "For bootcamps & universities", features: ["Everything in Pro", "Cohort analytics", "Recruiter dashboard", "Priority support"], cta: "Contact sales" },
];

const faqs = [
  { q: "How realistic is the AI interviewer?", a: "It generates dynamic follow-up questions based on your answers and resume — just like a senior engineer would." },
  { q: "Do you support voice input?", a: "Yes. Speak naturally and we transcribe live while measuring confidence, pace, and clarity." },
  { q: "Is my data private?", a: "Recordings and resumes are encrypted, never sold, and you can delete them anytime." },
  { q: "Can I use this for non-technical roles?", a: "Absolutely — Product, Sales, HR and behavioral interviews are fully supported." },
];

function Landing() {
  return (
    <div className="min-h-dvh bg-background">
      <MarketingNav />

      {/* HERO */}
      <section className="relative overflow-hidden hero-bg">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <Badge variant="secondary" className="rounded-full border border-border/60 bg-background/60 backdrop-blur px-3 py-1 text-xs">
                <Sparkles className="mr-1.5 size-3 text-primary" /> Powered by your interview twin
              </Badge>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Practice interviews. <br />
                <span className="gradient-text">Discover skill gaps.</span><br />
                Get job-ready.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Your AI interviewer adapts to your resume, role, and target company — with real-time feedback on confidence,
                clarity, and content. Then it tells you exactly what to study next.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
                  <Link to="/resume"><Upload className="mr-1" /> Upload resume — it's free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="backdrop-blur">
                  <Link to="/interview/setup">Try a mock interview <ArrowRight /></Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex -space-x-2">
                  {["A","B","C","D"].map((c,i)=> (
                    <div key={c} className={`grid size-7 place-items-center rounded-full border-2 border-background text-[10px] font-semibold text-primary-foreground ${["bg-primary","bg-info","bg-success","bg-warning"][i]}`}>{c}</div>
                  ))}
                </div>
                <p>Loved by <span className="font-semibold text-foreground">12,400+</span> candidates this month</p>
              </div>
            </div>

            <div className="relative grid place-items-center">
              <div className="absolute -inset-20 bg-gradient-to-br from-primary/15 via-transparent to-info/10 blur-3xl rounded-full pointer-events-none" />
              <AIOrb size={320} className="animate-float" />
              <div className="absolute top-10 -left-2 sm:-left-4 w-44 sm:w-52 glass rounded-2xl p-3 shadow-card animate-fade-up">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</p>
                <div className="mt-1 flex items-end justify-between">
                  <p className="font-display text-2xl font-bold gradient-text">87%</p>
                  <span className="text-[10px] text-success">+12 today</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted">
                  <div className="h-full w-[87%] rounded-full gradient-primary" />
                </div>
              </div>
              <div className="absolute bottom-6 -right-2 sm:right-0 w-48 sm:w-56 glass rounded-2xl p-3 shadow-card animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-lg bg-success/15 text-success"><Zap className="size-4" /></div>
                  <div>
                    <p className="text-xs font-medium">Great recovery!</p>
                    <p className="text-[10px] text-muted-foreground">You explained the tradeoff clearly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">{s.v}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full">Features</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to nail the interview</h2>
          <p className="mt-3 text-muted-foreground">A complete prep stack — from resume parsing to live coaching to follow-up roadmaps.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="group relative overflow-hidden border-border/60 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="grid size-11 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="rounded-full">How it works</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">From upload to offer in four steps</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <p className="font-display text-4xl font-bold gradient-text">{s.n}</p>
                <h3 className="mt-3 text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full">Loved by candidates</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Offers from the best teams in tech</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/60 shadow-card">
              <CardContent className="p-6">
                <div className="flex gap-0.5 text-warning">
                  {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-full gradient-primary text-primary-foreground text-xs font-semibold">
                    {t.name.split(" ").map(x=>x[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="rounded-full">Pricing</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Simple plans that scale with you</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <Card key={p.name} className={`relative border-border/60 shadow-card ${p.featured ? "shadow-glow border-primary/50 lg:scale-105" : ""}`}>
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-glow">
                    Most popular
                  </div>
                )}
                <CardContent className="p-7">
                  <h3 className="text-base font-semibold">{p.name}</h3>
                  <div className="mt-3 flex items-end gap-1">
                    <p className="font-display text-4xl font-bold">{p.price}</p>
                    <p className="pb-1 text-sm text-muted-foreground">/mo</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="size-4 text-success" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`mt-6 w-full ${p.featured ? "gradient-primary text-primary-foreground shadow-glow" : ""}`} variant={p.featured ? "default" : "outline"}>
                    <Link to="/signup">{p.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="rounded-full">FAQ</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Questions, answered</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border/60">
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 sm:p-16 hero-bg">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your dream offer is one practice away.</h2>
              <p className="mt-3 text-muted-foreground">Start with a free interview today — no credit card required.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-glow">
                <Link to="/signup">Get started free <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">View live demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
