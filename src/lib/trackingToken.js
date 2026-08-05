// Packs { invoiceId, noWa } into a single opaque, HMAC-signed token so the
// tracking status URL doesn't show the customer's phone number/invoice in
// plain text — used as the `t` query param on /lacak-order/status.
//
// IMPORTANT: this is our OWN local scheme, separate from the real signed
// tokens the backend mints via its admin-only tracking-link endpoint (see
// public_api.md, "Where the tracking link/token comes from"). Those use a
// server-side secret we never have access to, so we can neither generate
// nor verify a real one — we only decode tokens WE created ourselves, for
// the self-service "Lacak Pemesanan" search form. A real backend token
// simply won't decode here (wrong secret) and must be forwarded to the API
// as-is instead — see the fallback logic in OrderStatusPage.
//
// This is NOT real access control either way: the secret key ships in the
// client JS bundle (inspectable by anyone), and the underlying public API is
// already unauthenticated by design (see public_api.md — knowing noWa +
// invoiceId together is itself the "credential"). The signature only guards
// against casually hand-editing our own tokens in the URL bar.

const SECRET_KEY = "Rahasia@22";

function toBase64Url(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}

async function getHmacKey() {
  const keyData = new TextEncoder().encode(SECRET_KEY);
  return crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

async function sign(payload) {
  const key = await getHmacKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(signatureBuffer));
}

export async function encodeTrackingToken({ invoiceId, noWa }) {
  const payload = toBase64Url(new TextEncoder().encode(JSON.stringify({ i: invoiceId, w: noWa })));
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

/** Returns { invoiceId, noWa } or null if the token is malformed/tampered. */
export async function decodeTrackingToken(token) {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");

  try {
    const expectedSignature = await sign(payload);
    if (expectedSignature !== signature) return null;

    const { i, w } = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)));
    if (!i || !w) return null;
    return { invoiceId: i, noWa: w };
  } catch {
    return null;
  }
}
