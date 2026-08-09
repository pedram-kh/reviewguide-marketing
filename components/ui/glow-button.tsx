"use client";

import { forwardRef, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface GlowButtonProps {
  href: string;
  label: string;
  className?: string;
}

/**
 * Adapted from the Stakeholder-provided reference component (a plain `<button onClick>`) — every
 * real CTA on this landing page is a `next/link` navigation to /signup, not a click-handler, so
 * this wraps `Link` instead. Keeps the reference's click micro-interaction (`data-state="clicked"`
 * for 200ms) and the trailing Sparkles icon; drops `onClick`/`aria-label` overrides since a link's
 * accessible name should just be its visible text, not a separate label prop.
 *
 * The reference only supplied the "glow-btn" class name with no CSS behind it — the actual glow
 * (app/globals.css) is original, designed to echo the hero section's existing warm-amber
 * "illuminated" look rather than invent an unrelated color language. Original button colors
 * (white background, black text) are untouched — the glow sits on top as a box-shadow/ring, it
 * doesn't recolor anything.
 */
export const GlowButton = forwardRef<HTMLAnchorElement, GlowButtonProps>(
  ({ href, label, className }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
    };

    return (
      <Link
        ref={ref}
        href={href}
        className={cn("glow-btn", className)}
        onClick={handleClick}
        data-state={isClicked ? "clicked" : undefined}
      >
        <span className="flex items-center justify-center gap-1.5">
          {label}
          <Sparkles size={16} className="ml-0.5" aria-hidden="true" />
        </span>
      </Link>
    );
  }
);

GlowButton.displayName = "GlowButton";
