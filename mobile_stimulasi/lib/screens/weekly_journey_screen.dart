import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'development_progress_screen.dart';
import 'parent_dashboard_screen.dart';

class WeeklyJourneyScreen extends StatefulWidget {
  const WeeklyJourneyScreen({super.key});

  @override
  State<WeeklyJourneyScreen> createState() => _WeeklyJourneyScreenState();
}

class _WeeklyJourneyScreenState extends State<WeeklyJourneyScreen> {
  int _currentNavIndex = 1; // 1 = Journey

  // Tasks dataset matching the 8 tasks from the Weekly Journey specification
  final List<Map<String, dynamic>> _tasks = [
    {
      'id': 't1',
      'title': 'Morning Prayer',
      'desc': 'Spiritual grounding to start the day',
      'icon': Icons.self_improvement_rounded,
      'isCompleted': true,
    },
    {
      'id': 't2',
      'title': 'Building Blocks',
      'desc': 'Spatial reasoning & problem solving',
      'icon': Icons.extension_rounded,
      'isCompleted': false,
    },
    {
      'id': 't3',
      'title': 'Story Time',
      'desc': 'Language development & bonding',
      'icon': Icons.auto_stories_rounded,
      'isCompleted': true,
    },
    {
      'id': 't4',
      'title': 'Creative Arts',
      'desc': 'Fine motor skills expression',
      'icon': Icons.palette_rounded,
      'isCompleted': false,
    },
    {
      'id': 't5',
      'title': 'Sensory Play',
      'desc': 'Tactile texture & shape exploration',
      'icon': Icons.touch_app_rounded,
      'isCompleted': true,
    },
    {
      'id': 't6',
      'title': 'Alphabet Match',
      'desc': 'Early phonics & letter recognition',
      'icon': Icons.spellcheck_rounded,
      'isCompleted': true,
    },
    {
      'id': 't7',
      'title': 'Counting Steps',
      'desc': 'Active basic numeracy in motion',
      'icon': Icons.format_list_numbered_rounded,
      'isCompleted': true,
    },
    {
      'id': 't8',
      'title': 'Mindful Rest',
      'desc': 'Calm breathing & emotional balance',
      'icon': Icons.bedtime_rounded,
      'isCompleted': false,
    },
  ];

  bool _isBonusJoined = false;

  int get _completedCount => _tasks.where((t) => t['isCompleted'] == true).length;
  int get _totalCount => _tasks.length;
  double get _progress => _totalCount == 0 ? 0.0 : _completedCount / _totalCount;
  int get _percentage => (_progress * 100).round();

  void _toggleTask(int index) {
    setState(() {
      _tasks[index]['isCompleted'] = !(_tasks[index]['isCompleted'] as bool);
    });

    final isNowDone = _tasks[index]['isCompleted'] as bool;
    final taskTitle = _tasks[index]['title'] as String;

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: isNowDone ? AppColors.secondary : AppColors.onSurface,
        behavior: SnackBarBehavior.floating,
        duration: const Duration(milliseconds: 1400),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        content: Row(
          children: [
            Icon(
              isNowDone ? Icons.check_circle : Icons.radio_button_unchecked,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                isNowDone
                    ? '$taskTitle selesai! Progress bertambah.'
                    : '$taskTitle ditandai belum selesai.',
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showRewardDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surfaceContainerLowest,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 12),
            Container(
              width: 72,
              height: 72,
              decoration: BoxDecoration(
                color: AppColors.secondaryContainer,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.secondary.withAlpha(50),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: const Icon(
                Icons.emoji_events_rounded,
                size: 40,
                color: AppColors.secondary,
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Weekly Achievement Unlocked!',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.onSurface,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Selamat! Leo berhasil menyelesaikan seluruh rangkaian stimulasi "Cognitive Foundations" minggu ini.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                color: AppColors.onSurfaceVariant,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.tertiaryFixed.withAlpha(150),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.stars_rounded, color: AppColors.tertiary, size: 18),
                  SizedBox(width: 6),
                  Text(
                    '+150 Exploration XP',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                      color: AppColors.tertiary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 46,
              child: ElevatedButton(
                onPressed: () => Navigator.pop(ctx),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                child: const Text('Simpan ke Profil Anak'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showBonusAdventureModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
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
                Icon(Icons.forest_rounded, color: AppColors.secondary),
                SizedBox(width: 8),
                Text(
                  'Weekend Adventure Guide',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.onSurface,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            const Text(
              'Aktivitas alam terbuka bersama keluarga:',
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 6),
            const Text(
              '1. Berjalan di taman dan ajak Leo mengumpulkan 5 daun dengan bentuk berbeda.\n2. Rasakan tekstur daun (kasar, halus, bergerigi).\n3. Tempelkan daun di buku gambar dan diskusikan perbedaan warnanya.',
              style: TextStyle(fontSize: 12, height: 1.5, color: AppColors.onSurfaceVariant),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  setState(() {
                    _isBonusJoined = true;
                  });
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      backgroundColor: AppColors.secondary,
                      behavior: SnackBarBehavior.floating,
                      content: Text('Anda telah bergabung dalam Weekend Adventure!'),
                    ),
                  );
                },
                child: Text(_isBonusJoined ? 'Sudah Bergabung' : 'Konfirmasi Ikut Serta'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: Stack(
        children: [
          // Main Scrollable Area
          CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              // Top App Bar
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
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppColors.primaryFixed,
                      ),
                      child: ClipOval(
                        child: Image.network(
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuDQHfQMLp3Pa9gTmyLv3wu2gS1Yj2mURjakdRhRwL70vtBTzms6uV5Ldlgkw1KksNZlmJiDPwOmn7H7fpIkqGxH7ZMWf5v9oXhFkmfXY-I0-vGLJFsFuzKchZFvEC7dDayfv5A-DKT8CMzdaj-5SWdk0N_KbU3KAODbSestsaBFC7rlHOVChqPrYhlO9sThpSw4EB_R486HQy02Z_WpDLK0xOcGlHltjQbqUt8NPsngD5dNlLKPBnkWGlMhM1tt4EROEd4mKTwJztA',
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
                          content: Text('Notifikasi stimulasi aktif.'),
                          duration: Duration(seconds: 1),
                        ),
                      );
                    },
                    icon: const Icon(
                      Icons.notifications_outlined,
                      color: AppColors.primary,
                    ),
                  ),
                  const SizedBox(width: 8),
                ],
              ),

              // Main Body Content
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.only(left: 20, right: 20, top: 8, bottom: 120),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // 1. Hero Progress Section
                      Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceContainerLowest,
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primary.withAlpha(16),
                              blurRadius: 20,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                const Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Weekly Journey',
                                      style: TextStyle(
                                        fontSize: 22,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.onSurface,
                                        letterSpacing: -0.3,
                                      ),
                                    ),
                                    SizedBox(height: 2),
                                    Text(
                                      'Week 4: Cognitive Foundations',
                                      style: TextStyle(
                                        fontSize: 13,
                                        color: AppColors.onSurfaceVariant,
                                      ),
                                    ),
                                  ],
                                ),
                                Text(
                                  '$_percentage%',
                                  style: const TextStyle(
                                    fontSize: 28,
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.primary,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 16),

                            // Progress Bar
                            ClipRRect(
                              borderRadius: BorderRadius.circular(6),
                              child: LinearProgressIndicator(
                                value: _progress,
                                minHeight: 12,
                                backgroundColor: AppColors.surfaceContainer,
                                valueColor: const AlwaysStoppedAnimation<Color>(
                                  AppColors.secondaryFixedDim,
                                ),
                              ),
                            ),
                            const SizedBox(height: 12),

                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    const Icon(
                                      Icons.verified_rounded,
                                      size: 18,
                                      color: AppColors.secondaryFixedDim,
                                    ),
                                    const SizedBox(width: 6),
                                    Text(
                                      '$_completedCount of $_totalCount tasks completed',
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: AppColors.onSurfaceVariant,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                  ],
                                ),
                                const Text(
                                  '3 days left',
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.primary,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 22),

                      // 2. Checklist Header
                      const Text(
                        'Daily Growth Tasks',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: AppColors.onSurface,
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Checklist Grid (2 Columns)
                      GridView.builder(
                        padding: EdgeInsets.zero,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: _tasks.length,
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 10,
                          mainAxisSpacing: 10,
                          mainAxisExtent: 68,
                        ),
                        itemBuilder: (ctx, idx) {
                          final task = _tasks[idx];
                          final isDone = task['isCompleted'] as bool;
                          return InkWell(
                            onTap: () => _toggleTask(idx),
                            borderRadius: BorderRadius.circular(16),
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 250),
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                              decoration: BoxDecoration(
                                color: isDone
                                    ? AppColors.secondaryContainer.withAlpha(25)
                                    : AppColors.surfaceContainerLowest,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: isDone
                                      ? AppColors.secondaryContainer
                                      : AppColors.outlineVariant.withAlpha(60),
                                  width: isDone ? 1.5 : 1,
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: AppColors.primary.withAlpha(10),
                                    blurRadius: 10,
                                    offset: const Offset(0, 3),
                                  ),
                                ],
                              ),
                              child: Row(
                                children: [
                                  // Task Icon
                                  Container(
                                    width: 32,
                                    height: 32,
                                    decoration: BoxDecoration(
                                      color: AppColors.primary.withAlpha(25),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Icon(
                                      task['icon'] as IconData,
                                      size: 18,
                                      color: AppColors.primary,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  // Task Title
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          task['title'] as String,
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                            decoration: isDone
                                                ? TextDecoration.lineThrough
                                                : TextDecoration.none,
                                            color: isDone
                                                ? AppColors.outline
                                                : AppColors.onSurface,
                                          ),
                                        ),
                                        Text(
                                          task['desc'] as String,
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                          style: const TextStyle(
                                            fontSize: 9,
                                            color: AppColors.onSurfaceVariant,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  // Checkmark indicator
                                  Container(
                                    width: 22,
                                    height: 22,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: isDone
                                          ? AppColors.secondaryFixedDim
                                          : Colors.transparent,
                                      border: Border.all(
                                        color: isDone
                                            ? AppColors.secondaryFixedDim
                                            : AppColors.outlineVariant,
                                        width: 1.5,
                                      ),
                                    ),
                                    child: isDone
                                        ? const Icon(
                                            Icons.check,
                                            size: 14,
                                            color: Colors.white,
                                          )
                                        : null,
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),

                      const SizedBox(height: 14),

                      // Task 5: Interactive Learning Image Card (Bonus Journey)
                      Container(
                        decoration: BoxDecoration(
                          color: AppColors.surfaceContainerLowest,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primary.withAlpha(14),
                              blurRadius: 16,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            Stack(
                              children: [
                                ClipRRect(
                                  borderRadius: const BorderRadius.only(
                                    topLeft: Radius.circular(20),
                                    topRight: Radius.circular(20),
                                  ),
                                  child: Image.network(
                                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ6u_g6dMp4XvDJC0GBNeHqcOxOlTLl075gYgN1CfkkHEKmCtrDLQqq0jHyAhXSaxLF7d7jhlrykqxHWsFK0NeOYzCzrnF3ruk2RVbOJ-pbG_Q65XKGGm1ON2pwc_4CnTGAsfYMl-l7RsE6oOhoyCGkuMHaH-Vh66_f4yWsPupOGrfBZ8SfIlFd1tL6aKggZ5fQlCfVS1K903kognE6kvkU3Gnr56fI4j1DeTnWhOLns3eglSbonOee9oz0hAnIlYSXPxvRctMn2U',
                                    height: 110,
                                    width: double.infinity,
                                    fit: BoxFit.cover,
                                    errorBuilder: (ctx, err, stack) => Container(
                                      height: 110,
                                      color: AppColors.surfaceContainerLow,
                                      child: const Center(
                                        child: Icon(Icons.forest_rounded, color: AppColors.secondary),
                                      ),
                                    ),
                                  ),
                                ),
                                Positioned.fill(
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(20),
                                        topRight: Radius.circular(20),
                                      ),
                                      gradient: LinearGradient(
                                        colors: [
                                          Colors.transparent,
                                          Colors.black.withAlpha(160),
                                        ],
                                        begin: Alignment.topCenter,
                                        end: Alignment.bottomCenter,
                                      ),
                                    ),
                                  ),
                                ),
                                Positioned(
                                  bottom: 12,
                                  left: 14,
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                        decoration: BoxDecoration(
                                          color: AppColors.tertiary,
                                          borderRadius: BorderRadius.circular(12),
                                        ),
                                        child: const Text(
                                          'BONUS JOURNEY',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontSize: 9,
                                            fontWeight: FontWeight.bold,
                                            letterSpacing: 0.5,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(height: 4),
                                      const Text(
                                        'Weekend Adventure',
                                        style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  const Text(
                                    'Nature walk & leaf collection',
                                    style: TextStyle(
                                      fontSize: 12,
                                      color: AppColors.onSurfaceVariant,
                                    ),
                                  ),
                                  ElevatedButton(
                                    onPressed: _showBonusAdventureModal,
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: _isBonusJoined
                                          ? AppColors.secondary
                                          : AppColors.primaryContainer,
                                      foregroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      minimumSize: Size.zero,
                                    ),
                                    child: Text(
                                      _isBonusJoined ? 'Joined' : 'Join',
                                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 24),

                      // 3. Complete Journey Button
                      SizedBox(
                        width: double.infinity,
                        height: 52,
                        child: ElevatedButton(
                          onPressed: () {
                            if (_percentage >= 100) {
                              _showRewardDialog();
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  backgroundColor: AppColors.primary,
                                  behavior: SnackBarBehavior.floating,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  content: Text(
                                    'Selesaikan ${_totalCount - _completedCount} tugas tersisa untuk klaim lencana mingguan!',
                                  ),
                                ),
                              );
                            }
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: _percentage >= 100
                                ? AppColors.secondary
                                : AppColors.secondaryContainer,
                            foregroundColor: _percentage >= 100
                                ? Colors.white
                                : AppColors.onSecondaryContainer,
                            elevation: 2,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                _percentage >= 100
                                    ? Icons.emoji_events_rounded
                                    : Icons.stars_rounded,
                                size: 22,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                _percentage >= 100 ? 'Claim Reward!' : 'Complete Journey',
                                style: const TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      const SizedBox(height: 8),

                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 24.0),
                        child: Text(
                          "Unlock your child's Weekly Achievement Badge by completing all primary tasks.",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 11,
                            color: AppColors.onSurfaceVariant,
                            height: 1.4,
                          ),
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
        } else if (index == 2) {
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (ctx) => const DevelopmentProgressScreen()),
          );
        } else {
          setState(() {
            _currentNavIndex = index;
          });
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
