import React, { useState, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function DataOrtu({ onLogout, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedEngagement, setSelectedEngagement] = useState('All Engagement');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // Initial parent/family dataset reflecting parent journeys in early childhood development
  const [parents, setParents] = useState([
    {
      id: 'PAR-101',
      familyName: 'The Peterson Family',
      parentNames: 'David & Sarah Peterson',
      childName: 'Alice Miller',
      childId: 'BS-1028',
      childGrade: 'Pre-K 4',
      phone: '0812-3456-7890',
      email: 'peterson.family@gmail.com',
      journeyProgress: 94,
      engagementStatus: 'High Engagement',
      lastSubmission: 'Yesterday, 19:30',
      homeTaskCount: 24,
      notes: 'Consistently completes home social integration diaries and sensory tasks.',
    },
    {
      id: 'PAR-102',
      familyName: 'The Garcia Family',
      parentNames: 'Carlos & Maria Garcia',
      childName: 'Julian Parks',
      childId: 'BS-1026',
      childGrade: 'Kindergarten',
      phone: '0813-9876-5432',
      email: 'garcia.m@outlook.com',
      journeyProgress: 81,
      engagementStatus: 'High Engagement',
      lastSubmission: '3 days ago',
      homeTaskCount: 19,
      notes: 'Active in bilingual literacy storytelling activities at home.',
    },
    {
      id: 'PAR-103',
      familyName: 'The Kim Family',
      parentNames: 'Min-jun & Soo-jin Kim',
      childName: 'Sophie Chen',
      childId: 'BS-1027',
      childGrade: 'Pre-K 3',
      phone: '0811-2233-4455',
      email: 'kim.soojin@gmail.com',
      journeyProgress: 76,
      engagementStatus: 'Active',
      lastSubmission: '5 days ago',
      homeTaskCount: 16,
      notes: 'Regularly shares home fine motor play videos with teachers.',
    },
    {
      id: 'PAR-104',
      familyName: 'The Henderson Family',
      parentNames: 'Mark & Evelyn Henderson',
      childName: 'Leo Henderson',
      childId: 'BS-1024',
      childGrade: 'Kindergarten',
      phone: '0857-1122-3344',
      email: 'henderson.fam@yahoo.com',
      journeyProgress: 88,
      engagementStatus: 'High Engagement',
      lastSubmission: '2 days ago',
      homeTaskCount: 21,
      notes: 'Great participation in outdoor physical milestone stimulation.',
    },
    {
      id: 'PAR-105',
      familyName: 'The Vance Family',
      parentNames: 'Robert & Clara Vance',
      childName: 'Amara Vance',
      childId: 'BS-1025',
      childGrade: 'Pre-K 4',
      phone: '0821-4455-6677',
      email: 'vance.clara@gmail.com',
      journeyProgress: 52,
      engagementStatus: 'Needs Follow-up',
      lastSubmission: '2 weeks ago',
      homeTaskCount: 8,
      notes: 'Consultation scheduled with child psychologist regarding home speech integration.',
    },
    {
      id: 'PAR-106',
      familyName: 'The Sanjaya Family',
      parentNames: 'Budi & Melinda Sanjaya',
      childName: 'Leo Sanjaya',
      childId: 'BS-1029',
      childGrade: 'Kindergarten',
      phone: '0878-5566-7788',
      email: 'budi.sanjaya@corp.id',
      journeyProgress: 45,
      engagementStatus: 'Needs Follow-up',
      lastSubmission: '3 weeks ago',
      homeTaskCount: 6,
      notes: 'Requested individualized home sensory stimulation plan.',
    },
  ]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    familyName: '',
    parentNames: '',
    childName: '',
    childGrade: 'Kindergarten',
    phone: '',
    email: '',
    journeyProgress: 80,
    engagementStatus: 'Active',
    notes: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Logic
  const filteredParents = useMemo(() => {
    return parents.filter((parent) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        parent.familyName.toLowerCase().includes(q) ||
        parent.parentNames.toLowerCase().includes(q) ||
        parent.childName.toLowerCase().includes(q) ||
        parent.phone.toLowerCase().includes(q) ||
        parent.id.toLowerCase().includes(q);

      const matchGrade =
        selectedGrade === 'All Grades' || parent.childGrade === selectedGrade;

      const matchEngagement =
        selectedEngagement === 'All Engagement' ||
        parent.engagementStatus === selectedEngagement;

      return matchSearch && matchGrade && matchEngagement;
    });
  }, [parents, searchQuery, selectedGrade, selectedEngagement]);

  // Quick stats
  const totalFamilies = parents.length;
  const avgJourney =
    totalFamilies > 0
      ? Math.round(
          parents.reduce((acc, curr) => acc + curr.journeyProgress, 0) /
            totalFamilies
        )
      : 0;
  const totalHomeTasks = parents.reduce((acc, curr) => acc + curr.homeTaskCount, 0);

  // Actions
  const handleOpenAdd = () => {
    const nextId = `PAR-${100 + parents.length + 1}`;
    setFormData({
      id: nextId,
      familyName: '',
      parentNames: '',
      childName: '',
      childGrade: 'Kindergarten',
      phone: '',
      email: '',
      journeyProgress: 85,
      engagementStatus: 'High Engagement',
      notes: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (parent) => {
    setSelectedParent(parent);
    setFormData({ ...parent });
    setIsEditModalOpen(true);
  };

  const handleOpenView = (parent) => {
    setSelectedParent(parent);
    setIsViewModalOpen(true);
  };

  const handleOpenDelete = (parent) => {
    setSelectedParent(parent);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.familyName.trim()) return;

    const newEntry = {
      ...formData,
      childId: `BS-${1020 + parents.length}`,
      lastSubmission: 'Just now',
      homeTaskCount: 1,
    };

    setParents([newEntry, ...parents]);
    setIsAddModalOpen(false);
    showToast(`Family "${formData.familyName}" enrolled into Journey successfully!`);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setParents(
      parents.map((item) =>
        item.id === selectedParent.id ? { ...item, ...formData } : item
      )
    );
    setIsEditModalOpen(false);
    showToast(`Updated details for "${formData.familyName}".`);
  };

  const handleConfirmDelete = () => {
    if (!selectedParent) return;
    setParents(parents.filter((item) => item.id !== selectedParent.id));
    setIsDeleteModalOpen(false);
    showToast(`Family record for "${selectedParent.familyName}" has been removed.`);
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

      {/* 1. Sidebar Component (Separated) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeMenu="Parents"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (menu === 'Students' && onNavigate) onNavigate('students');
          else if (menu === 'Teachers' && onNavigate) onNavigate('teachers');
          else if (onNavigate) onNavigate(menu.toLowerCase());
        }}
        onNewAssessment={() => {
          if (onNavigate) onNavigate('assessment');
        }}
        onLogout={onLogout}
      />

      {/* 2. Main Canvas */}
      <main className="md:ml-64 min-h-screen relative flex flex-col">
        {/* Top App Bar (Separated Navbar Component with Add Parent action) */}
        <Navbar
          onOpenSidebar={() => setMobileMenuOpen(true)}
          pageTitle="Parents"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search by parent name, child, or phone..."
          actionButton={
            <button
              type="button"
              onClick={handleOpenAdd}
              className="bg-primary text-on-primary h-[40px] px-lg rounded-full font-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[20px]">
                family_restroom
              </span>
              <span className="hidden sm:inline">Add Parent</span>
            </button>
          }
          onLogout={onLogout}
        />

        {/* 3. Page Content */}
        <div className="p-lg space-y-lg max-w-7xl w-full mx-auto flex-1">
          {/* Filters & Stats Bento Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {/* Filters Card */}
            <div className="md:col-span-3 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-wrap items-center gap-md">
              <span className="text-on-surface-variant font-label-md uppercase tracking-wider flex items-center gap-2 text-xs">
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>
                Filters
              </span>

              {/* Grade Filter */}
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none text-on-surface text-xs cursor-pointer"
              >
                <option>All Grades</option>
                <option>Pre-K 3</option>
                <option>Pre-K 4</option>
                <option>Kindergarten</option>
              </select>

              {/* Engagement Status Filter */}
              <select
                value={selectedEngagement}
                onChange={(e) => setSelectedEngagement(e.target.value)}
                className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none text-on-surface text-xs cursor-pointer"
              >
                <option>All Engagement</option>
                <option>High Engagement</option>
                <option>Active</option>
                <option>Needs Follow-up</option>
              </select>

              {/* Reset Button */}
              {(selectedGrade !== 'All Grades' ||
                selectedEngagement !== 'All Engagement' ||
                searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGrade('All Grades');
                    setSelectedEngagement('All Engagement');
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-1 text-primary font-label-md hover:underline px-2 text-xs cursor-pointer font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Total Families Card */}
            <div className="bg-primary-container/10 p-lg rounded-xl border border-primary-fixed-dim/20 flex flex-col justify-center">
              <span className="text-on-surface-variant font-label-md text-xs">
                Total Families
              </span>
              <span className="text-display-lg font-display-lg text-primary text-4xl font-bold mt-1">
                {totalFamilies}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl">
                <span className="material-symbols-outlined text-[24px]">
                  favorite
                </span>
              </div>
              <div>
                <p className="text-xs text-outline font-semibold uppercase">
                  Avg Journey Completion
                </p>
                <h4 className="text-2xl font-bold text-on-surface">
                  {avgJourney}%
                </h4>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="p-3 bg-primary-fixed text-primary rounded-xl">
                <span className="material-symbols-outlined text-[24px]">
                  assignment_turned_in
                </span>
              </div>
              <div>
                <p className="text-xs text-outline font-semibold uppercase">
                  Home Tasks Completed
                </p>
                <h4 className="text-2xl font-bold text-on-surface">
                  {totalHomeTasks} Diaries
                </h4>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="p-3 bg-tertiary-fixed text-tertiary rounded-xl">
                <span className="material-symbols-outlined text-[24px]">
                  handshake
                </span>
              </div>
              <div>
                <p className="text-xs text-outline font-semibold uppercase">
                  Active Partnership Rate
                </p>
                <h4 className="text-2xl font-bold text-on-surface">
                  92% Highly Engaged
                </h4>
              </div>
            </div>
          </section>

          {/* Parents Table Card */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant">
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Family & Guardian
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Linked Child
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Contact
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Journey Completion
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Engagement
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-right text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filteredParents.length > 0 ? (
                    filteredParents.map((parent) => (
                      <tr
                        key={parent.id}
                        className="hover:bg-surface-container/30 transition-colors group"
                      >
                        {/* Family Name */}
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-md">
                            <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary shrink-0 flex items-center justify-center font-bold text-xs shadow-2xs">
                              {parent.familyName
                                .replace(/^The\s*/, '')
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .substring(0, 2)}
                            </div>
                            <div>
                              <p className="font-title-lg text-on-surface leading-tight text-sm font-semibold">
                                {parent.familyName}
                              </p>
                              <p className="text-on-surface-variant text-label-md font-label-md opacity-70 text-[11px]">
                                {parent.parentNames} • {parent.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Linked Child */}
                        <td className="px-lg py-md">
                          <p className="font-body-md text-on-surface text-xs font-semibold">
                            {parent.childName}
                          </p>
                          <span className="text-[11px] text-outline">
                            Grade: {parent.childGrade}
                          </span>
                        </td>

                        {/* Contact */}
                        <td className="px-lg py-md">
                          <p className="font-body-md text-on-surface text-xs font-mono">
                            {parent.phone}
                          </p>
                          <p className="text-[11px] text-outline">
                            {parent.email}
                          </p>
                        </td>

                        {/* Journey Progress */}
                        <td className="px-lg py-md w-44">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-on-surface text-[11px]">
                                {parent.journeyProgress}% Done
                              </span>
                              <span className="text-primary text-[10px]">
                                {parent.homeTaskCount} tasks
                              </span>
                            </div>
                            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${
                                  parent.journeyProgress >= 80
                                    ? 'bg-primary'
                                    : parent.journeyProgress >= 60
                                    ? 'bg-secondary'
                                    : 'bg-tertiary'
                                }`}
                                style={{ width: `${parent.journeyProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* Engagement Status */}
                        <td className="px-lg py-md">
                          {parent.engagementStatus === 'High Engagement' && (
                            <span className="px-3 py-1 bg-secondary-container/30 text-secondary rounded-full font-label-md text-label-md flex items-center gap-1 w-fit text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              High Engagement
                            </span>
                          )}
                          {parent.engagementStatus === 'Active' && (
                            <span className="px-3 py-1 bg-primary-container/10 text-primary rounded-full font-label-md text-label-md flex items-center gap-1 w-fit text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Active
                            </span>
                          )}
                          {parent.engagementStatus === 'Needs Follow-up' && (
                            <span className="px-3 py-1 bg-tertiary-fixed/30 text-tertiary rounded-full font-label-md text-label-md flex items-center gap-1 w-fit text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                              Needs Follow-up
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-lg py-md text-right">
                          <div className="flex items-center justify-end gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleOpenView(parent)}
                              className="p-2 text-primary hover:bg-primary-container/10 rounded-full cursor-pointer transition-colors"
                              title="View Family Journey"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                visibility
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(parent)}
                              className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full cursor-pointer transition-colors"
                              title="Edit Details"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                edit
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDelete(parent)}
                              className="p-2 text-error hover:bg-error-container/30 rounded-full cursor-pointer transition-colors"
                              title="Delete Record"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-lg py-12 text-center text-on-surface-variant text-xs"
                      >
                        <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
                          family_restroom
                        </span>
                        No families found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-lg py-md bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-label-md text-on-surface-variant font-label-md text-xs">
                Showing 1-{filteredParents.length} of {parents.length} families
              </p>
              <div className="flex items-center gap-base">
                <button
                  type="button"
                  disabled={currentPageNum === 1}
                  onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                  className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant disabled:opacity-30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md text-label-md text-xs font-semibold"
                >
                  1
                </button>
                <button
                  type="button"
                  disabled
                  className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant opacity-40"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Bento Row: Parent-School Collaboration Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Collaboration Matrix Card */}
            <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full transition-transform group-hover:scale-110 duration-700 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="font-title-lg text-title-lg text-on-surface mb-sm text-base font-bold">
                  Top Parent Journey Benchmarks
                </h3>
                <p className="text-on-surface-variant font-body-md mb-lg text-xs">
                  Tracking home stimulation consistency across active families.
                </p>
                <div className="space-y-md">
                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        The Peterson Family (Social Integration)
                      </span>
                      <span className="text-primary font-bold">94%</span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[94%]"></div>
                    </div>
                  </div>

                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        The Garcia Family (Literacy & Speech)
                      </span>
                      <span className="text-primary font-bold">81%</span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[81%]"></div>
                    </div>
                  </div>

                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        The Kim Family (Sensory & Motor Tasks)
                      </span>
                      <span className="text-primary font-bold">76%</span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[76%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Insight Card */}
            <div className="bg-primary text-on-primary p-xl rounded-xl border border-primary shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      height="20"
                      id="dots-parents"
                      patternUnits="userSpaceOnUse"
                      width="20"
                    >
                      <circle cx="2" cy="2" fill="currentColor" r="1"></circle>
                    </pattern>
                  </defs>
                  <rect fill="url(#dots-parents)" height="100%" width="100%"></rect>
                </svg>
              </div>

              <div className="relative z-10">
                <span className="bg-on-primary/10 px-3 py-1 rounded-full font-label-md text-label-md mb-md inline-block text-xs font-semibold">
                  Family Partnership
                </span>
                <h3 className="font-headline-lg text-title-lg font-bold mb-md text-lg">
                  Home Stimulation Continuity
                </h3>
                <p className="font-body-md opacity-90 leading-relaxed mb-xl text-xs sm:text-sm">
                  Active parental recording of milestones at home accelerates early
                  detection accuracy by 32%, ensuring children receive prompt guidance
                  before school transitions.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  showToast('Exporting parent engagement analytics...')
                }
                className="relative z-10 w-fit px-lg py-md bg-on-primary text-primary rounded-lg font-label-md text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>View Partnership Digest</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
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
        onClick={handleOpenAdd}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 md:hidden cursor-pointer"
        aria-label="Add Parent"
      >
        <span className="material-symbols-outlined text-3xl">family_restroom</span>
      </button>

      {/* MODAL: Add Parent */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    family_restroom
                  </span>
                </div>
                <h3 className="font-title-lg text-base font-bold text-on-surface">
                  Enroll Family in Parent Journey
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Family / Household Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Peterson Family"
                    value={formData.familyName}
                    onChange={(e) =>
                      setFormData({ ...formData, familyName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Guardians / Parent Names *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David & Sarah Peterson"
                    value={formData.parentNames}
                    onChange={(e) =>
                      setFormData({ ...formData, parentNames: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Child / Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alice Miller"
                    value={formData.childName}
                    onChange={(e) =>
                      setFormData({ ...formData, childName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Child Grade Level
                  </label>
                  <select
                    value={formData.childGrade}
                    onChange={(e) =>
                      setFormData({ ...formData, childGrade: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Pre-K 3</option>
                    <option>Pre-K 4</option>
                    <option>Kindergarten</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="family@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Home Notes & Preferences
                </label>
                <textarea
                  rows="2"
                  placeholder="Notes on communication preferences, home routine, or special dietary concerns..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/40 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  Save Family Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Parent */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    edit
                  </span>
                </div>
                <h3 className="font-title-lg text-base font-bold text-on-surface">
                  Edit Family Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Family Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.familyName}
                    onChange={(e) =>
                      setFormData({ ...formData, familyName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Guardians
                  </label>
                  <input
                    type="text"
                    value={formData.parentNames}
                    onChange={(e) =>
                      setFormData({ ...formData, parentNames: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Engagement Status
                  </label>
                  <select
                    value={formData.engagementStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        engagementStatus: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option>High Engagement</option>
                    <option>Active</option>
                    <option>Needs Follow-up</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/40 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-on-secondary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: View Family Details */}
      {isViewModalOpen && selectedParent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed text-primary shrink-0 flex items-center justify-center font-bold text-lg shadow-sm">
                  {selectedParent.familyName
                    .replace(/^The\s*/, '')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-title-lg text-lg font-bold text-on-surface">
                    {selectedParent.familyName}
                  </h3>
                  <p className="text-xs text-outline">
                    {selectedParent.parentNames} • ID: {selectedParent.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-primary-container/10 border border-primary-fixed-dim/20 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-primary">
                    Child: {selectedParent.childName} ({selectedParent.childGrade})
                  </p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Last Submission: {selectedParent.lastSubmission}
                  </p>
                </div>
                <span className="text-base font-bold text-primary">
                  {selectedParent.journeyProgress}% Complete
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-surface-container-low p-4 rounded-xl">
                <div>
                  <span className="text-outline text-[11px] block">Phone / WhatsApp</span>
                  <span className="font-semibold text-on-surface font-mono">
                    {selectedParent.phone}
                  </span>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Email</span>
                  <span className="font-semibold text-on-surface">
                    {selectedParent.email}
                  </span>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Engagement Level</span>
                  <span className="font-semibold text-on-surface">
                    {selectedParent.engagementStatus}
                  </span>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Home Tasks Verified</span>
                  <span className="font-semibold text-on-surface">
                    {selectedParent.homeTaskCount} Milestones
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low p-3.5 rounded-xl">
                <span className="text-outline text-[11px] block mb-1">
                  Home Observations & Diary Log:
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {selectedParent.notes ||
                    'Actively collaborates with academy educators on home sensory stimulation and milestone diaries.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant/40 mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleOpenEdit(selectedParent);
                }}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Delete Parent */}
      {isDeleteModalOpen && selectedParent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-error-container/40 text-error flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[26px]">
                warning
              </span>
            </div>
            <h3 className="font-title-lg text-base font-bold text-on-surface">
              Remove Family Record?
            </h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Are you sure you want to remove{' '}
              <span className="font-bold text-on-surface">
                "{selectedParent.familyName}"
              </span>
              ? Home journey logs associated with this household will be unlinked.
            </p>

            <div className="flex justify-center gap-3 pt-5 border-t border-outline-variant/40 mt-5">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-error text-on-error text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataOrtu;
