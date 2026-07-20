import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { SERVICES } from "../../data/content";
import ServiceCard from "../ui/ServiceCard";

export default function Services() {
  const scope = useRef(null);
  useScrollReveal(scope, { stagger: 0.06 });

  return (
    <section id="services" ref={scope} className="scroll-mt-20 bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="mb-16 text-center">
          <p className="eyebrow mb-3 text-xs text-primary">Layanan</p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Setiap Warna, <span className="text-primary">Setiap Teknik</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Kami menawarkan berbagai teknik pencetakan yang komprehensif untuk mewujudkan visi
            Anda pada kain.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
