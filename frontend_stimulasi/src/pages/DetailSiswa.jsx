import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function DetailSiswa({
  student: initialStudent,
  onBack,
  onNavigate,
  onLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Current Term (Spring 2024)');
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Default student details matching the design template (Mateo Fernandez)
  const defaultStudent = {
    id: '#BS-1024',
    name: 'Mateo Fernandez',
    age: '5 Years Old',
    grade: 'Pre-K 2',
    status: 'Active Enrollment',
    bio: 'Mateo is showing exceptional curiosity in logical reasoning and fine motor skills. He is currently working on social-emotional regulation and group collaboration.',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdqujNNpbhSXD8htleQU3-ywxwFwM12Jzjh1lGFOrVJG_Rr3PrbqyzGlnBrAQomMNnMTLNS6Gk3m333YNMVAXYb0kWWOKu-W17xCq9LZI_UNmoxBCmJyaVEVmSgxPWmpn8fwA8ve_e2uMt-bKN6DYbVbdLqfChtYrMEweDsPqkU4LidExU3SA4ETt7vd-02lt9xCqwpWWtGPwQ3op2DD0E3hoyOycI9oDuGvYMr2c6y0dFF5BsGoqk23wgnYZ2Kq9peyakDv53ozky',
    overallGrowth: '+14%',
    cognitiveStatus: 'High',
    socialStatus: 'On Track',
    scores: {
      literacy: 8.4,
      numeracy: 9.2,
      emotional: 7.1,
      physical: 8.8,
    },
    classification: 'Advanced Analytical',
    classificationDesc:
      'Mateo demonstrates cognitive patterns typically seen in students 6-12 months older. Focus on complex problem-solving.',
    recommendationTitle: 'Collaborative Logic Play',
    recommendationCategory: 'Strategy',
    recommendationDesc:
      'Integrate Mateo into small group activities that require turn-taking during building block construction to strengthen social regulation alongside spatial reasoning.',
    journey: [
      {
        week: 'W12',
        title: 'Cognitive Milestone: Pattern Matching',
        date: 'April 12, 2024',
        type: 'primary',
        quote:
          '"Mateo successfully completed the advanced 12-piece pattern sequence without educator assistance." - Ms. Sarah Jenkins',
      },
      {
        week: 'W11',
        title: 'Social Progress: Group Sharing',
        date: 'April 05, 2024',
        type: 'secondary',
        text: 'Actively participated in circle time and shared crayons with a peer without prompting.',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCmkLM5dV3Rmi7PcB8Q6ohkq7x8sITPlUg--dqFYOZUb0qfe4eF7CGg2qCu3iqI5x-UM52GIXmGCKbyyNoSDNG5zTQ6_yODuBV1ca5I9RY7z3fHDz_FRdw8fG1USEct3L-d3iUpgyQqM-cp_pf7RFoRivNkrclYMhc7qXEq2-njpvkz-ckRfD10_grfYGQz7Yp-9wry2evxK-dnIkLhgnTTC4ixhq1_4ShTfWWiwBJHn8qLoN3H8p-soszFQZev7irnaYOxfHBvUHvY',
      },
      {
        week: 'W10',
        title: 'Physical: Fine Motor Dexterity',
        date: 'March 28, 2024',
        type: 'tertiary',
        text: 'Demonstrated improved control with safety scissors during the spring mural project.',
      },
    ],
  };

  // Merge initialStudent if provided
  const student = initialStudent
    ? {
        ...defaultStudent,
        ...initialStudent,
        name: initialStudent.name || defaultStudent.name,
        grade: initialStudent.grade || defaultStudent.grade,
        avatar: initialStudent.avatar || defaultStudent.avatar,
      }
    : defaultStudent;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Radar polygon points based on selected term
  const radarPoints =
    selectedTerm === 'Current Term (Spring 2024)'
      ? '200,60 300,130 360,200 300,270 200,320 100,270 50,200 100,130'
      : '200,90 280,150 320,200 270,260 200,300 130,260 80,200 130,150';

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen overflow-x-hidden">
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
        activeMenu="Students"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (menu === 'Students' && onNavigate) onNavigate('students');
          else if (menu === 'Teachers' && onNavigate) onNavigate('teachers');
          else if (menu === 'Parents' && onNavigate) onNavigate('parents');
          else if (onNavigate) onNavigate(menu.toLowerCase());
        }}
        onNewAssessment={() => setIsAssessmentModalOpen(true)}
        onLogout={onLogout}
      />

      {/* 2. Main Content Canvas */}
      <main className="md:ml-64 min-h-screen relative flex flex-col">
        {/* Top Navigation Bar (Separated Navbar Component) */}
        <Navbar
          onOpenSidebar={() => setMobileMenuOpen(true)}
          pageTitle="Student Profile"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search student profile..."
          actionButton={
            <button
              type="button"
              onClick={onBack || (() => onNavigate && onNavigate('students'))}
              className="bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-full font-label-md text-xs font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              <span>Back to Students</span>
            </button>
          }
          onLogout={onLogout}
        />

        {/* 3. Main Content Area */}
        <div className="p-lg md:px-xl pb-xl space-y-xl max-w-7xl w-full mx-auto flex-1">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-outline pt-2">
            <span
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Dashboard
            </span>
            <span>/</span>
            <span
              onClick={onBack || (() => onNavigate && onNavigate('students'))}
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Students
            </span>
            <span>/</span>
            <span className="text-primary font-medium">{student.name}</span>
          </nav>

          {/* Profile Header Section */}
          <section className="bg-surface-container-lowest rounded-xl p-lg md:p-xl border border-outline-variant shadow-sm flex flex-col md:flex-row items-center gap-xl">
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary-fixed overflow-hidden shadow-lg bg-surface-container">
                {student.avatar ? (
                  <img
                    className="w-full h-full object-cover"
                    src={student.avatar}
                    alt={student.name}
                  />
                ) : (
                  <div className="w-full h-full bg-primary-fixed text-primary flex items-center justify-center text-4xl font-bold">
                    {student.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)}
                  </div>
                )}
              </div>
              <div
                className="absolute bottom-2 right-2 bg-secondary text-on-secondary rounded-full p-2 shadow-md flex items-center justify-center"
                title="Verified Active Enrollment"
              >
                <span className="material-symbols-outlined text-[20px]">
                  verified_user
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface mb-xs">
                {student.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-md mb-md">
                <span className="px-md py-1 bg-surface-container rounded-full font-label-md text-label-md text-on-surface-variant flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-[16px]">
                    cake
                  </span>{' '}
                  {student.age}
                </span>
                <span className="px-md py-1 bg-surface-container rounded-full font-label-md text-label-md text-on-surface-variant flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-[16px]">
                    grade
                  </span>{' '}
                  Grade: {student.grade}
                </span>
                <span className="px-md py-1 bg-secondary-container/30 text-secondary rounded-full font-label-md text-label-md flex items-center gap-1 text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>{' '}
                  {student.status}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl text-xs sm:text-sm leading-relaxed">
                {student.bio}
              </p>
            </div>

            <div className="flex flex-col gap-sm w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('assessment', student);
                  else setIsAssessmentModalOpen(true);
                }}
                className="w-full md:w-auto px-lg py-3 bg-primary text-on-primary rounded-lg font-title-lg text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm shadow-primary/20"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                <span>New Assessment</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  showToast(
                    `Generating shareable PDF report for ${student.name}...`
                  )
                }
                className="w-full md:w-auto px-lg py-3 border border-outline text-primary rounded-lg font-title-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  share
                </span>
                <span>Share Report</span>
              </button>
            </div>
          </section>

          {/* Development Summary Hero Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Growth Metric 1: Overall Growth */}
            <div className="bg-primary-container text-on-primary-container rounded-xl p-lg flex flex-col justify-between h-44 shadow-sm hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl">
                  trending_up
                </span>
                <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  Overall Growth
                </span>
              </div>
              <div>
                <div className="font-display-lg text-4xl font-bold leading-none">
                  {student.overallGrowth}
                </div>
                <div className="font-label-md text-xs opacity-80 mt-1">
                  Vs. previous quarter
                </div>
              </div>
            </div>

            {/* Growth Metric 2: Cognitive */}
            <div className="bg-secondary-container text-on-secondary-container rounded-xl p-lg flex flex-col justify-between h-44 shadow-sm hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl">
                  psychology
                </span>
                <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  Cognitive
                </span>
              </div>
              <div>
                <div className="font-display-lg text-4xl font-bold leading-none">
                  {student.cognitiveStatus}
                </div>
                <div className="font-label-md text-xs opacity-80 mt-1">
                  Above baseline expectations
                </div>
              </div>
            </div>

            {/* Growth Metric 3: Social */}
            <div className="bg-tertiary-fixed text-on-tertiary-fixed rounded-xl p-lg flex flex-col justify-between h-44 shadow-sm hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl">
                  groups
                </span>
                <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  Social
                </span>
              </div>
              <div>
                <div className="font-display-lg text-4xl font-bold leading-none">
                  {student.socialStatus}
                </div>
                <div className="font-label-md text-xs opacity-80 mt-1">
                  Meeting all developmental milestones
                </div>
              </div>
            </div>
          </section>

          {/* Main Visualization & Logic Hub */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
            {/* Assessment Radar Visualization (Left Column - 7 Cols) */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-xl">
                <div>
                  <h2 className="font-title-lg text-lg font-bold text-on-surface">
                    Assessment Radar
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Cross-domain cognitive, social, and motor evaluation
                  </p>
                </div>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="bg-surface-container text-on-surface-variant border-none rounded-lg font-label-md text-xs px-md py-2 cursor-pointer focus:ring-1 focus:ring-primary outline-none self-start sm:self-auto"
                >
                  <option>Current Term (Spring 2024)</option>
                  <option>Previous Term (Fall 2023)</option>
                </select>
              </div>

              {/* Radar Chart SVG */}
              <div className="relative flex justify-center items-center h-[360px] sm:h-[400px]">
                <svg
                  className="w-full h-full max-w-[380px] transition-all duration-700"
                  viewBox="0 0 400 400"
                >
                  {/* Background Grid Circles */}
                  <circle
                    cx="200"
                    cy="200"
                    fill="none"
                    r="180"
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    fill="none"
                    r="135"
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    fill="none"
                    r="90"
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    fill="none"
                    r="45"
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />

                  {/* Axis Lines */}
                  <line
                    stroke="#cbd5e1"
                    x1="200"
                    x2="200"
                    y1="20"
                    y2="380"
                  />
                  <line
                    stroke="#cbd5e1"
                    x1="20"
                    x2="380"
                    y1="200"
                    y2="200"
                  />
                  <line
                    stroke="#cbd5e1"
                    x1="72"
                    x2="328"
                    y1="72"
                    y2="328"
                  />
                  <line
                    stroke="#cbd5e1"
                    x1="72"
                    x2="328"
                    y1="328"
                    y2="72"
                  />

                  {/* Dynamic Radar Polygon */}
                  <polygon
                    points={radarPoints}
                    className="transition-all duration-700"
                    style={{
                      stroke: '#0059ba',
                      strokeWidth: 2.5,
                      fill: 'rgba(0, 89, 186, 0.15)',
                    }}
                  />

                  {/* Data Points */}
                  <circle cx="200" cy="60" fill="#0059ba" r="5" />
                  <circle cx="300" cy="130" fill="#0059ba" r="5" />
                  <circle cx="360" cy="200" fill="#0059ba" r="5" />
                  <circle cx="300" cy="270" fill="#0059ba" r="5" />
                  <circle cx="200" cy="320" fill="#0059ba" r="5" />
                  <circle cx="100" cy="270" fill="#0059ba" r="5" />
                  <circle cx="50" cy="200" fill="#0059ba" r="5" />
                  <circle cx="100" cy="130" fill="#0059ba" r="5" />
                </svg>

                {/* Aspect Labels */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 font-label-md text-xs font-bold text-primary bg-primary-container/10 px-2 py-0.5 rounded">
                  Logic
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-label-md text-xs font-semibold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
                  Motor Skills
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 font-label-md text-xs font-semibold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
                  Social
                </div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 font-label-md text-xs font-semibold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
                  Creative
                </div>
              </div>

              {/* 4 Quantitative Metric Cards Below Radar */}
              <div className="mt-lg grid grid-cols-2 sm:grid-cols-4 gap-md">
                <div className="text-center p-md bg-surface-container-low rounded-lg border border-outline-variant/40">
                  <div className="font-label-md text-on-surface-variant text-[11px] mb-1 uppercase tracking-wider font-semibold">
                    Literacy
                  </div>
                  <div className="font-title-lg text-primary text-xl font-bold">
                    {student.scores.literacy}
                  </div>
                </div>
                <div className="text-center p-md bg-surface-container-low rounded-lg border border-outline-variant/40">
                  <div className="font-label-md text-on-surface-variant text-[11px] mb-1 uppercase tracking-wider font-semibold">
                    Numeracy
                  </div>
                  <div className="font-title-lg text-primary text-xl font-bold">
                    {student.scores.numeracy}
                  </div>
                </div>
                <div className="text-center p-md bg-surface-container-low rounded-lg border border-outline-variant/40">
                  <div className="font-label-md text-on-surface-variant text-[11px] mb-1 uppercase tracking-wider font-semibold">
                    Emotional
                  </div>
                  <div className="font-title-lg text-primary text-xl font-bold">
                    {student.scores.emotional}
                  </div>
                </div>
                <div className="text-center p-md bg-surface-container-low rounded-lg border border-outline-variant/40">
                  <div className="font-label-md text-on-surface-variant text-[11px] mb-1 uppercase tracking-wider font-semibold">
                    Physical
                  </div>
                  <div className="font-title-lg text-primary text-xl font-bold">
                    {student.scores.physical}
                  </div>
                </div>
              </div>
            </div>

            {/* Classification & Recommendations (Right Column - 5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-xl">
              {/* Classification Result Card */}
              <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm">
                <h2 className="font-title-lg text-base font-bold text-on-surface mb-md">
                  Latest Classification
                </h2>
                <div className="p-lg bg-surface-container rounded-xl border border-primary/20 flex gap-md items-start">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      category
                    </span>
                  </div>
                  <div>
                    <div className="font-title-lg text-primary font-bold text-base mb-1">
                      {student.classification}
                    </div>
                    <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                      {student.classificationDesc}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('classification')}
                      className="text-primary text-xs font-semibold hover:underline flex items-center gap-1 mt-2 cursor-pointer"
                    >
                      <span>View C4.5 Decision Tree Analysis</span>
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Recommendation Card */}
              <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-md">
                  <h2 className="font-title-lg text-base font-bold text-on-surface">
                    Key Recommendation
                  </h2>
                  <span className="material-symbols-outlined text-tertiary text-[22px]">
                    auto_awesome
                  </span>
                </div>

                <div className="group relative overflow-hidden rounded-xl bg-inverse-surface text-inverse-on-surface p-lg flex-1 flex flex-col justify-between">
                  <div className="relative z-10">
                    <div className="mb-sm">
                      <span className="bg-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-on-tertiary inline-block">
                        {student.recommendationCategory}
                      </span>
                    </div>
                    <h3 className="font-title-lg text-lg font-bold mb-md">
                      {student.recommendationTitle}
                    </h3>
                    <p className="font-body-md text-xs opacity-85 leading-relaxed mb-lg">
                      {student.recommendationDesc}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigate) onNavigate('recommendations');
                        else
                          showToast(
                            `Opening individualized lesson plan: "${student.recommendationTitle}"`
                          );
                      }}
                      className="inline-flex items-center gap-2 text-primary-fixed-dim font-label-md text-xs font-semibold hover:underline cursor-pointer"
                    >
                      <span>View Full Recommendation Toolkit</span>
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[120px]">
                      lightbulb
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Journey History (Bottom Section) */}
          <section className="bg-surface-container-lowest rounded-xl p-lg md:p-xl border border-outline-variant shadow-sm">
            <h2 className="font-title-lg text-lg font-bold text-on-surface mb-xl">
              Weekly Journey History
            </h2>

            <div className="flex flex-col gap-lg">
              {student.journey.map((item, idx) => {
                const isLast = idx === student.journey.length - 1;
                const badgeColor =
                  item.type === 'primary'
                    ? 'bg-primary-container text-on-primary-container'
                    : item.type === 'secondary'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-tertiary-fixed text-on-tertiary-fixed';

                return (
                  <div key={item.week} className="flex gap-lg">
                    {/* Circle badge & connector line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-xs ${badgeColor}`}
                      >
                        {item.week}
                      </div>
                      {!isLast && (
                        <div className="w-0.5 h-full bg-outline-variant my-2 min-h-[40px]"></div>
                      )}
                    </div>

                    {/* Timeline Content */}
                    <div
                      className={`flex-1 pb-lg ${
                        !isLast ? 'border-b border-outline-variant/30' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-sm">
                        <h4 className="font-title-lg text-sm sm:text-base font-bold text-on-surface">
                          {item.title}
                        </h4>
                        <span className="font-label-md text-xs text-on-surface-variant font-medium">
                          {item.date}
                        </span>
                      </div>

                      {item.quote && (
                        <div className="p-md bg-surface-container-low rounded-lg border-l-4 border-primary">
                          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant italic">
                            {item.quote}
                          </p>
                        </div>
                      )}

                      {item.text && (
                        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {item.text}
                        </p>
                      )}

                      {item.image && (
                        <div className="flex gap-md mt-md">
                          <div className="w-24 h-24 rounded-xl overflow-hidden border border-outline-variant/40 shadow-xs">
                            <img
                              className="w-full h-full object-cover"
                              src={item.image}
                              alt={item.title}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="p-lg mt-xl text-center text-on-surface-variant opacity-75 border-t border-outline-variant/30">
          <p className="font-label-md text-xs">
            © {new Date().getFullYear()} B-Star Early Childhood Development
            Platform. Built for Nurturing Tomorrow.
          </p>
        </footer>
      </main>

      {/* MODAL: New Assessment for Student */}
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
                  Record Assessment for {student.name}
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAssessmentModalOpen(false);
                showToast(`New developmental assessment recorded for ${student.name}!`);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Assessment Domain
                </label>
                <select className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer">
                  <option>Cognitive & Logical Reasoning</option>
                  <option>Gross & Fine Motor Skills</option>
                  <option>Social-Emotional Regulation</option>
                  <option>Expressive & Receptive Language</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Developmental Score (0 - 10)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  defaultValue="9.0"
                  required
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Observation Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Record child behavior, responses, and milestone indicators..."
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                ></textarea>
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
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
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

export default DetailSiswa;
