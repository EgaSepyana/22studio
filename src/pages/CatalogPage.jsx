import { useRef } from "react";
import { Link } from "react-router-dom";
import { Layers, Ruler, Download } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { GARMENT_STYLES, PRINT_TECHNIQUES, PRINT_AREAS } from "../data/catalog";
import PrintTechniqueCard from "../components/catalog/PrintTechniqueCard";
import FabricTable from "../components/catalog/FabricTable";
import ColorSwatchBrowser from "../components/catalog/ColorSwatchBrowser";

import processStrip from "../assets/catalog/process-strip.jpg";
import fabricStrip from "../assets/catalog/fabric-strip.jpg";
import plastisol from "../assets/catalog/plastisol.jpg";
import rubber from "../assets/catalog/rubber.jpg";
import discharge from "../assets/catalog/discharge.jpg";
import higdensity from "../assets/catalog/higdensity.jpg";
import glow from "../assets/catalog/glow.jpg";
import dtf from "../assets/catalog/dtf.jpg";

const TECHNIQUE_IMAGES = { "plastisol.jpg": plastisol, "rubber.jpg": rubber, "discharge.jpg": discharge, "higdensity.jpg": higdensity, "glow.jpg": glow, "dtf.jpg": dtf };

const TABS = [
  { href: "#jenis-kaos", label: "Jenis Kaos" },
  { href: "#jenis-sablon", label: "Jenis Sablon" },
  { href: "#jenis-kain", label: "Jenis Kain" },
  { href: "#area-cetak", label: "Area Cetak" },
  { href: "#kategori-warna", label: "Kategori Warna" },
];

const CATALOG_PDF = encodeURI("/Katalog 22studio new 2025- Kaos.pdf");

export default function CatalogPage() {
  const scope = useRef(null);
  useScrollReveal(scope);

  return (
    <div ref={scope}>
      <header className="pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-6xl px-6">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow mb-3 text-xs text-primary">Katalog &amp; Spesifikasi</p>
            <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">
              Jenis Kaos, <span className="text-primary">Sablon</span> &amp; Bahan
            </h1>
            <p className="mt-4 text-lg text-muted">
              Kami mengerjakan semua proses produksi mulai dari cutting kain, sablon, jahit, QC hingga finishing
              di bawah satu atap — kenali dulu spesifikasi produknya sebelum order.
            </p>

            <a
              href={CATALOG_PDF}
              download
              className="group mt-6 inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-2.5 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-ink"
            >
              <Download className="h-4 w-4" />
              Unduh Katalog PDF
            </a>
          </div>

          <div data-reveal className="mt-8 overflow-x-auto">
            <div className="flex w-max gap-2 rounded-full border border-border bg-surface p-1.5">
              {TABS.map((tab) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-primary/10 hover:text-ink"
                >
                  {tab.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div data-reveal className="mt-10">
          <img src={processStrip} alt="Proses produksi 22Studio: cutting, sablon, dan jahit" className="h-48 w-full object-cover md:h-64" />
        </div>
      </header>

      <section id="jenis-kaos" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-reveal className="mb-12 text-center">
            <p className="eyebrow mb-3 text-xs text-primary">Jenis Kaos</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Pilih Potongan Kaosnya</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GARMENT_STYLES.map((style) => (
              <div
                key={style.name}
                data-reveal
                className="rounded-2xl border border-border bg-surface p-8 shadow-sm"
              >
                <Layers className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{style.name}</h3>
                <p className="mt-2 text-muted">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jenis-sablon" className="scroll-mt-20 bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-reveal className="mb-12 text-center">
            <p className="eyebrow mb-3 text-xs text-primary">Jenis Sablon &amp; Bordir</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Teknik Cetak yang Kami Kuasai</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Setiap teknik punya karakter, kelebihan, dan keterbatasannya sendiri — pilih sesuai desain dan budget.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRINT_TECHNIQUES.map((tech) => (
              <PrintTechniqueCard key={tech.id} {...tech} imageSrc={TECHNIQUE_IMAGES[tech.image]} />
            ))}
          </div>
        </div>
      </section>

      <section id="jenis-kain" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-reveal className="mb-12 text-center">
            <p className="eyebrow mb-3 text-xs text-primary">Jenis Kain</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Bandingkan Ketebalan Bahan</h2>
          </div>
          <div data-reveal className="mb-10 overflow-hidden rounded-2xl">
            <img src={fabricStrip} alt="Perbandingan tekstur kain combed dan proses cutting" className="h-40 w-full object-cover md:h-52" />
          </div>
          <div data-reveal>
            <FabricTable />
          </div>
        </div>
      </section>

      <section id="area-cetak" className="scroll-mt-20 bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-reveal className="mb-12 text-center">
            <p className="eyebrow mb-3 text-xs text-primary">Area Cetak</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Ukuran &amp; Posisi Sablon</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Semakin besar area cetak dan semakin banyak posisi (depan-belakang), semakin tinggi biaya produksinya.
              Hubungi kami untuk penawaran harga sesuai kombinasi yang kamu pilih.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PRINT_AREAS.map((tier) => (
              <div
                key={tier.tier}
                data-reveal
                className="rounded-2xl border border-border bg-canvas p-6 text-center shadow-sm"
              >
                <Ruler className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 font-display text-lg font-bold text-ink">{tier.tier}</p>
                <p className="font-mono text-xs text-muted">{tier.area}</p>
                <ul className="mt-4 space-y-1 text-left text-xs text-muted">
                  {tier.variants.map((v) => (
                    <li key={v}>• {v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kategori-warna" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div data-reveal className="mb-12 text-center">
            <p className="eyebrow mb-3 text-xs text-primary">Kategori Warna</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Katun Combed</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              88 pilihan warna kain, dikelompokkan berdasarkan tone: Muda, Sedang, Tua, Putih, dan Hitam &amp; Netral
              Khusus.
            </p>
          </div>
          <div data-reveal>
            <ColorSwatchBrowser />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div
            data-reveal
            className="rounded-2xl bg-primary/10 p-8 text-center shadow-lg md:p-12"
          >
            <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">Sudah Menentukan Spesifikasinya?</h3>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Lanjutkan ke form pemesanan untuk melihat estimasi harga dan mengirim detail pesananmu.
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
    </div>
  );
}
