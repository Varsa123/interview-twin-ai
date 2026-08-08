import { Logo } from "./logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
    { title: "Resources", links: ["Docs", "Guides", "Help Center", "Community"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
  ];
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Your AI interview coach. Practice, get real-time feedback, and land the role you deserve.
            </p>
            <div className="mt-5 flex gap-3 text-muted-foreground">
              <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="size-4" /></a>
              <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="size-4" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="size-4" /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Interview Twin AI. All rights reserved.</p>
          <p>Crafted with care for ambitious candidates.</p>
        </div>
      </div>
    </footer>
  );
}
