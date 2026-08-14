import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  variant?: "primary" | "ghost";
  size?: "base" | "lg";
  className?: string;
  children: ReactNode;
}

/**
 * Replaces the old glow-button.tsx — the reference has no hover-glow/click micro-interaction,
 * just a plain CSS hover transform (see .btn-primary:hover / .btn-ghost:hover in globals.css),
 * so this is a plain anchor with no client-side state needed.
 */
export function Button({ href, variant = "primary", size = "base", className, children }: ButtonProps) {
  const classes = [
    "btn",
    variant === "primary" ? "btn-primary" : "btn-ghost",
    size === "lg" ? "btn-lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
