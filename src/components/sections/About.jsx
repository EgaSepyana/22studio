import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import gambar1 from "../../assets/gambar1.jpg";

const POINTS = [
  "Bahan Berkualitas Premium",
  "Tinta Ramah Lingkungan",
  "Perputaran Cepat",
  "Layanan Desain Kustom",
];

export default function About() {
  const scope = useRef(null);
  useScrollReveal(scope);

  return (
    <section id="about" ref={scope} className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="mb-16 text-center">
          <p className="eyebrow mb-3 text-xs text-primary">Tentang Kami</p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Satu Atap, <span className="text-primary">Semua Proses</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div data-reveal className="md:w-1/2">
            <img
              src={gambar1}
              alt="Workshop produksi 22Studio"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 data-reveal className="font-display text-2xl font-bold text-ink md:text-3xl">
              Our <span className="text-secondary">Story</span>
            </h3>
            <p data-reveal className="mt-6 text-muted">
              22Studio berdiri sejak 2015, dimulai dari tiga mesin jahit dan semangat untuk terus
              berkembang. Dari yang awalnya mengandalkan sablon makloon, kini kami mengerjakan
              semua proses produksi mulai dari cutting kain, sablon, jahit, QC hingga finishing di
              bawah satu atap. Dengan tiga lini produksi aktif, kami berkomitmen menghadirkan
              kualitas terbaik secara efisien dan konsisten.
            </p>
            <p data-reveal className="mt-4 text-muted">
              Yang membedakan kami adalah komitmen kami terhadap kualitas dan kepuasan pelanggan.
              Setiap kaos yang kami cetak menjalani pemeriksaan kualitas yang ketat untuk
              memastikannya memenuhi standar tinggi kami.
            </p>
            <div data-reveal className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {POINTS.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-secondary" />
                  <span className="text-sm text-ink">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
