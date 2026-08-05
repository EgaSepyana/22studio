import { useRef } from "react";
import { Link } from "react-router-dom";
import { Home, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import MisprintGlyph from "../components/ui/MisprintGlyph";

const QUICK_LINKS = [
  { to: "/catalog", label: "Katalog", icon: ShoppingBag },
  { to: "/order", label: "Order", icon: Home },
  { to: "/lacak-order", label: "Lacak Pesanan", icon: Search },
  { to: "/#contact", label: "Kontak", icon: MessageCircle },
];

export default function NotFoundPage() {
  const scope = useRef(null);
  useScrollReveal(scope);

  return (
    <section ref={scope} className="flex min-h-[80vh] items-center py-28 md:py-36">
      <div className="mx-auto w-full max-w-xl px-6 text-center">
        <MisprintGlyph glyph="404" />

        <p data-reveal className="eyebrow mt-8 text-xs text-primary">
          Salah Cetak
        </p>
        <h1 data-reveal className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
          Halaman Ini Tidak Ketemu di Rak Kami
        </h1>
        <p data-reveal className="mx-auto mt-4 max-w-md text-lg text-muted">
          Sepertinya register warnanya meleset — halaman yang kamu cari sudah pindah, berganti alamat, atau memang
          belum pernah ada.
        </p>

        <div data-reveal className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>

        <div data-reveal className="mt-10 border-t border-border pt-8">
          <p className="eyebrow mb-4 text-xs text-muted">Atau Coba Ini</p>
          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
