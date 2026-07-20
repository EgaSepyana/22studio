import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { HERO_SLIDES, HERO_STATS } from "../../data/content";
import InkSwatchStrip from "../ui/InkSwatchStrip";
import ImageSlider from "../ui/ImageSlider";

import gambar2 from "../../assets/gambar2.jpg";
import gambar3 from "../../assets/gambar3.jpg";
import gambar4 from "../../assets/gambar4.jpg";
import gambar5 from "../../assets/gambar5.jpg";
import jumbotron from "../../assets/jumbotron.jpg";

const IMAGE_MAP = {
  "gambar2.jpg": gambar2,
  "gambar3.jpg": gambar3,
  "gambar4.jpg": gambar4,
  "gambar5.jpg": gambar5,
  "jumbotron.jpg": jumbotron,
};

const slides = HERO_SLIDES.map((s) => ({ src: IMAGE_MAP[s.image], alt: s.alt }));

export default function Hero() {
  const scope = useRef(null);
  useScrollReveal(scope, { y: 24, start: "top 95%" });

  return (
    <header id="hero" ref={scope} className="scroll-mt-20 pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="md:w-1/2">
            <p data-reveal className="eyebrow mb-4 text-xs text-primary">
              Sablon &amp; Konveksi — Est. 2015, Bandung
            </p>
            <h1
              data-reveal
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl"
            >
              Custom T-Shirts That <span className="text-primary">Tell Your Story</span>
            </h1>
            <div data-reveal>
              <InkSwatchStrip className="my-6" />
            </div>
            <p data-reveal className="max-w-md text-lg text-muted md:text-xl">
              Dari konsep hingga kreasi, kami mewujudkan ide Anda dengan kaos oblong berkualitas
              premium — cutting, sablon, jahit, QC, dan finishing di bawah satu atap.
            </p>

            <div data-reveal className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/order"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5"
              >
                Mulai Order
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#projects"
                className="rounded-full border-2 border-primary px-8 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-ink"
              >
                Lihat Portofolio
              </a>
            </div>

            <div data-reveal className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-ink md:text-3xl">
                    {stat.value}
                  </div>
                  <p className="eyebrow mt-1 text-[10px] text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="w-full md:w-1/2">
            <ImageSlider slides={slides} />
          </div>
        </div>
      </div>
    </header>
  );
}
