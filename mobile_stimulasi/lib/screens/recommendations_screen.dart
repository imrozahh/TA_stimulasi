import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'parent_dashboard_screen.dart';
import 'weekly_journey_screen.dart';

class RecommendationsScreen extends StatefulWidget {
  const RecommendationsScreen({super.key});

  @override
  State<RecommendationsScreen> createState() => _RecommendationsScreenState();
}

class _RecommendationsScreenState extends State<RecommendationsScreen> {
  int _currentNavIndex = 2; // 2 is Progress / Recommendations
  int _likeCount1 = 128;
  bool _isLiked1 = false;
  int _likeCount2 = 94;
  bool _isLiked2 = false;

  void _showToast(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppColors.onSurface,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        duration: const Duration(seconds: 2),
        content: Row(
          children: [
            const Icon(Icons.bookmark_added_rounded, color: AppColors.secondary, size: 20),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                message,
                style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 13),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showInsightDetails(String title, String teacher, String domain, String description, String advice) {
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
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppColors.primaryFixed,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    domain,
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: AppColors.primary,
                    ),
                  ),
                ),
                Text(
                  'Oleh $teacher',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: AppColors.onSurfaceVariant,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.onSurface,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              description,
              style: const TextStyle(
                fontSize: 13,
                height: 1.4,
                color: AppColors.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.surfaceContainerLow,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.outlineVariant.withAlpha(80)),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.lightbulb_rounded, color: AppColors.tertiary, size: 20),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Saran Penerapan di Rumah:',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: AppColors.onSurface,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          advice,
                          style: const TextStyle(
                            fontSize: 12,
                            height: 1.4,
                            color: AppColors.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(ctx);
                  _showToast('Insight berhasil disimpan ke perpustakaan Anda');
                },
                child: const Text('Simpan Rekomendasi'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showFullAssessmentDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surfaceContainerLowest,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Row(
          children: [
            Icon(Icons.assessment_rounded, color: AppColors.primary),
            SizedBox(width: 8),
            Text('Full Assessment Summary', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Perkembangan Holistik Leo (Minggu ke-4):',
              style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant),
            ),
            const SizedBox(height: 12),
            _buildAssessmentBar('Language & Speech', 0.82, '82%', AppColors.primary),
            const SizedBox(height: 10),
            _buildAssessmentBar('Emotional Quotient', 0.64, '64%', AppColors.secondary),
            const SizedBox(height: 10),
            _buildAssessmentBar('Fine Motor Skills', 0.90, '90%', AppColors.primary),
            const SizedBox(height: 10),
            _buildAssessmentBar('Social Adaptation', 0.78, '78%', AppColors.secondary),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Tutup'),
          ),
        ],
      ),
    );
  }

  Widget _buildAssessmentBar(String label, double value, String percent, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
            Text(percent, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: color)),
          ],
        ),
        const SizedBox(height: 4),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: value,
            minHeight: 6,
            backgroundColor: AppColors.surfaceContainerHigh,
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: Stack(
        children: [
          // Scrollable Content
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
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: AppColors.primaryFixedDim, width: 2),
                      ),
                      child: ClipOval(
                        child: Image.network(
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuD0BZhplVR6td-GRiEfCXhJBbbQf_qKSIPrHR2thatyBYqOjO8EIb6ClfEK2NsEQtrp8EIhxJpu2xtMfJU-hZ-7THjrtZmH5Cj01hxh-inZboitIZVAdUSQFZytNYx8ivTxDGn5k9XeJ5urWsAznpebhjs-J3R4ns755H_0AOlWvKF2jDaisb9fCkwls7i0BzL5O3dEhi5bVPcXyFo-uxOBF_p8szscu-HkWOFWhNPz3LI0K5cqBCUJEia4rOK_120UU27lST8fPAY',
                          fit: BoxFit.cover,
                          errorBuilder: (ctx, err, stack) => const Icon(Icons.person, color: AppColors.primary),
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
                      _showToast('Insight rekomendasi terbaru telah diperbarui!');
                    },
                    icon: const Icon(Icons.notifications_outlined, color: AppColors.primary),
                  ),
                  const SizedBox(width: 8),
                ],
              ),

              // Main Body Content
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.only(left: 20, right: 20, top: 8, bottom: 100),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // 1. Hero Section / Title
                      const Text(
                        'Weekly Recommendations',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: AppColors.onSurface,
                          letterSpacing: -0.2,
                        ),
                      ),
                      const SizedBox(height: 2),
                      const Text(
                        "Personalized insights for your child's growth",
                        style: TextStyle(
                          fontSize: 12,
                          color: AppColors.onSurfaceVariant,
                        ),
                      ),

                      const SizedBox(height: 20),

                      // 2. Teacher's Insights (Bento Style)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.school_rounded, size: 20, color: AppColors.secondary),
                              SizedBox(width: 6),
                              Text(
                                "Teacher's Insights",
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.onSurface,
                                ),
                              ),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: AppColors.surfaceContainer,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Text(
                              'New',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: AppColors.onSurfaceVariant,
                              ),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 12),

                      // Principal Recommendation Card
                      GestureDetector(
                        onTap: () => _showInsightDetails(
                          'Encourage more social play',
                          'Ms. Clara',
                          'Social Development',
                          'Leo showed great enthusiasm during group activities today. Setting up a weekend playdate could help solidify these new social bonds.',
                          'Ajak 1-2 teman sekolah bermain balok bersama di taman pada akhir pekan untuk melatih giliran berbicara dan empati.',
                        ),
                        child: Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
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
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    width: 48,
                                    height: 48,
                                    decoration: BoxDecoration(
                                      color: AppColors.primaryFixed,
                                      borderRadius: BorderRadius.circular(14),
                                    ),
                                    child: const Center(
                                      child: Icon(Icons.psychology_rounded, color: AppColors.primary, size: 26),
                                    ),
                                  ),
                                  const SizedBox(width: 14),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Social Development',
                                          style: TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.primary,
                                          ),
                                        ),
                                        const SizedBox(height: 2),
                                        const Text(
                                          'Encourage more social play',
                                          style: TextStyle(
                                            fontSize: 15,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.onSurface,
                                          ),
                                        ),
                                        const SizedBox(height: 6),
                                        const Text(
                                          'Leo showed great enthusiasm during group activities today. Setting up a weekend playdate could help solidify these new social bonds.',
                                          style: TextStyle(
                                            fontSize: 12,
                                            height: 1.4,
                                            color: AppColors.onSurfaceVariant,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 16),
                              Container(
                                padding: const EdgeInsets.only(top: 12),
                                decoration: BoxDecoration(
                                  border: Border(
                                    top: BorderSide(color: AppColors.surfaceContainerHigh.withAlpha(150)),
                                  ),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      children: [
                                        ClipOval(
                                          child: Image.network(
                                            'https://lh3.googleusercontent.com/aida-public/AB6AXuCekiPjP--t1LcSYYM3t0p73BL79Elbx5v_ftGv5jcexXGllLteVt9qWgJAl6vMq-STf6WcAqoa-5hs6W2HUURz-DVj7iFrd43kmk-oMWuX6cR_MwfdnE0yDGk9A9-uvc3MejR1qj78DmPiii6QwK_QA2flI4O9yoTBxLhAgQWYaYhRU2TyZc5vpg2RblpxkrgPj5zjhm38Yo0mKYtLFw_BpmSOFGOcDyDvOUJLxv17ICCF7pCHXjQVeoq8E323sDf-S_FZA3r5tbs',
                                            width: 24,
                                            height: 24,
                                            fit: BoxFit.cover,
                                            errorBuilder: (ctx, err, stack) => const Icon(Icons.person, size: 20),
                                          ),
                                        ),
                                        const SizedBox(width: 8),
                                        const Text(
                                          'Ms. Clara',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.w500,
                                            color: AppColors.onSurfaceVariant,
                                          ),
                                        ),
                                      ],
                                    ),
                                    const Row(
                                      children: [
                                        Text(
                                          'View details',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.primary,
                                          ),
                                        ),
                                        SizedBox(width: 4),
                                        Icon(Icons.chevron_right_rounded, size: 18, color: AppColors.primary),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      const SizedBox(height: 12),

                      // Secondary Recommendation Card (Tactile Art Session)
                      GestureDetector(
                        onTap: () => _showInsightDetails(
                          'Tactile Art Session',
                          'Ms. Clara',
                          'Fine Motor Skills',
                          'Try using finger paints or clay this evening. Leo is currently focusing on grip strength.',
                          'Sediakan plastisin atau tanah liat aman anak selama 15 menit untuk melatih kekuatan otot jemari dan telapak tangan.',
                        ),
                        child: Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: AppColors.outlineVariant.withAlpha(60)),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.secondary.withAlpha(14),
                                blurRadius: 20,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    width: 48,
                                    height: 48,
                                    decoration: BoxDecoration(
                                      color: AppColors.secondaryContainer,
                                      borderRadius: BorderRadius.circular(14),
                                    ),
                                    child: const Center(
                                      child: Icon(Icons.palette_rounded, color: AppColors.secondary, size: 26),
                                    ),
                                  ),
                                  const SizedBox(width: 14),
                                  const Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'Fine Motor Skills',
                                          style: TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.secondary,
                                          ),
                                        ),
                                        SizedBox(height: 2),
                                        Text(
                                          'Tactile Art Session',
                                          style: TextStyle(
                                            fontSize: 15,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.onSurface,
                                          ),
                                        ),
                                        SizedBox(height: 6),
                                        Text(
                                          'Try using finger paints or clay this evening. Leo is currently focusing on grip strength.',
                                          style: TextStyle(
                                            fontSize: 12,
                                            height: 1.4,
                                            color: AppColors.onSurfaceVariant,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 14),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                                decoration: BoxDecoration(
                                  color: AppColors.surfaceContainerLow,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: const Row(
                                  children: [
                                    Icon(Icons.star_rate_rounded, size: 18, color: AppColors.secondary),
                                    SizedBox(width: 8),
                                    Text(
                                      'Milestone: Precision Mastery',
                                      style: TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                        color: AppColors.onSurface,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),

                      const SizedBox(height: 24),

                      // 3. Parent Community Recommendations (Horizontal Scroll)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Row(
                            children: [
                              Icon(Icons.groups_rounded, size: 20, color: AppColors.tertiary),
                              SizedBox(width: 6),
                              Text(
                                'Community Favourites',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.onSurface,
                                ),
                              ),
                            ],
                          ),
                          InkWell(
                            onTap: () {
                              _showToast('Menampilkan seluruh favorit komunitas orang tua');
                            },
                            child: const Text(
                              'See all',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                color: AppColors.primary,
                              ),
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 12),

                      SizedBox(
                        height: 236,
                        child: ListView(
                          scrollDirection: Axis.horizontal,
                          physics: const BouncingScrollPhysics(),
                          children: [
                            // Community Card 1 (Nightly Reading Nook)
                            Container(
                              width: 250,
                              margin: const EdgeInsets.only(right: 14),
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: Colors.white,
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
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Stack(
                                    children: [
                                      ClipRRect(
                                        borderRadius: BorderRadius.circular(16),
                                        child: Image.network(
                                          'https://lh3.googleusercontent.com/aida-public/AB6AXuDYPj7nmXOQa7VPn_fJlDrrpEe3nZ8iBkRCDvxoeLNhpWOprVgNUUUm8WRmroOsB_w44t-rxYpq95HHbLrR82PIYs_TaEbjRyy-8AdHRK0SPRCDKOzimGXbDITjDabPNo0WArHVrtL4Comtg2mgjwwWHPczof4yP5Y83-2nhfPf4G1Z-A3TyB51x363y5QMI5iLS0PUKqxwZaw76Cv8hHUbHplBxwolVWaXS4rsH1kjZB2_a3S8OLNRNk0HrpsY6K_bNEXW4EnSzGI',
                                          height: 105,
                                          width: double.infinity,
                                          fit: BoxFit.cover,
                                          errorBuilder: (ctx, err, stack) => Container(
                                            height: 105,
                                            color: AppColors.surfaceContainerLow,
                                          ),
                                        ),
                                      ),
                                      Positioned(
                                        top: 6,
                                        right: 6,
                                        child: GestureDetector(
                                          onTap: () {
                                            setState(() {
                                              _isLiked1 = !_isLiked1;
                                              _likeCount1 += _isLiked1 ? 1 : -1;
                                            });
                                          },
                                          child: Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                            decoration: BoxDecoration(
                                              color: Colors.white.withAlpha(235),
                                              borderRadius: BorderRadius.circular(20),
                                            ),
                                            child: Row(
                                              children: [
                                                Icon(
                                                  _isLiked1 ? Icons.favorite_rounded : Icons.favorite_border_rounded,
                                                  size: 13,
                                                  color: AppColors.tertiary,
                                                ),
                                                const SizedBox(width: 4),
                                                Text(
                                                  '$_likeCount1',
                                                  style: const TextStyle(
                                                    fontSize: 10,
                                                    fontWeight: FontWeight.bold,
                                                    color: AppColors.tertiary,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Nightly Reading Nook',
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.onSurface,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  const Text(
                                    '"We found that a dedicated space increased interest in books by 40%..."',
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: AppColors.onSurfaceVariant,
                                      height: 1.3,
                                    ),
                                  ),
                                  const Spacer(),
                                  Row(
                                    children: [
                                      ClipOval(
                                        child: Image.network(
                                          'https://lh3.googleusercontent.com/aida-public/AB6AXuD4aXVrOS9bZ6lg8acXOTeQ7udmoztGpegEDLaM-uAGLhKhfrNx_yOa41QWaHipSn4EJpvnvXCdneD3yYqiOZQDeErega67oh4u6vLIr3t3CbwALbgf0aN2gzk4swVu9I8BvaXHGmjkBkweFRBXpjoBy65f-LRBlKSZA9tV0JfAybYUCdlqL7ZKPLs8RkA0GJ9pDmnvY3AiHxvko8SFEKDbr8Ugl4G5SbCX2iVzJTfc9StuVMHC0BigX_wbKcIRLSa2RSmCAds6J5Q',
                                          width: 24,
                                          height: 24,
                                          fit: BoxFit.cover,
                                          errorBuilder: (ctx, err, stack) => const Icon(Icons.person, size: 20),
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      const Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'Sarah Jenkins',
                                            style: TextStyle(
                                              fontSize: 11,
                                              fontWeight: FontWeight.bold,
                                              color: AppColors.onSurface,
                                            ),
                                          ),
                                          Text(
                                            'Parent of 5yo',
                                            style: TextStyle(
                                              fontSize: 9,
                                              color: AppColors.onSurfaceVariant,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),

                            // Community Card 2 (Patience Garden)
                            Container(
                              width: 250,
                              margin: const EdgeInsets.only(right: 14),
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: Colors.white,
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
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Stack(
                                    children: [
                                      ClipRRect(
                                        borderRadius: BorderRadius.circular(16),
                                        child: Image.network(
                                          'https://lh3.googleusercontent.com/aida-public/AB6AXuBhY3HBf65IIJSqZhgx0L_7fENu-KBus5k8SCi7aFH3G6fNKhE7ua4B8Lz55r--RjZ73ocIiPNVNicb1JS14erKvFvSE-FjMjd6gEOZc22MmcLsoCwKMI682Ltg0y0vqBX72teLtV-8Ja6DZqsLvNp1DjzFOdHqFrRXz-YSfCIGObhddz9itPff2TAkQp0KRHH7N-KQU5oJkIC_1CSG_MPY2iPLsE2NmVIPIuZXyFrPBcfirT8yO4dvak9LSvAsdPayJJnGX7eRzpk',
                                          height: 105,
                                          width: double.infinity,
                                          fit: BoxFit.cover,
                                          errorBuilder: (ctx, err, stack) => Container(
                                            height: 105,
                                            color: AppColors.surfaceContainerLow,
                                          ),
                                        ),
                                      ),
                                      Positioned(
                                        top: 6,
                                        right: 6,
                                        child: GestureDetector(
                                          onTap: () {
                                            setState(() {
                                              _isLiked2 = !_isLiked2;
                                              _likeCount2 += _isLiked2 ? 1 : -1;
                                            });
                                          },
                                          child: Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                            decoration: BoxDecoration(
                                              color: Colors.white.withAlpha(235),
                                              borderRadius: BorderRadius.circular(20),
                                            ),
                                            child: Row(
                                              children: [
                                                Icon(
                                                  _isLiked2 ? Icons.favorite_rounded : Icons.favorite_border_rounded,
                                                  size: 13,
                                                  color: AppColors.tertiary,
                                                ),
                                                const SizedBox(width: 4),
                                                Text(
                                                  '$_likeCount2',
                                                  style: const TextStyle(
                                                    fontSize: 10,
                                                    fontWeight: FontWeight.bold,
                                                    color: AppColors.tertiary,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  const Text(
                                    'Patience Garden',
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.onSurface,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  const Text(
                                    '"Watching a bean sprout taught my 4-year old more about waiting than any talk..."',
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: AppColors.onSurfaceVariant,
                                      height: 1.3,
                                    ),
                                  ),
                                  const Spacer(),
                                  Row(
                                    children: [
                                      ClipOval(
                                        child: Image.network(
                                          'https://lh3.googleusercontent.com/aida-public/AB6AXuCTIyuVdoMb8tlJWvIR6G8VdjXqqWgosXea-0HSI3TQH9B41v4FVoBQFS7w2CvCQTCE5D99Rwr3s8yTVd0re2eh4M6Fnk0ANP23ok74SHeELkhSQSgw3mMkM46E8OTBvN43r6GeE-kwQrwTYm3RYxMtdbSUSFC41m2U3qWgz58YeAwqonHCxNWGAcTJagXcB5MPM24gLwuNNVBn0ObcCVNoevjqPuJ5mxG-vZfMPz7gmC7615axD02q0NntW7PrfR_QOGkwZ1j0he8',
                                          width: 24,
                                          height: 24,
                                          fit: BoxFit.cover,
                                          errorBuilder: (ctx, err, stack) => const Icon(Icons.person, size: 20),
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      const Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'David Chen',
                                            style: TextStyle(
                                              fontSize: 11,
                                              fontWeight: FontWeight.bold,
                                              color: AppColors.onSurface,
                                            ),
                                          ),
                                          Text(
                                            'Parent of 4yo',
                                            style: TextStyle(
                                              fontSize: 9,
                                              color: AppColors.onSurfaceVariant,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 24),

                      // 4. Learning Journey - Progress Quick Glance (Glass Card)
                      Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: Colors.white),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primary.withAlpha(20),
                              blurRadius: 30,
                              offset: const Offset(0, 8),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Learning Journey',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.onSurface,
                                      ),
                                    ),
                                    SizedBox(height: 2),
                                    Text(
                                      "This Week's Focus",
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: AppColors.onSurfaceVariant,
                                      ),
                                    ),
                                  ],
                                ),
                                Container(
                                  width: 48,
                                  height: 48,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    border: Border.all(
                                      color: AppColors.secondaryContainer,
                                      width: 4,
                                    ),
                                  ),
                                  child: const Center(
                                    child: Text(
                                      '75%',
                                      style: TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.onSurface,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 18),

                            // Language Skills Progress
                            _buildProgressRow(
                              Icons.translate_rounded,
                              'Language Skills',
                              '82%',
                              0.82,
                              AppColors.primary,
                            ),

                            const SizedBox(height: 14),

                            // Emotional Quotient Progress
                            _buildProgressRow(
                              Icons.diversity_3_rounded,
                              'Emotional Quotient',
                              '64%',
                              0.64,
                              AppColors.secondary,
                            ),

                            const SizedBox(height: 20),

                            SizedBox(
                              width: double.infinity,
                              height: 48,
                              child: ElevatedButton(
                                onPressed: _showFullAssessmentDialog,
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: AppColors.primaryContainer,
                                  foregroundColor: Colors.white,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(14),
                                  ),
                                  elevation: 0,
                                ),
                                child: const Text(
                                  'View Full Assessment',
                                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                ),
                              ),
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

  Widget _buildProgressRow(IconData icon, String title, String percentage, double value, Color color) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Icon(icon, size: 16, color: color),
                const SizedBox(width: 6),
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: AppColors.onSurface,
                  ),
                ),
              ],
            ),
            Text(
              percentage,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: AppColors.onSurfaceVariant,
              ),
            ),
          ],
        ),
        const SizedBox(height: 6),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: value,
            minHeight: 8,
            backgroundColor: AppColors.surfaceContainer,
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
        ),
      ],
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
