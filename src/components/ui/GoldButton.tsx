import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm font-sans uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  gold: "bg-espresso dark:bg-gold text-primary-foreground dark:text-espresso font-semibold shadow-[var(--shadow-soft)] hover:bg-gold hover:text-accent-foreground dark:hover:bg-gold-soft dark:hover:text-espresso hover:shadow-[var(--shadow-lift)]",
  outline:
    "border border-gold/60 bg-transparent text-foreground hover:border-gold hover:bg-gold/10 dark:hover:bg-gold/20",
  ghost: "text-foreground hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.68rem]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-xs",
};

export const GoldButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }
>(({ className, variant = "gold", size = "md", children, ...props }, ref) => (
  <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
    <span className="relative z-10">{children}</span>
  </button>
));
GoldButton.displayName = "GoldButton";
