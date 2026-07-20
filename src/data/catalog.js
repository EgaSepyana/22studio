// Catalog content transcribed from "Katalog 22studio new 2025- Kaos.pdf".

export const GARMENT_STYLES = [
  {
    name: "Kaos Basic",
    description: "Potongan regular fit, crew neck klasik. Cocok untuk kaos harian, seragam, dan kaos distro.",
  },
  {
    name: "Kaos Oversized",
    description: "Potongan drop-shoulder yang longgar, gaya streetwear yang sedang banyak dicari.",
  },
  {
    name: "Long Sleeve",
    description: "Lengan panjang penuh, cocok untuk merchandise musim hujan atau gaya kasual layering.",
  },
];

export const PRINT_TECHNIQUES = [
  {
    id: "plastisol",
    name: "Plastisol",
    inkType: "Tinta berbasis minyak",
    hasil: "Timbul, sangat cerah, solid, tidak retak.",
    kelebihan: "Warna konsisten, detail tajam, daya tahan tinggi.",
    kekurangan: "Proses rumit, tidak tahan setrika langsung.",
    image: "plastisol.jpg",
  },
  {
    id: "rubber",
    name: "Rubber / GL",
    inkType: "Tinta berbasis air",
    hasil: "Timbul, tidak terlalu tebal, warna cerah, solid.",
    kelebihan: "Terjangkau, rekat kuat, bisa disetrika.",
    kekurangan: "Bisa terasa sedikit kaku jika terlalu tebal.",
    image: "rubber.jpg",
  },
  {
    id: "discharge",
    name: "Discharge",
    inkType: "Tinta mengandung bahan aktif untuk menghilangkan warna kain",
    hasil: "Meresap ke serat kain (menyatu), sangat lembut, efek vintage.",
    kelebihan: "Sangat lembut, tidak retak, awet.",
    kekurangan: "Hanya untuk kain reaktif, warna bisa sedikit berubah.",
    image: "discharge.jpg",
  },
  {
    id: "higdensity",
    name: "High Density",
    inkType: "Tinta plastisol khusus dengan teknik berlapis",
    hasil: "Sangat tebal dan timbul (efek 3D), bisa glossy atau matte.",
    kelebihan: "Efek visual unik, mewah, sangat awet.",
    kekurangan: "Lebih mahal, butuh keahlian, tidak cocok untuk desain besar/terlalu detail.",
    image: "higdensity.jpg",
  },
  {
    id: "glow",
    name: "Glow in the Dark",
    inkType: "Tinta mengandung bahan pospor menyerap cahaya",
    hasil: "Timbul, menyala ketika dalam keadaan gelap.",
    kelebihan: "Efek visual unik, mewah.",
    kekurangan: "Lebih mahal, membutuhkan paparan cahaya jika ingin menyala.",
    image: "glow.jpg",
  },
  {
    id: "dtf",
    name: "DTF",
    inkType: "DTF (Direct to Film)",
    hasil: "Lebih realistik, lembut.",
    kelebihan: "Fleksibel di kain apapun, bisa cetak satuan.",
    kekurangan: "Cenderung lebih cepat retak dibandingkan dengan sablon plastisol, rubber, dan discharge.",
    image: "dtf.jpg",
  },
];

export const FABRIC_ROWS = [
  { label: "Ketebalan", key: "ketebalan" },
  { label: "Tekstur", key: "tekstur" },
  { label: "Gramasi", key: "gramasi" },
  { label: "Kenyamanan", key: "kenyamanan" },
  { label: "Penggunaan", key: "penggunaan" },
];

export const FABRIC_TYPES = [
  {
    name: "Combed 30s",
    ketebalan: "Tipis",
    tekstur: "Lembut, super adem, menyerap keringat",
    gramasi: "140–160 gsm",
    kenyamanan: "Sangat adem, ringan",
    penggunaan: "Pakaian harian, kaos distro, kaos anak",
  },
  {
    name: "Combed 24s",
    ketebalan: "Medium tipis",
    tekstur: "Halus & agak padat, menyerap keringat",
    gramasi: "175–185 gsm",
    kenyamanan: "Nyaman, sedikit hangat",
    penggunaan: "Kaos casual, club komunitas, kaos event",
  },
  {
    name: "Combed 20s",
    ketebalan: "Medium tebal",
    tekstur: "Lebih padat dari 24s, menyerap keringat",
    gramasi: "200–210 gsm",
    kenyamanan: "Nyaman, hangat",
    penggunaan: "Kaos casual, club komunitas, kaos event premium",
  },
  {
    name: "Combed 16s",
    ketebalan: "Tebal kasar",
    tekstur: "Kaku & agak padat, sedikit menyerap keringat",
    gramasi: "235–245 gsm",
    kenyamanan: "Lebih hangat, terlihat rapi",
    penggunaan: "Kaos oversize, streetwear bold",
  },
  {
    name: "Combed 16s Compact",
    ketebalan: "Tebal lembut",
    tekstur: "Lembut & padat, menyerap keringat, minim bulu",
    gramasi: "245–250 gsm",
    kenyamanan: "Lebih adem dari 16s, terlihat rapi",
    penggunaan: "Kaos oversize, merchandise special",
  },
];

export const PRINT_AREAS = [
  { tier: "A4", area: "21 x 30 cm", variants: ["A4 + Logo kecil", "A4 + A4 (depan-belakang)"] },
  { tier: "A3", area: "29 x 40 cm", variants: ["A3 + Logo kecil", "A3 + A3 (depan-belakang)"] },
  { tier: "A2", area: "40 x 50 cm", variants: ["A2 + Logo kecil", "A2 + A2 (depan-belakang)"] },
  { tier: "A1", area: "55 x 70 cm", variants: ["A1 + polos", "A1 + A1 (depan-belakang)"] },
  { tier: "Full Print", area: "Full body", variants: ["Cetak menyeluruh satu sisi/badan penuh"] },
];
