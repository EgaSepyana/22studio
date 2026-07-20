import { Link, useLocation } from "react-router-dom";
import { Send } from "lucide-react";
import { NAV_LINKS, SERVICES, CONTACT_INFO } from "../../data/content";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "../ui/BrandIcons";

export default function Footer() {
  const isHome = useLocation().pathname === "/";

  const HashLink = ({ href, children }) =>
    isHome ? (
      <a href={href} className="text-white/60 transition-colors hover:text-white">
        {children}
      </a>
    ) : (
      <Link to={`/${href}`} className="text-white/60 transition-colors hover:text-white">
        {children}
      </Link>
    );

  return (
    <footer className="bg-[#171512] py-14 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-2xl font-bold text-white">
              22<span className="text-primary">Studio</span>
            </Link>
            <p className="mt-4 text-white/60">
              Sablon &amp; konveksi kustom premium untuk bisnis, organisasi, dan individu di Bandung.
            </p>
            <div className="mt-5 flex gap-3">
              {[FacebookIcon, InstagramIcon, TikTokIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Media sosial 22Studio"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">Navigasi</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <HashLink href={link.href}>{link.label}</HashLink>
                </li>
              ))}
              <li>
                <Link to="/catalog" className="text-white/60 transition-colors hover:text-white">
                  Katalog
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-white/60 transition-colors hover:text-white">
                  Form Pesanan
                </Link>
              </li>
              <li>
                <Link to="/lacak-order" className="text-white/60 transition-colors hover:text-white">
                  Lacak Pesanan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">Layanan</h3>
            <ul className="mt-4 space-y-2">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <HashLink href="#services">{s.title}</HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold">Newsletter</h3>
            <p className="mt-4 text-white/60">
              Dapatkan info promo &amp; update produksi terbaru dari 22Studio.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-lg"
            >
              <input
                type="email"
                required
                placeholder="Email kamu"
                className="w-full bg-white px-4 py-2.5 text-sm text-ink focus:outline-none"
              />
              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center bg-primary px-4 text-primary-ink"
                aria-label="Berlangganan"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} 22Studio. All rights reserved.</p>
          <p>{CONTACT_INFO.email}</p>
        </div>
      </div>
    </footer>
  );
}
