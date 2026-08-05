// Client for the public CMS content API — see public_api_cms.md. Content is
// cached in localStorage with a TTL so repeat visits (and re-renders across
// the session) don't re-hit the API — it's rate-limited to 120 req/min/IP,
// shared across every visitor behind the same IP (offices, campuses, etc).
//
// Fallback chain on any failure: fresh cache → stale cache → bundled static
// defaults (src/data/contentFallback.js). The static defaults are never
// written back to the cache, so the next load always retries the network
// rather than getting stuck on stale hardcoded content.

import { API_BASE_URL } from "./apiConfig";
import FALLBACK_CONTENT from "../data/contentFallback";

import gambar2 from "../assets/gambar2.jpg";
import gambar3 from "../assets/gambar3.jpg";
import gambar4 from "../assets/gambar4.jpg";
import gambar5 from "../assets/gambar5.jpg";
import jumbotron from "../assets/jumbotron.jpg";

const CACHE_KEY = "22studio_cms_content_v1";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const LEGACY_IMAGE_MAP = { "gambar2.jpg": gambar2, "gambar3.jpg": gambar3, "gambar4.jpg": gambar4, "gambar5.jpg": gambar5, "jumbotron.jpg": jumbotron };
const isAbsoluteUrl = (value) => typeof value === "string" && /^(https?:)?\/\//.test(value);

/**
 * Defensive patch for CMS data that hasn't caught up with the documented
 * contract yet — as of writing, `heroSlides[].image` sometimes still comes
 * back as a bare legacy filename ("gambar2.jpg") instead of the full URL
 * public_api_cms.md promises. Resolves those against bundled local assets
 * so the page doesn't show broken images; warns so it's easy to notice once
 * the CMS content is fixed and this shim can be deleted.
 */
function normalizeContent(data) {
  if (!data?.heroSlides?.some((s) => !isAbsoluteUrl(s.image))) return data;

  console.warn(
    "CMS heroSlides[].image contains non-URL values (expected full URLs per public_api_cms.md) — using bundled local images for those slides until the CMS content is updated."
  );
  return {
    ...data,
    heroSlides: data.heroSlides.map((s) => ({
      ...s,
      image: isAbsoluteUrl(s.image) ? s.image : LEGACY_IMAGE_MAP[s.image] || s.image,
    })),
  };
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, cachedAt: Date.now() }));
  } catch {
    // localStorage unavailable (private mode, quota, etc) — fine, just skip caching.
  }
}

/** Synchronous peek at a still-fresh cache entry, or null. Used for instant first paint. */
export function getFreshCachedContent() {
  const cached = readCache();
  if (!cached) return null;
  return Date.now() - cached.cachedAt < CACHE_TTL_MS ? cached.data : null;
}

/**
 * Resolves to the landing page content — fresh cache, a live fetch, stale
 * cache, or the bundled static fallback, in that order. Never rejects.
 */
export async function fetchCmsContent() {
  const fresh = getFreshCachedContent();
  if (fresh) return fresh;

  try {
    const res = await fetch(`${API_BASE_URL}/cms/content`);
    const body = await res.json();
    if (!res.ok || !body?.success) throw new Error(body?.message || `CMS fetch failed: ${res.status}`);
    const data = normalizeContent(body.data);
    writeCache(data);
    return data;
  } catch (err) {
    const stale = readCache();
    if (stale) {
      console.warn("CMS fetch failed, serving stale cache:", err);
      return stale.data;
    }
    console.warn("CMS fetch failed, no cache available — using bundled fallback content:", err);
    return FALLBACK_CONTENT;
  }
}
