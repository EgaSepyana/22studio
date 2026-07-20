import { Plus, Trash2 } from "lucide-react";
import { SIZES } from "../../data/orderOptions";

export default function NameNumberList({ enabled, onToggle, rows, onRowsChange, sizeQuantities }) {
  const addRow = () => onRowsChange([...rows, { size: SIZES[0], name: "", number: "" }]);
  const removeRow = (i) => onRowsChange(rows.filter((_, idx) => idx !== i));
  const updateRow = (i, patch) =>
    onRowsChange(rows.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));

  const generateFromSizes = () => {
    const generated = [];
    SIZES.forEach((size) => {
      const qty = Number(sizeQuantities[size]) || 0;
      for (let i = 0; i < qty; i++) generated.push({ size, name: "", number: "" });
    });
    onRowsChange(generated);
  };

  return (
    <div>
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
          className="h-5 w-5 accent-primary"
        />
        <span className="font-medium text-ink">
          Perlu nama / nomor punggung per pakaian? (mis. jersey kelas, tim)
        </span>
      </label>

      {enabled && (
        <div className="mt-4 space-y-3">
          {rows.length === 0 && (
            <button
              type="button"
              onClick={generateFromSizes}
              className="cursor-pointer rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Buat daftar otomatis dari jumlah ukuran
            </button>
          )}

          {rows.map((row, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-canvas p-3"
            >
              <select
                value={row.size}
                onChange={(e) => updateRow(i, { size: e.target.value })}
                aria-label={`Ukuran baris ${i + 1}`}
                className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-ink"
              >
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                placeholder="Nama"
                value={row.name}
                onChange={(e) => updateRow(i, { name: e.target.value })}
                className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-ink"
              />
              <input
                placeholder="Nomor"
                value={row.number}
                onChange={(e) => updateRow(i, { number: e.target.value })}
                className="w-20 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-ink"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                aria-label={`Hapus baris ${i + 1}`}
                className="cursor-pointer text-muted hover:text-primary"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {rows.length > 0 && (
            <button
              type="button"
              onClick={addRow}
              className="flex cursor-pointer items-center gap-1 text-sm font-medium text-primary"
            >
              <Plus className="h-4 w-4" /> Tambah baris
            </button>
          )}
        </div>
      )}
    </div>
  );
}
