"use client";

import { useEffect } from "react";

/**
 * Ports design-reference/index.html's inline reveal-on-scroll <script> as a client component.
 * Adds "js" to <html> (globals.css only hides .reveal elements once that class is present, so
 * content stays visible with JS disabled), then fades each .reveal element in via
 * IntersectionObserver, staggered the same way the reference did (index % 3 * 80ms). The 1200ms
 * safety-net timeout guards against an element that never intersects (e.g. a very short page).
 * prefers-reduced-motion is handled in CSS (.js .reveal is forced fully visible there), so no
 * extra branching is needed here.
 */
export function RevealOnScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (revealEls.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 80}ms`;
      io.observe(el);
    });

    const safetyNet = window.setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("in"));
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(safetyNet);
    };
  }, []);

  return null;
}
