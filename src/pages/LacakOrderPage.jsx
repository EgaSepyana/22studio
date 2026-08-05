import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2, TriangleAlert } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { fetchOrderTimeline } from "../services/orderTracking";
import { encodeTrackingToken } from "../lib/trackingToken";
import { useCms } from "../context/CmsContext";

export default function LacakOrderPage() {
  const { waLink } = useCms();
  const scope = useRef(null);
  useScrollReveal(scope);
  const navigate = useNavigate();

  const [invoiceId, setInvoiceId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const order = await fetchOrderTimeline({ noWa: phone, invoiceId });
      const token = await encodeTrackingToken({ invoiceId: order.orderId, noWa: phone });
      navigate(`/lacak-order/status?t=${encodeURIComponent(token)}`);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err.status === 429
          ? err.message
          : "Nomor pesanan atau nomor WhatsApp tidak cocok dengan data kami. Periksa kembali, atau hubungi tim kami."
      );
      return;
    }
    setStatus("idle");
  };

  return (
    <section ref={scope} className="flex min-h-[70vh] items-center py-28 md:py-36">
      <div className="mx-auto w-full max-w-xl px-6">
        <div data-reveal className="text-center">
          <p className="eyebrow mb-3 text-xs text-primary">Lacak Pemesanan</p>
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">Cek Status Pesananmu</h1>
          <p className="mt-4 text-lg text-muted">
            Masukkan nomor invoice dan nomor WhatsApp yang kamu daftarkan saat order untuk melihat progres
            produksinya secara real-time.
          </p>
        </div>

        <form data-reveal onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="invoiceId" className="mb-2 block font-medium text-ink">
              Nomor Invoice
            </label>
            <input
              id="invoiceId"
              type="text"
              required
              placeholder="Contoh: INV-20260805-021"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              className="w-full rounded-lg border border-border bg-canvas px-4 py-3 font-mono uppercase text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block font-medium text-ink">
              Nomor WhatsApp
            </label>
            <input
              id="phone"
              type="text"
              required
              placeholder="08xxxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {status === "error" && (
            <div role="alert" className="flex items-start gap-2 rounded-lg bg-primary/10 p-4 text-sm text-primary">
              <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                {errorMsg}{" "}
                <a href={waLink} target="_blank" rel="noreferrer" className="font-medium underline">
                  Hubungi via WhatsApp
                </a>
                .
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {status === "loading" ? "Mencari..." : "Lacak Pesanan"}
          </button>
        </form>
      </div>
    </section>
  );
}
