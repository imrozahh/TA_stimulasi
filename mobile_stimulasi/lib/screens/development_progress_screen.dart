import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'parent_dashboard_screen.dart';
import 'weekly_journey_screen.dart';
import 'recommendations_screen.dart';

class DevelopmentProgressScreen extends StatefulWidget {
  const DevelopmentProgressScreen({super.key});

  @override
  State<DevelopmentProgressScreen> createState() => _DevelopmentProgressScreenState();
}

class _DevelopmentProgressScreenState extends State<DevelopmentProgressScreen>
    with SingleTickerProviderStateMixin {
  final int _currentNavIndex = 2; // 2 = Progress
  late AnimationController _animController;
  late Animation<double> _progressAnimation;

  // 8 Core Aspects of Child Development
  final List<Map<String, dynamic>> _aspects = [
    {
      'id': 'spiritual',
      'title': 'Spiritual',
      'level': 'Lvl 4',
      'percentage': 85,
      'progress': 0.85,
      'color': AppColors.primary,
      'bgOpacityColor': AppColors.primary,
      'icon': Icons.auto_awesome_rounded,
      'status': 'Advanced',
      'description': 'Mengenal nilai kebaikan, empati mendalam terhadap teman, dan antusias dalam doa pagi keluarga.',
      'milestones': [
        'Mengekspresikan rasa terima kasih secara spontan',
        'Menunjukkan kepedulian saat melihat teman bersedih',
        'Menghafal 3 doa harian dasar dengan lancar',
      ],
      'teacherNote': 'Leo menunjukkan kepekaan empati yang luar biasa di kelas saat menolong temannya merapikan mainan.',
    },
    {
      'id': 'cognitive',
      'title': 'Cognitive',
      'level': 'Lvl 3',
      'percentage': 62,
      'progress': 0.62,
      'color': AppColors.secondary,
      'bgOpacityColor': AppColors.secondary,
      'icon': Icons.lightbulb_rounded,
      'status': 'On Track',
      'description': 'Kemampuan logika, pengelompokan pola visual, dan pemecahan masalah sederhana berbasis sebab-akibat.',
      'milestones': [
        'Mengelompokkan balok berdasarkan warna dan bentuk',
        'Menyelesaikan puzzle 12 keping secara mandiri',
        'Memahami konsep urutan ukuran (besar ke kecil)',
      ],
      'teacherNote': 'Daya fokus tinggi saat bermain tangram dan balok konstruksi. Terus rangsang dengan teka-teki logika bergambar.',
    },
    {
      'id': 'linguistic',
      'title': 'Linguistic',
      'level': 'Lvl 5',
      'percentage': 92,
      'progress': 0.92,
      'color': AppColors.tertiary,
      'bgOpacityColor': AppColors.tertiary,
      'icon': Icons.record_voice_over_rounded,
      'status': 'Mastery',
      'description': 'Penguasaan kosakata kaya, artikulasi jelas, dan kemampuan menceritakan kembali alur dongeng secara runtut.',
      'milestones': [
        'Kosakata aktif melebihi 600+ kata',
        'Mampu menggunakan kalimat majemuk bertingkat',
        'Menceritakan kembali cerita pendek dengan ekspresi',
      ],
      'teacherNote': 'Kosakata Leo sangat berkembang! Penggunaan intonasi saat bercerita di depan kelas sangat mengagumkan.',
    },
    {
      'id': 'interpersonal',
      'title': 'Interpersonal',
      'level': 'Lvl 2',
      'percentage': 45,
      'progress': 0.45,
      'color': AppColors.primaryContainer,
      'bgOpacityColor': AppColors.primary,
      'icon': Icons.groups_rounded,
      'status': 'Developing',
      'description': 'Interaksi sosial dalam kelompok, kemampuan berbagi giliran bermain, dan resolusi konflik ramah anak.',
      'milestones': [
        'Mau menunggu giliran bermain perosotan',
        'Merespons sapaan teman sebaya dengan senyum',
        'Mampu bernegosiasi pembagian peran saat main peran',
      ],
      'teacherNote': 'Perlu dorongan lembut saat situasi kelas baru atau bertemu anak yang belum ia kenal akrab.',
    },
    {
      'id': 'intrapersonal',
      'title': 'Intrapersonal',
      'level': 'Lvl 4',
      'percentage': 78,
      'progress': 0.78,
      'color': AppColors.secondary,
      'bgOpacityColor': AppColors.secondary,
      'icon': Icons.person_pin_rounded,
      'status': 'Advanced',
      'description': 'Kesadaran diri terhadap emosi pribadi, kemandirian memakai sepatu, dan kemampuan menenangkan diri.',
      'milestones': [
        'Mampu menamai emosi yang dirasakan (senang, kesal, takut)',
        'Bisa mengambil nafas dalam untuk menenangkan diri',
        'Merapikan tas dan perlengkapan sekolah mandiri',
      ],
      'teacherNote': 'Kemandirian sangat menonjol. Mampu mengekspresikan apa yang ia butuhkan tanpa tantrum.',
    },
    {
      'id': 'kinesthetic',
      'title': 'Kinesthetic',
      'level': 'Lvl 3',
      'percentage': 55,
      'progress': 0.55,
      'color': AppColors.error,
      'bgOpacityColor': AppColors.error,
      'icon': Icons.directions_run_rounded,
      'status': 'On Track',
      'description': 'Keseimbangan motorik kasar saat berlari/melompat, serta kelincahan fisik dalam senam irama.',
      'milestones': [
        'Melompat dengan satu kaki sejauh 5 langkah',
        'Menangkap bola ukuran sedang dengan kedua tangan',
        'Meniti balok keseimbangan tanpa terjatuh',
      ],
      'teacherNote': 'Aktivitas fisik di luar ruangan seperti melompati rintangan kecil sangat membantu penguatan otot intinya.',
    },
    {
      'id': 'visual_spatial',
      'title': 'Visual Spatial',
      'level': 'Lvl 4',
      'percentage': 70,
      'progress': 0.70,
      'color': AppColors.primaryContainer,
      'bgOpacityColor': AppColors.primary,
      'icon': Icons.architecture_rounded,
      'status': 'Advanced',
      'description': 'Kemampuan mengestimasi ruang, menggambar proporsi objek, dan memahami denah bermain sederhana.',
      'milestones': [
        'Menggambar orang lengkap dengan kepala, badan, dan tangan',
        'Memahami konsep posisi (di atas, di bawah, di belakang)',
        'Membangun istana balok bertingkat tiga yang stabil',
      ],
      'teacherNote': 'Sensitivitas visual spasial sangat baik. Senang merancang tata letak balok yang simetris dan rapi.',
    },
    {
      'id': 'physical_growth',
      'title': 'Physical Growth',
      'level': 'Normal',
      'percentage': 98,
      'progress': 0.98,
      'color': AppColors.secondaryFixedDim,
      'bgOpacityColor': AppColors.secondary,
      'icon': Icons.height_rounded,
      'status': 'Optimal',
      'description': 'Kurva tinggi dan berat badan menurut standar WHO, kesehatan gigi, dan ketahanan stamina fisik.',
      'milestones': [
        'Tinggi badan 110.5 cm (Persentil 65 WHO - Normal)',
        'Berat badan 19.4 kg (Gizi Baik)',
        'Kualitas tidur 10-11 jam setiap malam',
      ],
      'teacherNote': 'Tumbuh kembang fisik sangat prima, aktif berpartisipasi dalam semua kegiatan fisik tanpa mudah lelah.',
    },
  ];

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );
    _progressAnimation = CurvedAnimation(
      parent: _animController,
      curve: Curves.easeOutCubic,
    );
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  void _showAspectDetail(Map<String, dynamic> aspect) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(24),
        decoration: const BoxDecoration(
          color: AppColors.surfaceContainerLowest,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(28),
            topRight: Radius.circular(28),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Handle bar
            Center(
              child: Container(
                width: 44,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.outlineVariant,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 18),

            // Header Row
            Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: (aspect['bgOpacityColor'] as Color).withAlpha(25),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(
                    aspect['icon'] as IconData,
                    color: aspect['color'] as Color,
                    size: 26,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            aspect['title'] as String,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: AppColors.onSurface,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: (aspect['color'] as Color).withAlpha(30),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              aspect['level'] as String,
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: aspect['color'] as Color,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Pencapaian: ${aspect['percentage']}% • Status: ${aspect['status']}',
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Progress Bar
            ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: LinearProgressIndicator(
                value: aspect['progress'] as double,
                minHeight: 8,
                backgroundColor: AppColors.surfaceContainer,
                valueColor: AlwaysStoppedAnimation<Color>(aspect['color'] as Color),
              ),
            ),
            const SizedBox(height: 16),

            // Description
            Text(
              aspect['description'] as String,
              style: const TextStyle(
                fontSize: 13,
                height: 1.5,
                color: AppColors.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 16),

            // Milestones Box
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.surfaceContainerLow,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.checklist_rounded, size: 18, color: AppColors.secondary),
                      SizedBox(width: 6),
                      Text(
                        'Indikator Capaian Utama',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: AppColors.onSurface,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ...(aspect['milestones'] as List<String>).map(
                    (m) => Padding(
                      padding: const EdgeInsets.only(bottom: 6),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Icon(Icons.check_circle, size: 14, color: AppColors.secondary),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              m,
                              style: const TextStyle(
                                fontSize: 11,
                                color: AppColors.onSurfaceVariant,
                                height: 1.3,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Teacher Note
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.tertiaryFixed.withAlpha(120),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.school_rounded, size: 18, color: AppColors.tertiary),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Catatan Guru Pendamping (Ms. Clara)',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: AppColors.tertiary,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          aspect['teacherNote'] as String,
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppColors.onSurface,
                            height: 1.3,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Action Buttons
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(ctx),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: const Text('Tutup'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.pop(ctx);
                      Navigator.of(context).push(
                        MaterialPageRoute(builder: (c) => const RecommendationsScreen()),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: const Text('Rekomendasi'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showExportPdfModal() {
    bool isDownloading = false;
    final messenger = ScaffoldMessenger.of(context);
    final navigator = Navigator.of(context);

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (ctx) => StatefulBuilder(
        builder: (modalCtx, setModalState) {
          return Container(
            padding: const EdgeInsets.all(24),
            decoration: const BoxDecoration(
              color: AppColors.surfaceContainerLowest,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(28),
                topRight: Radius.circular(28),
              ),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 44,
                    height: 4,
                    decoration: BoxDecoration(
                      color: AppColors.outlineVariant,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 18),
                Row(
                  children: [
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        color: AppColors.primaryContainer.withAlpha(25),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: const Icon(Icons.picture_as_pdf_rounded, color: AppColors.primary, size: 26),
                    ),
                    const SizedBox(width: 12),
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Export Development Report',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          'Leo Alexander • 3 Bulan Terakhir',
                          style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 18),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceContainerLow,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Cakupan Laporan:', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                          Text('8 Aspek Tumbuh Kembang', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      SizedBox(height: 6),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Rekomendasi Terlampir:', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                          Text('14 Aktivitas Rumah', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      SizedBox(height: 6),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Tanda Tangan:', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                          Text('Psikolog & Guru Kelas', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: ElevatedButton.icon(
                    onPressed: isDownloading
                        ? null
                        : () async {
                            setModalState(() {
                              isDownloading = true;
                            });
                            await Future.delayed(const Duration(milliseconds: 1200));
                            if (mounted) {
                              navigator.pop();
                              messenger.showSnackBar(
                                SnackBar(
                                  backgroundColor: AppColors.secondary,
                                  behavior: SnackBarBehavior.floating,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  content: const Row(
                                    children: [
                                      Icon(Icons.check_circle_rounded, color: Colors.white, size: 20),
                                      SizedBox(width: 8),
                                      Expanded(
                                        child: Text(
                                          'Laporan PDF berhasil diunduh ke folder Downloads!',
                                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            }
                          },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                    icon: const Icon(Icons.download_rounded, size: 20),
                    label: Text(
                      isDownloading ? 'Mengunduh...' : 'Download Sekarang (PDF 2.4 MB)',
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: Stack(
        children: [
          // Main Scrollable Area
          CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              // 1. Top App Bar
              SliverAppBar(
                pinned: true,
                backgroundColor: AppColors.surface.withAlpha(230),
                surfaceTintColor: Colors.transparent,
                elevation: 0,
                toolbarHeight: 64,
                title: Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: AppColors.primaryFixed, width: 2),
                      ),
                      child: ClipOval(
                        child: Image.network(
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuBGhJ3_Ln4C7X0sqFCOCjs1nc5p3UTdOI-QX4NxpF3FTjGstr58cowtctdH9eF0gVz0O59kvrwZGN04IlHad7G6p7Mgm4ofecrmEp_tFIvoAR0MWgnzK-cCcLSWLVrpxLbwuQFYjfoNXxxJN4n6wFe1NVqXHLcXkvbfcAPwVig6By9PLwe8GYPMGfybIwgI2QkguZtrvl7h-BUcIb7wAhJXVO9vnR20sYNeFRmCn3Q9uv8pFOXFIb1Y6T3ExkKcaP-hL6WVA3h1j4o',
                          fit: BoxFit.cover,
                          errorBuilder: (ctx, err, stack) => const Icon(
                            Icons.person,
                            color: AppColors.primary,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    const Text(
                      'B-Star Parent',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.primary,
                        letterSpacing: -0.3,
                      ),
                    ),
                  ],
                ),
                actions: [
                  IconButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Notifikasi perkembangan anak aktif.'),
                          duration: Duration(seconds: 1),
                        ),
                      );
                    },
                    icon: const Icon(
                      Icons.notifications_outlined,
                      color: AppColors.primary,
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 8),
                ],
              ),

              // 2. Main Content
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.only(left: 20, right: 20, top: 12, bottom: 120),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Hero Section
                      const Text(
                        'Growth Journey',
                        style: TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: AppColors.onSurface,
                          letterSpacing: -0.4,
                        ),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        "Track your child's comprehensive development across 8 core aspects of brilliance.",
                        style: TextStyle(
                          fontSize: 13,
                          color: AppColors.onSurfaceVariant,
                          height: 1.4,
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Bento Grid (2 Columns, 8 aspects)
                      AnimatedBuilder(
                        animation: _progressAnimation,
                        builder: (context, child) {
                          return GridView.builder(
                            padding: EdgeInsets.zero,
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: _aspects.length,
                            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: 2,
                              crossAxisSpacing: 12,
                              mainAxisSpacing: 12,
                              mainAxisExtent: 96,
                            ),
                            itemBuilder: (ctx, idx) {
                              final aspect = _aspects[idx];
                              final animProgress = (aspect['progress'] as double) * _progressAnimation.value;
                              final animPercentage =
                                  (((aspect['percentage'] as int) * _progressAnimation.value)).round();

                              return InkWell(
                                onTap: () => _showAspectDetail(aspect),
                                borderRadius: BorderRadius.circular(16),
                                child: Container(
                                  padding: const EdgeInsets.all(12),
                                  decoration: BoxDecoration(
                                    color: AppColors.surfaceContainerLowest,
                                    borderRadius: BorderRadius.circular(16),
                                    border: Border.all(
                                      color: AppColors.outlineVariant.withAlpha(40),
                                    ),
                                    boxShadow: [
                                      BoxShadow(
                                        color: AppColors.primary.withAlpha(12),
                                        blurRadius: 16,
                                        offset: const Offset(0, 4),
                                      ),
                                    ],
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      // Top Row: Icon + Title
                                      Row(
                                        children: [
                                          Container(
                                            padding: const EdgeInsets.all(6),
                                            decoration: BoxDecoration(
                                              color: (aspect['bgOpacityColor'] as Color).withAlpha(25),
                                              borderRadius: BorderRadius.circular(8),
                                            ),
                                            child: Icon(
                                              aspect['icon'] as IconData,
                                              size: 18,
                                              color: aspect['color'] as Color,
                                            ),
                                          ),
                                          const SizedBox(width: 8),
                                          Expanded(
                                            child: Text(
                                              aspect['title'] as String,
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                              style: const TextStyle(
                                                fontSize: 13,
                                                fontWeight: FontWeight.bold,
                                                color: AppColors.onSurface,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),

                                      // Bottom Section: Level, Percentage, & Progress Bar
                                      Column(
                                        children: [
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                aspect['level'] as String,
                                                style: TextStyle(
                                                  fontSize: 10,
                                                  fontWeight: FontWeight.bold,
                                                  color: aspect['color'] as Color,
                                                ),
                                              ),
                                              Text(
                                                '$animPercentage%',
                                                style: const TextStyle(
                                                  fontSize: 10,
                                                  fontWeight: FontWeight.w500,
                                                  color: AppColors.outline,
                                                ),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 6),
                                          ClipRRect(
                                            borderRadius: BorderRadius.circular(4),
                                            child: LinearProgressIndicator(
                                              value: animProgress,
                                              minHeight: 6,
                                              backgroundColor: AppColors.surfaceContainer,
                                              valueColor: AlwaysStoppedAnimation<Color>(
                                                aspect['color'] as Color,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          );
                        },
                      ),

                      const SizedBox(height: 24),

                      // Weekly Summary CTA (Download Full Report)
                      Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: AppColors.primaryContainer,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primaryContainer.withAlpha(50),
                              blurRadius: 20,
                              offset: const Offset(0, 6),
                            ),
                          ],
                        ),
                        child: Stack(
                          children: [
                            // Abstract background glow orb
                            Positioned(
                              bottom: -20,
                              right: -20,
                              child: Container(
                                width: 120,
                                height: 120,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: Colors.white.withAlpha(25),
                                ),
                              ),
                            ),

                            // Content
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Download Full Report',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                ),
                                const SizedBox(height: 6),
                                const Text(
                                  'Get a detailed PDF analysis of all development sectors from the past 3 months.',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Colors.white70,
                                    height: 1.4,
                                  ),
                                ),
                                const SizedBox(height: 16),
                                ElevatedButton.icon(
                                  onPressed: _showExportPdfModal,
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.white,
                                    foregroundColor: AppColors.primary,
                                    elevation: 0,
                                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(30),
                                    ),
                                  ),
                                  icon: const Icon(Icons.download_rounded, size: 18),
                                  label: const Text(
                                    'Export PDF',
                                    style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),

          // Bottom Navigation Bar
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.surface.withAlpha(235),
                border: Border(
                  top: BorderSide(
                    color: AppColors.outlineVariant.withAlpha(80),
                    width: 1,
                  ),
                ),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withAlpha(16),
                    blurRadius: 20,
                    offset: const Offset(0, -4),
                  ),
                ],
              ),
              child: SafeArea(
                top: false,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildNavItem(0, Icons.home_rounded, 'Home'),
                    _buildNavItem(1, Icons.auto_stories_rounded, 'Journey'),
                    _buildNavItem(2, Icons.insights_rounded, 'Progress'),
                    _buildNavItem(3, Icons.person_rounded, 'Profile'),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = _currentNavIndex == index;
    return InkWell(
      onTap: () {
        if (index == 0) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (ctx) => const ParentDashboardScreen()),
          );
        } else if (index == 1) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (ctx) => const WeeklyJourneyScreen()),
          );
        } else if (index == 3) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Profil orang tua & anak: Leo Alexander (5 th)'),
              duration: Duration(milliseconds: 1200),
            ),
          );
        }
      },
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 22,
              color: isSelected ? AppColors.primary : AppColors.onSurfaceVariant,
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                color: isSelected ? AppColors.primary : AppColors.onSurfaceVariant,
              ),
            ),
            if (isSelected)
              Container(
                margin: const EdgeInsets.only(top: 2),
                width: 4,
                height: 4,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primary,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
