import { Shirt, SprayCan, Scissors, Palette, Package, Check } from "lucide-react";

const ICONS = {
  shirt: Shirt,
  "spray-can": SprayCan,
  scissors: Scissors,
  palette: Palette,
  package: Package,
};

export default function ServiceCard({ icon, swatch, title, description, points }) {
  const Icon = ICONS[icon] ?? Shirt;

  return (
    <div
      data-reveal
      className="group rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: `color-mix(in srgb, var(${swatch}) 14%, transparent)` }}
      >
        <Icon className="h-6 w-6" style={{ color: `var(${swatch})` }} />
      </div>
      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>
      <ul className="mt-5 space-y-2">
        {points.map((point) => (
          <li key={point} className="flex items-center gap-2 text-sm text-ink">
            <Check className="h-4 w-4 flex-shrink-0" style={{ color: `var(${swatch})` }} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
