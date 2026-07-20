import { useEffect, useRef } from "react";
import { Send, CheckCircle2, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

const CONFETTI_COLORS = ["#6599FF", "#0F6F6B", "#E8A736", "#F2622E", "#171512"];

export default function SuccessModal({
  open,
  onClose,
  title = "Pesan Terkirim!",
  message = "Tim kami akan segera menghubungi Anda kembali.",
  infoText = "Pesan Anda sudah kami terima, dan salinan konfirmasi telah dikirim ke email Anda.",
  closeLabel = "Oke, Mengerti",
  children,
}) {
  const confettiRef = useRef(null);
  const planeRef = useRef(null);

  useGSAP(
    () => {
      if (!open) return;

      if (prefersReducedMotion()) return;

      // Paper plane flies off.
      if (planeRef.current) {
        gsap.fromTo(
          planeRef.current,
          { x: 0, y: 0, opacity: 0, rotate: 0 },
          { x: 140, y: -70, opacity: 1, rotate: 25, duration: 1.1, ease: "power1.out" }
        );
        gsap.to(planeRef.current, { opacity: 0, duration: 0.4, delay: 1.1 });
      }

      // Confetti burst.
      if (confettiRef.current) {
        const pieces = Array.from({ length: 40 }).map((_, i) => {
          const el = document.createElement("span");
          const size = 4 + Math.random() * 6;
          el.style.position = "absolute";
          el.style.top = "0";
          el.style.left = `${Math.random() * 100}%`;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
          el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
          confettiRef.current.appendChild(el);
          return el;
        });

        gsap.to(pieces, {
          y: () => 220 + Math.random() * 120,
          x: () => (Math.random() - 0.5) * 160,
          rotate: () => Math.random() * 360,
          opacity: 0,
          duration: () => 1.4 + Math.random(),
          delay: () => Math.random() * 0.3,
          ease: "power1.in",
          onComplete: () => pieces.forEach((p) => p.remove()),
        });
      }
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open && confettiRef.current) confettiRef.current.innerHTML = "";
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-surface shadow-2xl">
        <div ref={confettiRef} className="pointer-events-none absolute inset-0 overflow-hidden" />

        <div className="p-8 text-center">
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
            <span className="absolute h-20 w-20 animate-ping rounded-full bg-primary/10" />
            <Send className="relative z-10 h-10 w-10 text-primary" />
            <div ref={planeRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">
              <Send className="h-6 w-6" />
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
          <p className="mt-2 text-muted">{message}</p>

          {infoText && (
            <div className="mt-6 rounded-lg bg-primary/10 p-4 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm text-ink">{infoText}</p>
              </div>
            </div>
          )}

          {children && <div className="mt-4 space-y-3">{children}</div>}

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full cursor-pointer rounded-lg bg-primary py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5"
          >
            {closeLabel}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 cursor-pointer text-muted hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
