// Stage model for the real public tracking API (see public_api.md).
// `id` is kept identical to the API's own `currentStage` / `stage` strings —
// no relabeling — so timeline entries can be matched directly with no
// translation layer to keep in sync.

export const STAGES = [
  { id: "Belum Di Proses", label: "Belum Di Proses", icon: "hourglass" },
  { id: "Desain Fix", label: "Desain Fix", icon: "file-check" },
  { id: "On Progress", label: "On Progress", icon: "package" },
  { id: "Done", label: "Done", icon: "circle-check-big" },
  { id: "Dikirim", label: "Dikirim", icon: "truck" },
  { id: "Di Ambil Costumer", label: "Di Ambil Costumer", icon: "store" },
];

export const STAGE_ORDER = STAGES.map((s) => s.id);

// Known production sub-stage icons. The API notes sub-stages can vary
// "depending on division", so this is a best-effort lookup with a fallback,
// not an exhaustive/authoritative list.
export const SUB_STAGE_ICONS = {
  Cutting: "scissors",
  Sewing: "shirt",
  Printing: "spray-can",
  QC: "badge-check",
};

/** "done" | "active" | "pending" for a top-level stage, given the order's current position. */
export function getStageStatus(order, stageId) {
  const current = STAGE_ORDER.indexOf(order.currentStage);
  const target = STAGE_ORDER.indexOf(stageId);
  if (current === -1 || target === -1) return "pending";
  if (target < current) return "done";
  if (target > current) return "pending";
  return "active";
}
