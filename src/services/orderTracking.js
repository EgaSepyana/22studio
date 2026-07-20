// Mock order-tracking service. Every export here simulates a network call
// (delay + resolve/reject) so the component layer already behaves like it's
// talking to a real backend. When the actual API exists, swap the bodies of
// these functions for real `fetch()` calls — keep the same function
// signatures and the pages/components won't need to change.

import { ORDERS } from "../data/trackingData";

const NETWORK_DELAY = 550;
const STORAGE_KEY = "22studio_mockup_decisions";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizePhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits.replace(/^0/, "").replace(/^62/, "");
}

function readOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeOverride(orderId, patch) {
  const overrides = readOverrides();
  overrides[orderId] = { ...overrides[orderId], ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

/** Merges a base dummy order with any locally-simulated state changes (e.g. mockup approval). */
function withOverrides(order) {
  if (!order) return order;
  const override = readOverrides()[order.orderId];
  if (!override) return order;

  const merged = { ...order, ...override };
  if (override.mockup) merged.mockup = { ...order.mockup, ...override.mockup };
  if (override.timeline) merged.timeline = [...order.timeline, ...override.timeline];
  return merged;
}

/** Looks up an order by order ID + WhatsApp number (the "Lacak Pemesanan" validation gate). */
export async function lookupOrder({ orderId, phone }) {
  await wait(NETWORK_DELAY);

  const id = String(orderId || "").trim().toUpperCase();
  const normalizedPhone = normalizePhone(phone);

  const order = ORDERS.find(
    (o) => o.orderId.toUpperCase() === id && normalizePhone(o.noWa) === normalizedPhone
  );

  if (!order) {
    const error = new Error("ORDER_NOT_FOUND");
    error.code = "ORDER_NOT_FOUND";
    throw error;
  }

  return withOverrides(order);
}

/** Fetches an order by ID alone — used by the direct-link status page (no re-auth, like courier tracking links). */
export async function getOrderById(orderId) {
  await wait(NETWORK_DELAY);
  const id = String(orderId || "").trim().toUpperCase();
  const order = ORDERS.find((o) => o.orderId.toUpperCase() === id);
  return order ? withOverrides(order) : null;
}

/** Simulates the customer approving or requesting revision on a mockup. */
export async function submitMockupDecision(orderId, decision) {
  await wait(NETWORK_DELAY);

  const base = ORDERS.find((o) => o.orderId === orderId);
  if (!base) throw new Error("ORDER_NOT_FOUND");

  const now = new Date();
  const timestamp = now.toISOString().slice(0, 16).replace("T", " ");

  if (decision === "approved") {
    writeOverride(orderId, {
      mockup: { status: "approved" },
      currentStage: "production",
      currentSubStage: "cutting",
      timeline: [
        { stage: "mockup_approval", note: "Mockup disetujui oleh customer.", timestamp },
        { stage: "production", subStage: "cutting", note: "Produksi dimulai — proses cutting.", timestamp },
      ],
    });
  } else {
    writeOverride(orderId, {
      mockup: { status: "revision_requested" },
      timeline: [
        { stage: "mockup_approval", note: "Customer meminta revisi mockup.", timestamp },
      ],
    });
  }

  return getOrderById(orderId);
}
