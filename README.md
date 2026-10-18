# 🌟 TA_stimulasi — Sistem Informasi Rekomendasi Stimulasi Anak Usia Dini

[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)

**Sistem Informasi Rekomendasi Stimulasi Anak Usia Dini (Early Childhood Development / ECD)** berbasis **Web** dan **Mobile** yang mengintegrasikan algoritma klasifikasi **Decision Tree C4.5** untuk mendeteksi status perkembangan anak serta menyajikan rekomendasi stimulasi terpersonalisasi bagi pendidik dan orang tua.

---

## 📑 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Fitur Utama](#-fitur-utama)
  - [Web Portal (Admin & Guru)](#1-web-portal-frontend_stimulasi)
  - [Mobile App (Orang Tua & Guru)](#2-mobile-app-mobile_stimulasi)
  - [Backend & API Service](#3-backend--api-service-backend_stimulasi)
- [Struktur Repositori](#-struktur-repositori)
- [Skema Basis Data](#-skema-basis-data)
- [Algoritma Decision Tree C4.5](#-algoritma-decision-tree-c45)
- [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
  - [Prasyarat Sistem](#prasyarat-sistem)
  - [1. Setup Backend (Laravel)](#1-setup-backend-laravel)
  - [2. Setup Frontend (React + Vite)](#2-setup-frontend-react--vite)
  - [3. Setup Mobile (Flutter)](#3-setup-mobile-flutter)
- [Sistem Desain (Academic Growth System)](#-sistem-desain-academic-growth-system)
- [Kontributor & Lisensi](#-kontributor--lisensi)

---

## 💡 Tentang Proyek

Pemantauan tumbuh kembang anak pada periode *golden age* membutuhkan kolaborasi aktif antara pihak sekolah (guru) dan keluarga (orang tua). **TA_stimulasi** hadir sebagai platform terpadu untuk:
1. **Pencatatan & Asesmen Terstruktur:** Memudahkan guru mencatat capaian perkembangan anak pada berbagai domain/aspek perkembangan.
2. **Prediksi Cerdas Berbasis Algoritma C4.5:** Mengklasifikasikan status perkembangan anak ke dalam 3 kategori: **Sesuai**, **Meragukan**, atau **Penyimpangan** berdasarkan perhitungan *Entropy* dan *Information Gain*.
3. **Rekomendasi Stimulasi Terarah:** Memberikan arahan aktivitas stimulasi harian/mingguan yang spesifik untuk guru di sekolah dan orang tua di rumah.
4. **Monitoring Berkelanjutan (Weekly Journey):** Memantau perkembangan intervensi stimulasi secara berkala melalui checklist tugas mingguan dan catatan aktivitas.

---

## 🏛️ Arsitektur Sistem

Sistem dirancang dengan arsitektur multi-platform terdistribusi:

```
+-----------------------------------------------------------------------+
|                            TA_stimulasi                               |
+-----------------------------------------------------------------------+
         |                                                 |
         v                                                 v
+-----------------------------+               +-------------------------+
|     frontend_stimulasi      |               |     mobile_stimulasi    |
|   (Web Portal Guru/Admin)   |               |   (Mobile App Ortu)     |
|   React 19 + Tailwind v4    |               |   Flutter + Material 3  |
+-----------------------------+               +-------------------------+
         |                                                 |
         +------------------------+  +---------------------+
                                  |  |
                                  v  v
                      +---------------------------+
                      |     backend_stimulasi     |
                      |   Laravel 13 + PHP 8.3+   |
                      |  C4.5 Engine & REST API   |
                      +---------------------------+
                                    |
                                    v
                      +---------------------------+
                      |        MySQL Database     |
                      |  Relasional (10+ Tables)  |
                      +---------------------------+
```

---

## 🚀 Fitur Utama

### 1. Web Portal (`frontend_stimulasi`)
Ditujukan untuk **Administrator**, **Guru/Pendidik**, dan **Kepala Sekolah**:
- **Dashboard Analitik:** Visualisasi statistik perkembangan siswa, grafik capaian kelas, ringkasan asesmen terbaru, dan notifikasi atensi khusus.
- **Manajemen Data Siswa:** Pencatatan profil siswa lengkap, filter kelas, riwayat perkembangan, dan rekapitulasi data.
- **Detail Siswa:** Profil mendalam siswa, statistik milestone, riwayat asesmen berkala, dan status evaluasi.
- **Manajemen Guru & Orang Tua:** Pengelolaan akun pengguna, pembagian peran (*role-based access control*), dan relasi guru-siswa.
- **Modul Asesmen Perkembangan:** Formulir input penilaian per aspek perkembangan dengan sistem skor terstandar.
- **Visualisasi Model Klasifikasi C4.5:** Penjelasan alur pohon keputusan (*decision path*), nilai entropy, confidence score, dan atribut prediktor utama.
- **Sistem Rekomendasi Stimulasi:** Katalog stimulasi otomatis yang disesuaikan dengan hasil klasifikasi anak.
- **Weekly Journey Tracker:** Pelacakan pelaksanaan aktivitas stimulasi mingguan dan capaian milestone.
- **Laporan & Rekapitulasi (Reports):** Rekap nilai perkembangan, riwayat stimulasi, dan fitur ekspor/cetak laporan berkala.

### 2. Mobile App (`mobile_stimulasi`)
Ditujukan untuk **Orang Tua / Wali Murid** (dengan dukungan login Pendidik):
- **Role-Based Authentication:** Login fleksibel untuk Orang Tua dan Guru dengan proteksi sesi.
- **Parent Dashboard:** Tampilan ringkas progres mingguan anak, skor capaian, aktivitas terbaru, dan quick log activity sheet.
- **Development Progress Screen:** Pemantauan capaian 8 aspek perkembangan:
  - *Spiritual*, *Kognitif*, *Linguistik*, *Motorik Kasar*, *Motorik Halus*, *Sosial-Emosional*, *Seni Kreatif*, dan *Kemandirian*.
  - Dilengkapi indikator level (Lvl 1 - Lvl 4), milestone checklist, serta catatan khusus dari guru.
- **Weekly Journey Screen:** Checklist interaktif tugas stimulasi mingguan (Story Time, Building Blocks, Creative Arts, Sensory Play, dll.).
- **Recommendations Screen:** Rekomendasi aktivitas harian di rumah, tips pendampingan, fitur simpan/bookmark, serta interaksi feedback.

### 3. Backend & API Service (`backend_stimulasi`)
- **Framework:** Laravel 13 dengan PHP 8.3+.
- **Otentikasi & Autorisasi:** Mendukung 4 role: `guru`, `orang_tua`, `admin`, dan `kepala_sekolah`.
- **Relasi Database Lengkap:** Skema relasional yang memetakan siswa, guru pengampu, penilaian, hasil klasifikasi, rekomendasi, hingga detail journey.

---

## 📁 Struktur Repositori

```plaintext
TA_stimulasi/
├── backend_stimulasi/          # Backend REST API & Algoritma (Laravel 13)
│   ├── app/
│   │   ├── Http/Controllers/  # Controller endpoints
│   │   └── Models/            # Eloquent Models (Siswa, Penilaian, Rekomendasi, dll.)
│   ├── database/
│   │   ├── migrations/        # 12 Migrasi skema basis data
│   │   └── seeders/           # Seeder awal (AdminSeeder, DatabaseSeeder)
│   ├── routes/                # web.php, console.php
│   └── composer.json          # Dependensi PHP & Laravel
│
├── frontend_stimulasi/         # Web Application (React 19 + Vite 8)
│   ├── src/
│   │   ├── components/        # Komponen UI (Navbar, Sidebar, dll.)
│   │   ├── pages/             # Halaman utama (Dashboard, Assessment, Classification, dll.)
│   │   ├── App.jsx            # Router & state navigasi utama
│   │   └── index.css          # Desain sistem Tailwind CSS v4
│   ├── DESIGN.md              # Spesifikasi token desain (Academic Growth System)
│   └── package.json           # Dependensi React & library pendukung
│
├── mobile_stimulasi/           # Mobile Application (Flutter 3.x)
│   ├── lib/
│   │   ├── screens/           # Tampilan layar aplikasi mobile
│   │   │   ├── login_screen.dart
│   │   │   ├── parent_dashboard_screen.dart
│   │   │   ├── development_progress_screen.dart
│   │   │   ├── weekly_journey_screen.dart
│   │   │   └── recommendations_screen.dart
│   │   ├── theme/             # Tema Material 3 (app_theme.dart)
│   │   └── main.dart          # Entry point aplikasi Flutter
│   └── pubspec.yaml           # Konfigurasi dependensi Flutter
│
└── README.md                  # Dokumentasi utama proyek
```

---

## 🗄️ Skema Basis Data

Sistem menggunakan basis data relasional MySQL dengan entitas utama berikut:

| Tabel | Deskripsi | Relasi Utama |
|---|---|---|
| `users` | Akun pengguna (`guru`, `orang_tua`, `admin`, `kepala_sekolah`) | Relasi N:N dengan `siswa` via `guru_siswa`, 1:N dengan `journey` |
| `siswa` | Data identitas siswa (nama, gender, tanggal lahir, kelas) | 1:N dengan `penilaian`, 1:N dengan `rekomendasi` |
| `guru_siswa` | Tabel pivot relasi guru yang mengampu siswa | Foreign key ke `users.id_user` dan `siswa.id_siswa` |
| `aspek` | Aspek/domain perkembangan anak (Motorik, Kognitif, dll.) | 1:N dengan `detail_penilaian` |
| `penilaian` | Header penilaian siswa (tanggal, semester, tahun) | Relasi ke `siswa`, 1:N ke `detail_penilaian`, 1:1 ke `hasil_klasifikasi` |
| `detail_penilaian`| Nilai capaian per aspek perkembangan | Foreign key ke `penilaian` dan `aspek` |
| `hasil_klasifikasi`| Hasil prediksi C4.5 (`Sesuai`, `Meragukan`, `Penyimpangan`) | Foreign key unik 1:1 ke `penilaian` |
| `rekomendasi` | Arahan stimulasi untuk guru dan orang tua | Foreign key ke `siswa` dan `hasil_klasifikasi` |
| `journey` | Header perjalanan stimulasi mingguan per pengguna | Foreign key ke `users.id_user`, 1:N ke `detail_journey` |
| `detail_journey` | Rincian aktivitas stimulasi, status (`Sudah`/`Belum`), catatan | Foreign key ke `journey.id_journey` |

---

## 🧠 Algoritma Decision Tree C4.5

Algoritma C4.5 digunakan untuk membentuk pohon keputusan klasifikasi status perkembangan anak berdasarkan data histori penilaian:

1. **Perhitungan Entropy:**
   $$\text{Entropy}(S) = - \sum_{i=1}^{c} p_i \log_2 (p_i)$$
   *Mengukur tingkat ketidakpastian atau keheterogenan kumpulan data penilaian.*

2. **Perhitungan Information Gain & Gain Ratio:**
   $$\text{Gain}(S, A) = \text{Entropy}(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} \text{Entropy}(S_v)$$
   *Memilih atribut aspek perkembangan terbaik dengan perolehan informasi tertinggi sebagai simpul pemecah (*split node*).*

3. **Output Klasifikasi:**
   - **Sesuai (Meeting Expectations):** Tumbuh kembang anak berada pada rentang capaian optimal sesuai usianya.
   - **Meragukan (Needs Attention):** Terdapat aspek tertentu yang memerlukan observasi dan stimulasi tambahan.
   - **Penyimpangan (Intervention Required):** Memerlukan pendampingan intensif serta konsultasi lebih lanjut dengan tenaga ahli.

---

## 🛠️ Panduan Instalasi & Menjalankan

### Prasyarat Sistem
- **PHP** >= 8.3 & **Composer** >= 2.6
- **Node.js** >= 18.x & **npm** >= 9.x
- **Flutter SDK** >= 3.10.x & **Dart SDK** >= 3.0.x
- **MySQL Database Server** (XAMPP / MariaDB / Docker)

---

### 1. Setup Backend (Laravel)

```bash
# 1. Pindah ke direktori backend
cd backend_stimulasi

# 2. Pasang dependensi PHP
composer install

# 3. Salin file environment & generate application key
cp .env.example .env
php artisan key:generate

# 4. Sesuaikan konfigurasi database pada file .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=stimulasi_ta
# DB_USERNAME=root
# DB_PASSWORD=

# 5. Jalankan migrasi dan seeder database
php artisan migrate --seed

# 6. Jalankan server lokal
php artisan serve
# Backend akan aktif di http://localhost:8000
```

---

### 2. Setup Frontend (React + Vite)

```bash
# 1. Pindah ke direktori frontend
cd frontend_stimulasi

# 2. Pasang dependensi JavaScript
npm install

# 3. Jalankan server pengembangan
npm run dev
# Frontend akan aktif di http://localhost:5173
```

---

### 3. Setup Mobile (Flutter)

```bash
# 1. Pindah ke direktori mobile
cd mobile_stimulasi

# 2. Ambil semua paket dependensi
flutter pub get

# 3. Cek kesiapan perangkat (Emulator / Physical Device)
flutter devices

# 4. Jalankan aplikasi Flutter
flutter run
```

---

## 🎨 Sistem Desain (Academic Growth System)

Aplikasi dibangun menggunakan panduan desain **Academic Growth System** dengan identitas visual modern, ramah anak, dan profesional:

| Token | Nilai Hex | Penggunaan Utama |
|---|---|---|
| **Primary (Trust Blue)** | `#0059ba` | Aksi utama, header aktif, navigasi |
| **Secondary (Growth Mint)** | `#006c50` | Status "Meeting Expectations", indikator positif |
| **Tertiary (Attention Yellow)** | `#755700` | Status "Needs Attention", peringatan observasi |
| **Surface** | `#f9f9ff` | Background antarmuka yang ramah di mata |
| **Typography** | `Be Vietnam Pro` | Tipografi geometris, bersih, dan mudah dibaca |

---

## 👥 Kontributor & Lisensi

- **Pengembang:** Tim Proyek Tugas Akhir Sistem Informasi Rekomendasi Stimulasi Perkembangan Anak Usia Dini.
- **Lisensi:** Open-source di bawah lisensi [MIT License](LICENSE).
