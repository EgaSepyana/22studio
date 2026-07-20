// ⚠️ ILLUSTRATIVE PLACEHOLDER PRICING ⚠️
// Every Rupiah figure below is a rough placeholder for demo purposes —
// NOT 22Studio's real price list. Replace these with actual numbers
// before this estimator goes live to real customers. All figures live
// here so that update is a single-file edit.

export const BASE_PRICE_BY_GARMENT = {
  kaos: 45000,
  polo: 65000,
  jaket: 120000,
  kemeja: 75000,
  hoodie: 95000,
  lainnya: 50000,
};

export const FABRIC_SURCHARGE = {
  combed20s: 0,
  combed24s: 2000,
  combed30s: 0,
  lacoste: 8000,
  fleece: 10000,
  drill: 5000,
  lainnya: 0,
};

export const PRINT_SURCHARGE = {
  plastisol: 5000,
  rubber: 4000,
  discharge: 6000,
  dtf: 7000,
  polyflex: 5000,
  bordir: 12000,
  sublimasi: 8000,
};

export const NAME_NUMBER_SURCHARGE = 3000; // per pcs

// Highest qualifying tier wins — ordered highest minimum first.
export const QUANTITY_DISCOUNT_TIERS = [
  { min: 300, rate: 0.15 },
  { min: 100, rate: 0.1 },
  { min: 50, rate: 0.05 },
  { min: 0, rate: 0 },
];

export function estimateOrder({ garment, fabric, print, quantity, needsNameNumber }) {
  if (!garment || !fabric || !print || !quantity) return null;

  const base = BASE_PRICE_BY_GARMENT[garment] ?? 0;
  const fabricAdd = FABRIC_SURCHARGE[fabric] ?? 0;
  const printAdd = PRINT_SURCHARGE[print] ?? 0;
  const nameNumberAdd = needsNameNumber ? NAME_NUMBER_SURCHARGE : 0;

  const perPiece = base + fabricAdd + printAdd + nameNumberAdd;
  const tier = QUANTITY_DISCOUNT_TIERS.find((t) => quantity >= t.min);
  const discountRate = tier?.rate ?? 0;

  const subtotal = perPiece * quantity;
  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  return {
    perPiece,
    subtotal,
    discountRate,
    discount,
    total,
    low: Math.round((total * 0.92) / 1000) * 1000,
    high: Math.round((total * 1.08) / 1000) * 1000,
  };
}

export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
