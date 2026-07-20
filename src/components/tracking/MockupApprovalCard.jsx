import { useState } from "react";
import { Check, RotateCcw, Loader2 } from "lucide-react";
import { submitMockupDecision } from "../../services/orderTracking";

import gambar2 from "../../assets/gambar2.jpg";
import gambar3 from "../../assets/gambar3.jpg";
import gambar4 from "../../assets/gambar4.jpg";
import gambar5 from "../../assets/gambar5.jpg";
import jumbotron from "../../assets/jumbotron.jpg";

const IMAGE_MAP = { "gambar2.jpg": gambar2, "gambar3.jpg": gambar3, "gambar4.jpg": gambar4, "gambar5.jpg": gambar5, "jumbotron.jpg": jumbotron };

export default function MockupApprovalCard({ order, onDecision }) {
  const [submitting, setSubmitting] = useState(null); // null | "approved" | "revision_requested"
  const { mockup } = order;

  if (!mockup) return null;

  const handleDecision = async (decision) => {
    setSubmitting(decision);
    try {
      const updated = await submitMockupDecision(order.orderId, decision);
      onDecision(updated);
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div data-reveal className="overflow-hidden rounded-2xl border-2 border-primary bg-surface shadow-lg">
      <img src={IMAGE_MAP[mockup.image]} alt="Mockup desain" className="h-56 w-full object-cover md:h-72" />
      <div className="p-6 md:p-8">
        <p className="eyebrow text-xs text-primary">Perlu Tindakan Kamu</p>
        <h3 className="mt-1 font-display text-xl font-bold text-ink">Review Mockup Desain</h3>
        <p className="mt-2 text-muted">{mockup.note}</p>

        {mockup.status === "pending" && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleDecision("approved")}
              disabled={submitting !== null}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-medium text-primary-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting === "approved" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Setujui Mockup
            </button>
            <button
              type="button"
              onClick={() => handleDecision("revision_requested")}
              disabled={submitting !== null}
              className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-border px-6 py-2.5 font-medium text-ink transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting === "revision_requested" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )}
              Minta Revisi
            </button>
          </div>
        )}

        {mockup.status === "approved" && (
          <p className="mt-6 flex items-center gap-2 text-sm font-medium text-secondary">
            <Check className="h-4 w-4" /> Mockup sudah kamu setujui — produksi dimulai.
          </p>
        )}

        {mockup.status === "revision_requested" && (
          <p className="mt-6 text-sm font-medium text-primary">
            Permintaan revisi terkirim. Tim desain kami akan mengirim mockup baru untuk direview.
          </p>
        )}
      </div>
    </div>
  );
}
