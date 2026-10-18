import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function Recommendations({ onLogout, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('BS-2001');
  const [activeDomainFilter, setActiveDomainFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);
  const [completedStrategies, setCompletedStrategies] = useState({});
  const [selectedResource, setSelectedResource] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStrategy, setNewStrategy] = useState({
    title: '',
    category: 'Literacy',
    duration: '10-15 Min',
    description: '',
  });

  // Multi-student recommendation datasets
  const studentsRecommendations = {
    'BS-2001': {
      id: 'BS-2001',
      name: 'Liam Sterling',
      age: '4.5',
      grade: 'Pre-K 4',
      date: 'May 12, 2024',
      bannerInsight:
        "Based on Liam's latest cognitive assessment, we've identified key opportunities to nurture executive function through play-based literacy and social collaboration.",
      teacherStrategies: [
        {
          id: 'ts-1',
          title: 'Scaffolded Storytelling',
          description:
            "Encourage Liam to lead 'Picture Walks' where he describes events in a book without reading text. This builds narrative logic and confidence.",
          domain: 'Literacy',
          duration: '10-15 Min',
        },
        {
          id: 'ts-2',
          title: 'Cooperative Manipulatives',
          description:
            "Utilize team-based block building tasks. Assign Liam the role of 'Materials Manager' to practice social coordination and spatial vocabulary.",
          domain: 'Social-Emotional',
          duration: 'Group Task',
        },
        {
          id: 'ts-3',
          title: 'Sensory Math Exploration',
          description:
            'Introduce counting through varied textures (sand, water, beads). Focus on one-to-one correspondence up to 20.',
          domain: 'Cognitive',
          duration: 'Hands-on',
        },
      ],
      homeGuide: [
        {
          routine: 'MORNING ROUTINE',
          instruction:
            'Introduce a visual schedule. Let Liam move the magnet once a task (teeth brushing, dressing) is complete to foster independence.',
        },
        {
          routine: 'EVENING PLAY',
          instruction:
            'Focus on "I Spy" games that require descriptive language (e.g., "I spy something round and red") rather than just names.',
        },
        {
          routine: 'BEDTIME LITERACY',
          instruction:
            'Predictive Reading: Pause before a key event in a familiar story and ask Liam, "What do you think happens next?"',
        },
      ],
      dailyTip: 'Tip: 15 minutes of uninterrupted play daily.',
    },
    'BS-1024': {
      id: 'BS-1024',
      name: 'Mateo Silva',
      age: '5.0',
      grade: 'Kindergarten',
      date: 'Oct 24, 2023',
      bannerInsight:
        'Mateo demonstrates strong cognitive reasoning. Targeted enrichment in conversational articulation and expressive dialogue will balance his developmental spectrum.',
      teacherStrategies: [
        {
          id: 'ts-4',
          title: 'Peer Dialogue Partnering',
          description:
            'Pair Mateo during circle time with verbally expressive peers to model conversational turn-taking and phonetic expansion.',
          domain: 'Linguistic',
          duration: '15-20 Min',
        },
        {
          id: 'ts-5',
          title: 'STEM Pattern Exploration',
          description:
            'Challenge Mateo with open-ended tangram patterns and mirror symmetry geometry to leverage his 94.8% abstract logic readiness.',
          domain: 'Cognitive',
          duration: 'Individual Focus',
        },
        {
          id: 'ts-6',
          title: 'Kinesthetic Rhythm Sequences',
          description:
            'Integrate clapping and body percussion to connect auditory rhythmic comprehension with physical gross motor execution.',
          domain: 'Physical',
          duration: 'Circle Time',
        },
      ],
      homeGuide: [
        {
          routine: 'BREAKFAST CHAT',
          instruction:
            'Encourage full sentence answers by asking open-ended "Why" and "How" questions about his dreams or plans for the day.',
        },
        {
          routine: 'OUTDOOR NATURE WALK',
          instruction:
            'Ask Mateo to describe 3 different leaf textures and sounds heard during the walk to stimulate rich auditory-verbal vocabulary.',
        },
        {
          routine: 'BEDTIME CO-CREATION',
          instruction:
            'Alternate telling pages of an imaginary superhero story together before lights out.',
        },
      ],
      dailyTip: 'Tip: Encourage descriptive sentences with open-ended prompts.',
    },
    'BS-1025': {
      id: 'BS-1025',
      name: 'Amara Vance',
      age: '4.2',
      grade: 'Pre-K 4',
      date: 'Nov 04, 2023',
      bannerInsight:
        'Amara benefits from multi-sensory phonics and high-frequency tactile reinforcement to support expressive language acceleration.',
      teacherStrategies: [
        {
          id: 'ts-7',
          title: 'Tactile Phonics Sand Tracing',
          description:
            'Trace phonetic letter cards in colored sand while vocalizing letter sounds together to reinforce multi-sensory retention.',
          domain: 'Literacy',
          duration: '10 Min',
        },
        {
          id: 'ts-8',
          title: 'Emotion Face Cards',
          description:
            'Use illustrated emotion flashcards in calm-down corner to help Amara identify and express feelings verbally.',
          domain: 'Social-Emotional',
          duration: 'Small Group',
        },
      ],
      homeGuide: [
        {
          routine: 'MORNING MIRROR MIME',
          instruction:
            'Make funny vocal sounds together in the mirror during teeth brushing to loosen facial and mouth articulators.',
        },
        {
          routine: 'PLAYDOUGH SCULPTING',
          instruction:
            'Shape letters and animals with playdough while describing colors and sensory textures.',
        },
      ],
      dailyTip: 'Tip: 10 minutes of patient phonics mirror play each morning.',
    },
  };

  const currentStudent =
    studentsRecommendations[selectedStudentId] ||
    studentsRecommendations['BS-2001'];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleStrategyCompletion = (strategyId) => {
    setCompletedStrategies((prev) => {
      const next = !prev[strategyId];
      showToast(
        next
          ? 'Strategy marked as completed in classroom log!'
          : 'Strategy marked as pending.'
      );
      return { ...prev, [strategyId]: next };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    showToast(
      `Generating PDF report for ${currentStudent.name} (Valid 6 months)...`
    );
    setTimeout(() => {
      window.print();
    }, 800);
  };

  const filteredStrategies = currentStudent.teacherStrategies.filter((s) => {
    if (activeDomainFilter === 'all') return true;
    return s.domain.toLowerCase().includes(activeDomainFilter.toLowerCase());
  });

  const handleAddCustomStrategy = (e) => {
    e.preventDefault();
    if (!newStrategy.title.trim()) return;

    currentStudent.teacherStrategies.push({
      id: `ts-custom-${Date.now()}`,
      title: newStrategy.title,
      description: newStrategy.description || 'Custom educator plan strategy.',
      domain: newStrategy.category,
      duration: newStrategy.duration,
    });

    setNewStrategy({
      title: '',
      category: 'Literacy',
      duration: '10-15 Min',
      description: '',
    });
    setShowAddModal(false);
    showToast('Custom strategy added to Teacher Strategy Toolkit!');
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen overflow-x-hidden">
      {/* Toast Notification */}
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
        activeMenu="Recommendations"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (menu === 'Students' && onNavigate) onNavigate('students');
          else if (menu === 'Teachers' && onNavigate) onNavigate('teachers');
          else if (menu === 'Parents' && onNavigate) onNavigate('parents');
          else if (menu === 'Assessment' && onNavigate) onNavigate('assessment');
          else if (menu === 'Classification' && onNavigate) onNavigate('classification');
          else if (menu === 'Recommendations' && onNavigate) onNavigate('recommendations');
          else if (onNavigate) onNavigate(menu.toLowerCase());
        }}
        onNewAssessment={() => {
          if (onNavigate) onNavigate('assessment');
        }}
        onLogout={onLogout}
      />

      {/* 2. Main Content Canvas */}
      <main className="md:ml-64 min-h-screen pb-2xl main-content flex flex-col">
        {/* Top Bar Header (Reusable Navbar Style) */}
        <header className="flex flex-wrap justify-between items-center w-full px-lg py-sm sticky top-0 z-40 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30 no-print">
          <div className="flex items-center gap-md">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-outline hover:bg-surface-container-high transition-colors"
              aria-label="Open navigation menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <h2 className="font-title-lg text-base md:text-lg font-bold text-on-surface">
              Growth Recommendations
            </h2>
            <div className="hidden sm:block h-6 w-[1px] bg-outline-variant"></div>

            {/* Student Switcher Chip */}
            <div className="flex items-center gap-sm bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant shadow-2xs">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: '18px' }}
              >
                person
              </span>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="bg-transparent font-label-md text-xs text-on-surface font-semibold outline-none cursor-pointer pr-1"
                aria-label="Select student for recommendations"
              >
                <option value="BS-2001">Liam Sterling • Age 4.5</option>
                <option value="BS-1024">Mateo Silva • Age 5.0</option>
                <option value="BS-1025">Amara Vance • Age 4.2</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-sm md:gap-md mt-2 sm:mt-0">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors text-on-surface-variant text-xs font-semibold border border-outline-variant/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span className="hidden sm:inline font-label-md">Print Report</span>
            </button>

            <button
              type="button"
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 transition-opacity text-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span className="font-label-md">Export PDF</span>
            </button>

            <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant shrink-0 ml-1">
              <img
                className="w-full h-full object-cover"
                alt="Prof. Aristhotene"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhfPtPpyZVBsfiHoPfgA7F7wXzMlfv3mhTavBcAaG97Jtl6r-Hvi8Hp-LAjMZTIcnQZnMEd27Khho4nrf2-4ppEUuH0-e6OmDeo9eGnnm8C_xzbb2iEAnRZLJNa9hmv_jGehVzo1iqSJ8_V0Zf-0k06tswAWcTrwG20kL9-lrpPNTohuGsl5gRYBpQEAzqmKUA2N6_NenPXBaSRVBs2tGYcku-3sQ9LQQ-HGDDjInF4xaLuTehypdnAagderPYoftA4Gv5VAuvT_oq"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="px-4 md:px-margin-desktop py-6 md:py-xl max-w-[1200px] w-full mx-auto space-y-xl flex-1">
          {/* Summary Banner */}
          <section className="rounded-xl bg-gradient-to-r from-primary to-primary-container p-6 md:p-xl text-on-primary-container shadow-sm flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  Tailored Insight
                </span>
                <span className="text-white/80 text-xs font-medium">
                  {currentStudent.grade} Cohort
                </span>
              </div>
              <h3 className="font-headline-lg text-xl md:text-2xl font-bold mb-sm text-white">
                Academic Journey Insights for {currentStudent.name}
              </h3>
              <p className="font-body-lg text-xs md:text-sm max-w-xl text-white/90 leading-relaxed">
                {currentStudent.bannerInsight}
              </p>
            </div>
            {/* Skewed decorative overlay */}
            <div className="hidden md:block absolute -right-12 top-0 h-full w-1/3 opacity-20 transform -skew-x-12 bg-white pointer-events-none"></div>
          </section>

          {/* Quick Domain Filter Bar & Custom Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-outline font-medium mr-1">
                Filter Domain:
              </span>
              {[
                { id: 'all', label: 'All Domains' },
                { id: 'literacy', label: 'Literacy' },
                { id: 'social', label: 'Social-Emotional' },
                { id: 'cognitive', label: 'Cognitive' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveDomainFilter(filter.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeDomainFilter === filter.id
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-surface-container-lowest border border-outline-variant/60 rounded-xl text-xs font-semibold hover:bg-surface-container-high transition-colors shadow-2xs text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add Custom Strategy</span>
            </button>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-gutter">
            {/* Section 1: Teacher Strategy Toolkit (7 Cols on LG) */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-gutter">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 md:p-xl shadow-sm h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
                        <span className="material-symbols-outlined text-[26px]">
                          school
                        </span>
                      </div>
                      <div>
                        <h4 className="font-title-lg text-base md:text-lg font-bold text-on-surface">
                          Teacher Strategy Toolkit
                        </h4>
                        <span className="font-label-md text-[11px] text-secondary bg-secondary-container/30 px-sm py-xs rounded-full uppercase tracking-wider font-bold">
                          Classroom Focus
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-outline font-medium">
                      {filteredStrategies.length} Interventions
                    </span>
                  </div>

                  <div className="space-y-md">
                    {filteredStrategies.map((strategy) => {
                      const isDone = !!completedStrategies[strategy.id];
                      return (
                        <div
                          key={strategy.id}
                          className={`p-md rounded-xl border transition-all ${
                            isDone
                              ? 'bg-secondary-container/10 border-secondary/40 shadow-xs'
                              : 'bg-surface-container-low border-outline-variant/50 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start gap-md">
                            <button
                              type="button"
                              onClick={() => toggleStrategyCompletion(strategy.id)}
                              className="mt-1 flex-shrink-0 text-primary cursor-pointer hover:scale-110 transition-transform"
                              title={
                                isDone ? 'Mark as Pending' : 'Mark as Completed'
                              }
                            >
                              <span
                                className={`material-symbols-outlined text-[22px] ${
                                  isDone ? 'text-secondary' : 'text-primary'
                                }`}
                                style={{
                                  fontVariationSettings: isDone
                                    ? "'FILL' 1"
                                    : "'FILL' 0",
                                }}
                              >
                                {isDone ? 'check_circle' : 'radio_button_unchecked'}
                              </span>
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-2 mb-xs">
                                <h5
                                  className={`font-title-lg text-sm md:text-base font-bold text-on-surface ${
                                    isDone ? 'line-through text-outline' : ''
                                  }`}
                                >
                                  {strategy.title}
                                </h5>
                                {isDone && (
                                  <span className="text-[10px] bg-secondary-container/30 text-secondary font-bold px-2 py-0.5 rounded-full">
                                    Done
                                  </span>
                                )}
                              </div>

                              <p className="font-body-md text-xs md:text-sm text-on-surface-variant mb-md leading-relaxed">
                                {strategy.description}
                              </p>

                              <div className="flex flex-wrap gap-xs">
                                <span className="px-sm py-xs bg-surface-container-highest text-on-surface-variant text-[10px] rounded-full font-bold uppercase tracking-wider">
                                  {strategy.domain}
                                </span>
                                <span className="px-sm py-xs bg-surface-container-highest text-on-surface-variant text-[10px] rounded-full font-bold uppercase tracking-wider">
                                  {strategy.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {filteredStrategies.length === 0 && (
                      <div className="text-center py-8 text-outline text-xs">
                        No strategies found for this domain filter.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/40 flex justify-between items-center text-xs text-outline no-print">
                  <span>Click checkmarks to track implementation</span>
                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        'Syncing classroom strategy checklist with weekly journal...'
                      )
                    }
                    className="text-primary font-semibold hover:underline cursor-pointer"
                  >
                    Sync to Daily Journal →
                  </button>
                </div>
              </div>
            </div>

            {/* Section 2: Parent Recommendations & Resources (5 Cols on LG) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-gutter">
              {/* Home Environment Guide Card */}
              <div className="bg-surface-container-highest rounded-xl p-5 md:p-xl shadow-sm border border-primary/10">
                <div className="flex items-center gap-md mb-lg">
                  <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined text-[26px]">
                      family_restroom
                    </span>
                  </div>
                  <div>
                    <h4 className="font-title-lg text-base md:text-lg font-bold text-on-surface">
                      Home Environment Guide
                    </h4>
                    <span className="font-label-md text-[11px] text-tertiary bg-tertiary-fixed/40 px-sm py-xs rounded-full uppercase tracking-wider font-bold">
                      Parent Support
                    </span>
                  </div>
                </div>

                <div className="space-y-md">
                  {currentStudent.homeGuide.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative pl-lg border-l-2 border-tertiary/40 py-base"
                    >
                      <h6 className="font-label-md text-xs text-tertiary font-bold mb-xs tracking-wider">
                        {item.routine}
                      </h6>
                      <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                        {item.instruction}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Cozy living room photo card with gradient overlay */}
                <div className="mt-xl h-48 rounded-xl overflow-hidden border border-outline-variant relative group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="A warm, cozy living room scene with parent and child engaged in playful educational activity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe-BnHxHbSHSi167inPswb-ntHTz9ULaKVTMCZLc69_w0XOODAOD03jRdCfm_8bdgxRe1-X02jTAI2Zx5OV4gAxGOYo0jHnrAkGqsKnhUuEuLl2c8G_GKiA1wAnXWMXpU0ksWIo9nBCv_YC2qilZckXdVqlxGqyxBhiob-izS7B8B2hLkf6sKURJJND3sPjGliU8v14Dub6EytBZhjLfwxJ5TdTMTm2_adgx_jv2uXt_HZvgFjVcFt-Gel0S48PwOTQkMZ4pQelXI7"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent flex items-end p-md">
                    <span className="text-white font-label-md text-xs font-semibold flex items-center gap-base">
                      <span
                        className="material-symbols-outlined text-tertiary-fixed text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        lightbulb
                      </span>
                      <span>{currentStudent.dailyTip}</span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex justify-between items-center text-xs no-print">
                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        `Notification and guide sent to ${currentStudent.name}'s parents via Mobile App!`
                      )
                    }
                    className="w-full py-2 bg-tertiary-fixed/30 hover:bg-tertiary-fixed/50 text-on-tertiary-fixed font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      send
                    </span>
                    <span>Send Guide to Parents App</span>
                  </button>
                </div>
              </div>

              {/* Supporting Resources Card */}
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 md:p-xl shadow-sm">
                <h4 className="font-title-lg text-sm md:text-base font-bold text-on-surface mb-md">
                  Supporting Resources
                </h4>
                <ul className="space-y-sm">
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedResource({
                          title: 'Fine Motor Activities PDF',
                          type: 'pdf',
                          desc: 'A comprehensive 8-page printable guide with cut-and-paste and playdough exercises designed for 4-5 year olds.',
                        })
                      }
                      className="w-full flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-sm">
                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform text-[20px]">
                          picture_as_pdf
                        </span>
                        <span className="font-body-md text-xs md:text-sm text-on-surface-variant font-medium">
                          Fine Motor Activities PDF
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:translate-x-1 transition-transform">
                        chevron_right
                      </span>
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedResource({
                          title: 'Phonological Awareness Video',
                          type: 'video',
                          desc: 'An engaging 6-minute demonstration video explaining rhymes, syllabic counting, and sound segmentation for kindergarteners.',
                        })
                      }
                      className="w-full flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-sm">
                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform text-[20px]">
                          play_circle
                        </span>
                        <span className="font-body-md text-xs md:text-sm text-on-surface-variant font-medium">
                          Phonological Awareness Video
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant text-[18px] group-hover:translate-x-1 transition-transform">
                        chevron_right
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Meta */}
          <footer className="mt-2xl flex flex-col md:flex-row items-center justify-between border-t border-outline-variant/50 pt-xl opacity-75 text-xs text-on-surface-variant gap-4">
            <div className="flex flex-col gap-base">
              <p className="font-label-md font-semibold">
                Report generated by B-Star AI Academic Growth System
              </p>
              <p className="font-label-md italic">
                Date of Assessment: {currentStudent.date} • Validity: 6 Months
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-lg">
              <div className="flex items-center gap-base">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontSize: '18px' }}
                >
                  verified
                </span>
                <span className="font-label-md font-medium">
                  Verified Educator Insight
                </span>
              </div>
              <div className="flex items-center gap-base">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: '18px' }}
                >
                  shield
                </span>
                <span className="font-label-md font-medium">
                  HIPAA/GDPR Compliant
                </span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* MODAL: Resource Preview Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200 no-print">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    {selectedResource.type === 'pdf'
                      ? 'picture_as_pdf'
                      : 'play_circle'}
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-sm md:text-base font-bold text-on-surface">
                    {selectedResource.title}
                  </h3>
                  <p className="text-[11px] text-outline uppercase font-semibold">
                    {selectedResource.type.toUpperCase()} Material
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed mb-5">
              {selectedResource.desc}
            </p>

            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center justify-center min-h-[120px] text-center">
              <div>
                <span className="material-symbols-outlined text-primary text-[36px] mb-1">
                  cloud_download
                </span>
                <p className="text-xs font-semibold text-on-surface">
                  Ready to Download / Stream
                </p>
                <p className="text-[11px] text-outline">
                  Size: 2.4 MB • High Resolution
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-outline-variant/40 mt-5">
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedResource(null);
                  showToast(`Downloading "${selectedResource.title}"...`);
                }}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                Download Resource
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Custom Strategy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200 no-print">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    add_task
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    Add Custom Classroom Strategy
                  </h3>
                  <p className="text-[11px] text-outline">
                    For {currentStudent.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomStrategy} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Strategy Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Guided Phonics Wheel"
                  value={newStrategy.title}
                  onChange={(e) =>
                    setNewStrategy({ ...newStrategy, title: e.target.value })
                  }
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Domain / Focus
                  </label>
                  <select
                    value={newStrategy.category}
                    onChange={(e) =>
                      setNewStrategy({ ...newStrategy, category: e.target.value })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option value="Literacy">Literacy</option>
                    <option value="Social-Emotional">Social-Emotional</option>
                    <option value="Cognitive">Cognitive</option>
                    <option value="Physical">Physical / Kinesthetic</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">
                    Duration / Format
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10-15 Min or Group Task"
                    value={newStrategy.duration}
                    onChange={(e) =>
                      setNewStrategy({ ...newStrategy, duration: e.target.value })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Description & Implementation Guide
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain steps and expected developmental interaction..."
                  value={newStrategy.description}
                  onChange={(e) =>
                    setNewStrategy({
                      ...newStrategy,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/40 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  Save Strategy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
