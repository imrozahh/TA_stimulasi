import React, { useState, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function Reports({ onLogout, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'individual' | 'cohort' | 'decision_tree' | 'parent_journey'
  const [gradeFilter, setGradeFilter] = useState('all'); // 'all' | 'Kindergarten A' | 'Kindergarten B' | 'Pre-K 4'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'verified' | 'draft' | 'sent'
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);

  // Initial report dataset
  const [reports, setReports] = useState([
    {
      id: 'REP-2024-K01',
      title: 'Comprehensive Growth Evaluation - Mateo Silva',
      studentName: 'Mateo Silva',
      studentAge: '5.0',
      grade: 'Kindergarten A',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAfEAVE-BtSbWteWA5pPxYmJpHCS1BkuX3Cie2FvdeX8zecVLwsaoSU8j4Lmxr0vFTfNAw_YLdWVQJBpOrqhb3Xo4vBMlqoGK19j4oZodNMUqJV_CYt9r6TyHePAQJmYfNKGBAbEAYhhXg2z1rDLu0ZWI8OBS1OXr-e_8dy9ZKpTvTCMPfN40TxaG07VrW6Z938FYPgv5pRmlH0se56rbD231IU3LKhRacKeah8RHn3CWZq6X-F3SFskpMySoIH1WQ6otsQ-KJkKFoK',
      assessor: 'Prof. Aristhotene',
      category: 'Longitudinal',
      type: 'individual',
      classification: 'Meeting Expectations',
      classificationType: 'meeting',
      confidence: '94.8%',
      date: 'Oct 24, 2023',
      validity: '6 Months',
      status: 'Verified & Signed',
      statusCode: 'verified',
      domains: [
        { name: 'Cognitive Development', score: 8.8, max: 10 },
        { name: 'Socio-Emotional Maturity', score: 7.5, max: 10 },
        { name: 'Linguistic Proficiency', score: 6.2, max: 10 },
        { name: 'Physical Coordination', score: 9.1, max: 10 },
        { name: 'Spiritual & Moral Habits', score: 8.5, max: 10 },
      ],
      summary:
        'Mateo demonstrates exceptional cognitive pattern recognition and motor agility. Focus for the upcoming quarter is structured conversational dialogue and phonetic expansion.',
      c45Node:
        'Node 4.5 [Social >= 8] -> Node 2.1 [Cognitive >= 7] -> Class: MEETING_EXPECTATIONS (Entropy: 0.042)',
      homeJourneyRate: '94% completed (18 activities verified)',
    },
    {
      id: 'REP-2024-PK02',
      title: 'Phonics & Language Intervention - Amara Vance',
      studentName: 'Amara Vance',
      studentAge: '4.2',
      grade: 'Pre-K 4',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBXeMBj7caIBdCCg1kDSzcBiXjzG4_1bdZZkCBkLUmlkId81rqcR1A5zx_4pn32ceqYeNUSraaARnIlysmtwzNimjyPzl1TTPkXaNlNR0AkO9L_TM5Oy0I-SwqGqBADOktunL8HMN3gRpUMvbaqt-B2mkR3GPxpHzwlDhJ7Uu_gbrreiLi3jxkEzH-V5AzgPWQTPVkO_tVhZwWMscwNnoItXPKG8eprCj4fuEpM7GRhMNl8wBnVTiji1PmAFnSYv8MLteoMmlsxQO-6',
      assessor: 'Dewi Lestari, S.Pd',
      category: 'Milestone Diagnosis',
      type: 'decision_tree',
      classification: 'Needs Attention',
      classificationType: 'attention',
      confidence: '89.2%',
      date: 'Nov 04, 2023',
      validity: '3 Months',
      status: 'Sent to Parents',
      statusCode: 'sent',
      domains: [
        { name: 'Cognitive Development', score: 7.2, max: 10 },
        { name: 'Socio-Emotional Maturity', score: 6.8, max: 10 },
        { name: 'Linguistic Proficiency', score: 4.8, max: 10 },
        { name: 'Physical Coordination', score: 7.9, max: 10 },
        { name: 'Spiritual & Moral Habits', score: 7.0, max: 10 },
      ],
      summary:
        'Multi-sensory tactile phonics and mirrored articulation games are recommended. High parent engagement at home will accelerate phonetic milestone achievement.',
      c45Node:
        'Node 3.2 [Speech <= 5.5] -> Node 1.8 [Sensory >= 6.0] -> Class: NEEDS_ATTENTION (Entropy: 0.086)',
      homeJourneyRate: '52% completed (Needs educator follow-up)',
    },
    {
      id: 'REP-2024-K03',
      title: 'Advanced Logic & STEM Readiness - Julian Parks',
      studentName: 'Julian Parks',
      studentAge: '5.2',
      grade: 'Kindergarten B',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDdSIIyDkzRHTA9msZCloweXY5wixE6yf9UHzxuvYdBVAC0YIeg3yMtkKzJiucIwBhnweXc7VxLkpCDXCSuTzu4qBmSmxexyc--MkabpasapPyX7RieB8_cYf6ONJY3QZg485LN3cKlSzHvkhfqw6n0-yE9LrKUC6SbE41lbQ0bdy80ebFJ8wysEwqAO9xj4pHRoT7mFBxssrUNM8Gizpq25eUjURP47QKkPVpL0DQqgtcD_hdxq-Eee5ybNhkDq6ChNh_moyIngbEa',
      assessor: 'Rian Hidayat, M.Ed',
      category: 'Gifted Enrichment',
      type: 'individual',
      classification: 'Exceeding Expectations',
      classificationType: 'exceeding',
      confidence: '97.4%',
      date: 'Nov 15, 2023',
      validity: '6 Months',
      status: 'Verified & Signed',
      statusCode: 'verified',
      domains: [
        { name: 'Cognitive Development', score: 9.6, max: 10 },
        { name: 'Socio-Emotional Maturity', score: 9.0, max: 10 },
        { name: 'Linguistic Proficiency', score: 8.9, max: 10 },
        { name: 'Physical Coordination', score: 9.4, max: 10 },
        { name: 'Spiritual & Moral Habits', score: 9.2, max: 10 },
      ],
      summary:
        'Julian exhibits superior early math readiness, spatial symmetry mastery, and cooperative peer leadership. Recommended for Grade 1 logic enrichment puzzles.',
      c45Node:
        'Node 5.1 [Logic >= 9.0] -> Node 4.8 [Social >= 8.5] -> Class: EXCEEDING_EXPECTATIONS (Entropy: 0.018)',
      homeJourneyRate: '100% completed (20/20 milestones finished)',
    },
    {
      id: 'REP-2024-PK04',
      title: 'Parent-Led Stimulation Summary - Liam Anderson',
      studentName: 'Liam Anderson',
      studentAge: '4.5',
      grade: 'Pre-K 4',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAteBzizmynm1jy_L8bbyGDgBsEPGZkd0YNPWkYdGZtA20jaG14MCpK4X9ri9Tl7plJvtlkPJiI_umOifsXdYyOCgJFNkLky2uowTDtpvxiEAmv-8l1Sja7FBDPkx7x3N0qZUvmaytAPNzzuzbn0_AzKcX9hS6kpC6dL-ArAQX0ru24Mnljwaboyx8bW1wKRXXaB70f3PbCSIX-C8HN6ARYMTBDBG6luCGJsVD2hckzL4OF7bv4rX09ZgZud-AtACeKLT6sopGLFB-R',
      assessor: 'Prof. Aristhotene',
      category: 'Parent Journey',
      type: 'parent_journey',
      classification: 'Meeting Expectations',
      classificationType: 'meeting',
      confidence: '92.1%',
      date: 'May 12, 2024',
      validity: '6 Months',
      status: 'Verified & Signed',
      statusCode: 'verified',
      domains: [
        { name: 'Cognitive Development', score: 8.2, max: 10 },
        { name: 'Socio-Emotional Maturity', score: 8.5, max: 10 },
        { name: 'Linguistic Proficiency', score: 7.9, max: 10 },
        { name: 'Physical Coordination', score: 8.7, max: 10 },
        { name: 'Spiritual & Moral Habits', score: 8.4, max: 10 },
      ],
      summary:
        'Liam is thriving under continuous home routine integration. Story walks and manipulative block tasks have noticeably bolstered his executive function.',
      c45Node:
        'Node 4.1 [Home >= 8.0] -> Node 3.5 [Independence >= 7.5] -> Class: MEETING_EXPECTATIONS',
      homeJourneyRate: '88% completed (Verified by parent Sarah Anderson)',
    },
    {
      id: 'REP-2024-K05',
      title: 'Visual Spatial & Motor Progress - Sophia Martinez',
      studentName: 'Sophia Martinez',
      studentAge: '5.0',
      grade: 'Kindergarten A',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuALltgd6ml3cYAAeLmj6jBDUGJcDf0LMt0208C_9EV-VUGQncobGwbJwxdXHndFosqt5RDJN8oMvdkT0vVL98rEjgkiM-zhIOZMzdmN6jTLx4aL5mKR1KiYxPMR6_zfIgcFtBs5Uj51m8KKGPDryFbZwD0DnEv6n6p_Mfhd_dnRMUeoyckxsMBoU_pzm6NfwcAzHYSFzuzTnchG1A4clvoV8cOjxMl93GFUojbR9R2xYUqhMpMhppiz3f2jE7jcRqbKQKxlgc2wsMr3',
      assessor: 'Dewi Lestari, S.Pd',
      category: 'Motor Diagnostics',
      type: 'individual',
      classification: 'Meeting Expectations',
      classificationType: 'meeting',
      confidence: '91.5%',
      date: 'May 14, 2024',
      validity: '6 Months',
      status: 'Draft',
      statusCode: 'draft',
      domains: [
        { name: 'Cognitive Development', score: 8.0, max: 10 },
        { name: 'Socio-Emotional Maturity', score: 8.3, max: 10 },
        { name: 'Linguistic Proficiency', score: 7.8, max: 10 },
        { name: 'Physical Coordination', score: 9.3, max: 10 },
        { name: 'Spiritual & Moral Habits', score: 8.1, max: 10 },
      ],
      summary:
        'Sophia exhibits strong fine-motor grasp and artistic expression through finger painting and scissor cutting. Ready for formal assessment review.',
      c45Node:
        'Node 4.3 [Kinesthetic >= 9.0] -> Class: MEETING_EXPECTATIONS',
      homeJourneyRate: '75% completed (In progress)',
    },
    {
      id: 'REP-2024-PK06',
      title: 'Sensory Math & Executive Function - Maya Patel',
      studentName: 'Maya Patel',
      studentAge: '4.2',
      grade: 'Pre-K 4',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBXeMBj7caIBdCCg1kDSzcBiXjzG4_1bdZZkCBkLUmlkId81rqcR1A5zx_4pn32ceqYeNUSraaARnIlysmtwzNimjyPzl1TTPkXaNlNR0AkO9L_TM5Oy0I-SwqGqBADOktunL8HMN3gRpUMvbaqt-B2mkR3GPxpHzwlDhJ7Uu_gbrreiLi3jxkEzH-V5AzgPWQTPVkO_tVhZwWMscwNnoItXPKG8eprCj4fuEpM7GRhMNl8wBnVTiji1PmAFnSYv8MLteoMmlsxQO-6',
      assessor: 'Rian Hidayat, M.Ed',
      category: 'Cognitive Focus',
      type: 'decision_tree',
      classification: 'Needs Attention',
      classificationType: 'attention',
      confidence: '86.4%',
      date: 'Oct 26, 2023',
      validity: '3 Months',
      status: 'Pending Review',
      statusCode: 'draft',
      domains: [
        { name: 'Cognitive Development', score: 6.9, max: 10 },
        { name: 'Socio-Emotional Maturity', score: 7.1, max: 10 },
        { name: 'Linguistic Proficiency', score: 5.5, max: 10 },
        { name: 'Physical Coordination', score: 7.8, max: 10 },
        { name: 'Spiritual & Moral Habits', score: 7.2, max: 10 },
      ],
      summary:
        'Focus on shape sorting and one-to-one sensory number counting. Additional collaborative games planned to boost peer comfort.',
      c45Node:
        'Node 2.8 [Math <= 6.5] -> Class: NEEDS_ATTENTION',
      homeJourneyRate: '45% completed (Parent outreach active)',
    },
  ]);

  // Form state for generating new report
  const [newReportData, setNewReportData] = useState({
    studentName: 'Mateo Silva',
    grade: 'Kindergarten A',
    template: 'Comprehensive Term Evaluation',
    assessor: 'Prof. Aristhotene',
    period: 'Term 1 - 2024',
    notes: '',
    includeDecisionTree: true,
    includeHomeJourney: true,
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.studentName.toLowerCase().includes(q) ||
        item.assessor.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Tab filter
      if (activeTab === 'individual' && item.type !== 'individual') return false;
      if (activeTab === 'cohort' && item.category !== 'Longitudinal') return false;
      if (activeTab === 'decision_tree' && item.type !== 'decision_tree') return false;
      if (activeTab === 'parent_journey' && item.type !== 'parent_journey') return false;

      // Grade filter
      if (gradeFilter !== 'all' && item.grade !== gradeFilter) return false;

      // Status filter
      if (statusFilter !== 'all' && item.statusCode !== statusFilter) return false;

      return true;
    });
  }, [reports, searchQuery, activeTab, gradeFilter, statusFilter]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ReportID,Title,Student,Grade,Assessor,Classification,Confidence,Date,Status\n' +
      reports
        .map(
          (r) =>
            `"${r.id}","${r.title}","${r.studentName}","${r.grade}","${r.assessor}","${r.classification}","${r.confidence}","${r.date}","${r.status}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'bstar_academic_growth_reports.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Laporan berhasil diekspor ke format CSV!');
  };

  const handleCreateReport = (e) => {
    e.preventDefault();
    const newId = `REP-2024-NEW${Math.floor(10 + Math.random() * 90)}`;
    const created = {
      id: newId,
      title: `${newReportData.template} - ${newReportData.studentName}`,
      studentName: newReportData.studentName,
      studentAge: '4.8',
      grade: newReportData.grade,
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAfEAVE-BtSbWteWA5pPxYmJpHCS1BkuX3Cie2FvdeX8zecVLwsaoSU8j4Lmxr0vFTfNAw_YLdWVQJBpOrqhb3Xo4vBMlqoGK19j4oZodNMUqJV_CYt9r6TyHePAQJmYfNKGBAbEAYhhXg2z1rDLu0ZWI8OBS1OXr-e_8dy9ZKpTvTCMPfN40TxaG07VrW6Z938FYPgv5pRmlH0se56rbD231IU3LKhRacKeah8RHn3CWZq6X-F3SFskpMySoIH1WQ6otsQ-KJkKFoK',
      assessor: newReportData.assessor,
      category: 'Term Progress',
      type: 'individual',
      classification: 'Meeting Expectations',
      classificationType: 'meeting',
      confidence: '93.2%',
      date: 'Hari ini',
      validity: '6 Months',
      status: 'Verified & Signed',
      statusCode: 'verified',
      domains: [
        { name: 'Cognitive Development', score: 8.5, max: 10 },
        { name: 'Socio-Emotional Maturity', score: 8.0, max: 10 },
        { name: 'Linguistic Proficiency', score: 7.2, max: 10 },
        { name: 'Physical Coordination', score: 8.8, max: 10 },
        { name: 'Spiritual & Moral Habits', score: 8.3, max: 10 },
      ],
      summary:
        newReportData.notes ||
        'Laporan asesmen berkala yang memetakan capaian stimulasi dan inferensi pohon keputusan C4.5.',
      c45Node:
        'Node 4.2 [Cognitive >= 8.0] -> Class: MEETING_EXPECTATIONS (Entropy: 0.038)',
      homeJourneyRate: '85% completed',
    };

    setReports([created, ...reports]);
    setShowGenerateModal(false);
    showToast(`Laporan baru ${newId} berhasil diterbitkan dan siap diverifikasi!`);
    setSelectedReport(created);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen overflow-x-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-on-surface text-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200 no-print">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            check_circle
          </span>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* 1. Sidebar Navigation (Modular Component) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeMenu="Reports"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (menu === 'Students' && onNavigate) onNavigate('students');
          else if (menu === 'Teachers' && onNavigate) onNavigate('teachers');
          else if (menu === 'Parents' && onNavigate) onNavigate('parents');
          else if (menu === 'Assessment' && onNavigate) onNavigate('assessment');
          else if (menu === 'Classification' && onNavigate) onNavigate('classification');
          else if (menu === 'Recommendations' && onNavigate) onNavigate('recommendations');
          else if (menu === 'Journey' && onNavigate) onNavigate('journey');
          else if (menu === 'Reports' && onNavigate) onNavigate('reports');
          else if (onNavigate) onNavigate(menu.toLowerCase());
        }}
        onNewAssessment={() => {
          if (onNavigate) onNavigate('assessment');
        }}
        onLogout={onLogout}
      />

      {/* 2. Main Canvas */}
      <main className="md:ml-64 min-h-screen pb-2xl flex flex-col">
        {/* Top App Bar Header (Consistent Navbar Style) */}
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md flex flex-wrap justify-between items-center w-full px-lg py-sm shadow-sm border-b border-outline-variant/30 no-print">
          <div className="flex items-center gap-md">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-outline hover:bg-surface-container-high transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="flex flex-col">
              <h2 className="font-title-lg text-base md:text-lg font-bold text-on-surface">
                Academic & Growth Reports
              </h2>
              <p className="font-label-md text-xs text-on-surface-variant hidden sm:block">
                Comprehensive developmental evaluations, C4.5 diagnostics & parent logs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-sm md:gap-md mt-2 sm:mt-0">
            {/* Search Input */}
            <div className="hidden sm:flex items-center bg-surface-container-low px-md py-1.5 rounded-full border border-outline-variant shadow-2xs">
              <span className="material-symbols-outlined text-outline text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports or students..."
                className="bg-transparent border-none focus:ring-0 text-xs text-on-surface w-40 md:w-52 outline-none pl-2"
              />
            </div>

            {/* Print List CTA */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors text-on-surface-variant text-xs font-semibold border border-outline-variant/40 cursor-pointer"
              title="Print Table View"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span className="hidden lg:inline font-label-md">Print List</span>
            </button>

            {/* Generate Report Primary CTA */}
            <button
              type="button"
              onClick={() => setShowGenerateModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 transition-opacity text-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Generate Report</span>
            </button>

            {/* Profile Avatar */}
            <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant shrink-0 ml-1">
              <img
                className="w-full h-full object-cover"
                alt="Prof. Aristhotene"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBanKuXpC70pYDlOU4WCyIJI2Upjtj4XFtivCi0ejaziy8nD0gqfiRRn_If7W_W09sQm1qMevZ9nSJjP29qPJ2vxqGNVpXwn6gvUSgp-idzsKnWOdEEa7ccqNbcGIKp8zF0A1fcwJwKx2178NzmJxLldlA_D5t1YPvn-B6D7Ijejv4fZe_esBsxozHf58C7mGcf6TmPRp2GSGqk3IiSuy7NkCWQ7ez42Jm1kclDZDK6Rei96cOoCUDCWUDwxduInnw0I1TuDeegi0kZ"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-lg lg:p-xl max-w-7xl w-full mx-auto space-y-xl flex-1">
          {/* Quick Stats Bento (4 Cards matching DESIGN.md) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-lg">
            {/* Total Reports */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-ambient flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold">
                  Total Reports
                </span>
                <span className="material-symbols-outlined text-primary text-[24px]">
                  description
                </span>
              </div>
              <div className="mt-md">
                <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  142
                </p>
                <p className="text-secondary font-label-md text-xs flex items-center gap-1 mt-1 font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  <span>+18% this semester</span>
                </p>
              </div>
            </div>

            {/* Verified Compliance Rate */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-ambient flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold">
                  Verified & Signed
                </span>
                <span className="material-symbols-outlined text-secondary text-[24px]">
                  verified
                </span>
              </div>
              <div className="mt-md">
                <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  94.2%
                </p>
                <div className="w-full bg-surface-container h-1.5 rounded-full mt-sm overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full transition-all duration-1000"
                    style={{ width: '94.2%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Parent Consultation Ready */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-ambient flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold">
                  Parent Review Ready
                </span>
                <span className="material-symbols-outlined text-tertiary text-[24px]">
                  family_restroom
                </span>
              </div>
              <div className="mt-md">
                <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  38
                </p>
                <p className="text-on-surface-variant font-label-md text-xs mt-1">
                  Ready for consultative sharing
                </p>
              </div>
            </div>

            {/* Flagged / Needs Follow-up */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-ambient flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold">
                  Algorithmic Flags
                </span>
                <span className="material-symbols-outlined text-error text-[24px]">
                  flag
                </span>
              </div>
              <div className="mt-md">
                <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  6
                </p>
                <p className="text-error font-label-md text-xs mt-1 flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <span>C4.5 Intervention alerts</span>
                </p>
              </div>
            </div>
          </div>

          {/* Filtering and Segments Control Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-md no-print">
            {/* Category Filter Segments */}
            <div className="flex items-center gap-sm bg-surface-container p-1 rounded-xl border border-outline-variant overflow-x-auto w-full lg:w-auto">
              {[
                { id: 'all', label: 'All Reports' },
                { id: 'individual', label: 'Individual Growth' },
                { id: 'decision_tree', label: 'C4.5 Diagnostics' },
                { id: 'parent_journey', label: 'Parent Journey' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-label-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dropdown Filters and Export Button */}
            <div className="flex flex-wrap items-center gap-sm w-full lg:w-auto justify-end">
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant bg-surface-container-lowest outline-none cursor-pointer"
              >
                <option value="all">All Cohorts</option>
                <option value="Kindergarten A">Kindergarten A</option>
                <option value="Kindergarten B">Kindergarten B</option>
                <option value="Pre-K 4">Pre-K 4</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant bg-surface-container-lowest outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="verified">Verified & Signed</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent to Parents</option>
              </select>

              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-outline-variant bg-surface-container-lowest rounded-lg text-on-surface-variant font-label-md text-xs font-semibold hover:bg-surface-container-low transition-colors shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  ios_share
                </span>
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Main Reports Table (Level 1 with Ambient Shadow) */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-ambient overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider w-1/4">
                      Document Title & ID
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider w-1/5">
                      Target Student
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                      Assessor
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider text-center">
                      C4.5 Outcome
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider text-center">
                      Status
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/30 text-xs">
                  {filteredReports.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-container-low/40 transition-colors group"
                    >
                      {/* Document Title & ID */}
                      <td className="px-lg py-lg">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary-container/10 text-primary rounded-lg shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-[20px]">
                              description
                            </span>
                          </div>
                          <div>
                            <p className="font-body-lg text-sm font-bold text-on-surface leading-tight hover:text-primary transition-colors cursor-pointer"
                              onClick={() => setSelectedReport(item)}
                            >
                              {item.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-semibold text-outline">
                                {item.id}
                              </span>
                              <span className="text-outline/40">•</span>
                              <span className="text-[10px] bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Target Student */}
                      <td className="px-lg py-lg">
                        <div className="flex items-center gap-2.5">
                          <img
                            className="w-8 h-8 rounded-full object-cover border border-outline-variant/60 shrink-0"
                            alt={item.studentName}
                            src={item.studentAvatar}
                          />
                          <div>
                            <p className="font-semibold text-on-surface">
                              {item.studentName}
                            </p>
                            <p className="text-[11px] text-outline">
                              {item.grade} • Age {item.studentAge}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Assessor */}
                      <td className="px-lg py-lg">
                        <p className="font-medium text-on-surface">
                          {item.assessor}
                        </p>
                        <p className="text-[11px] text-outline">
                          Evaluated: {item.date}
                        </p>
                      </td>

                      {/* C4.5 Outcome */}
                      <td className="px-lg py-lg text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-md text-[11px] font-bold ${
                            item.classificationType === 'meeting'
                              ? 'bg-secondary-container text-on-secondary-container'
                              : item.classificationType === 'attention'
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                              : 'bg-primary-container/20 text-primary'
                          }`}
                        >
                          {item.classification}
                        </span>
                        <div className="text-[10px] text-outline mt-0.5">
                          Confidence: {item.confidence}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-lg py-lg text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            item.statusCode === 'verified'
                              ? 'bg-secondary-container/20 text-secondary'
                              : item.statusCode === 'sent'
                              ? 'bg-primary-container/10 text-primary'
                              : 'bg-surface-container text-outline'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          <span>{item.status}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-lg py-lg text-center relative">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedReport(item)}
                            className="p-1.5 bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant rounded-lg transition-colors cursor-pointer"
                            title="Preview Official Report"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              visibility
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedReport(item);
                              setTimeout(() => window.print(), 300);
                            }}
                            className="p-1.5 bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant rounded-lg transition-colors cursor-pointer"
                            title="Print / Save PDF"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              print
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setActiveActionMenuId(
                                activeActionMenuId === item.id ? null : item.id
                              )
                            }
                            className="p-1.5 text-outline hover:text-on-surface rounded-lg transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              more_vert
                            </span>
                          </button>
                        </div>

                        {/* Dropdown Action Popover */}
                        {activeActionMenuId === item.id && (
                          <div className="absolute right-6 top-12 z-30 bg-surface-container-lowest border border-outline-variant shadow-dropdown rounded-xl p-1.5 w-44 text-left animate-in fade-in zoom-in-95 duration-150">
                            <button
                              type="button"
                              onClick={() => {
                                showToast(`Laporan ${item.id} dikirimkan ke portal orang tua!`);
                                setActiveActionMenuId(null);
                              }}
                              className="w-full text-left px-3 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-high rounded-lg flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px] text-secondary">
                                send
                              </span>
                              <span>Share with Parents</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                showToast(`Menyiapkan berkas digital untuk ${item.studentName}...`);
                                setActiveActionMenuId(null);
                              }}
                              className="w-full text-left px-3 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-high rounded-lg flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px] text-primary">
                                download
                              </span>
                              <span>Download PDF</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredReports.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 text-center text-outline text-xs"
                      >
                        Tidak ada laporan asesmen yang sesuai dengan filter pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-lg py-md border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center bg-surface-container-lowest gap-3">
              <p className="font-label-md text-xs text-on-surface-variant">
                Showing {filteredReports.length} of 142 evaluation records
              </p>
              <div className="flex items-center gap-base text-xs">
                <button
                  type="button"
                  className="p-1 text-outline hover:text-primary transition-colors border border-outline-variant rounded cursor-pointer"
                  onClick={() => showToast('Halaman pertama')}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <span className="px-md font-label-md font-semibold">
                  Page 1 of 12
                </span>
                <button
                  type="button"
                  className="p-1 text-outline hover:text-primary transition-colors border border-outline-variant rounded cursor-pointer"
                  onClick={() => showToast('Memuat halaman 2...')}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: Full Official Report Preview (Print Ready) */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-3xl rounded-2xl shadow-dropdown border border-outline-variant p-6 md:p-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto custom-scrollbar">
            {/* Modal Actions Header */}
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-outline-variant/40 no-print">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  verified_user
                </span>
                <span className="text-xs font-bold text-outline uppercase tracking-wider">
                  Official Early Childhood Assessment Record
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    print
                  </span>
                  <span>Print Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="text-outline hover:text-on-surface text-xl cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official Report Document Body */}
            <div className="space-y-6 text-on-surface">
              {/* Institution Letterhead */}
              <div className="flex justify-between items-center border-b-2 border-primary/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                    <span className="material-symbols-outlined text-[28px]">
                      school
                    </span>
                  </div>
                  <div>
                    <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary leading-tight">
                      B-Star Early Childhood Development Center
                    </h1>
                    <p className="text-xs text-on-surface-variant font-medium">
                      Academic Growth & Longitudinal Development Assessment Record
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <p className="font-bold text-primary">{selectedReport.id}</p>
                  <p className="text-outline">{selectedReport.date}</p>
                </div>
              </div>

              {/* Student Demographics Card */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <img
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                    alt={selectedReport.studentName}
                    src={selectedReport.studentAvatar}
                  />
                  <div>
                    <h3 className="font-title-lg text-base font-bold text-on-surface">
                      {selectedReport.studentName}
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Grade: <span className="font-semibold text-on-surface">{selectedReport.grade}</span> • Age: {selectedReport.studentAge} Years
                    </p>
                    <p className="text-[11px] text-outline">
                      Lead Assessor: {selectedReport.assessor}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-outline font-medium">
                    Algorithmic Classification
                  </div>
                  <div className="text-sm font-bold text-primary mt-0.5">
                    {selectedReport.classification}
                  </div>
                  <div className="text-[11px] text-secondary font-semibold">
                    Confidence: {selectedReport.confidence} (Leaf Pure)
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="font-title-lg text-sm font-bold uppercase tracking-wider text-outline mb-2">
                  1. Executive Summary & Observations
                </h4>
                <div className="p-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {selectedReport.summary}
                  </p>
                </div>
              </div>

              {/* 5 Domain Developmental Scores */}
              <div>
                <h4 className="font-title-lg text-sm font-bold uppercase tracking-wider text-outline mb-2">
                  2. Domain Mastery Assessment (Scale 0 - 10)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedReport.domains.map((dom, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl"
                    >
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-semibold text-on-surface">
                          {dom.name}
                        </span>
                        <span className="font-bold text-primary">
                          {dom.score} / {dom.max}
                        </span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${(dom.score / dom.max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* C4.5 Decision Path & Home Journey */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/60 rounded-xl">
                  <h5 className="font-bold text-xs text-primary mb-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">
                      account_tree
                    </span>
                    <span>C4.5 Decision Tree Classification Rule</span>
                  </h5>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {selectedReport.c45Node}
                  </p>
                </div>

                <div className="p-3.5 bg-surface-container-lowest border border-outline-variant/60 rounded-xl">
                  <h5 className="font-bold text-xs text-secondary mb-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">
                      home
                    </span>
                    <span>Home Stimulation Milestone Log</span>
                  </h5>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {selectedReport.homeJourneyRate}
                  </p>
                </div>
              </div>

              {/* Signatures & Certification Block */}
              <div className="pt-6 border-t border-outline-variant/60 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="h-14 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-primary font-bold">
                      {selectedReport.assessor}
                    </span>
                  </div>
                  <div className="border-t border-outline-variant pt-1 font-semibold text-on-surface">
                    {selectedReport.assessor}
                  </div>
                  <div className="text-[10px] text-outline">Lead Child Evaluator</div>
                </div>

                <div>
                  <div className="h-14 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-secondary font-bold">
                      Dr. Helena Vance, M.Pd
                    </span>
                  </div>
                  <div className="border-t border-outline-variant pt-1 font-semibold text-on-surface">
                    Dr. Helena Vance, M.Pd
                  </div>
                  <div className="text-[10px] text-outline">Head of Early Learning</div>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex justify-end gap-3 pt-6 border-t border-outline-variant/40 mt-6 no-print">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(
                    `Laporan ${selectedReport.id} berhasil disinkronkan ke buku harian orang tua!`
                  );
                  setSelectedReport(null);
                }}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                Share with Parents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Generate New Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200 no-print">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-dropdown border border-outline-variant p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    post_add
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    Generate New Growth Report
                  </h3>
                  <p className="text-[11px] text-outline">
                    Based on C4.5 evaluations and assessment scores
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Student *
                  </label>
                  <select
                    value={newReportData.studentName}
                    onChange={(e) => {
                      const name = e.target.value;
                      const grade =
                        name === 'Amara Vance' || name === 'Liam Anderson'
                          ? 'Pre-K 4'
                          : name === 'Julian Parks'
                          ? 'Kindergarten B'
                          : 'Kindergarten A';
                      setNewReportData({
                        ...newReportData,
                        studentName: name,
                        grade,
                      });
                    }}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option value="Mateo Silva">Mateo Silva</option>
                    <option value="Amara Vance">Amara Vance</option>
                    <option value="Julian Parks">Julian Parks</option>
                    <option value="Liam Anderson">Liam Anderson</option>
                    <option value="Sophia Martinez">Sophia Martinez</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Cohort / Class
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={newReportData.grade}
                    className="w-full bg-surface-container-high/60 border border-outline-variant rounded-xl px-3 py-2 text-xs text-outline outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Report Template
                  </label>
                  <select
                    value={newReportData.template}
                    onChange={(e) =>
                      setNewReportData({
                        ...newReportData,
                        template: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option value="Comprehensive Term Evaluation">
                      Comprehensive Term Evaluation
                    </option>
                    <option value="C4.5 Cognitive Diagnostics">
                      C4.5 Cognitive Diagnostics
                    </option>
                    <option value="Parent Journey Milestone Summary">
                      Parent Journey Milestone Summary
                    </option>
                    <option value="Motor & Physical Skills Audit">
                      Motor & Physical Skills Audit
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Period
                  </label>
                  <select
                    value={newReportData.period}
                    onChange={(e) =>
                      setNewReportData({
                        ...newReportData,
                        period: e.target.value,
                      })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option value="Term 1 - 2024">Term 1 - 2024</option>
                    <option value="Term 2 - 2024">Term 2 - 2024</option>
                    <option value="Annual Progress">Annual Progress</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Lead Assessor
                </label>
                <select
                  value={newReportData.assessor}
                  onChange={(e) =>
                    setNewReportData({
                      ...newReportData,
                      assessor: e.target.value,
                    })
                  }
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none cursor-pointer"
                >
                  <option value="Prof. Aristhotene">Prof. Aristhotene</option>
                  <option value="Dewi Lestari, S.Pd">Dewi Lestari, S.Pd</option>
                  <option value="Rian Hidayat, M.Ed">Rian Hidayat, M.Ed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Qualitative Educator Assessment Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Ringkasan narasi perkembangan anak dan rekomendasi tindak lanjut..."
                  value={newReportData.notes}
                  onChange={(e) =>
                    setNewReportData({
                      ...newReportData,
                      notes: e.target.value,
                    })
                  }
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-on-surface">
                  <input
                    type="checkbox"
                    checked={newReportData.includeDecisionTree}
                    onChange={(e) =>
                      setNewReportData({
                        ...newReportData,
                        includeDecisionTree: e.target.checked,
                      })
                    }
                    className="rounded text-primary focus:ring-primary/20"
                  />
                  <span>Sertakan Inferensi C4.5</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-on-surface">
                  <input
                    type="checkbox"
                    checked={newReportData.includeHomeJourney}
                    onChange={(e) =>
                      setNewReportData({
                        ...newReportData,
                        includeHomeJourney: e.target.checked,
                      })
                    }
                    className="rounded text-primary focus:ring-primary/20"
                  />
                  <span>Sertakan Log Jurnal Rumah</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/40 mt-4">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  Publish & Verify Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
