import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

Chart.register(...registerables);

export function Dashboard({ onLogout, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [journeyRange, setJourneyRange] = useState('Last 6 Months');
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);

  // Assessment table state with initial data matching the design
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      name: 'Alice Miller',
      initials: 'AM',
      avatarBg: 'bg-primary-fixed text-primary',
      subject: 'Social Skills',
      evaluator: 'Ms. Thompson',
      status: 'Meeting Expectations',
      statusType: 'success',
      score: '92/100',
    },
    {
      id: 2,
      name: 'James Bond',
      initials: 'JB',
      avatarBg: 'bg-secondary-fixed text-secondary',
      subject: 'Logic & Math',
      evaluator: 'Dr. Aris',
      status: 'Needs Attention',
      statusType: 'error',
      score: '45/100',
    },
    {
      id: 3,
      name: 'Chloe Reed',
      initials: 'CR',
      avatarBg: 'bg-tertiary-fixed text-tertiary',
      subject: 'Motor Control',
      evaluator: 'Ms. Thompson',
      status: 'Meeting Expectations',
      statusType: 'success',
      score: '88/100',
    },
  ]);

  // Form state for New Assessment modal
  const [newStudentName, setNewStudentName] = useState('');
  const [newSubject, setNewSubject] = useState('Social Skills');
  const [newEvaluator, setNewEvaluator] = useState('Ms. Thompson');
  const [newScore, setNewScore] = useState('');

  const devChartRef = useRef(null);
  const classChartRef = useRef(null);

  // Initialize Chart.js charts
  useEffect(() => {
    let devChartInstance = null;
    let classChartInstance = null;

    if (devChartRef.current) {
      devChartInstance = new Chart(devChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Academic Growth %',
              data: [65, 72, 68, 78, 85, 88],
              borderColor: '#0059ba',
              backgroundColor: 'rgba(0, 89, 186, 0.1)',
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#0059ba',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#111c2d',
              titleFont: { family: 'Be Vietnam Pro', size: 12 },
              bodyFont: { family: 'Be Vietnam Pro', size: 12 },
              padding: 10,
              displayColors: false,
              callbacks: {
                label: (context) => `Growth: ${context.parsed.y}%`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: { display: true, color: '#f1f5f9' },
              border: { display: false },
              ticks: {
                font: { family: 'Be Vietnam Pro', size: 11 },
                color: '#727784',
              },
            },
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: {
                font: { family: 'Be Vietnam Pro', size: 11 },
                color: '#727784',
              },
            },
          },
        },
      });
    }

    if (classChartRef.current) {
      classChartInstance = new Chart(classChartRef.current, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [82, 18],
              backgroundColor: ['#006c50', '#ba1a1a'],
              borderWidth: 0,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          cutout: '80%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#111c2d',
              callbacks: {
                label: (context) =>
                  context.dataIndex === 0
                    ? ' Meeting Expectations: 82%'
                    : ' Needs Attention: 18%',
              },
            },
          },
        },
      });
    }

    return () => {
      if (devChartInstance) devChartInstance.destroy();
      if (classChartInstance) classChartInstance.destroy();
    };
  }, []);

  const showToast = (message) => {
    setNotificationToast(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 3500);
  };

  const handleCreateAssessment = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newScore) return;

    const numScore = parseInt(newScore, 10);
    const isMeeting = numScore >= 60;
    const initials = newStudentName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newEntry = {
      id: Date.now(),
      name: newStudentName,
      initials: initials || 'ST',
      avatarBg: isMeeting
        ? 'bg-secondary-fixed text-secondary'
        : 'bg-primary-fixed text-primary',
      subject: newSubject,
      evaluator: newEvaluator,
      status: isMeeting ? 'Meeting Expectations' : 'Needs Attention',
      statusType: isMeeting ? 'success' : 'error',
      score: `${numScore}/100`,
    };

    setAssessments([newEntry, ...assessments]);
    setIsAssessmentModalOpen(false);
    setNewStudentName('');
    setNewScore('');
    showToast(`Assessment untuk ${newStudentName} berhasil ditambahkan!`);
  };

  // Filter assessments based on search input
  const filteredAssessments = assessments.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.evaluator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background text-on-background min-h-screen flex font-['Be_Vietnam_Pro',sans-serif]">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-5 right-5 z-50 bg-on-surface text-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            check_circle
          </span>
          <p className="text-xs font-semibold">{notificationToast}</p>
        </div>
      )}

      {/* 1. Sidebar Component (Separated) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeMenu={activeMenu}
        onSelectMenu={(menu) => {
          setActiveMenu(menu);
          const m = (menu || '').toLowerCase();
          if (m === 'students' && onNavigate) {
            onNavigate('students');
          } else if (m === 'teachers' && onNavigate) {
            onNavigate('teachers');
          } else if (m === 'parents' && onNavigate) {
            onNavigate('parents');
          } else if (m === 'assessment' && onNavigate) {
            onNavigate('assessment');
          } else if (m === 'classification' && onNavigate) {
            onNavigate('classification');
          } else if (onNavigate) {
            onNavigate(m);
          }
        }}
        onNewAssessment={() => {
          if (onNavigate) onNavigate('assessment');
          else setIsAssessmentModalOpen(true);
        }}
        onLogout={onLogout}
      />

      {/* Main Canvas */}
      <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300 flex flex-col">
        {/* 2. Navbar Component (Separated) */}
        <Navbar
          onOpenSidebar={() => setMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogout={onLogout}
        />

        {/* 3. Dashboard Content Area */}
        <div className="p-lg max-w-[1440px] w-full mx-auto space-y-lg flex-1">
          {/* Welcome Section & Quick Actions */}
          <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Welcome back, Sarah
              </h2>
              <p className="font-body-md text-on-surface-variant mt-1">
                Here is what's happening in your academy today.
              </p>
            </div>
            <div className="flex flex-wrap gap-md">
              <button
                type="button"
                onClick={() => showToast('Mengekspor laporan akademik PDF...')}
                className="bg-surface-container-lowest border border-outline-variant text-on-surface px-lg py-sm rounded-xl font-label-md flex items-center gap-2 hover:bg-surface-container-high transition-colors shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  description
                </span>
                <span>Generate Report</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('assessment');
                  else setIsAssessmentModalOpen(true);
                }}
                className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md shadow-primary/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>
                <span>New Assessment</span>
              </button>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {/* Total Students */}
            <div
              onClick={() => onNavigate && onNavigate('students')}
              className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
              title="Klik untuk membuka Direktori Data Siswa"
            >
              <div className="flex justify-between items-start">
                <div className="p-sm bg-primary-container/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="font-label-md text-secondary flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">
                    trending_up
                  </span>
                  +12%
                </span>
              </div>
              <div className="mt-md">
                <p className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">
                  Total Students
                </p>
                <h3 className="font-display-lg text-[32px] font-bold text-on-surface">
                  1,284
                </h3>
              </div>
            </div>

            {/* Recent Assessments */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-sm bg-secondary-container/20 rounded-lg text-secondary">
                  <span className="material-symbols-outlined">fact_check</span>
                </div>
                <span className="font-label-md text-on-surface-variant text-xs">
                  Last 7 days
                </span>
              </div>
              <div className="mt-md">
                <p className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">
                  Recent Assessments
                </p>
                <h3 className="font-display-lg text-[32px] font-bold text-on-surface">
                  342
                </h3>
              </div>
            </div>

            {/* Average Growth */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-sm bg-tertiary-fixed/20 rounded-lg text-tertiary">
                  <span className="material-symbols-outlined">auto_graph</span>
                </div>
                <span className="font-label-md text-secondary flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_upward
                  </span>
                  4.2pt
                </span>
              </div>
              <div className="mt-md">
                <p className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">
                  Average Growth
                </p>
                <h3 className="font-display-lg text-[32px] font-bold text-on-surface">
                  88%
                </h3>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-sm bg-error-container/30 rounded-lg text-error">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <span className="font-label-md text-error font-bold text-xs">
                  Priority
                </span>
              </div>
              <div className="mt-md">
                <p className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">
                  Active Alerts
                </p>
                <h3 className="font-display-lg text-[32px] font-bold text-on-surface">
                  07
                </h3>
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-error/5 rounded-full pointer-events-none"></div>
            </div>
          </section>

          {/* Main Charts & Notifications Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
            {/* Line Chart: Student Development */}
            <div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-lg">
                <div>
                  <h3 className="font-title-lg text-on-surface font-semibold flex items-center gap-2">
                    <span>Student Development Journey</span>
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('journey')}
                      className="text-primary text-xs font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>(Monitor All)</span>
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_forward
                      </span>
                    </button>
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Monthly academic and cognitive progression
                  </p>
                </div>
                <select
                  value={journeyRange}
                  onChange={(e) => setJourneyRange(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/60 rounded-lg font-label-md text-xs text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none px-3 py-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64 w-full relative">
                <canvas ref={devChartRef}></canvas>
              </div>
            </div>

            {/* Notifications Panel */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-md">
                <h3 className="font-title-lg text-on-surface font-semibold">
                  System Alerts
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('Membuka pusat pemberitahuan')}
                  className="text-primary font-label-md text-xs font-semibold hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-md flex-1">
                <div className="flex gap-md p-md bg-surface-container-low rounded-lg border-l-4 border-error">
                  <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">
                    feedback
                  </span>
                  <div>
                    <p className="font-label-md font-bold text-on-surface text-xs">
                      Review Needed: Leo S.
                    </p>
                    <p className="font-body-md text-on-surface-variant text-xs mt-0.5 leading-snug">
                      Growth curve below average for 3 weeks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-md p-md bg-surface-container-low rounded-lg border-l-4 border-secondary">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    verified
                  </span>
                  <div>
                    <p className="font-label-md font-bold text-on-surface text-xs">
                      New Parent Report
                    </p>
                    <p className="font-body-md text-on-surface-variant text-xs mt-0.5 leading-snug">
                      Journey completion for "Social Integration".
                    </p>
                  </div>
                </div>

                <div className="flex gap-md p-md bg-surface-container-low rounded-lg border-l-4 border-primary">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    update
                  </span>
                  <div>
                    <p className="font-label-md font-bold text-on-surface text-xs">
                      System Update
                    </p>
                    <p className="font-body-md text-on-surface-variant text-xs mt-0.5 leading-snug">
                      New classification metrics applied to K-2.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant/40 mt-3 text-center">
                <span className="text-[11px] text-outline">
                  All metrics synced with C4.5 Early Detection
                </span>
              </div>
            </div>
          </section>

          {/* Bottom Grid: Tables & Progress */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
            {/* Classification Distribution */}
            <div
              onClick={() => onNavigate && onNavigate('classification')}
              className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer group"
              title="Click to view detailed C4.5 Classification Engine"
            >
              <div>
                <h3 className="font-title-lg text-on-surface font-semibold mb-lg">
                  Student Classification
                </h3>
                <div className="flex-1 flex flex-col items-center justify-center relative my-2">
                  <div className="h-48 w-48 relative">
                    <canvas ref={classChartRef}></canvas>
                  </div>
                  <div className="absolute text-center pointer-events-none">
                    <p className="font-headline-lg text-[24px] font-bold text-on-surface">
                      82%
                    </p>
                    <p className="font-label-md text-on-surface-variant text-xs">
                      On Track
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-lg grid grid-cols-2 gap-md pt-3 border-t border-outline-variant/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#006c50]"></div>
                  <span className="font-label-md text-on-surface-variant text-xs">
                    Meeting Exp.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ba1a1a]"></div>
                  <span className="font-label-md text-on-surface-variant text-xs">
                    Needs Attention
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Assessments Table */}
            <div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-lg">
                  <div>
                    <h3 className="font-title-lg text-on-surface font-semibold">
                      Recent Assessments
                    </h3>
                    {searchQuery && (
                      <p className="text-xs text-primary mt-0.5">
                        Filtering by: "{searchQuery}"
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('students');
                      } else {
                        showToast('Membuka tabel penilaian lengkap');
                      }
                    }}
                    className="text-primary font-label-md text-xs font-semibold hover:underline cursor-pointer"
                  >
                    Explore All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant font-label-md uppercase text-xs">
                        <th className="py-3 px-4 first:rounded-l-lg">Student</th>
                        <th className="py-3 px-4">Subject</th>
                        <th className="py-3 px-4">Evaluator</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 last:rounded-r-lg text-right">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/40 text-xs">
                      {filteredAssessments.length > 0 ? (
                        filteredAssessments.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-surface-container-low/50 transition-colors"
                          >
                            <td className="py-4 px-4 flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${item.avatarBg}`}
                              >
                                {item.initials}
                              </div>
                              <span className="font-body-md text-on-surface font-semibold">
                                {item.name}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-body-md text-on-surface-variant">
                              {item.subject}
                            </td>
                            <td className="py-4 px-4 font-body-md text-on-surface-variant">
                              {item.evaluator}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase inline-block ${
                                  item.statusType === 'error'
                                    ? 'bg-error-container/40 text-on-error-container'
                                    : 'bg-secondary-container/30 text-on-secondary-container'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-on-surface">
                              {item.score}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-8 text-center text-on-surface-variant text-xs"
                          >
                            Tidak ada data siswa yang cocok dengan "{searchQuery}
                            "
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Parent Journey Section (Bento Style Card) */}
          <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-lg">
              <div>
                <h3 className="font-title-lg text-on-surface font-semibold">
                  Top Parent Journeys
                </h3>
                <p className="font-label-md text-on-surface-variant text-xs mt-0.5">
                  Tracking the most active educational partnerships.
                </p>
              </div>
              <span className="material-symbols-outlined text-primary-container text-[24px]">
                favorite
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
              {/* Peterson Family */}
              <div className="space-y-sm">
                <div className="flex justify-between font-label-md text-xs font-semibold">
                  <span className="text-on-surface">The Peterson Family</span>
                  <span className="text-primary font-bold">94%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[94%] transition-all duration-1000"></div>
                </div>
              </div>

              {/* Garcia Family */}
              <div className="space-y-sm">
                <div className="flex justify-between font-label-md text-xs font-semibold">
                  <span className="text-on-surface">The Garcia Family</span>
                  <span className="text-primary font-bold">81%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[81%] transition-all duration-1000"></div>
                </div>
              </div>

              {/* Kim Family */}
              <div className="space-y-sm">
                <div className="flex justify-between font-label-md text-xs font-semibold">
                  <span className="text-on-surface">The Kim Family</span>
                  <span className="text-primary font-bold">76%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[76%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer / Support */}
        <footer className="p-lg mt-xl text-center text-on-surface-variant opacity-75 border-t border-outline-variant/30">
          <p className="font-label-md text-xs">
            © {new Date().getFullYear()} B-Star Early Childhood Development
            Platform. Built for Nurturing Tomorrow.
          </p>
        </footer>
      </main>

      {/* Contextual FAB (Mobile) */}
      <button
        type="button"
        onClick={() => {
          if (onNavigate) onNavigate('assessment');
          else setIsAssessmentModalOpen(true);
        }}
        className="fixed bottom-lg right-lg bg-primary text-on-primary w-14 h-14 rounded-full shadow-2xl md:hidden flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="New Assessment"
      >
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>

      {/* Interactive New Assessment Modal */}
      {isAssessmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    assignment
                  </span>
                </div>
                <h3 className="font-title-lg text-base font-bold text-on-surface">
                  New Student Assessment
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAssessmentModalOpen(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssessment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Daniel Craig"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Subject / Domain
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                  >
                    <option>Social Skills</option>
                    <option>Logic & Math</option>
                    <option>Motor Control</option>
                    <option>Language & Speech</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Evaluator
                  </label>
                  <select
                    value={newEvaluator}
                    onChange={(e) => setNewEvaluator(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                  >
                    <option>Ms. Thompson</option>
                    <option>Dr. Aris</option>
                    <option>Dr. Sarah Chen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Score (0 - 100)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  placeholder="85"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/40 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAssessmentModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  Save Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
