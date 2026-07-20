import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

export default function ImageSlider({ slides, interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const slideRefs = useRef([]);
  const timerRef = useRef(null);

  const goTo = (next) => {
    const from = slideRefs.current[index];
    const to = slideRefs.current[next];
    if (!to) return;

    if (prefersReducedMotion()) {
      gsap.set(from, { autoAlpha: 0 });
      gsap.set(to, { autoAlpha: 1 });
    } else {
      gsap.to(from, { autoAlpha: 0, scale: 1.03, duration: 0.7, ease: "power2.inOut" });
      gsap.fromTo(
        to,
        { autoAlpha: 0, scale: 1.06 },
        { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power2.out" }
      );
    }
    setIndex(next);
  };

  const start = () => {
    stop();
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % slides.length;
        goTo(next);
        return prev;
      });
    }, interval);
  };
  const stop = () => timerRef.current && clearInterval(timerRef.current);

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 });
    });
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () => {
    goTo((index - 1 + slides.length) % slides.length);
    start();
  };
  const handleNext = () => {
    goTo((index + 1) % slides.length);
    start();
  };

  return (
    <div
      className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl md:h-[34rem]"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.alt}
          ref={(el) => (slideRefs.current[i] = el)}
          className="absolute inset-0"
        >
          <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.alt}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => {
              goTo(i);
              start();
            }}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handlePrev}
        aria-label="Sebelumnya"
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Berikutnya"
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
