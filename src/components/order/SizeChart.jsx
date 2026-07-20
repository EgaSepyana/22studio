import { SIZES } from "../../data/orderOptions";

export default function SizeChart({ value, onChange }) {
  const total = Object.values(value).reduce((sum, n) => sum + (Number(n) || 0), 0);

  const setQty = (size, qty) => {
    const n = Math.max(0, Math.floor(Number(qty) || 0));
    onChange({ ...value, [size]: n });
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {SIZES.map((size) => (
          <div key={size}>
            <label htmlFor={`size-${size}`} className="eyebrow mb-1 block text-xs text-muted">
              {size}
            </label>
            <input
              id={`size-${size}`}
              type="number"
              min="0"
              inputMode="numeric"
              value={value[size] || ""}
              onChange={(e) => setQty(size, e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-center font-mono text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        ))}
      </div>
      <p className="eyebrow mt-4 text-xs text-muted">
        Total: <span className="font-mono text-sm text-ink">{total} pcs</span>
      </p>
    </div>
  );
}
