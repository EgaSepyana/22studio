import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { STEPS } from "../../data/content";

export default function HowToOrder() {
  const scope = useRef(null);
  useScrollReveal(scope, { stagger: 0.1 });

  return (
    <section id="how-to-start" ref={scope} className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="mb-16 text-center">
          <p className="eyebrow mb-3 text-xs text-primary">Alur Kerja</p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Cara <span className="text-primary">Order</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Lima tahap produksi, dari konsultasi awal sampai kaos sampai di tangan Anda.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <ol className="space-y-6">
            {STEPS.map((step) => (
              <li
                key={step.stage}
                data-reveal
                className="flex gap-5 rounded-xl border border-border bg-surface p-6 shadow-sm"
              >
                <span className="eyebrow flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm text-primary-ink">
                  {step.stage}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-1 text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div
          data-reveal
          className="mx-auto mt-16 max-w-3xl rounded-2xl bg-primary/10 p-8 text-center shadow-lg md:p-12"
        >
          <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">
            Siap Membuat Kaos Kustom Anda?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Baik Anda memerlukan 10 kaos atau 10.000 kaos, kami siap membantu mewujudkan visi Anda
            dengan pakaian khusus berkualitas premium.
          </p>
          <Link
            to="/order"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5"
          >
            Mulai Order Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}
