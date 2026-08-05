// Client for the real public order-tracking API — see public_api.md.
// Every order is identified by EITHER a signed `t` token OR a raw
// `{ noWa, invoiceId }` pair — both endpoints accept whichever is passed in.
// Every function here returns the API's `data` payload on success and
// throws an Error (with a user-facing `.message`) on failure.

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://22studio-payroll-system.vercel.app/api/public";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function parseResponse(res) {
  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok || !body?.success) {
    if (res.status === 429) {
      throw new ApiError("Terlalu banyak percobaan. Coba lagi dalam beberapa saat.", 429);
    }
    throw new ApiError(body?.message || "Terjadi kesalahan. Coba lagi.", res.status);
  }

  return body.data;
}

/**
 * GET /order-timeline — fetches an order's full production timeline.
 * @param {{ t: string } | { noWa: string, invoiceId: string }} credentials
 */
export async function fetchOrderTimeline(credentials) {
  const params = new URLSearchParams(credentials);
  const res = await fetch(`${API_BASE_URL}/order-timeline?${params.toString()}`);
  return parseResponse(res);
}

/**
 * POST /orders/design/approve — approves the design, moving Belum Di Proses → Desain Fix.
 * @param {({ t: string } | { noWa: string, invoiceId: string }) & { note?: string }} credentials
 */
export async function approveDesign(credentials) {
  const res = await fetch(`${API_BASE_URL}/orders/design/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return parseResponse(res);
}
