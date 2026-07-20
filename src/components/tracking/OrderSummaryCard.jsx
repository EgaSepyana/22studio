import { Package, Calendar, Truck } from "lucide-react";
import { STAGES } from "../../data/trackingData";

export default function OrderSummaryCard({ order }) {
  const stage = STAGES.find((s) => s.id === order.currentStage);

  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-xs text-muted">Nomor Pesanan</p>
          <p className="font-mono text-lg font-bold tracking-wide text-ink">{order.orderId}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          {stage?.label}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Package className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
          <div>
            <p className="text-sm text-muted">Pesanan</p>
            <p className="font-medium text-ink">{order.item}</p>
            <p className="text-sm text-muted">{order.qty} pcs</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
          <div>
            <p className="text-sm text-muted">Estimasi Selesai</p>
            <p className="font-medium text-ink">{order.estimatedReady}</p>
          </div>
        </div>
        {order.shipping && (
          <div className="flex items-start gap-3 sm:col-span-2">
            <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm text-muted">Pengiriman</p>
              <p className="font-medium text-ink">
                {order.shipping.method} — <span className="font-mono">{order.shipping.resi}</span>
              </p>
              <p className="text-sm text-muted">{order.shipping.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
