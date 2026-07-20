import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { CLIENTS } from "../../data/content";

export default function ClientMarquee() {
  const trackRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !trackRef.current) return;
      const track = trackRef.current;
      const width = track.scrollWidth / 2;

      const tween = gsap.to(track, {
        x: -width,
        duration: width / 45,
        ease: "none",
        repeat: -1,
      });

      return () => tween.kill();
    },
    { scope: trackRef }
  );

  const logos = [...CLIENTS, ...CLIENTS];

  return (
    <section aria-label="Klien kami" className="border-y border-border bg-surface py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-6 text-center text-xs text-muted">
          Dipercaya oleh brand &amp; organisasi
        </p>
      </div>
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center gap-16">
          {logos.map((client, i) => (
            <img
              key={`${client.name}-${i}`}
              src={client.logo}
              alt={client.name}
              className="h-10 w-auto flex-shrink-0 object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-14"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
