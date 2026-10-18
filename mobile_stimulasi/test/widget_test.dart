import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_stimulasi/main.dart';
import 'package:mobile_stimulasi/screens/parent_dashboard_screen.dart';
import 'package:mobile_stimulasi/screens/recommendations_screen.dart';
import 'package:mobile_stimulasi/screens/weekly_journey_screen.dart';
import 'package:mobile_stimulasi/screens/development_progress_screen.dart';

void main() {
  testWidgets('B-Star LoginScreen renders correctly smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const BStarApp());
    expect(find.text('B-Star ECD'), findsOneWidget);
    expect(find.text('Masuk Sekarang'), findsOneWidget);
  });

  testWidgets('B-Star ParentDashboardScreen renders correctly smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: ParentDashboardScreen(),
      ),
    );
    expect(find.text('B-Star Parent'), findsOneWidget);
    expect(find.text('Good morning, Sarah!'), findsOneWidget);
    expect(find.text('Weekly Journey'), findsOneWidget);
  });

  testWidgets('B-Star RecommendationsScreen renders correctly smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: RecommendationsScreen(),
      ),
    );
    expect(find.text('Weekly Recommendations'), findsOneWidget);
    expect(find.text("Teacher's Insights"), findsOneWidget);
    expect(find.text('Community Favourites'), findsOneWidget);
  });

  testWidgets('B-Star WeeklyJourneyScreen renders correctly smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: WeeklyJourneyScreen(),
      ),
    );
    expect(find.text('Weekly Journey'), findsOneWidget);
    expect(find.text('Week 4: Cognitive Foundations'), findsOneWidget);
    expect(find.text('Daily Growth Tasks'), findsOneWidget);
    expect(find.text('Morning Prayer'), findsOneWidget);
    expect(find.text('Weekend Adventure'), findsOneWidget);
    expect(find.text('Complete Journey'), findsOneWidget);
  });

  testWidgets('B-Star DevelopmentProgressScreen renders correctly smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: DevelopmentProgressScreen(),
      ),
    );
    expect(find.text('Growth Journey'), findsOneWidget);
    expect(find.text('Spiritual'), findsOneWidget);
    expect(find.text('Cognitive'), findsOneWidget);
    expect(find.text('Linguistic'), findsOneWidget);
    expect(find.text('Download Full Report'), findsOneWidget);
    expect(find.text('Export PDF'), findsOneWidget);
  });
}


