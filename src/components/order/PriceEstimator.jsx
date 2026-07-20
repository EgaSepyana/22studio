import { estimateOrder, formatRupiah } from "../../data/pricing";

export default function PriceEstimator({ garment, fabric, print, quantity, needsNameNumber, className = "" }) {
  const result = estimateOrder({ garment, fabric, print, quantity, needsNameNumber });

  return (
    <div className={`rounded-2xl border border-dashed border-border bg-surface p-6 shadow-sm ${className}`}>
      <p className="eyebrow text-xs text-primary">Estimasi Biaya</p>
      <h3 className="mt-1 font-display text-xl font-bold text-ink">Kalkulator Harga</h3>

      {result ? (
        <>
          <div className="mt-6 space-y-2 font-mono text-sm">
            <div className="flex justify-between text-muted">
              <span>Jumlah</span>
              <span className="text-ink">{quantity} pcs</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Harga / pcs</span>
              <span className="text-ink">{formatRupiah(result.perPiece)}</span>
            </div>
            {result.discountRate > 0 && (
              <div className="flex justify-between text-secondary">
                <span>Diskon qty ({Math.round(result.discountRate * 100)}%)</span>
                <span>-{formatRupiah(result.discount)}</span>
              </div>
            )}
          </div>
          <div className="mt-4 border-t border-dashed border-border pt-4">
            <p className="eyebrow text-xs text-muted">Estimasi Total</p>
            <p className="font-display text-2xl font-bold text-primary">
              {formatRupiah(result.low)} – {formatRupiah(result.high)}
            </p>
          </div>
        </>
      ) : (
        <p className="mt-6 text-sm text-muted">
          Lengkapi jenis pakaian, bahan, sablon/bordir, dan jumlah untuk melihat estimasi harga.
        </p>
      )}

      <p className="mt-6 text-xs text-muted">
        *Estimasi awal berdasarkan spesifikasi umum, bukan harga final. Tim kami akan konfirmasi harga pasti setelah
        meninjau desain dan detail pesananmu.
      </p>
    </div>
  );
}
