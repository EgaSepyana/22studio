import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

/** Animates a number counting up once its ref scrolls into view. */
export function useCountUp(target, { duration = 1.6 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(prefersReducedMotion() ? target : 0);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      const counter = { val: 0 };
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration,
            ease: "power2.out",
            onUpdate: () => setDisplay(Math.round(counter.val)),
          });
        },
      });

      return () => trigger.kill();
    },
    { scope: ref }
  );

  return { ref, display };
}
