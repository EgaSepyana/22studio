import { useState } from "react";
import { COLOR_CATEGORIES } from "../../data/catalogColors";

export default function ColorSwatchBrowser() {
  const [activeId, setActiveId] = useState("all");
  const categories = [{ id: "all", label: "Semua" }, ...COLOR_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))];
  const visible =
    activeId === "all" ? COLOR_CATEGORIES : COLOR_CATEGORIES.filter((c) => c.id === activeId);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveId(cat.id)}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeId === cat.id
                ? "border-primary bg-primary text-primary-ink"
                : "border-border bg-surface text-muted hover:border-primary/50 hover:text-ink"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-10">
        {visible.map((category) => (
          <div key={category.id}>
            <h3 className="eyebrow text-xs text-primary">{category.label}</h3>
            <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {category.colors.map((color) => (
                <div key={color.code} className="text-center">
                  <div
                    className="mx-auto h-14 w-14 rounded-lg shadow-sm ring-1 ring-black/10 dark:ring-white/10"
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  />
                  <p className="mt-2 text-xs font-medium leading-tight text-ink">{color.name}</p>
                  <p className="font-mono text-[10px] text-muted">#{color.code}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted">
        Warna di atas adalah representasi digital dari kain fisik dan bisa sedikit berbeda tergantung layar. Sebagian
        besar warna tersedia di Combed 24s &amp; 30s — varian Combed 16s/20s/40s tergantung ketersediaan stok.
        Hubungi kami untuk cek stok warna &amp; bahan terbaru.
      </p>
    </div>
  );
}
