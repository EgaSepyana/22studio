import { useRef } from "react";
import { Quote } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCms } from "../../context/CmsContext";

export default function FoundersPromise() {
  const { foundersPromise } = useCms();
  const scope = useRef(null);
  useScrollReveal(scope);

  return (
    <section ref={scope} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div
          data-reveal
          className="rounded-2xl border border-border bg-surface p-8 shadow-lg md:p-12"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex justify-center md:w-1/3">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                <Quote className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="md:w-2/3 md:pl-6">
              <p className="eyebrow mb-3 text-xs text-primary">Janji Founder</p>
              <blockquote className="text-lg italic text-ink md:text-xl">
                &ldquo;{foundersPromise.quote}&rdquo;
              </blockquote>
              <div className="mt-6 font-display text-lg font-bold text-ink">
                {foundersPromise.name}
              </div>
              <div className="text-muted">{foundersPromise.role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
