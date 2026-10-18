# 💻 frontend_stimulasi — Web Portal Pendidik & Administrator

Aplikasi Web berbasis **React 19**, **Vite 8**, dan **Tailwind CSS v4** untuk sistem pemantauan perkembangan dan rekomendasi stimulasi anak usia dini. Web portal ini dirancang khusus untuk **Pendidik/Guru**, **Kepala Sekolah**, dan **Administrator**.

---

## 🎨 Design System: Academic Growth System

Antarmuka web dibangun dengan prinsip **Modern Minimalist & Subtle Glassmorphism** dengan palet warna fungsional:
- **Primary (Trust Blue):** `#0059ba` — Aksi utama dan navigasi.
- **Secondary (Growth Mint):** `#006c50` — Status positif / "Meeting Expectations".
- **Tertiary (Attention Yellow):** `#755700` — Peringatan observasi / "Needs Attention".
- **Typography:** `Be Vietnam Pro` (Google Fonts).

Spesifikasi lengkap token desain dapat dilihat pada [DESIGN.md](file:///d:/TA_stimulasi/frontend_stimulasi/DESIGN.md).

---

## 📦 Halaman & Modul Aplikasi

Aplikasi web terdiri dari 11 modul utama yang terintegrasi:

| Halaman | Komponen | Deskripsi |
|---|---|---|
| **Dashboard** | `Dashboard.jsx` | Tinjauan umum KPI, grafik capaian kelas (Chart.js), asesmen terkini, dan quick modal assessment. |
| **Data Siswa** | `DataSiswa.jsx` | Tabel master data siswa dengan pencarian, filter kelas, dan aksi cepat. |
| **Detail Siswa** | `DetailSiswa.jsx` | Profil komprehensif siswa, metrik capaian milestone, riwayat penilaian, dan rekomendasi. |
| **Data Guru** | `DataGuru.jsx` | Manajemen data tenaga pendidik dan alokasi kelas yang diampu. |
| **Data Orang Tua** | `DataOrtu.jsx` | Manajemen data wali murid yang terhubung dengan akun siswa. |
| **Asesmen** | `Assessment.jsx` | Formulir input evaluasi capaian perkembangan anak per aspek dengan standar rubrik. |
| **Klasifikasi C4.5**| `Classification.jsx` | Visualisasi pohon keputusan C4.5, nilai *entropy*, tingkat keyakinan (*confidence*), dan jalur keputusan (*decision path*). |
| **Rekomendasi** | `Recommendations.jsx`| Rekomendasi aktivitas stimulasi untuk pihak sekolah dan rumah. |
| **Journey** | `Journey.jsx` | Pelacak tahapan dan aktivitas stimulasi mingguan (*milestones*). |
| **Laporan** | `Reports.jsx` | Rekapitulasi nilai, tren perkembangan berkala, dan fasilitas ekspor data. |
| **Login** | `Login.jsx` | Autentikasi pengguna portal web. |

---

## 🛠️ Tech Stack & Dependensi

- **Core:** [React 19.x](https://react.dev) + [Vite 8.x](https://vitejs.dev)
- **Styling:** [Tailwind CSS v4.x](https://tailwindcss.com) via `@tailwindcss/vite`
- **Visualisasi Grafik:** [Chart.js](https://www.chartjs.org)
- **Ikon:** [Lucide React](https://lucide.dev)

---

## 🚀 Panduan Menjalankan Frontend

### 1. Prasyarat
- Node.js >= 18.x
- npm >= 9.x

### 2. Instalasi Paket Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Aplikasi akan dapat diakses secara lokal melalui: `http://localhost:5173`.

### 4. Build untuk Lingkungan Produksi
```bash
npm run build
```
Hasil kompilasi produksi akan tersimpan di dalam folder `dist/`.
