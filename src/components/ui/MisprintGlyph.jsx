import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

/**
 * Renders `glyph` as three offset ink layers (echoing the site's
 * registration-chart motif) that spring into near-alignment on mount —
 * used as the signature visual for "not found" states.
 */
export default function MisprintGlyph({ glyph, className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const layers = ref.current.querySelectorAll("[data-layer]");
      gsap.set(layers, { opacity: 0, x: 0, y: 0 });
      gsap.set(ref.current.querySelector("[data-layer='cyan']"), { x: -18, y: -8 });
      gsap.set(ref.current.querySelector("[data-layer='ochre']"), { x: 16, y: 10 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(layers, { opacity: 1, duration: 0.3, stagger: 0.08 })
        .to(ref.current.querySelector("[data-layer='cyan']"), { x: -3, y: -2, duration: 0.9, ease: "elastic.out(1, 0.5)" }, "<")
        .to(ref.current.querySelector("[data-layer='ochre']"), { x: 3, y: 2, duration: 0.9, ease: "elastic.out(1, 0.5)" }, "<");
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`relative mx-auto h-32 select-none sm:h-40 ${className}`} aria-hidden="true">
      <span data-layer="cyan" className="absolute inset-0 font-display text-8xl font-bold text-secondary/70 mix-blend-multiply sm:text-9xl dark:mix-blend-screen">
        {glyph}
      </span>
      <span data-layer="ochre" className="absolute inset-0 font-display text-8xl font-bold text-accent/70 mix-blend-multiply sm:text-9xl dark:mix-blend-screen">
        {glyph}
      </span>
      <span data-layer="key" className="absolute inset-0 font-display text-8xl font-bold text-ink sm:text-9xl">
        {glyph}
      </span>
    </div>
  );
}
