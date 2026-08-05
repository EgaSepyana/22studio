import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";
import { useCms } from "../../context/CmsContext";

/**
 * The page's signature motif: a strip of spot-ink swatches, styled after
 * a screen-printer's color-separation registration chart. On scroll each
 * chip "stamps" into place in sequence, echoing a squeegee pass per color.
 */
export default function InkSwatchStrip({ className = "", animate = true }) {
  const { inkSwatches } = useCms();
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!animate || prefersReducedMotion() || !ref.current) return;
      const chips = ref.current.querySelectorAll("[data-chip]");

      gsap.set(chips, { opacity: 0, y: 10, scale: 0.6, rotate: -8 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(chips, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.09,
            ease: "back.out(2.4)",
          }),
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      {inkSwatches.map((swatch) => (
        <div key={swatch.code} data-chip className="flex flex-col items-center gap-1">
          <span
            className="block h-5 w-5 rounded-sm shadow-sm ring-1 ring-black/10 dark:ring-white/10"
            style={{ backgroundColor: `var(${swatch.var})` }}
          />
          <span className="font-mono text-[9px] tracking-wider text-muted">{swatch.code}</span>
        </div>
      ))}
    </div>
  );
}
