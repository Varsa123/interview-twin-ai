export function AIOrb({ size = 260, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* outer pulse rings */}
      <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-ring" />
      <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
      {/* blob */}
      <div
        className="absolute inset-6 animate-blob gradient-primary shadow-glow"
        style={{ filter: "blur(2px)" }}
      />
      <div className="absolute inset-10 animate-blob rounded-full bg-background/40 backdrop-blur-xl" style={{ animationDelay: "2s" }} />
      {/* core */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid place-items-center size-24 rounded-full bg-background/70 backdrop-blur-md border border-primary/40 shadow-glow">
          <svg viewBox="0 0 24 24" className="size-10 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="9" r="3.2" />
            <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" strokeLinecap="round" />
            <path d="M12 2v2M4 5l1.4 1.4M20 5l-1.4 1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {/* orbiting dots */}
      <div className="absolute inset-0 animate-spin-slow">
        <span className="absolute left-1/2 top-0 -translate-x-1/2 size-2 rounded-full bg-primary-glow shadow-glow" />
        <span className="absolute bottom-2 right-4 size-1.5 rounded-full bg-info" />
        <span className="absolute bottom-6 left-2 size-1.5 rounded-full bg-success" />
      </div>
    </div>
  );
}
