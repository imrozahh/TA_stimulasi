import React from 'react';

export function Dashboard({ onLogout }) {
  // Data Hardcode Statistik
  const stats = [
    { title: 'Total Balita Terdata', value: '148', unit: 'Anak', icon: 'groups', color: 'bg-[#0059ba]', text: 'text-[#0059ba]', bgLight: 'bg-[#f0f3ff]', border: 'border-[#c2c6d5]' },
    { title: 'Perkembangan Sesuai (Normal)', value: '112', unit: '75.7%', icon: 'check_circle', color: 'bg-[#006c50]', text: 'text-[#006c50]', bgLight: 'bg-[#e6f8f1]', border: 'border-[#8bf7cd]' },
    { title: 'Perkembangan Meragukan', value: '24', unit: '16.2%', icon: 'warning', color: 'bg-[#b45309]', text: 'text-[#b45309]', bgLight: 'bg-[#fffbeb]', border: 'border-[#fde68a]' },
    { title: 'Penyimpangan Perkembangan', value: '12', unit: '8.1%', icon: 'error', color: 'bg-[#ba1a1a]', text: 'text-[#ba1a1a]', bgLight: 'bg-[#ffdad6]', border: 'border-[#ffb4ab]' },
  ];

  // Data Hardcode Balita & Hasil C4.5
  const childrenData = [
    {
      no: 1,
      nama: 'Muhammad Al-Fatih',
      usia: '29 Bulan',
      jk: 'Laki-laki',
      ibu: 'Aisyah Putri',
      skorKpsp: '9/10',
      klasifikasi: 'Sesuai',
      rekomendasi: 'Lanjutkan stimulasi rutin kelompok usia 24-36 bulan, evaluasi berkala 3 bulan lagi.'
    },
    {
      no: 2,
      nama: 'Kirana Anindya Zahra',
      usia: '13 Bulan',
      jk: 'Perempuan',
      ibu: 'Dina Marlina',
      skorKpsp: '7/10',
      klasifikasi: 'Meragukan',
      rekomendasi: 'Fokus stimulasi motorik kasar (berdiri mandiri) dan bicara selama 2 minggu, lalu skrining ulang.'
    },
    {
      no: 3,
      nama: 'Rayyan Bilal Nugroho',
      usia: '22 Bulan',
      jk: 'Laki-laki',
      ibu: 'Nurul Hidayah',
      skorKpsp: '5/10',
      klasifikasi: 'Penyimpangan',
      rekomendasi: 'Indikasi keterlambatan bicara. Segera rujuk ke Dokter Spesialis Anak (Sp.A) / Poli Tumbuh Kembang.'
    },
    {
      no: 4,
      nama: 'Aqila Dania Farzana',
      usia: '20 Bulan',
      jk: 'Perempuan',
      ibu: 'Rika Santika',
      skorKpsp: '10/10',
      klasifikasi: 'Sesuai',
      rekomendasi: 'Pertahankan stimulasi teratur, puji setiap usaha kemandirian anak.'
    },
    {
      no: 5,
      nama: 'Kenzo Alvaro Pratama',
      usia: '28 Bulan',
      jk: 'Laki-laki',
      ibu: 'Endang Lestari',
      skorKpsp: '8/10',
      klasifikasi: 'Meragukan',
      rekomendasi: 'Stimulasi motorik halus (menyusun balok & bermain puzzle) intensif selama 2 pekan.'
    },
    {
      no: 6,
      nama: 'Siti Hanifah Az-Zahra',
      usia: '6 Bulan',
      jk: 'Perempuan',
      ibu: 'Dewi Kartika',
      skorKpsp: '9/10',
      klasifikasi: 'Sesuai',
      rekomendasi: 'Stimulasi tengkurap, meraih mainan, dan berbicara interaktif setiap hari.'
    }
  ];

  // Data Hardcode Panduan Stimulasi 4 Aspek
  const stimulationGuides = [
    {
      kategori: 'Motorik Kasar',
      icon: 'directions_run',
      color: 'bg-[#f0f3ff] text-[#0059ba] border-[#c2c6d5]',
      iconBg: 'bg-[#0059ba] text-white',
      kegiatan: 'Latihan Keseimbangan & Menendang Bola',
      panduan: 'Ajak anak bermain melempar atau menendang bola plastik besar, melangkah di atas garis lurus, dan melompat kecil dengan gembira.'
    },
    {
      kategori: 'Motorik Halus',
      icon: 'draw',
      color: 'bg-[#fdf4ff] text-[#9333ea] border-[#f0abfc]',
      iconBg: 'bg-[#9333ea] text-white',
      kegiatan: 'Menyusun Balok & Mencoret Kertas',
      panduan: 'Berikan balok kayu warna-warni untuk disusun ke atas (4-6 balok), lalu ajak membuat coretan garis bebas menggunakan krayon tebal.'
    },
    {
      kategori: 'Bicara & Bahasa',
      icon: 'record_voice_over',
      color: 'bg-[#e6f8f1] text-[#006c50] border-[#8bf7cd]',
      iconBg: 'bg-[#006c50] text-white',
      kegiatan: 'Mengenal Benda & Menggabungkan 2 Kata',
      panduan: 'Tunjuk dan sebutkan nama benda di sekitar dengan jelas. Bacakan buku cerita bergambar dan dorong anak mengucapkan 2 kata saat meminta sesuatu.'
    },
    {
      kategori: 'Sosialisasi & Kemandirian',
      icon: 'diversity_3',
      color: 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]',
      iconBg: 'bg-[#b45309] text-white',
      kegiatan: 'Makan Sendiri & Melepas Alas Kaki',
      panduan: 'Beri kesempatan anak menyendok makanan sendiri, melepas sepatu, serta ajak bermain berbagi mainan dengan teman sebaya.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col md:flex-row text-[#111c2d] font-['Poppins',sans-serif]">
      
      {/* Sidebar: HANYA MENU DASHBOARD */}
      <aside className="w-full md:w-64 bg-white border-r border-[#c2c6d5]/60 flex flex-col justify-between shrink-0 shadow-xs">
        <div>
          {/* Logo & Judul Sistem B-Star */}
          <div className="h-18 px-6 flex items-center gap-3 border-b border-[#c2c6d5]/40">
            <div className="w-10 h-10 bg-[#0059ba] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#0059ba]/20">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            </div>
            <div>
              <h2 className="font-bold text-base text-[#0059ba] tracking-tight">B-Star</h2>
              <p className="text-[10px] text-[#727784] font-medium tracking-wide">ECD Growth Analytics</p>
            </div>
          </div>

          {/* Navigasi: HANYA MENU DASHBOARD */}
          <div className="p-4">
            <p className="px-3 text-[11px] font-bold text-[#727784] uppercase tracking-wider mb-2">
              Menu Utama
            </p>
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0059ba] text-white text-xs font-semibold shadow-md shadow-[#0059ba]/20 cursor-default"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>Dashboard</span>
            </button>
          </div>
        </div>

        {/* Profil & Logout */}
        <div className="p-4 border-t border-[#c2c6d5]/40">
          <div className="flex items-center gap-3 mb-3 p-2.5 rounded-xl bg-[#f0f3ff] border border-[#c2c6d5]/60">
            <div className="w-9 h-9 rounded-full bg-[#0059ba] text-white flex items-center justify-center font-bold text-xs shrink-0">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#111c2d] truncate">Bdn. Siti Rahmawati</p>
              <p className="text-[10px] text-[#424753] truncate">Educator & Specialist</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#ba1a1a] bg-[#ffdad6]/40 hover:bg-[#ffdad6] border border-[#ffdad6] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-18 bg-white border-b border-[#c2c6d5]/60 px-6 sm:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#111c2d]">Dashboard Rekomendasi Stimulasi</h1>
            <p className="text-xs text-[#727784]">Sistem Klasifikasi Perkembangan Anak Berbasis Algoritma C4.5</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#424753] bg-[#f0f3ff] px-3.5 py-2 rounded-xl border border-[#c2c6d5]/50">
              <span className="material-symbols-outlined text-[#727784] text-[18px]">calendar_today</span>
              <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>

            <button
              onClick={onLogout}
              className="text-xs text-[#727784] hover:text-[#ba1a1a] font-medium transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-[#c2c6d5]/60 hover:bg-[#ffdad6]/30 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Konten Dashboard */}
        <main className="p-6 sm:p-8 space-y-6 max-w-7xl">
          
          {/* 1. KARTU STATISTIK (HARDCODED) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border ${item.border} ${item.bgLight} shadow-2xs transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#424753]">{item.title}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${item.color}`}>
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#111c2d] tracking-tight">{item.value}</span>
                  <span className={`text-xs font-bold ${item.text}`}>{item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 2. TABEL DATA BALITA & HASIL KLASIFIKASI C4.5 (HARDCODED) */}
          <div className="bg-white rounded-2xl border border-[#c2c6d5]/60 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#c2c6d5]/40 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#111c2d]">Data Hasil Skrining Perkembangan & Rekomendasi</h3>
                <p className="text-xs text-[#727784] mt-0.5">Klasifikasi status balita berdasarkan kuesioner KPSP dan algoritma C4.5</p>
              </div>
              <span className="text-xs font-semibold bg-[#f0f3ff] text-[#0059ba] border border-[#c2c6d5] px-3 py-1 rounded-full">
                6 Data Sampel
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f0f3ff] text-[#424753] font-semibold border-b border-[#c2c6d5]/60">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Nama Balita</th>
                    <th className="py-3 px-4">Usia</th>
                    <th className="py-3 px-4">Jenis Kelamin</th>
                    <th className="py-3 px-4">Ibu Kandung</th>
                    <th className="py-3 px-4">Skor KPSP</th>
                    <th className="py-3 px-4">Hasil C4.5</th>
                    <th className="py-3 px-4">Rekomendasi Stimulasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c6d5]/30 text-[#424753]">
                  {childrenData.map((child) => (
                    <tr key={child.no} className="hover:bg-[#f9f9ff] transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#727784]">{child.no}</td>
                      <td className="py-3.5 px-4 font-bold text-[#111c2d]">{child.nama}</td>
                      <td className="py-3.5 px-4">{child.usia}</td>
                      <td className="py-3.5 px-4">{child.jk}</td>
                      <td className="py-3.5 px-4">{child.ibu}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#111c2d]">{child.skorKpsp}</td>
                      <td className="py-3.5 px-4">
                        {child.klasifikasi === 'Sesuai' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e6f8f1] text-[#006c50] border border-[#8bf7cd]">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            Sesuai (Normal)
                          </span>
                        )}
                        {child.klasifikasi === 'Meragukan' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                            Meragukan
                          </span>
                        )}
                        {child.klasifikasi === 'Penyimpangan' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#ffdad6] text-[#ba1a1a] border border-[#ffb4ab]">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            Penyimpangan
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 max-w-sm text-[#424753] text-[11px] leading-relaxed">
                        {child.rekomendasi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. REKOMENDASI STIMULASI 4 ASPEK (HARDCODED) */}
          <div>
            <h3 className="text-sm font-bold text-[#111c2d] mb-3">
              Panduan Rekomendasi Stimulasi 4 Aspek Tumbuh Kembang
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stimulationGuides.map((guide, idx) => {
                return (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-[#c2c6d5]/60 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${guide.iconBg}`}>
                        <span className="material-symbols-outlined text-[20px]">{guide.icon}</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#111c2d]">{guide.kategori}</span>
                        <p className="text-[11px] text-[#0059ba] font-semibold">{guide.kegiatan}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#424753] leading-relaxed bg-[#f0f3ff]/60 p-3 rounded-xl border border-[#c2c6d5]/40">
                      {guide.panduan}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
