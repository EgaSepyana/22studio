import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2, TriangleAlert } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { lookupOrder } from "../services/orderTracking";
import { WA_LINK } from "../data/content";

export default function LacakOrderPage() {
  const scope = useRef(null);
  useScrollReveal(scope);
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const order = await lookupOrder({ orderId, phone });
      navigate(`/lacak-order/status/${order.orderId}`);
    } catch {
      setStatus("error");
      setErrorMsg(
        "Nomor pesanan atau nomor WhatsApp tidak cocok dengan data kami. Periksa kembali, atau hubungi tim kami."
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
            Masukkan nomor pesanan dan nomor WhatsApp yang kamu daftarkan saat order untuk melihat progres
            produksinya secara real-time.
          </p>
        </div>

        <form data-reveal onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="orderId" className="mb-2 block font-medium text-ink">
              Nomor Pesanan
            </label>
            <input
              id="orderId"
              type="text"
              required
              placeholder="Contoh: 22ST-2507-A1B2"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
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
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="font-medium underline">
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
