// Dummy production-tracking data. Replace `ORDERS` (and the persistence
// inside src/services/orderTracking.js) with real API calls once the
// backend is ready — the component layer only depends on the shapes
// defined here, not on this data being hard-coded.

export const STAGES = [
  { id: "design_queue", label: "Antrian Desain", icon: "pen-tool" },
  { id: "mockup_approval", label: "Persetujuan Mockup", icon: "eye" },
  {
    id: "production",
    label: "Proses Produksi",
    icon: "package",
    subStages: [
      { id: "cutting", label: "Cutting", icon: "scissors" },
      { id: "printing", label: "Sablon / Bordir", icon: "spray-can" },
      { id: "sewing", label: "Penjahitan", icon: "shirt" },
      { id: "qc", label: "Quality Control (QC)", icon: "badge-check" },
    ],
  },
  { id: "finishing", label: "Finishing & Packing", icon: "package-check" },
  { id: "ready", label: "Siap Diambil / Dikirim", icon: "truck" },
];

export const STAGE_ORDER = STAGES.map((s) => s.id);
export const SUB_STAGE_ORDER = STAGES.find((s) => s.id === "production").subStages.map((s) => s.id);

/** "done" | "active" | "pending" for a top-level stage, given the order's current position. */
export function getStageStatus(order, stageId) {
  const current = STAGE_ORDER.indexOf(order.currentStage);
  const target = STAGE_ORDER.indexOf(stageId);
  if (target < current) return "done";
  if (target > current) return "pending";
  return "active";
}

/** "done" | "active" | "pending" for a production sub-stage. */
export function getSubStageStatus(order, subStageId) {
  const productionIndex = STAGE_ORDER.indexOf("production");
  const current = STAGE_ORDER.indexOf(order.currentStage);
  if (current > productionIndex) return "done";
  if (current < productionIndex) return "pending";

  const currentSub = SUB_STAGE_ORDER.indexOf(order.currentSubStage);
  const target = SUB_STAGE_ORDER.indexOf(subStageId);
  if (target < currentSub) return "done";
  if (target > currentSub) return "pending";
  return "active";
}

export const ORDERS = [
  {
    orderId: "22ST-2507-A1B2",
    nama: "Rina Wijaya",
    noWa: "081234567801",
    item: "Kaos Basic Combed 30s — Sablon Plastisol",
    qty: 24,
    createdAt: "2025-07-10",
    estimatedReady: "2025-07-24",
    currentStage: "design_queue",
    currentSubStage: null,
    mockup: null,
    timeline: [
      { stage: "design_queue", note: "Pesanan diterima, menunggu antrian desain.", timestamp: "2025-07-10 09:15" },
    ],
  },
  {
    orderId: "22ST-2507-C3D4",
    nama: "Budi Santoso",
    noWa: "081234567802",
    item: "Kaos Oversized Combed 24s — DTF",
    qty: 45,
    createdAt: "2025-07-08",
    estimatedReady: "2025-07-22",
    currentStage: "mockup_approval",
    currentSubStage: null,
    mockup: {
      status: "pending", // pending | approved | revision_requested
      image: "gambar2.jpg",
      note: "Mockup depan & belakang sudah siap direview.",
    },
    timeline: [
      { stage: "design_queue", note: "Desain dikerjakan oleh tim kreatif.", timestamp: "2025-07-08 10:00" },
      { stage: "mockup_approval", note: "Mockup dikirim, menunggu persetujuan kamu.", timestamp: "2025-07-11 14:30" },
    ],
  },
  {
    orderId: "22ST-2507-E5F6",
    nama: "Sari Amalia",
    noWa: "081234567803",
    item: "Kaos Basic Combed 30s — Sablon Rubber",
    qty: 60,
    createdAt: "2025-07-01",
    estimatedReady: "2025-07-15",
    currentStage: "production",
    currentSubStage: "cutting",
    mockup: { status: "approved", image: "gambar3.jpg", note: "Mockup disetujui." },
    timeline: [
      { stage: "design_queue", note: "Desain selesai.", timestamp: "2025-07-01 09:00" },
      { stage: "mockup_approval", note: "Mockup disetujui oleh customer.", timestamp: "2025-07-03 11:20" },
      { stage: "production", subStage: "cutting", note: "Kain sedang dipotong sesuai pola.", timestamp: "2025-07-12 08:45" },
    ],
  },
  {
    orderId: "22ST-2507-G7H8",
    nama: "Dedi Kurniawan",
    noWa: "081234567804",
    item: "Polo Shirt Combed 20s — Bordir Komputer",
    qty: 30,
    createdAt: "2025-06-28",
    estimatedReady: "2025-07-14",
    currentStage: "production",
    currentSubStage: "qc",
    mockup: { status: "approved", image: "gambar4.jpg", note: "Mockup disetujui." },
    timeline: [
      { stage: "design_queue", note: "Desain selesai.", timestamp: "2025-06-28 09:00" },
      { stage: "mockup_approval", note: "Mockup disetujui oleh customer.", timestamp: "2025-06-30 10:00" },
      { stage: "production", subStage: "cutting", note: "Cutting selesai.", timestamp: "2025-07-02 09:00" },
      { stage: "production", subStage: "printing", note: "Bordir logo selesai.", timestamp: "2025-07-05 13:00" },
      { stage: "production", subStage: "sewing", note: "Penjahitan selesai.", timestamp: "2025-07-09 16:00" },
      { stage: "production", subStage: "qc", note: "Sedang pemeriksaan kualitas jahitan & bordir.", timestamp: "2025-07-12 10:00" },
    ],
  },
  {
    orderId: "22ST-2507-I9J0",
    nama: "Umar Fauzi",
    noWa: "081234567805",
    item: "Hoodie Fleece — Sablon DTF",
    qty: 20,
    createdAt: "2025-06-20",
    estimatedReady: "2025-07-08",
    currentStage: "finishing",
    currentSubStage: null,
    mockup: { status: "approved", image: "gambar5.jpg", note: "Mockup disetujui." },
    timeline: [
      { stage: "design_queue", note: "Desain selesai.", timestamp: "2025-06-20 09:00" },
      { stage: "mockup_approval", note: "Mockup disetujui oleh customer.", timestamp: "2025-06-22 09:30" },
      { stage: "production", subStage: "cutting", note: "Cutting selesai.", timestamp: "2025-06-24 09:00" },
      { stage: "production", subStage: "printing", note: "Sablon DTF selesai.", timestamp: "2025-06-27 13:00" },
      { stage: "production", subStage: "sewing", note: "Penjahitan selesai.", timestamp: "2025-07-01 16:00" },
      { stage: "production", subStage: "qc", note: "Lolos QC.", timestamp: "2025-07-03 10:00" },
      { stage: "finishing", note: "Proses setrika, lipat, dan packing.", timestamp: "2025-07-05 09:00" },
    ],
  },
  {
    orderId: "22ST-2507-K1L2",
    nama: "Lestari Putri",
    noWa: "081234567806",
    item: "Kaos Basic Combed 30s — Sablon Plastisol",
    qty: 12,
    createdAt: "2025-06-15",
    estimatedReady: "2025-07-01",
    currentStage: "ready",
    currentSubStage: null,
    mockup: { status: "approved", image: "jumbotron.jpg", note: "Mockup disetujui." },
    shipping: { method: "JNE REG", resi: "JNE0123456789", note: "Paket sudah diserahkan ke kurir." },
    timeline: [
      { stage: "design_queue", note: "Desain selesai.", timestamp: "2025-06-15 09:00" },
      { stage: "mockup_approval", note: "Mockup disetujui oleh customer.", timestamp: "2025-06-16 09:30" },
      { stage: "production", subStage: "cutting", note: "Cutting selesai.", timestamp: "2025-06-18 09:00" },
      { stage: "production", subStage: "printing", note: "Sablon selesai.", timestamp: "2025-06-20 13:00" },
      { stage: "production", subStage: "sewing", note: "Penjahitan selesai.", timestamp: "2025-06-23 16:00" },
      { stage: "production", subStage: "qc", note: "Lolos QC.", timestamp: "2025-06-24 10:00" },
      { stage: "finishing", note: "Packing selesai.", timestamp: "2025-06-26 09:00" },
      { stage: "ready", note: "Paket dikirim via JNE REG.", timestamp: "2025-06-27 14:00" },
    ],
  },
];
