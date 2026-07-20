import { useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { GARMENT_TYPES, FABRIC_TYPES, PRINT_METHODS, SIZES } from "../data/orderOptions";
import { estimateOrder, formatRupiah } from "../data/pricing";
import { FORM_ENDPOINT, WA_PHONE } from "../data/content";
import OptionCardGroup from "../components/order/OptionCardGroup";
import SizeChart from "../components/order/SizeChart";
import NameNumberList from "../components/order/NameNumberList";
import DesignUpload from "../components/order/DesignUpload";
import PriceEstimator from "../components/order/PriceEstimator";
import SuccessModal from "../components/ui/SuccessModal";
import { WhatsAppIcon } from "../components/ui/BrandIcons";

const emptySizeQty = Object.fromEntries(SIZES.map((s) => [s, 0]));

const initialState = {
  nama: "",
  email: "",
  noWa: "",
  garment: "",
  fabric: "",
  print: "",
  sizeQty: emptySizeQty,
  needsNameNumber: false,
  nameNumberRows: [],
  files: [],
  neededBy: "",
  notes: "",
};

function buildWaMessage({ nama, garment, fabric, print, totalQty, sizeQty, estimate, hasFiles }) {
  const garmentLabel = GARMENT_TYPES.find((g) => g.id === garment)?.label ?? garment;
  const fabricLabel = FABRIC_TYPES.find((f) => f.id === fabric)?.label ?? fabric;
  const printLabel = PRINT_METHODS.find((p) => p.id === print)?.label ?? print;
  const sizeBreakdown = SIZES.filter((s) => sizeQty[s] > 0)
    .map((s) => `${s}: ${sizeQty[s]}`)
    .join(", ");

  const lines = [
    `Halo 22Studio, saya ${nama || ""} ingin order:`,
    `Jenis: ${garmentLabel}`,
    `Bahan: ${fabricLabel}`,
    `Sablon/Bordir: ${printLabel}`,
    `Ukuran & Jumlah: ${sizeBreakdown} (Total: ${totalQty} pcs)`,
    estimate ? `Estimasi harga: ${formatRupiah(estimate.low)} - ${formatRupiah(estimate.high)}` : null,
    hasFiles ? "Catatan: saya akan lampirkan file desain di chat ini." : null,
    "Mohon info lebih lanjut, terima kasih!",
  ].filter(Boolean);

  return lines.join("\n");
}

export default function OrderPage() {
  const scope = useRef(null);
  useScrollReveal(scope);

  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [showSuccess, setShowSuccess] = useState(false);
  const [waLink, setWaLink] = useState("");

  const totalQty = Object.values(form.sizeQty).reduce((sum, n) => sum + (Number(n) || 0), 0);
  const estimate = estimateOrder({
    garment: form.garment,
    fabric: form.fabric,
    print: form.print,
    quantity: totalQty,
    needsNameNumber: form.needsNameNumber,
  });

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.garment || !form.fabric || !form.print || totalQty === 0) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const message = buildWaMessage({
      nama: form.nama,
      garment: form.garment,
      fabric: form.fabric,
      print: form.print,
      totalQty,
      sizeQty: form.sizeQty,
      estimate,
      hasFiles: form.files.length > 0,
    });
    const nextWaLink = `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodeURIComponent(message)}`;

    const payload = {
      nama: form.nama,
      email: form.email,
      no_wa: form.noWa,
      jenis_pakaian: form.garment,
      jenis_bahan: form.fabric,
      jenis_sablon: form.print,
      ukuran_jumlah: JSON.stringify(form.sizeQty),
      total_qty: String(totalQty),
      perlu_nama_nomor: form.needsNameNumber ? "Ya" : "Tidak",
      daftar_nama_nomor: JSON.stringify(form.nameNumberRows),
      file_desain: form.files.map((f) => f.name).join(", "),
      tanggal_dibutuhkan: form.neededBy,
      catatan: form.notes,
      estimasi_harga: estimate ? `${formatRupiah(estimate.low)} - ${formatRupiah(estimate.high)}` : "",
      formDataNameOrder: JSON.stringify(Object.keys(initialState)),
      formGoogleSheetName: "orders",
      formGoogleSendEmail: "22Studio.tino@gmail.com",
    };
    const encoded = Object.entries(payload)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded,
      });
      if (!res.ok) throw new Error("Request failed");
      setWaLink(nextWaLink);
      setForm(initialState);
      setShowSuccess(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={scope} className="pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3 text-xs text-primary">Form Pemesanan</p>
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Mulai <span className="text-primary">Pesanan Custom</span> Kamu
          </h1>
          <p className="mt-4 text-lg text-muted">
            Isi spesifikasi di bawah untuk melihat estimasi harga langsung. Tim kami akan menghubungimu untuk
            konfirmasi akhir sebelum produksi dimulai.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <form onSubmit={handleSubmit} className="space-y-10 lg:w-2/3">
            <div data-reveal>
              <h2 className="font-display text-lg font-bold text-ink">Informasi Kontak</h2>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="nama" className="mb-2 block font-medium text-ink">
                    Nama
                  </label>
                  <input
                    id="nama"
                    type="text"
                    required
                    value={form.nama}
                    onChange={(e) => set({ nama: e.target.value })}
                    className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => set({ email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="noWa" className="mb-2 block font-medium text-ink">
                    Nomor WhatsApp
                  </label>
                  <input
                    id="noWa"
                    type="text"
                    required
                    value={form.noWa}
                    onChange={(e) => set({ noWa: e.target.value })}
                    className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="neededBy" className="mb-2 block font-medium text-ink">
                    Tanggal Dibutuhkan <span className="text-muted">(opsional)</span>
                  </label>
                  <input
                    id="neededBy"
                    type="date"
                    value={form.neededBy}
                    onChange={(e) => set({ neededBy: e.target.value })}
                    className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div data-reveal>
              <h2 className="font-display text-lg font-bold text-ink">Jenis Pakaian</h2>
              <div className="mt-4">
                <OptionCardGroup
                  options={GARMENT_TYPES}
                  value={form.garment}
                  onChange={(garment) => set({ garment })}
                  gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
                />
              </div>
            </div>

            <div data-reveal>
              <h2 className="font-display text-lg font-bold text-ink">Jenis Bahan</h2>
              <div className="mt-4">
                <OptionCardGroup
                  options={FABRIC_TYPES}
                  value={form.fabric}
                  onChange={(fabric) => set({ fabric })}
                  gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                />
              </div>
            </div>

            <div data-reveal>
              <h2 className="font-display text-lg font-bold text-ink">Jenis Sablon / Bordir</h2>
              <div className="mt-4">
                <OptionCardGroup
                  options={PRINT_METHODS}
                  value={form.print}
                  onChange={(print) => set({ print })}
                  gridClassName="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                />
              </div>
            </div>

            <div data-reveal>
              <h2 className="font-display text-lg font-bold text-ink">Ukuran &amp; Jumlah</h2>
              <div className="mt-4">
                <SizeChart value={form.sizeQty} onChange={(sizeQty) => set({ sizeQty })} />
              </div>
            </div>

            <div data-reveal>
              <NameNumberList
                enabled={form.needsNameNumber}
                onToggle={(needsNameNumber) => set({ needsNameNumber })}
                rows={form.nameNumberRows}
                onRowsChange={(nameNumberRows) => set({ nameNumberRows })}
                sizeQuantities={form.sizeQty}
              />
            </div>

            <div data-reveal>
              <h2 className="font-display text-lg font-bold text-ink">Desain</h2>
              <div className="mt-4">
                <DesignUpload files={form.files} onFilesChange={(files) => set({ files })} />
              </div>
            </div>

            <div data-reveal>
              <label htmlFor="notes" className="mb-2 block font-medium text-ink">
                Catatan Tambahan <span className="text-muted">(opsional)</span>
              </label>
              <textarea
                id="notes"
                rows={4}
                value={form.notes}
                onChange={(e) => set({ notes: e.target.value })}
                placeholder="Contoh: warna kain, referensi desain, atau kebutuhan khusus lainnya."
                className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div data-reveal className="lg:hidden">
              <PriceEstimator
                garment={form.garment}
                fabric={form.fabric}
                print={form.print}
                quantity={totalQty}
                needsNameNumber={form.needsNameNumber}
              />
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-primary">
                Lengkapi jenis pakaian, bahan, sablon/bordir, dan minimal 1 ukuran sebelum mengirim — atau coba lagi
                bila pengiriman gagal.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              data-reveal
              className="w-full cursor-pointer rounded-full bg-primary px-8 py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {status === "sending" ? "Mengirim..." : "Kirim Pesanan"}
            </button>
          </form>

          <aside data-reveal className="hidden lg:block lg:w-1/3">
            <div className="sticky top-24">
              <PriceEstimator
                garment={form.garment}
                fabric={form.fabric}
                print={form.print}
                quantity={totalQty}
                needsNameNumber={form.needsNameNumber}
              />
            </div>
          </aside>
        </div>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Pesanan Diterima!"
        message="Detail pesananmu sudah kami catat. Satu langkah lagi untuk melengkapi prosesnya."
        infoText="Klik tombol di bawah untuk membuka WhatsApp dengan ringkasan pesananmu, lalu lampirkan file desain langsung di chat itu."
        closeLabel="Tutup"
      >
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Lanjutkan via WhatsApp
        </a>
      </SuccessModal>
    </section>
  );
}
