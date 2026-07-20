import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { NAV_LINKS } from "../../data/content";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = useLocation().pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLink = ({ link, className, onClick }) =>
    isHome ? (
      <a href={link.href} onClick={onClick} className={className}>
        {link.label}
      </a>
    ) : (
      <Link to={`/${link.href}`} onClick={onClick} className={className}>
        {link.label}
      </Link>
    );

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 border-b border-transparent bg-canvas/90 backdrop-blur transition-all duration-300 ${scrolled ? "border-border py-2 shadow-md" : "py-4"
        }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <img src="/logo.svg" alt="" className="h-9 w-9" /><span>22 <span className="text-primary">Studio</span></span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              className="group relative font-medium text-ink/80 transition-colors hover:text-ink"
            />
          ))}
          <Link to="/catalog" className="font-medium text-ink/80 transition-colors hover:text-ink">
            Katalog
          </Link>
          <Link
            to="/lacak-order"
            aria-label="Lacak Pesanan"
            title="Lacak Pesanan"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <Link
            to="/order"
            className="rounded-full bg-primary px-5 py-2 font-medium text-primary-ink transition-transform hover:-translate-y-0.5"
          >
            Order
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="cursor-pointer p-2 text-ink"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-canvas transition-[max-height] duration-300 ease-in-out md:hidden ${open ? "max-h-96" : "max-h-0"
          }`}
      >
        <div className="flex flex-col gap-1 px-6 pb-4 pt-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              onClick={() => setOpen(false)}
              className="py-2 font-medium text-ink/80"
            />
          ))}
          <Link to="/catalog" onClick={() => setOpen(false)} className="py-2 font-medium text-ink/80">
            Katalog
          </Link>
          <Link to="/lacak-order" onClick={() => setOpen(false)} className="py-2 font-medium text-ink/80">
            Lacak Pesanan
          </Link>
          <Link
            to="/order"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center font-medium text-primary-ink"
          >
            Order
          </Link>
        </div>
      </div>
    </nav>
  );
}
