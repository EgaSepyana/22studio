export default function OptionCardGroup({ options, value, onChange, gridClassName = "grid-cols-2 sm:grid-cols-3" }) {
  return (
    <div className={`grid gap-3 ${gridClassName}`} role="radiogroup">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.id)}
            className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
              selected
                ? "border-primary bg-primary/10 text-ink"
                : "border-border bg-surface text-muted hover:border-primary/50 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
