import React, { useState, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function Classification({ onLogout, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('BS-1024');
  const [toastMessage, setToastMessage] = useState(null);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [showObservationModal, setShowObservationModal] = useState(false);

  // Student classification database based on C4.5 Decision Tree model
  const classificationRecords = {
    'BS-1024': {
      id: 'BS-1024',
      name: 'Mateo Silva',
      grade: 'Kindergarten',
      dataPointsCount: 42,
      domainsCount: 5,
      status: 'Meeting Expectations',
      statusType: 'meeting',
      confidence: '94.8%',
      entropy: '0.042',
      decisionPath:
        'Node 4.5 [Social >= 8] -> Node 2.1 [Cognitive >= 7] -> Class: MEETING_EXPECTATIONS. The entropy at the leaf node is 0.042, indicating a very stable classification.',
      predictors: [
        'Cognitive Pattern: Abstract Reasoning (High)',
        'Social Integration: Peer Interaction (Stable)',
        'Motor Proficiency: Fine Skills (Advanced)',
      ],
      minorObservation: {
        title: 'Minor Observation',
        badge: 'Needs Attention: Verbal',
        text: 'While overall expectations are met, "Verbal Articulation" score (6.2) sits near the lower threshold for this age cohort. Monitoring is suggested for the next 30 days.',
      },
      domains: [
        { name: 'Cognitive Development', score: 8.8, percent: 88, status: 'primary' },
        { name: 'Socio-Emotional Maturity', score: 7.5, percent: 75, status: 'primary' },
        { name: 'Linguistic Proficiency', score: 6.2, percent: 62, status: 'tertiary' },
        { name: 'Physical Coordination', score: 9.1, percent: 91, status: 'primary' },
      ],
      comparatives: {
        growth: '+12%',
        peerPercentile: 'Top 15%',
        skillTier: 'Level 4',
      },
      assessmentDate: 'Oct 24, 2023',
    },
    'BS-1025': {
      id: 'BS-1025',
      name: 'Amara Vance',
      grade: 'Pre-K 4',
      dataPointsCount: 38,
      domainsCount: 5,
      status: 'Needs Attention',
      statusType: 'attention',
      confidence: '89.2%',
      entropy: '0.086',
      decisionPath:
        'Node 3.2 [Speech <= 5.5] -> Node 1.8 [Sensory >= 6.0] -> Class: NEEDS_ATTENTION. High priority speech intervention suggested.',
      predictors: [
        'Cognitive Pattern: Visual Sequencing (Normal)',
        'Speech Articulation: Phonic Delay (Requires Support)',
        'Motor Proficiency: Balance & Gait (Steady)',
      ],
      minorObservation: {
        title: 'Critical Observation',
        badge: 'Urgent: Expressive Language',
        text: 'Language milestones show 1.5 standard deviation lag in expressive sentence building. Recommended for targeted early intervention therapy.',
      },
      domains: [
        { name: 'Cognitive Development', score: 7.2, percent: 72, status: 'primary' },
        { name: 'Socio-Emotional Maturity', score: 6.8, percent: 68, status: 'primary' },
        { name: 'Linguistic Proficiency', score: 4.8, percent: 48, status: 'error' },
        { name: 'Physical Coordination', score: 7.9, percent: 79, status: 'primary' },
      ],
      comparatives: {
        growth: '+4%',
        peerPercentile: 'Needs Support (42%)',
        skillTier: 'Level 2',
      },
      assessmentDate: 'Nov 04, 2023',
    },
    'BS-1026': {
      id: 'BS-1026',
      name: 'Julian Parks',
      grade: 'Kindergarten',
      dataPointsCount: 46,
      domainsCount: 5,
      status: 'Exceeding Expectations',
      statusType: 'exceeding',
      confidence: '97.4%',
      entropy: '0.018',
      decisionPath:
        'Node 5.1 [Logic >= 9.0] -> Node 4.8 [Social >= 8.5] -> Class: EXCEEDING_EXPECTATIONS. Extremely pure leaf distribution.',
      predictors: [
        'Cognitive Pattern: Advanced Math & Symmetry (Superior)',
        'Social Leadership: Cooperative Play (High)',
        'Motor Coordination: Spatial Precision (High)',
      ],
      minorObservation: {
        title: 'Acceleration Opportunity',
        badge: 'Gifted Exploration: Logic',
        text: 'Julian shows readiness for early grade 1 spatial reasoning puzzles and advanced vocabulary storytelling.',
      },
      domains: [
        { name: 'Cognitive Development', score: 9.6, percent: 96, status: 'primary' },
        { name: 'Socio-Emotional Maturity', score: 9.0, percent: 90, status: 'primary' },
        { name: 'Linguistic Proficiency', score: 8.9, percent: 89, status: 'primary' },
        { name: 'Physical Coordination', score: 9.4, percent: 94, status: 'primary' },
      ],
      comparatives: {
        growth: '+18%',
        peerPercentile: 'Top 3%',
        skillTier: 'Level 5 (Advanced)',
      },
      assessmentDate: 'Nov 15, 2023',
    },
  };

  const student = classificationRecords[selectedStudentId] || classificationRecords['BS-1024'];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen overflow-x-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-on-surface text-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            check_circle
          </span>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* 1. Sidebar Component (Separated) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeMenu="Classification"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (menu === 'Students' && onNavigate) onNavigate('students');
          else if (menu === 'Teachers' && onNavigate) onNavigate('teachers');
          else if (menu === 'Parents' && onNavigate) onNavigate('parents');
          else if (menu === 'Assessment' && onNavigate) onNavigate('assessment');
          else if (menu === 'Classification' && onNavigate) onNavigate('classification');
          else if (onNavigate) onNavigate(menu.toLowerCase());
        }}
        onNewAssessment={() => {
          if (onNavigate) onNavigate('assessment');
        }}
        onLogout={onLogout}
      />

      {/* 2. Main Content Canvas */}
      <main className="flex-1 md:ml-64 p-lg min-h-screen bg-background flex flex-col">
        {/* TopNavBar Component (Separated) */}
        <Navbar
          onOpenSidebar={() => setMobileMenuOpen(true)}
          pageTitle="Classification"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search assessments or predictions..."
          actionButton={
            <div className="flex items-center gap-2">
              <span className="text-xs text-outline hidden lg:inline font-medium">
                Student Profile:
              </span>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5 text-xs text-on-surface font-semibold outline-none cursor-pointer focus:ring-2 focus:ring-primary/20"
              >
                <option value="BS-1024">Mateo Silva (Meeting)</option>
                <option value="BS-1025">Amara Vance (Needs Attention)</option>
                <option value="BS-1026">Julian Parks (Exceeding)</option>
              </select>
            </div>
          }
          onLogout={onLogout}
        />

        {/* 3. Classification Engine Content */}
        <div className="max-w-6xl w-full mx-auto space-y-xl flex-1 pt-4">
          {/* Prediction Header */}
          <section className="space-y-sm">
            <div className="flex items-center gap-sm text-primary">
              <span className="material-symbols-outlined text-[20px]">
                verified_user
              </span>
              <span className="font-label-md text-xs tracking-widest uppercase font-bold">
                Classification Engine Result
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
              <div>
                <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  Assessment Outcome for{' '}
                  <span className="text-primary">{student.name}</span>
                </h1>
                <p className="font-body-lg text-xs md:text-sm text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
                  The C4.5 Decision Tree model has processed {student.dataPointsCount}{' '}
                  data points across {student.domainsCount} developmental domains to
                  determine the longitudinal trajectory.
                </p>
              </div>

              <div className="flex flex-wrap gap-sm">
                <button
                  type="button"
                  onClick={() =>
                    showToast(`Exporting C4.5 Decision Tree report for ${student.name}...`)
                  }
                  className="px-lg h-10 border border-outline-variant bg-surface-container-lowest rounded-lg font-label-md text-xs font-semibold hover:bg-surface-container-low transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    file_download
                  </span>
                  <span>Export Result</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowRecommendationModal(true)}
                  className="px-lg h-10 bg-primary text-on-primary rounded-lg font-label-md text-xs font-semibold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    magic_button
                  </span>
                  <span>Generate Recommendations</span>
                </button>
              </div>
            </div>
          </section>

          {/* Status Cards (Bento Style) */}
          <div className="grid grid-cols-12 gap-lg">
            {/* Major Result Card */}
            <div className="col-span-12 md:col-span-8 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm relative overflow-hidden group">
              <div className="relative z-10 space-y-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div
                    className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                      student.statusType === 'exceeding'
                        ? 'bg-primary-container/20 text-primary'
                        : student.statusType === 'attention'
                        ? 'bg-error-container/30 text-on-error-container'
                        : 'bg-secondary-container/20 text-on-secondary-container'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="font-title-lg text-sm sm:text-base font-bold">
                      {student.status}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="font-label-md text-xs text-on-surface-variant font-medium">
                      Prediction Confidence
                    </div>
                    <div className="font-display-lg text-3xl sm:text-4xl font-bold text-primary">
                      {student.confidence}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-xl border-t border-outline-variant/40 pt-lg">
                  <div>
                    <h4 className="font-label-md text-xs text-outline uppercase font-bold tracking-wider mb-sm">
                      Key Predictors
                    </h4>
                    <ul className="space-y-sm text-xs">
                      {student.predictors.map((predictor, idx) => (
                        <li key={idx} className="flex items-center gap-2 font-body-md text-on-surface">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                          <span>{predictor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-label-md text-xs text-outline uppercase font-bold tracking-wider mb-sm">
                      Decision Path
                    </h4>
                    <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                      {student.decisionPath}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minor Result Card (Soft Yellow / Observation) */}
            <div className="col-span-12 md:col-span-4 bg-tertiary-container/5 border border-tertiary-fixed rounded-xl p-6 shadow-sm space-y-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center text-on-tertiary-fixed mb-md">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    lightbulb
                  </span>
                </div>

                <h3 className="font-title-lg text-base font-bold text-on-surface">
                  {student.minorObservation.title}
                </h3>

                <div className="bg-tertiary-fixed/30 text-on-tertiary-fixed-variant px-3 py-1 rounded-full inline-block font-label-md text-xs font-bold mt-1">
                  {student.minorObservation.badge}
                </div>

                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mt-3">
                  {student.minorObservation.text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowObservationModal(true)}
                className="text-tertiary font-label-md text-xs font-bold flex items-center gap-1 hover:underline group cursor-pointer pt-2"
              >
                <span>View Observation Details</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Visualization Breakdown */}
          <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-xl">
              <div>
                <h3 className="font-title-lg text-base font-bold text-on-surface">
                  Assessment Domain Breakdown
                </h3>
                <p className="font-body-md text-xs text-on-surface-variant">
                  Cross-domain scoring relative to age group standard (Scale 0 - 10).
                </p>
              </div>

              <div className="flex items-center gap-md text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-primary rounded-full"></span>
                  <span className="font-label-md text-on-surface font-medium">
                    Actual Score
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-surface-container-highest rounded-full"></span>
                  <span className="font-label-md text-on-surface-variant">
                    Standard (7.0)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-lg">
              {student.domains.map((dom) => (
                <div key={dom.name} className="space-y-base">
                  <div className="flex justify-between items-end text-xs">
                    <span className="font-body-md font-medium text-on-surface">
                      {dom.name}
                    </span>
                    <span
                      className={`font-label-md font-bold ${
                        dom.status === 'error'
                          ? 'text-error'
                          : dom.status === 'tertiary'
                          ? 'text-on-tertiary-fixed-variant'
                          : 'text-primary'
                      }`}
                    >
                      {dom.score} / 10
                    </span>
                  </div>

                  <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex relative">
                    {/* Standard benchmark indicator notch */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-outline z-10 opacity-40"
                      style={{ left: '70%' }}
                      title="Benchmark Standard (7.0)"
                    ></div>

                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        dom.status === 'error'
                          ? 'bg-error'
                          : dom.status === 'tertiary'
                          ? 'bg-tertiary-fixed-dim'
                          : 'bg-primary'
                      }`}
                      style={{ width: `${dom.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparative Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div className="p-lg bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col items-center text-center space-y-sm">
              <span className="material-symbols-outlined text-primary text-[32px]">
                timeline
              </span>
              <div className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                {student.comparatives.growth}
              </div>
              <div className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
                Growth vs Prev Quarter
              </div>
            </div>

            <div className="p-lg bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col items-center text-center space-y-sm">
              <span className="material-symbols-outlined text-primary text-[32px]">
                group
              </span>
              <div className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                {student.comparatives.peerPercentile}
              </div>
              <div className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
                Peer Percentile
              </div>
            </div>

            <div className="p-lg bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col items-center text-center space-y-sm">
              <span className="material-symbols-outlined text-primary text-[32px]">
                history_edu
              </span>
              <div className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                {student.comparatives.skillTier}
              </div>
              <div className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
                Current Skill Tier
              </div>
            </div>
          </div>

          {/* Footer Meta */}
          <footer className="flex flex-col md:flex-row justify-between items-center py-xl border-t border-outline-variant/40 text-on-surface-variant text-xs gap-md">
            <div className="font-label-md flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">info</span>
              <span>Algorithm: C4.5 Decision Tree Classifier (Optimized J48)</span>
            </div>
            <div className="font-label-md">
              Last Assessment Date: {student.assessmentDate} • Generated by B-Star
              AI Engine
            </div>
          </footer>
        </div>
      </main>

      {/* MODAL: Generate Recommendations Modal */}
      {showRecommendationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    auto_awesome
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    Recommended Interventions
                  </h3>
                  <p className="text-[11px] text-outline">
                    Custom tailored for {student.name} ({student.grade})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRecommendationModal(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-primary-container/10 border border-primary-container/30 rounded-xl">
                <h4 className="font-bold text-primary text-xs mb-1">
                  1. Home Stimulation Strategy
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Provide structured turn-taking board games and sensory building
                  blocks for 20 minutes daily to encourage natural peer dialog and
                  resilience.
                </p>
              </div>

              <div className="p-3.5 bg-secondary-container/20 border border-secondary/30 rounded-xl">
                <h4 className="font-bold text-secondary text-xs mb-1">
                  2. Classroom Facilitation
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Pair with a cooperative peer during morning circle time and
                  incorporate expressive picture flashcards during phonics hour.
                </p>
              </div>

              <div className="p-3.5 bg-tertiary-fixed/20 border border-tertiary-fixed/40 rounded-xl">
                <h4 className="font-bold text-tertiary text-xs mb-1">
                  3. Parent Journey Milestone Task
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Submit weekly photo update of bedtime shared-reading and
                  pronunciation exercises via the B-Star mobile diary.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/40 mt-5">
              <button
                type="button"
                onClick={() => setShowRecommendationModal(false)}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRecommendationModal(false);
                  if (onNavigate) onNavigate('recommendations');
                }}
                className="px-4 py-2 border border-primary/30 text-primary text-xs font-semibold rounded-xl hover:bg-primary-container/10 transition-colors cursor-pointer"
              >
                Full Toolkit →
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRecommendationModal(false);
                  showToast('Recommendations synced to educator and parent dashboard!');
                }}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                Apply & Notify Parents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Minor Observation Details Modal */}
      {showObservationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    lightbulb
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    {student.minorObservation.title}
                  </h3>
                  <p className="text-[11px] text-outline">
                    {student.minorObservation.badge}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowObservationModal(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-on-surface-variant leading-relaxed">
                {student.minorObservation.text}
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <span className="font-semibold text-on-surface block mb-1">
                  Recommended Action:
                </span>
                <span className="text-outline block">
                  Educator review recommended after 4 weeks of targeted phonemic
                  listening games.
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-outline-variant/40 mt-4">
              <button
                type="button"
                onClick={() => setShowObservationModal(false)}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Classification;
