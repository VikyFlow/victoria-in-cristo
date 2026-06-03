import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
}

export function ButtonLink({ to, children, variant = "primary" }: ButtonLinkProps) {
  const className = {
    primary: "inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-bold text-deepblack shadow-glow transition hover:bg-warm",
    secondary: "inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-warm transition hover:border-gold hover:text-gold",
    dark: "inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-3 text-sm font-bold text-ink transition hover:border-gold hover:text-gold",
  }[variant];

  return <Link className={className} to={to}>{children}</Link>;
}
