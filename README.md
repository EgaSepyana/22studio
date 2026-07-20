# 22Studio

Sablon & konveksi kustom — landing page, katalog, form pemesanan, dan pelacakan
status produksi. Dibangun dengan React, Tailwind CSS, GSAP, dan React Router.

## Menjalankan secara lokal

```bash
npm install
npm run dev       # dev server, http://localhost:5173
npm run build     # production build ke dist/
npm run preview   # preview hasil build secara lokal
```

## Deploy ke Vercel

Project ini sudah dikonfigurasi untuk Vercel lewat `vercel.json` (build command,
output directory `dist`, dan rewrite SPA fallback supaya rute React Router
seperti `/order`, `/catalog`, dan `/lacak-order/status/:orderId` tetap berfungsi
saat diakses langsung atau di-refresh).

1. Push repo ini ke GitHub/GitLab/Bitbucket.
2. Di [vercel.com](https://vercel.com), pilih **Add New → Project** lalu import
   repo ini. Vercel akan otomatis mendeteksi framework Vite dan memakai
   pengaturan di `vercel.json`.
3. Deploy. Tidak ada environment variable yang dibutuhkan saat ini — form
   kontak & pemesanan mengirim langsung ke Google Apps Script endpoint yang
   sudah di-hardcode di `src/data/content.js`.

Atau lewat CLI:

```bash
npm i -g vercel
vercel        # preview deployment
vercel --prod # production deployment
```

## Struktur singkat

- `src/pages/` — halaman per rute (`LandingPage`, `CatalogPage`, `OrderPage`,
  `LacakOrderPage`, `OrderStatusPage`)
- `src/components/` — komponen UI, dikelompokkan per section/fitur
- `src/data/` — konten & data statis (termasuk data dummy untuk tracking —
  lihat komentar di `src/services/orderTracking.js` untuk catatan integrasi
  API sebenarnya)
- `legacy-static/` — versi HTML/CSS/JS lama sebelum migrasi ke React, disimpan
  sebagai arsip
