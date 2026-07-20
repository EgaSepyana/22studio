import { FABRIC_ROWS, FABRIC_TYPES } from "../../data/catalog";

export default function FabricTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-40 bg-surface p-4 text-left font-display text-ink">Spesifikasi</th>
            {FABRIC_TYPES.map((fabric) => (
              <th
                key={fabric.name}
                className="border-l border-border bg-primary/10 p-4 text-left font-display font-bold text-ink"
              >
                {fabric.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FABRIC_ROWS.map((row, i) => (
            <tr key={row.key} className={i % 2 === 0 ? "bg-canvas" : "bg-surface"}>
              <th className="eyebrow p-4 text-left text-xs text-primary">{row.label}</th>
              {FABRIC_TYPES.map((fabric) => (
                <td key={fabric.name} className="border-l border-border p-4 align-top text-muted">
                  {fabric[row.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
