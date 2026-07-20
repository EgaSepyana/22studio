export default function PrintTechniqueCard({ name, inkType, hasil, kelebihan, kekurangan, imageSrc }) {
  return (
    <div
      data-reveal
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <img src={imageSrc} alt={`Contoh hasil sablon ${name}`} className="h-40 w-full object-cover" />
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-ink">{name}</h3>
        <p className="eyebrow mt-1 text-[10px] text-muted">{inkType}</p>

        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-medium text-ink">Hasil</dt>
            <dd className="text-muted">{hasil}</dd>
          </div>
          <div>
            <dt className="font-medium text-secondary">Kelebihan</dt>
            <dd className="text-muted">{kelebihan}</dd>
          </div>
          <div>
            <dt className="font-medium text-primary">Kekurangan</dt>
            <dd className="text-muted">{kekurangan}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
