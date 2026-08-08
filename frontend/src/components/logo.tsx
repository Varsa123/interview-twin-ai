import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display font-bold tracking-tight ${className}`}>
      <span className="relative grid size-8 place-items-center rounded-lg gradient-primary shadow-glow">
        <Sparkles className="size-4 text-primary-foreground" />
      </span>
      <span className="text-lg">
        Interview<span className="gradient-text">Twin</span>
      </span>
    </Link>
  );
}
