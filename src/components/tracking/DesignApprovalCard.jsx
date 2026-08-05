import { useState } from "react";
import { Check, Loader2, TriangleAlert } from "lucide-react";
import { approveDesign } from "../../services/orderTracking";
import { useCms } from "../../context/CmsContext";

export default function DesignApprovalCard({ credentials, onApproved }) {
  const { waLink } = useCms();
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleApprove = async () => {
    setSubmitting(true);
    setError("");
    try {
      await approveDesign({ ...credentials, note: note.trim() || undefined });
      onApproved();
    } catch (err) {
      setError(err.message || "Gagal menyetujui desain. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-reveal className="rounded-2xl border-2 border-primary bg-surface p-6 shadow-lg md:p-8">
      <p className="eyebrow text-xs text-primary">Perlu Tindakan Kamu</p>
      <h3 className="mt-1 font-display text-xl font-bold text-ink">Setujui Desain untuk Lanjut Produksi</h3>
      <p className="mt-2 text-muted">
        Pesananmu masih menunggu persetujuan desain. Setelah disetujui, tim kami langsung memulai produksi.
      </p>

      <div className="mt-5">
        <label htmlFor="approvalNote" className="mb-2 block text-sm font-medium text-ink">
          Catatan <span className="text-muted">(opsional)</span>
        </label>
        <textarea
          id="approvalNote"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Contoh: Setuju, lanjut produksi"
          className="w-full rounded-lg border border-border bg-canvas px-4 py-2.5 text-sm text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && (
        <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
          <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleApprove}
          disabled={submitting}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-medium text-primary-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Setujui Desain
        </button>
        <a href={waLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">
          Masih ada revisi? Hubungi kami di WhatsApp
        </a>
      </div>
    </div>
  );
}
