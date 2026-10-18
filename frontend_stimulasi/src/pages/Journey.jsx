import React, { useState, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function Journey({ onLogout, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'priority' | 'active'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'on_track' | 'delayed' | 'completed'
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);

  // Initial journey dataset
  const [journeys, setJourneys] = useState([
    {
      id: 'JN-01',
      studentName: 'Liam Anderson',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAteBzizmynm1jy_L8bbyGDgBsEPGZkd0YNPWkYdGZtA20jaG14MCpK4X9ri9Tl7plJvtlkPJiI_umOifsXdYyOCgJFNkLky2uowTDtpvxiEAmv-8l1Sja7FBDPkx7x3N0qZUvmaytAPNzzuzbn0_AzKcX9hS6kpC6dL-ArAQX0ru24Mnljwaboyx8bW1wKRXXaB70f3PbCSIX-C8HN6ARYMTBDBG6luCGJsVD2hckzL4OF7bv4rX09ZgZud-AtACeKLT6sopGLFB-R',
      parentName: 'Sarah Anderson',
      parentPhone: '+62 812-3456-7890',
      status: 'On Track',
      statusCode: 'on_track',
      days: [
        { day: 'Mon', status: 'completed', label: 'Phonetics Word Search' },
        { day: 'Tue', status: 'completed', label: 'Rhyme Matching Audio' },
        { day: 'Wed', status: 'completed', label: 'Picture Story Walk' },
        { day: 'Thu', status: 'pending', label: 'Alphabet Tracing' },
        { day: 'Fri', status: 'pending', label: 'Sensory Sand Letters' },
      ],
      completedCount: 3,
      totalCount: 5,
      lastInteraction: 'Today, 9:45 AM',
      lastModule: 'Phonetics Level 2',
      trend: 'Improving',
      trendType: 'up',
      notes: 'Parent is highly responsive and uploaded 3 photos of reading practice this week.',
      priority: false,
      recentlyActive: true,
    },
    {
      id: 'JN-02',
      studentName: 'Maya Patel',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBXeMBj7caIBdCCg1kDSzcBiXjzG4_1bdZZkCBkLUmlkId81rqcR1A5zx_4pn32ceqYeNUSraaARnIlysmtwzNimjyPzl1TTPkXaNlNR0AkO9L_TM5Oy0I-SwqGqBADOktunL8HMN3gRpUMvbaqt-B2mkR3GPxpHzwlDhJ7Uu_gbrreiLi3jxkEzH-V5AzgPWQTPVkO_tVhZwWMscwNnoItXPKG8eprCj4fuEpM7GRhMNl8wBnVTiji1PmAFnSYv8MLteoMmlsxQO-6',
      parentName: 'Arjun Patel',
      parentPhone: '+62 813-9876-5432',
      status: 'Delayed',
      statusCode: 'delayed',
      days: [
        { day: 'Mon', status: 'completed', label: 'Basic Shapes Circle & Square' },
        { day: 'Tue', status: 'missed', label: 'Color Block Sorting' },
        { day: 'Wed', status: 'missed', label: 'Tangram Animal Puzzle' },
        { day: 'Thu', status: 'pending', label: 'Spatial Orientation' },
        { day: 'Fri', status: 'pending', label: 'Symmetry Drawing' },
      ],
      completedCount: 1,
      totalCount: 5,
      lastInteraction: 'Oct 24, 4:12 PM',
      lastModule: 'Shape Sorting',
      trend: 'Declining',
      trendType: 'down',
      notes: 'Parent reported work travel. Needs educator encouragement to resume evening routines.',
      priority: true,
      recentlyActive: false,
    },
    {
      id: 'JN-03',
      studentName: 'Ethan Wright',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDdSIIyDkzRHTA9msZCloweXY5wixE6yf9UHzxuvYdBVAC0YIeg3yMtkKzJiucIwBhnweXc7VxLkpCDXCSuTzu4qBmSmxexyc--MkabpasapPyX7RieB8_cYf6ONJY3QZg485LN3cKlSzHvkhfqw6n0-yE9LrKUC6SbE41lbQ0bdy80ebFJ8wysEwqAO9xj4pHRoT7mFBxssrUNM8Gizpq25eUjURP47QKkPVpL0DQqgtcD_hdxq-Eee5ybNhkDq6ChNh_moyIngbEa',
      parentName: 'Chloe Wright',
      parentPhone: '+62 811-2233-4455',
      status: 'Completed',
      statusCode: 'completed',
      days: [
        { day: 'Mon', status: 'completed', label: 'Social Sharing Wheel' },
        { day: 'Tue', status: 'completed', label: 'Expressive Emotion Cards' },
        { day: 'Wed', status: 'completed', label: 'Family Cooperation Chore' },
        { day: 'Thu', status: 'completed', label: 'Bedtime Listening Game' },
        { day: 'Fri', status: 'completed', label: 'Weekly Self Reflection' },
      ],
      completedCount: 5,
      totalCount: 5,
      lastInteraction: 'Yesterday, 6:30 PM',
      lastModule: 'Social Skills Final',
      trend: 'Stable',
      trendType: 'flat',
      notes: 'All 5 milestone modules completed ahead of deadline with excellent parent reflections.',
      priority: false,
      recentlyActive: true,
    },
    {
      id: 'JN-04',
      studentName: 'Sophia Martinez',
      studentAvatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuALltgd6ml3cYAAeLmj6jBDUGJcDf0LMt0208C_9EV-VUGQncobGwbJwxdXHndFosqt5RDJN8oMvdkT0vVL98rEjgkiM-zhIOZMzdmN6jTLx4aL5mKR1KiYxPMR6_zfIgcFtBs5Uj51m8KKGPDryFbZwD0DnEv6n6p_Mfhd_dnRMUeoyckxsMBoU_pzm6NfwcAzHYSFzuzTnchG1A4clvoV8cOjxMl93GFUojbR9R2xYUqhMpMhppiz3f2jE7jcRqbKQKxlgc2wsMr3',
      parentName: 'Maria Martinez',
      parentPhone: '+62 815-5566-7788',
      status: 'On Track',
      statusCode: 'on_track',
      days: [
        { day: 'Mon', status: 'completed', label: 'Finger Painting Textures' },
        { day: 'Tue', status: 'completed', label: 'Rhythm Percussion Play' },
        { day: 'Wed', status: 'pending', label: 'Color Mixing Experiment' },
        { day: 'Thu', status: 'pending', label: 'Collage Crafting' },
        { day: 'Fri', status: 'pending', label: 'Creative Showcase' },
      ],
      completedCount: 2,
      totalCount: 5,
      lastInteraction: 'Today, 8:15 AM',
      lastModule: 'Creative Arts 1A',
      trend: 'Improving',
      trendType: 'up',
      notes: 'Sophia showed great enthusiasm in tactile painting. Parent requested additional ideas.',
      priority: false,
      recentlyActive: true,
    },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered journeys
  const filteredJourneys = useMemo(() => {
    return journeys.filter((item) => {
      // Search
      const matchesSearch =
        item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lastModule.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Tab filter
      if (activeTab === 'priority' && !item.priority) return false;
      if (activeTab === 'active' && !item.recentlyActive) return false;

      // Status filter
      if (statusFilter !== 'all' && item.statusCode !== statusFilter) return false;

      return true;
    });
  }, [journeys, searchQuery, activeTab, statusFilter]);

  const handleOpenMessage = (recipient) => {
    setMessageRecipient(recipient);
    setCustomMessage(
      `Halo ${recipient.parentName}, mengingatkan stimulasi mingguan untuk ${recipient.studentName} pada modul "${recipient.lastModule}". Ada yang bisa kami bantu?`
    );
    setShowMessageModal(true);
    setActiveActionMenuId(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setShowMessageModal(false);
    showToast(
      `Pesan pengingat berhasil dikirim ke ${messageRecipient?.parentName} (${messageRecipient?.parentPhone})!`
    );
  };

  const handleToggleDay = (journeyId, dayIndex) => {
    setJourneys((prev) =>
      prev.map((item) => {
        if (item.id === journeyId) {
          const nextDays = [...item.days];
          const curr = nextDays[dayIndex].status;
          nextDays[dayIndex].status =
            curr === 'completed'
              ? 'pending'
              : curr === 'pending'
              ? 'completed'
              : 'completed';

          const newCompleted = nextDays.filter((d) => d.status === 'completed')
            .length;
          const newStatus =
            newCompleted === 5
              ? 'Completed'
              : nextDays.some((d) => d.status === 'missed')
              ? 'Delayed'
              : 'On Track';

          return {
            ...item,
            days: nextDays,
            completedCount: newCompleted,
            status: newStatus,
            statusCode:
              newStatus === 'Completed'
                ? 'completed'
                : newStatus === 'Delayed'
                ? 'delayed'
                : 'on_track',
          };
        }
        return item;
      })
    );
    showToast('Status progres stimulasi harian diperbarui!');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Student,Parent,Status,WeeklyCompleted,LastInteraction,Module,Trend\n' +
      journeys
        .map(
          (j) =>
            `"${j.studentName}","${j.parentName}","${j.status}","${j.completedCount}/5","${j.lastInteraction}","${j.lastModule}","${j.trend}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'parent_journey_monitoring.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data Parent Journey berhasil diekspor ke CSV!');
  };

  return (
    <div className="bg-background text-on-background font-body-md text-body-md min-h-screen overflow-x-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-on-surface text-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            check_circle
          </span>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* 1. Sidebar Component (Modular) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeMenu="Journey"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (menu === 'Students' && onNavigate) onNavigate('students');
          else if (menu === 'Teachers' && onNavigate) onNavigate('teachers');
          else if (menu === 'Parents' && onNavigate) onNavigate('parents');
          else if (menu === 'Assessment' && onNavigate) onNavigate('assessment');
          else if (menu === 'Classification' && onNavigate) onNavigate('classification');
          else if (menu === 'Recommendations' && onNavigate) onNavigate('recommendations');
          else if (menu === 'Journey' && onNavigate) onNavigate('journey');
          else if (onNavigate) onNavigate(menu.toLowerCase());
        }}
        onNewAssessment={() => {
          if (onNavigate) onNavigate('assessment');
        }}
        onLogout={onLogout}
      />

      {/* 2. Main Content Canvas */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Navigation Bar (Consistent Navbar Style) */}
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-lg py-sm shadow-sm border-b border-outline-variant/30">
          <div className="flex items-center gap-md">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-outline hover:bg-surface-container-high transition-colors"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="flex flex-col">
              <h2 className="font-title-lg text-base md:text-lg font-bold text-on-surface">
                Journey Monitoring
              </h2>
              <p className="font-label-md text-xs text-on-surface-variant hidden sm:block">
                Real-time tracking of parent-led academic growth
              </p>
            </div>
          </div>

          <div className="flex items-center gap-md">
            <div className="hidden sm:flex items-center bg-surface-container-low px-md py-1.5 rounded-full border border-outline-variant shadow-2xs">
              <span className="material-symbols-outlined text-outline text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student or parent..."
                className="bg-transparent border-none focus:ring-0 text-xs text-on-surface w-44 md:w-56 outline-none pl-2"
              />
            </div>

            <button
              type="button"
              onClick={() => showToast('Tidak ada notifikasi darurat baru saat ini.')}
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>

            <div className="h-8 w-8 rounded-full bg-primary-fixed overflow-hidden border border-outline-variant shrink-0">
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
          {/* Quick Stats Bento (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-lg">
            {/* Active Journeys */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold">
                  Active Journeys
                </span>
                <span className="material-symbols-outlined text-primary text-[24px]">
                  rocket_launch
                </span>
              </div>
              <div className="mt-md">
                <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  124
                </p>
                <p className="text-secondary font-label-md text-xs flex items-center gap-1 mt-1 font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  <span>+12% this month</span>
                </p>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold">
                  Completion Rate
                </span>
                <span className="material-symbols-outlined text-secondary text-[24px]">
                  check_circle
                </span>
              </div>
              <div className="mt-md">
                <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  88.2%
                </p>
                <div className="w-full bg-surface-container h-1.5 rounded-full mt-sm overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full transition-all duration-1000"
                    style={{ width: '88.2%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* On Track */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold">
                  On Track
                </span>
                <span className="material-symbols-outlined text-primary-container text-[24px]">
                  near_me
                </span>
              </div>
              <div className="mt-md">
                <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  92
                </p>
                <p className="text-on-surface-variant font-label-md text-xs mt-1">
                  Students meeting goals
                </p>
              </div>
            </div>

            {/* Needs Attention */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label-md text-xs uppercase tracking-wider font-semibold">
                  Needs Attention
                </span>
                <span className="material-symbols-outlined text-error text-[24px]">
                  warning
                </span>
              </div>
              <div className="mt-md">
                <p className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                  14
                </p>
                <p className="text-error font-label-md text-xs mt-1 flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>Action required</span>
                </p>
              </div>
            </div>
          </div>

          {/* Monitoring Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
            {/* Segment Tab Controls */}
            <div className="flex items-center gap-sm bg-surface-container p-1 rounded-xl border border-outline-variant">
              {[
                { id: 'all', label: 'All Students' },
                { id: 'priority', label: 'Priority Only' },
                { id: 'active', label: 'Recently Active' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-label-md text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter and Export Buttons */}
            <div className="flex flex-wrap items-center gap-sm">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant bg-surface-container-lowest outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="on_track">On Track</option>
                <option value="delayed">Delayed</option>
                <option value="completed">Completed</option>
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

          {/* Main Data Table: Parent Journey Monitoring */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider w-1/4">
                      Student & Parent
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider w-1/6 text-center">
                      Status
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider w-1/4">
                      Weekly Completion
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider w-1/6">
                      Last Interaction
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider w-1/6">
                      Trend
                    </th>
                    <th className="px-lg py-md font-label-md text-xs text-on-surface-variant uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/30">
                  {filteredJourneys.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-container-low/40 transition-colors group"
                    >
                      {/* Student & Parent */}
                      <td className="px-lg py-lg">
                        <div className="flex items-center gap-md">
                          <div className="h-10 w-10 rounded-full border border-outline-variant overflow-hidden shrink-0">
                            <img
                              className="w-full h-full object-cover"
                              alt={item.studentName}
                              src={item.studentAvatar}
                            />
                          </div>
                          <div>
                            <p className="font-body-lg text-sm font-bold text-on-surface">
                              {item.studentName}
                            </p>
                            <p className="font-label-md text-xs text-on-surface-variant">
                              Parent: {item.parentName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-lg py-lg text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full font-label-md text-xs font-bold ${
                            item.statusCode === 'on_track'
                              ? 'bg-secondary-container text-on-secondary-container'
                              : item.statusCode === 'delayed'
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-primary-fixed text-on-primary-fixed-variant'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Weekly Completion (Segmented 5-day bar) */}
                      <td className="px-lg py-lg">
                        <div className="flex items-center gap-1.5 h-6">
                          {item.days.map((day, dIdx) => (
                            <button
                              key={dIdx}
                              type="button"
                              onClick={() => handleToggleDay(item.id, dIdx)}
                              className={`flex-1 h-full rounded-xs transition-all cursor-pointer hover:opacity-80 ${
                                day.status === 'completed'
                                  ? item.statusCode === 'completed'
                                    ? 'bg-primary'
                                    : 'bg-secondary'
                                  : day.status === 'missed'
                                  ? 'bg-error'
                                  : 'bg-surface-container'
                              }`}
                              title={`${day.day}: ${day.label} (${
                                day.status === 'completed'
                                  ? 'Completed'
                                  : day.status === 'missed'
                                  ? 'Missed'
                                  : 'Pending'
                              }) - Click to toggle`}
                            />
                          ))}
                        </div>
                        <p
                          className={`font-label-md text-xs mt-2 ${
                            item.statusCode === 'delayed'
                              ? 'text-error font-semibold'
                              : item.statusCode === 'completed'
                              ? 'text-primary font-semibold'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          {item.statusCode === 'completed'
                            ? 'All units finished'
                            : item.statusCode === 'delayed'
                            ? '2 days behind schedule'
                            : `${item.completedCount}/5 activities done`}
                        </p>
                      </td>

                      {/* Last Interaction */}
                      <td className="px-lg py-lg">
                        <p className="font-body-md text-xs font-medium text-on-surface">
                          {item.lastInteraction}
                        </p>
                        <p className="font-label-md text-xs text-on-surface-variant">
                          {item.lastModule}
                        </p>
                      </td>

                      {/* Trend */}
                      <td className="px-lg py-lg">
                        <div
                          className={`flex items-center gap-1.5 text-xs font-semibold ${
                            item.trendType === 'up'
                              ? 'text-secondary'
                              : item.trendType === 'down'
                              ? 'text-error'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {item.trendType === 'up'
                              ? 'trending_up'
                              : item.trendType === 'down'
                              ? 'trending_down'
                              : 'trending_flat'}
                          </span>
                          <span className="font-label-md">{item.trend}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-lg py-lg text-center relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveActionMenuId(
                              activeActionMenuId === item.id ? null : item.id
                            )
                          }
                          className="p-1.5 text-outline hover:text-primary transition-colors rounded-lg hover:bg-surface-container-high cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            more_vert
                          </span>
                        </button>

                        {/* Dropdown Action Popover */}
                        {activeActionMenuId === item.id && (
                          <div className="absolute right-6 top-12 z-30 bg-surface-container-lowest border border-outline-variant shadow-xl rounded-xl p-1.5 w-48 text-left animate-in fade-in zoom-in-95 duration-150">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedJourney(item);
                                setActiveActionMenuId(null);
                              }}
                              className="w-full text-left px-3 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-high rounded-lg flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px] text-primary">
                                visibility
                              </span>
                              <span>View Milestones</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenMessage(item)}
                              className="w-full text-left px-3 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-high rounded-lg flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px] text-secondary">
                                chat
                              </span>
                              <span>Message Parent</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveActionMenuId(null);
                                if (onNavigate) onNavigate('recommendations');
                              }}
                              className="w-full text-left px-3 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-high rounded-lg flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px] text-tertiary">
                                auto_awesome
                              </span>
                              <span>Recommendations</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredJourneys.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 text-center text-outline text-xs"
                      >
                        No parent journeys found matching the criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-lg py-md border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center bg-surface-container-lowest gap-3">
              <p className="font-label-md text-xs text-on-surface-variant">
                Showing {filteredJourneys.length} of 124 students
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
                  Page 1 of 31
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

          {/* Bottom Section: Urgent Interventions & Parent Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg pb-xl">
            {/* Urgent Intervention Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-lg">
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    Urgent Interventions
                  </h3>
                  <span className="material-symbols-outlined text-error text-[22px]">
                    priority_high
                  </span>
                </div>

                <div className="space-y-md">
                  <div className="flex items-center justify-between p-md bg-error-container/10 rounded-xl border border-error/20">
                    <div className="flex items-center gap-md">
                      <div className="w-9 h-9 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          mail
                        </span>
                      </div>
                      <div>
                        <p className="font-body-md text-xs md:text-sm font-bold text-on-surface">
                          Follow-up: Arjun Patel
                        </p>
                        <p className="font-label-md text-xs text-on-surface-variant">
                          3 missed milestones this week
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenMessage({
                          parentName: 'Arjun Patel',
                          parentPhone: '+62 813-9876-5432',
                          studentName: 'Maya Patel',
                          lastModule: 'Shape Sorting',
                        })
                      }
                      className="text-primary font-label-md text-xs font-bold hover:underline cursor-pointer"
                    >
                      Message
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-md bg-error-container/10 rounded-xl border border-error/20">
                    <div className="flex items-center gap-md">
                      <div className="w-9 h-9 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          mail
                        </span>
                      </div>
                      <div>
                        <p className="font-body-md text-xs md:text-sm font-bold text-on-surface">
                          Reminder: Lisa Thompson
                        </p>
                        <p className="font-label-md text-xs text-on-surface-variant">
                          Journey paused for 4 days
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenMessage({
                          parentName: 'Lisa Thompson',
                          parentPhone: '+62 812-7788-9900',
                          studentName: 'Leo Thompson',
                          lastModule: 'Sensory Sand Math',
                        })
                      }
                      className="text-primary font-label-md text-xs font-bold hover:underline cursor-pointer"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-outline-variant/30 text-right">
                <button
                  type="button"
                  onClick={() =>
                    showToast('Automated WhatsApp reminders sent to all 14 delayed parents!')
                  }
                  className="text-xs text-primary font-bold hover:underline cursor-pointer"
                >
                  Send Batch Reminders (14) →
                </button>
              </div>
            </div>

            {/* Parent Feedback Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-lg">
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    Parent Feedback
                  </h3>
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    forum
                  </span>
                </div>

                <div className="space-y-md">
                  <div className="flex gap-md p-md bg-surface-container-low rounded-xl">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        thumb_up
                      </span>
                    </div>
                    <div>
                      <p className="font-body-md text-xs md:text-sm italic text-on-surface leading-relaxed">
                        "Liam really loved the Phonetics cards! He’s asking for
                        more already."
                      </p>
                      <p className="font-label-md text-xs text-on-surface-variant mt-1 font-semibold">
                        — Sarah Anderson
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-md p-md bg-surface-container-low rounded-xl">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">
                        star
                      </span>
                    </div>
                    <div>
                      <p className="font-body-md text-xs md:text-sm italic text-on-surface leading-relaxed">
                        "The storybook integration made reading time much easier
                        tonight."
                      </p>
                      <p className="font-label-md text-xs text-on-surface-variant mt-1 font-semibold">
                        — Chloe Wright
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-outline-variant/30 text-right">
                <button
                  type="button"
                  onClick={() =>
                    showToast('Opening parent feedback diary archives...')
                  }
                  className="text-xs text-secondary font-bold hover:underline cursor-pointer"
                >
                  View All Parent Reviews →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: View Journey Details & Milestones */}
      {selectedJourney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant"
                  alt={selectedJourney.studentName}
                  src={selectedJourney.studentAvatar}
                />
                <div>
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    {selectedJourney.studentName}'s Journey
                  </h3>
                  <p className="text-xs text-outline">
                    Parent: {selectedJourney.parentName} • {selectedJourney.parentPhone}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJourney(null)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-surface-container-low rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-outline block text-[11px]">
                    Current Progress
                  </span>
                  <span className="font-bold text-on-surface text-sm">
                    {selectedJourney.completedCount} of {selectedJourney.totalCount}{' '}
                    Milestones Completed
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedJourney.statusCode === 'on_track'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : selectedJourney.statusCode === 'delayed'
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-primary-fixed text-on-primary-fixed-variant'
                  }`}
                >
                  {selectedJourney.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-on-surface mb-2">
                  Weekly Schedule & Module Logs
                </h4>
                <div className="space-y-2">
                  {selectedJourney.days.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-primary w-8">
                          {day.day}
                        </span>
                        <span className="text-on-surface font-medium">
                          {day.label}
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          day.status === 'completed'
                            ? 'bg-secondary-container/30 text-secondary'
                            : day.status === 'missed'
                            ? 'bg-error-container/30 text-error'
                            : 'bg-surface-container text-outline'
                        }`}
                      >
                        {day.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-surface-container rounded-xl">
                <span className="font-bold text-on-surface block mb-1">
                  Educator Case Note
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {selectedJourney.notes}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-outline-variant/40 mt-5">
              <button
                type="button"
                onClick={() => setSelectedJourney(null)}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = selectedJourney;
                  setSelectedJourney(null);
                  handleOpenMessage(target);
                }}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                Message Parent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Send Message / Reminder to Parent */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">
                    chat
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    Message to {messageRecipient?.parentName}
                  </h3>
                  <p className="text-[11px] text-outline">
                    Student: {messageRecipient?.studentName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMessageModal(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Recipient Contact
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${messageRecipient?.parentName} (${messageRecipient?.parentPhone})`}
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2 text-xs text-outline outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Message Content *
                </label>
                <textarea
                  rows={4}
                  required
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/40 mt-4">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  Send Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Journey;
