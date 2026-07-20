import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { CONTACT_INFO, FORM_ENDPOINT } from "../../data/content";
import SuccessModal from "../ui/SuccessModal";

const FIELDS = [
  { icon: MapPin, label: "Lokasi", value: CONTACT_INFO.address },
  { icon: Phone, label: "Phone", value: CONTACT_INFO.phone },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email },
  { icon: Clock, label: "Beroperasi", value: CONTACT_INFO.hours.join(" · ") },
];

const initialForm = { nama: "", email: "", no_wa: "", pesan: "", honeypot: "" };

export default function Contact() {
  const scope = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [showModal, setShowModal] = useState(false);
  useScrollReveal(scope);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: silently drop likely-bot submissions.
    if (form.honeypot) return;

    setStatus("sending");
    const payload = {
      nama: form.nama,
      email: form.email,
      no_wa: form.no_wa,
      pesan: form.pesan,
      honeypot: form.honeypot,
      formDataNameOrder: JSON.stringify(["nama", "email", "no_wa", "pesan", "honeypot"]),
      formGoogleSheetName: "responses",
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
      setForm(initialForm);
      setShowModal(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={scope} className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="mb-16 text-center">
          <p className="eyebrow mb-3 text-xs text-primary">Kontak</p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Mari <span className="text-primary">Ngobrol</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Ada pertanyaan atau siap untuk memulai proyek Anda? Hubungi tim kami — kami senang
            membantu!
          </p>
        </div>

        <div className="mb-16 flex flex-col gap-12 lg:flex-row">
          <form data-reveal onSubmit={handleSubmit} className="space-y-6 lg:w-1/2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="nama" className="mb-2 block font-medium text-ink">
                  Nama
                </label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  required
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="no_wa" className="mb-2 block font-medium text-ink">
                Nomor WhatsApp
              </label>
              <input
                id="no_wa"
                name="no_wa"
                type="text"
                required
                value={form.no_wa}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="pesan" className="mb-2 block font-medium text-ink">
                Pesan
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={5}
                required
                value={form.pesan}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="hidden">
              <label htmlFor="honeypot">Jangan isi kolom ini</label>
              <input
                id="honeypot"
                name="honeypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={handleChange}
              />
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-primary">
                Gagal mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full cursor-pointer rounded-full bg-primary px-8 py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>

          <div data-reveal className="lg:w-1/2">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                title="Lokasi 22Studio"
                src={CONTACT_INFO.mapEmbed}
                className="h-80 w-full lg:h-full lg:min-h-[420px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div data-reveal className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FIELDS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="mb-1 font-bold text-ink">{label}</h4>
                <p className="text-muted">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SuccessModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
