import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, SearchX } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fetchOrderTimeline } from "../services/orderTracking";
import { decodeTrackingToken } from "../lib/trackingToken";
import { WA_LINK } from "../data/content";
import OrderSummaryCard from "../components/tracking/OrderSummaryCard";
import DesignApprovalCard from "../components/tracking/DesignApprovalCard";
import TrackingTimeline from "../components/tracking/TrackingTimeline";

export default function OrderStatusPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");
  const scope = useRef(null);
  useScrollReveal(scope);

  const [order, setOrder] = useState(null);
  // Whatever shape resolves the order: { noWa, invoiceId } for our own
  // locally-decoded tokens, or { t } forwarded as-is for real backend tokens
  // (e.g. an admin-shared tracking link) that we can't decode ourselves.
  const [credentials, setCredentials] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | found | not_found | invalid_link

  const load = useCallback(async () => {
    setStatus("loading");

    if (!token) {
      setStatus("invalid_link");
      return;
    }

    const decoded = await decodeTrackingToken(token);
    const resolved = decoded ? { noWa: decoded.noWa, invoiceId: decoded.invoiceId } : { t: token };
    setCredentials(resolved);

    try {
      const result = await fetchOrderTimeline(resolved);
      setOrder(result);
      setStatus("found");
    } catch {
      setStatus("not_found");
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  if (status === "loading") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center py-28">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  if (status === "not_found" || status === "invalid_link") {
    return (
      <section className="flex min-h-[70vh] items-center py-28">
        <div className="mx-auto max-w-md px-6 text-center">
          <SearchX className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">Pesanan Tidak Ditemukan</h1>
          <p className="mt-2 text-muted">
            {status === "invalid_link" ? (
              <>Link ini tidak valid atau sudah kedaluwarsa. Cari pesananmu lagi lewat form Lacak Pesanan.</>
            ) : credentials?.invoiceId ? (
              <>
                Nomor invoice <span className="font-mono">{credentials.invoiceId}</span> tidak cocok dengan nomor
                WhatsApp yang digunakan.
              </>
            ) : (
              <>Link ini tidak cocok dengan pesanan manapun di sistem kami.</>
            )}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/lacak-order"
              className="rounded-full bg-primary px-6 py-2.5 font-medium text-primary-ink transition-transform hover:-translate-y-0.5"
            >
              Coba Lagi
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-border px-6 py-2.5 font-medium text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={scope} className="py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <div data-reveal className="mb-8 text-center">
          <p className="eyebrow mb-3 text-xs text-primary">Status Pesanan</p>
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">Halo, {order.nama || "Pelanggan"}</h1>
        </div>

        <div data-reveal>
          <OrderSummaryCard order={order} />
        </div>

        {order.currentStage === "Belum Di Proses" && (
          <div className="mt-6">
            <DesignApprovalCard credentials={credentials} onApproved={load} />
          </div>
        )}

        <div data-reveal className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
          <h2 className="mb-8 font-display text-lg font-bold text-ink">Progres Produksi</h2>
          <TrackingTimeline order={order} />
        </div>

        <div data-reveal className="mt-8 text-center">
          <Link to="/lacak-order" className="text-sm font-medium text-primary hover:underline">
            Lacak pesanan lain
          </Link>
        </div>
      </div>
    </section>
  );
}
