# ⚙️ backend_stimulasi — API & Decision Tree C4.5 Service

Service backend untuk **Sistem Informasi Rekomendasi Stimulasi Anak Usia Dini** dibangun menggunakan **Laravel 13** dan **PHP 8.3+**. Layanan ini mengelola basis data relasional, otentikasi role-based, pencatatan asesmen perkembangan, engine klasifikasi C4.5, serta manajemen rencana stimulasi mingguan (journey).

---

## 🛠️ Tech Stack & Spesifikasi

- **Framework:** [Laravel 13.x](https://laravel.com)
- **Bahasa:** [PHP 8.3+](https://www.php.net)
- **Database:** MySQL 8.x (didukung SQLite untuk pengujian lokal)
- **ORM:** Eloquent ORM
- **Arsitektur:** RESTful API & Service Layer

---

## 🗃️ Skema Basis Data & Model Eloquent

Sistem menyediakan 9 model Eloquent utama yang terintegrasi:

1. **`User` (`users`):** Mengelola pengguna sistem dengan role:
   - `guru`: Pendidik/guru kelas yang melakukan asesmen siswa.
   - `orang_tua`: Wali murid yang memantau tumbuh kembang anak via aplikasi mobile.
   - `admin`: Pengelola data master sekolah, kelas, dan akun.
   - `kepala_sekolah`: Monitoring laporan dan statistik perkembangan sekolah.
2. **`Siswa` (`siswa`):** Data identitas anak didik (`nama`, `jenis_kelamin`, `tanggal_lahir`, `kelas`).
3. **`GuruSiswa` (`guru_siswa`):** Pivot table relasi banyak-ke-banyak antara guru dan siswa yang diampu.
4. **`Aspek` (`aspek`):** Domain capaian perkembangan anak (contoh: Kognitif, Motorik, Linguistik, dll.).
5. **`Penilaian` (`penilaian`):** Header sesi penilaian siswa per semester dan tahun ajaran.
6. **`DetailPenilaian` (`detail_penilaian`):** Nilai capaian per aspek perkembangan.
7. **`HasilKlasifikasi` (`hasil_klasifikasi`):** Output klasifikasi Decision Tree C4.5 (`Sesuai`, `Meragukan`, `Penyimpangan`) dengan relasi 1:1 ke `Penilaian`.
8. **`Rekomendasi` (`rekomendasi`):** Teks rekomendasi stimulasi spesifik untuk guru dan orang tua berdasarkan hasil klasifikasi.
9. **`Journey` & `DetailJourney` (`journey`, `detail_journey`):** Header dan rincian checklist aktivitas stimulasi mingguan anak dengan status pengerjaan (`Sudah`/`Belum`) dan catatan perkembangan.

---

## 🚀 Panduan Menjalankan Backend

### 1. Prasyarat
- PHP >= 8.3 dengan ekstensi yang diperlukan (pdo_mysql, mbstring, openssl, tokenizer, xml, ctype, json).
- Composer >= 2.6.
- Database Server MySQL aktif (misalnya melalui XAMPP).

### 2. Instalasi Dependensi
```bash
composer install
```

### 3. Konfigurasi Lingkungan (`.env`)
Salin file konfigurasi contoh:
```bash
copy .env.example .env
php artisan key:generate
```

Pastikan konfigurasi koneksi database pada `.env` telah disesuaikan:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=stimulasi_ta
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Menjalankan Migrasi & Seeder
Buat database bernama `stimulasi_ta` di MySQL Anda, kemudian jalankan:
```bash
php artisan migrate --seed
```

### 5. Menjalankan Server Lokal
```bash
php artisan serve
```
Backend akan berjalan pada port default: `http://localhost:8000`.

---

## 🧪 Pengujian & Kode Standar

- Jalankan unit & feature tests:
  ```bash
  php artisan test
  ```
- Pemeriksaan dan perapian kode dengan Laravel Pint:
  ```bash
  composer run pint
  ```
