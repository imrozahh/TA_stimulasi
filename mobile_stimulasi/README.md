# 📱 mobile_stimulasi — Aplikasi Mobile Orang Tua (B-Star ECD)

Aplikasi mobile berbasis **Flutter** dan **Material Design 3** untuk mendampingi **Orang Tua** dan **Pendidik** dalam memantau tumbuh kembang anak serta melaksanakan panduan stimulasi harian di rumah.

---

## 🎨 Tema & Gaya Visual

Mengadopsi tema **Academic Growth Blue** (`lib/theme/app_theme.dart`) yang konsisten dengan web portal:
- **Primary:** `AppColors.primary` (`#0059ba`)
- **Secondary:** `AppColors.secondary` (`#006c50`)
- **Tertiary:** `AppColors.tertiary` (`#755700`)
- **Surface:** `AppColors.surface` (`#f9f9ff`)
- **Typography:** `Be Vietnam Pro` dengan pembagian hirarki Display, Headline, Title, dan Body.

---

## 📱 Fitur Layar Aplikasi (Screens)

Aplikasi mobile menyediakan 5 layar utama yang dirancang secara responsif dan interaktif:

### 1. `LoginScreen` (`lib/screens/login_screen.dart`)
- Mendukung pemilihan role: **Orang Tua** atau **Pendidik / Guru**.
- Validasi input email dan password.
- Toggle tampil/sembunyikan password dan opsi "Ingat Saya".

### 2. `ParentDashboardScreen` (`lib/screens/parent_dashboard_screen.dart`)
- **Weekly Progress Ring:** Persentase penyelesaian tugas stimulasi minggu ini.
- **Statistik Aktivitas:** Jumlah tugas selesai dari total target stimulasi.
- **Quick Log Activity Sheet:** Modal dialog interaktif untuk mencatat aktivitas spontan anak di rumah.
- **Recent Activities Feed:** Riwayat kegiatan dan perolehan poin stimulasi anak.

### 3. `DevelopmentProgressScreen` (`lib/screens/development_progress_screen.dart`)
- Pemantauan mendalam terhadap **8 Aspek Perkembangan**:
  1. *Spiritual*
  2. *Kognitif (Cognitive)*
  3. *Linguistik (Linguistic)*
  4. *Motorik Kasar (Gross Motor)*
  5. *Motorik Halus (Fine Motor)*
  6. *Sosial-Emosional (Socio-Emotional)*
  7. *Seni Kreatif (Creative Arts)*
  8. *Kemandirian (Independence)*
- Indikator level pencapaian (Lvl 1 s/d Lvl 4), persentase capaian animasi, daftar *milestones*, serta catatan evaluasi guru.

### 4. `WeeklyJourneyScreen` (`lib/screens/weekly_journey_screen.dart`)
- Agenda stimulasi mingguan terstruktur (misal: *Morning Prayer*, *Building Blocks*, *Story Time*, *Creative Arts*, *Sensory Play*, *Alphabet Match*).
- Checklist interaktif untuk menandai aktivitas yang telah selesai dilakukan bersama anak.

### 5. `RecommendationsScreen` (`lib/screens/recommendations_screen.dart`)
- Kartu rekomendasi kegiatan stimulasi yang dipersonalisasi dari hasil analisis Decision Tree C4.5.
- Detail panduan stimulasi (deskripsi langkah, tips orang tua, dan tujuan perkembangan).
- Fitur interaksi: Like counter, bookmarking (simpan ke agenda), dan feedback.

---

## 🛠️ Persyaratan & Instalasi

### 1. Prasyarat
- Flutter SDK >= 3.10.x
- Dart SDK >= 3.0.x
- Android Studio / VS Code dengan Flutter extension
- Perangkat Android/iOS (Emulator atau HP fisik)

### 2. Unduh Dependensi
```bash
flutter pub get
```

### 3. Cek Perangkat yang Terhubung
```bash
flutter devices
```

### 4. Menjalankan Aplikasi
```bash
flutter run
```

### 5. Build APK Rilis (Android)
```bash
flutter build apk --release
```
File APK akan berada pada direktori: `build/app/outputs/flutter-apk/app-release.apk`.
