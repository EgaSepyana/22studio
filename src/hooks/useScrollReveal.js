import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Reveals `[data-reveal]` children of `scope` on scroll, staggered.
 * Skips straight to the resolved state when prefers-reduced-motion is on.
 */
export function useScrollReveal(scope, { y = 40, stagger = 0.08, start = "top 82%" } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const els = gsap.utils.toArray("[data-reveal]", scope.current);
          if (!els.length) return;

          if (context.conditions.reduce) {
            gsap.set(els, { opacity: 1, y: 0 });
            return;
          }

          gsap.set(els, { opacity: 0, y });
          ScrollTrigger.batch(els, {
            start,
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger,
                ease: "power3.out",
                overwrite: true,
              }),
          });
        }
      );

      return () => mm.revert();
    },
    { scope }
  );
}
