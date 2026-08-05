import { useRef, useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCms } from "../../context/CmsContext";
import AccordionItem from "../ui/AccordionItem";

export default function FAQ() {
  const { faqs, waLink } = useCms();
  const scope = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  useScrollReveal(scope, { stagger: 0.04 });

  return (
    <section ref={scope} className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="mb-16 text-center">
          <p className="eyebrow mb-3 text-xs text-primary">FAQ</p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Pertanyaan <span className="text-primary">yang Sering Diajukan</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Temukan jawaban atas pertanyaan umum tentang produk dan layanan kami.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={faq.q} data-reveal>
              <AccordionItem
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </div>
          ))}

          <div data-reveal className="pt-6 text-center">
            <p className="mb-6 text-muted">Masih ada pertanyaan? Kami siap membantu!</p>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-primary px-8 py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
