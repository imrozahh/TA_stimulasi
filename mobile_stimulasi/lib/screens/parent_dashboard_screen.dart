import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'development_progress_screen.dart';
import 'recommendations_screen.dart';
import 'weekly_journey_screen.dart';

class ParentDashboardScreen extends StatefulWidget {
  const ParentDashboardScreen({super.key});

  @override
  State<ParentDashboardScreen> createState() => _ParentDashboardScreenState();
}

class _ParentDashboardScreenState extends State<ParentDashboardScreen> {
  int _currentNavIndex = 0;
  double _weeklyProgress = 0.68;
  int _completedTasks = 12;
  final int _totalTasks = 18;

  final List<Map<String, dynamic>> _recentActivities = [
    {
      'title': 'Rhyme Master',
      'time': 'Yesterday, 4:30 PM',
      'points': '+50',
      'isPrimary': true,
    },
    {
      'title': 'Shape Sorter',
      'time': 'Oct 22',
      'points': '+30',
      'isPrimary': false,
    },
  ];

  void _showLogActivitySheet() {
    final titleController = TextEditingController();
    final noteController = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: EdgeInsets.only(
          left: 24,
          right: 24,
          top: 24,
          bottom: MediaQuery.of(ctx).viewInsets.bottom + 24,
        ),
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
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.outlineVariant,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Row(
              children: [
                Icon(Icons.add_task_rounded, color: AppColors.primary),
                SizedBox(width: 8),
                Text(
                  'Catat Aktivitas Stimulasi',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.onSurface,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            const Text(
              'Dokumentasikan aktivitas belajar anak di rumah hari ini',
              style: TextStyle(
                fontSize: 12,
                color: AppColors.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: titleController,
              decoration: const InputDecoration(
                labelText: 'Nama Aktivitas',
                hintText: 'Contoh: Membaca Cerita Bergambar',
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: noteController,
              maxLines: 2,
              decoration: const InputDecoration(
                labelText: 'Catatan Observasi Anak',
                hintText: 'Leo sangat antusias menebak alur gambar...',
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  if (titleController.text.trim().isNotEmpty) {
                    setState(() {
                      _recentActivities.insert(0, {
                        'title': titleController.text.trim(),
                        'time': 'Just now',
                        'points': '+40',
                        'isPrimary': true,
                      });
                      if (_completedTasks < _totalTasks) {
                        _completedTasks++;
                        _weeklyProgress = _completedTasks / _totalTasks;
                      }
                    });
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        backgroundColor: AppColors.secondary,
                        behavior: SnackBarBehavior.floating,
                        content: Row(
                          children: [
                            Icon(Icons.check_circle_outline, color: Colors.white),
                            SizedBox(width: 10),
                            Text('Aktivitas stimulasi berhasil dicatat! (+40 pts)'),
                          ],
                        ),
                      ),
                    );
                  }
                },
                child: const Text('Simpan & Tambah Poin'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showActivityDetails() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surfaceContainerLowest,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Row(
          children: [
            Icon(Icons.auto_awesome, color: AppColors.primary),
            SizedBox(width: 8),
            Text(
              'Creative Block Engineering',
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.network(
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCR2Od6rfsC_U6cbABkpBGSxcyORksa1kaS9FnCj41BOiZuQRDUgyiJNDNpHgbrwGoeCXYPTeE-7RcohnTTgqDn-k9gMU5eQfkFHjKV25jZO5OfFPDaHFwLWApdjY3pVwIs0Zovs7YXCvYsYP24yyUQQQG2z5YzK6ty-SsvMvTrGWVQZ2_Czjp-YQQsyHRM4xOsbPZdRqfa2SOt7hpusv6Bxym546NBOOWugNljEVAp-vAupxalpyvudQqbR8JOGSd7Kl-NIhifxrA',
                height: 120,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (ctx, err, stack) => Container(
                  height: 120,
                  color: AppColors.surfaceContainerLow,
                  child: const Center(child: Icon(Icons.broken_image, color: AppColors.outline)),
                ),
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Petunjuk Stimulasi:',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
            ),
            const SizedBox(height: 4),
            const Text(
              'Ajak anak menyusun balok bangunan secara bertingkat dengan variasi bentuk simetris selama 15 menit untuk melatih penalaran spasial dan motorik halus.',
              style: TextStyle(fontSize: 12, height: 1.4, color: AppColors.onSurfaceVariant),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Tutup'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              _showLogActivitySheet();
            },
            child: const Text('Mulai Sekarang'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: Stack(
        children: [
          // Main Scrollable Dashboard Content
          CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              // Top App Bar with Blur & Mother Portrait
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
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuBR3aMtoL-XlaU8fnFC04mqkf7DDWNvcVztxYqD45Czr5UW2rhTejp6TdFgxJmBDe8hx2YTVplxmIs8JKS-Q1nGHTn0x_Eir0_EapxZxoJw_VoYIhpYWz1bB9lDgXMzrEq5Cneah3lVBwpbHGbGvC2EbjtrhTQrEFraM34AG2jrpJKwsB2mcLty8QyGgegxNg1sNhkKbf5tD8G3CvXJesu-wtytzBVltLxe7Qqh2OXdlS6y2FsCMQwpCqELOW1vg8WdLn2U6buTdxg',
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
                          content: Text('Tidak ada pemberitahuan baru.'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                    icon: const Icon(Icons.notifications_outlined, color: AppColors.onSurfaceVariant),
                  ),
                  const SizedBox(width: 8),
                ],
              ),

              // Body Content
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.only(left: 20, right: 20, top: 12, bottom: 120),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // 1. Greeting Section
                      const Text(
                        'Wednesday, Oct 24',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: AppColors.onSurfaceVariant,
                        ),
                      ),
                      const SizedBox(height: 2),
                      const Text(
                        'Good morning, Sarah!',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: AppColors.onSurface,
                          letterSpacing: -0.2,
                        ),
                      ),

                      const SizedBox(height: 16),

                      // 2. Child Profile Bento Card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceContainerLowest,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primary.withAlpha(16),
                              blurRadius: 16,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 56,
                              height: 56,
                              decoration: BoxDecoration(
                                color: AppColors.secondaryContainer,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(16),
                                child: Image.network(
                                  'https://lh3.googleusercontent.com/aida-public/AB6AXuC3045AHdHcknWrf511bdZ0QibQYCeWu01ZJ7irLWKF9mgyAdWYJDPz2PSZXz46uP2n4fCJidrqn94vDfIFQmrAyLS3yto-tidUlJEJPN-KHSIdk8vCRQybh1TwelKGxD_sEZAxMP5XcVhE3A2C3YPSdGQVOVM7BrMfW_qTizfUul_jX-V4AbM5L0gfhuc5xrdLpqyPtngiyL8vqxohQbrJtN_L8BdwR6as7HT2Adp20rhq-l787wToEWejgDXAyEC2k_yoAbWvsZ8',
                                  fit: BoxFit.cover,
                                  errorBuilder: (ctx, err, stack) => const Icon(
                                    Icons.face_rounded,
                                    size: 32,
                                    color: AppColors.secondary,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      const Text(
                                        'Leo',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.onSurface,
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: AppColors.tertiaryFixed.withAlpha(120),
                                          borderRadius: BorderRadius.circular(12),
                                        ),
                                        child: const Text(
                                          'ADVANCED',
                                          style: TextStyle(
                                            fontSize: 9,
                                            fontWeight: FontWeight.bold,
                                            letterSpacing: 0.8,
                                            color: AppColors.tertiary,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 2),
                                  const Text(
                                    '5 yrs • Reception Class',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: AppColors.onSurfaceVariant,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Container(
                              width: 32,
                              height: 32,
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: AppColors.surfaceContainerHigh,
                              ),
                              child: IconButton(
                                padding: EdgeInsets.zero,
                                iconSize: 16,
                                icon: const Icon(Icons.edit_outlined, color: AppColors.onSurfaceVariant),
                                onPressed: () {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(content: Text('Profil anak terpilih: Leo')),
                                  );
                                },
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 14),

                      // 3. Weekly Journey Progress
                      InkWell(
                        onTap: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (ctx) => const WeeklyJourneyScreen(),
                            ),
                          );
                        },
                        borderRadius: BorderRadius.circular(16),
                        child: Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppColors.surfaceContainerLowest,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
                            gradient: LinearGradient(
                              colors: [
                                AppColors.primary.withAlpha(12),
                                AppColors.secondary.withAlpha(12),
                              ],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.primary.withAlpha(16),
                                blurRadius: 16,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Column(
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  const Row(
                                    children: [
                                      Icon(
                                        Icons.map_outlined,
                                        size: 20,
                                        color: AppColors.secondary,
                                      ),
                                      SizedBox(width: 8),
                                      Text(
                                        'Weekly Journey',
                                        style: TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.onSurface,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Text(
                                    '${(_weeklyProgress * 100).toInt()}%',
                                    style: const TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.primary,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 10),
                              ClipRRect(
                                borderRadius: BorderRadius.circular(6),
                                child: LinearProgressIndicator(
                                  value: _weeklyProgress,
                                  minHeight: 8,
                                  backgroundColor: AppColors.surfaceContainerHigh,
                                  valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
                                ),
                              ),
                              const SizedBox(height: 8),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    '$_completedTasks/$_totalTasks Tasks Completed',
                                    style: const TextStyle(
                                      fontSize: 11,
                                      color: AppColors.onSurfaceVariant,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                  const Text(
                                    '2d left',
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: AppColors.secondary,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),

                      const SizedBox(height: 14),

                      // 4. Development Summary Grid (2 Cards)
                      Row(
                        children: [
                          // Cognitive Card
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.all(14),
                              decoration: BoxDecoration(
                                color: AppColors.surfaceContainerLowest,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
                                boxShadow: [
                                  BoxShadow(
                                    color: AppColors.primary.withAlpha(10),
                                    blurRadius: 12,
                                    offset: const Offset(0, 3),
                                  ),
                                ],
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'COGNITIVE',
                                    style: TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                      letterSpacing: 0.5,
                                      color: AppColors.onSurfaceVariant,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  const Text(
                                    'Excellent',
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.onSurface,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(4),
                                    child: const LinearProgressIndicator(
                                      value: 0.85,
                                      minHeight: 5,
                                      backgroundColor: AppColors.surfaceContainerHigh,
                                      valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          // Social Card
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.all(14),
                              decoration: BoxDecoration(
                                color: AppColors.surfaceContainerLowest,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
                                boxShadow: [
                                  BoxShadow(
                                    color: AppColors.secondary.withAlpha(10),
                                    blurRadius: 12,
                                    offset: const Offset(0, 3),
                                  ),
                                ],
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'SOCIAL',
                                    style: TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                      letterSpacing: 0.5,
                                      color: AppColors.onSurfaceVariant,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  const Text(
                                    'Growing',
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.onSurface,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(4),
                                    child: const LinearProgressIndicator(
                                      value: 0.62,
                                      minHeight: 5,
                                      backgroundColor: AppColors.surfaceContainerHigh,
                                      valueColor: AlwaysStoppedAnimation<Color>(AppColors.secondary),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 20),

                      // 5. Recommendation Preview (Today's Pick)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            "Today's Pick",
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color: AppColors.onSurface,
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (ctx) => const RecommendationsScreen(),
                                ),
                              );
                            },
                            child: const Text(
                              'View All',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: AppColors.primary,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),

                      // Activity Card (Creative Block Engineering)
                      InkWell(
                        onTap: _showActivityDetails,
                        borderRadius: BorderRadius.circular(16),
                        child: Container(
                          height: 96,
                          decoration: BoxDecoration(
                            color: AppColors.surfaceContainerLowest,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.primary.withAlpha(12),
                                blurRadius: 14,
                                offset: const Offset(0, 3),
                              ),
                            ],
                          ),
                          child: Row(
                            children: [
                              ClipRRect(
                                borderRadius: const BorderRadius.only(
                                  topLeft: Radius.circular(16),
                                  bottomLeft: Radius.circular(16),
                                ),
                                child: Image.network(
                                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCR2Od6rfsC_U6cbABkpBGSxcyORksa1kaS9FnCj41BOiZuQRDUgyiJNDNpHgbrwGoeCXYPTeE-7RcohnTTgqDn-k9gMU5eQfkFHjKV25jZO5OfFPDaHFwLWApdjY3pVwIs0Zovs7YXCvYsYP24yyUQQQG2z5YzK6ty-SsvMvTrGWVQZ2_Czjp-YQQsyHRM4xOsbPZdRqfa2SOt7hpusv6Bxym546NBOOWugNljEVAp-vAupxalpyvudQqbR8JOGSd7Kl-NIhifxrA',
                                  width: 100,
                                  height: 96,
                                  fit: BoxFit.cover,
                                  errorBuilder: (ctx, err, stack) => Container(
                                    width: 100,
                                    color: AppColors.surfaceContainerLow,
                                    child: const Center(
                                      child: Icon(Icons.extension_rounded, color: AppColors.primary),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      const Text(
                                        'ACTIVITY',
                                        style: TextStyle(
                                          fontSize: 9,
                                          fontWeight: FontWeight.bold,
                                          letterSpacing: 0.8,
                                          color: AppColors.secondary,
                                        ),
                                      ),
                                      const SizedBox(height: 2),
                                      const Text(
                                        'Creative Block Engineering',
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.onSurface,
                                        ),
                                      ),
                                      const SizedBox(height: 6),
                                      const Row(
                                        children: [
                                          Icon(
                                            Icons.schedule_rounded,
                                            size: 14,
                                            color: AppColors.onSurfaceVariant,
                                          ),
                                          SizedBox(width: 4),
                                          Text(
                                            '15m',
                                            style: TextStyle(
                                              fontSize: 11,
                                              color: AppColors.onSurfaceVariant,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      const SizedBox(height: 20),

                      // 6. Recent Activities
                      const Text(
                        'Recent Progress',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: AppColors.onSurface,
                        ),
                      ),
                      const SizedBox(height: 10),

                      // List of recent progress items
                      ..._recentActivities.map((act) {
                        final isPrimary = act['isPrimary'] as bool;
                        return Container(
                          margin: const EdgeInsets.only(bottom: 8),
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: AppColors.surfaceContainerLow,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Row(
                            children: [
                              Container(
                                width: 32,
                                height: 32,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: isPrimary
                                      ? AppColors.primary.withAlpha(25)
                                      : AppColors.secondary.withAlpha(25),
                                ),
                                child: Icon(
                                  Icons.check_circle,
                                  size: 18,
                                  color: isPrimary ? AppColors.primary : AppColors.secondary,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      act['title'] as String,
                                      style: const TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.onSurface,
                                      ),
                                    ),
                                    Text(
                                      act['time'] as String,
                                      style: const TextStyle(
                                        fontSize: 10,
                                        color: AppColors.onSurfaceVariant,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Text(
                                act['points'] as String,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: isPrimary ? AppColors.primary : AppColors.secondary,
                                ),
                              ),
                            ],
                          ),
                        );
                      }),
                    ],
                  ),
                ),
              ),
            ],
          ),

          // Floating Action Button (Log New Activity)
          Positioned(
            bottom: 96,
            right: 20,
            child: FloatingActionButton(
              onPressed: _showLogActivitySheet,
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
              child: const Icon(Icons.add, size: 28),
            ),
          ),

          // Glassmorphic Bottom Navigation Bar
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
        if (index == 1) {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (ctx) => const WeeklyJourneyScreen(),
            ),
          );
        } else if (index == 2) {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (ctx) => const DevelopmentProgressScreen(),
            ),
          );
        } else {
          setState(() {
            _currentNavIndex = index;
          });
          if (index != 0) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Menu $label dipilih.'),
                duration: const Duration(milliseconds: 1200),
              ),
            );
          }
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
