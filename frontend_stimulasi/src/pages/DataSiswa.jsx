import React, { useState, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function DataSiswa({ onLogout, onNavigate, onSelectStudent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // Initial student dataset matching design and image specifications
  const [students, setStudents] = useState([
    {
      id: 'BS-1024',
      name: 'Leo Henderson',
      grade: 'Kindergarten',
      lastAssessment: 'Oct 12, 2023',
      classification: 'Meeting Expectations',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCyI6Tkmhfy4Tth2btUEpt-x86K-RLiWwiz4JNzSXljlk2uvSxLV4hKH8y2CgX9q0QF2uqJEkTWztGe2-0PItbiaiMYY8PzoKHHYXz8rUKf-5u-QT2MnEeT6MQFZPL3K9j9fPChoq148JbiDDlF3iOFLIvBE0uWd9qPQAjJFVbBwyKfJHHsHXSMR6_O1tegAf_tquNB-roRd_71KXLUJvhMv_vYzTs3sC1Zy23aaD36w6JNvmzYD_L5tRMxyT3CLxm8E4xsN5idIJdE',
      notes: 'Strong motor skills and active participation in social play.',
    },
    {
      id: 'BS-1025',
      name: 'Amara Vance',
      grade: 'Pre-K 4',
      lastAssessment: 'Nov 04, 2023',
      classification: 'Needs Attention',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBUfVTHjP3Bm50fCscFgIagfIao21ePrva9cveO5AkpKHLetwx6xKTG6QjgrTpyJvbMU1SIECxZJGZYtIjFKo0Hm_UpxvYWGctJkut1SS2K22R59fkdIQBLyB9NSE4g9CG-UhT7PJuIuAqdNzn9gmCnmdPMxGWd9wgSVTq9kFLb-pwAOT6OJKQke-R5H_tuddUBDPdIrqQ_Bly5NWzjO_szFfvHjEC-MfnxdnshVYQ-L2fyTC6oup9BxQ-xMq5xnOdamjUdDpw40T3m',
      notes: 'Recommended for targeted speech integration exercise.',
    },
    {
      id: 'BS-1026',
      name: 'Julian Parks',
      grade: 'Kindergarten',
      lastAssessment: 'Nov 15, 2023',
      classification: 'Exceeding Expectations',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCtawtGbm6Q7qTImZPXa957Cilt9Tw8bOGGcrjSqbunW5oliqNHE21E_kCjgy6oWEmhpEoZ4SrOWSYN26UCsvNRUjk56yfkQZR3EJWidNcqGoxiLeqli8FFjddjSN-iCNFPra_LCCPChfvDYXFzT-CTtoyB3woKhwFmFEpwoEJv0-OgUiDW0eQJe1YXsAdEAsXj8CcNa77h6lhADa_wpnN_7Q7ZcVnNXGUun17dKTlzYafWwOJtO4kdF0M30vzS3h1zA2LW-ZufGjxC',
      notes: 'Shows accelerated mathematical reasoning and pattern recognition.',
    },
    {
      id: 'BS-1027',
      name: 'Sophie Chen',
      grade: 'Pre-K 3',
      lastAssessment: 'Oct 28, 2023',
      classification: 'Meeting Expectations',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAS301wnrWnfvMBoBnD6Cr9tIMM_Fq5TZjAXDuSQqzQKG4cxQ50sg2yCXfLEkIkDk--ZRaoWSJCSNXf27i6VnRLOW8sq-yjbnoFKGFhWIn0Sd4ULILz-kcPhYe0KfSUJbvEKoYECzy4nJOk6NxwmDbCN7VNVEorPIItSsrkHCx-_gQ1wJJMWyU3-GOOXYv3R8mvOqERXfC6VVxn_My-6YseNC2mcftXdzFWeVUqxoyncWcO044GW2F68HIF6MHdOHmwI-_ZKbu2YAeA',
      notes: 'Creative storytelling and keen visual attention in sensory tasks.',
    },
    {
      id: 'BS-1028',
      name: 'Alice Miller',
      grade: 'Pre-K 4',
      lastAssessment: 'Dec 02, 2023',
      classification: 'Exceeding Expectations',
      avatar: null,
      notes: 'Exemplary peer collaboration and fine motor drawing progress.',
    },
    {
      id: 'BS-1029',
      name: 'James Bond',
      grade: 'Kindergarten',
      lastAssessment: 'Nov 28, 2023',
      classification: 'Needs Attention',
      avatar: null,
      notes: 'Requires additional focus in sensory and auditory attention.',
    },
    {
      id: 'BS-1030',
      name: 'Chloe Reed',
      grade: 'Pre-K 3',
      lastAssessment: 'Dec 05, 2023',
      classification: 'Meeting Expectations',
      avatar: null,
      notes: 'Consistently completes cognitive development milestone goals.',
    },
  ]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    grade: 'Kindergarten',
    lastAssessment: '',
    classification: 'Meeting Expectations',
    avatar: '',
    notes: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.grade.toLowerCase().includes(query);

      const matchGrade =
        selectedGrade === 'All Grades' || student.grade === selectedGrade;

      const matchStatus =
        selectedStatus === 'All Status' ||
        student.classification === selectedStatus;

      return matchSearch && matchGrade && matchStatus;
    });
  }, [students, searchQuery, selectedGrade, selectedStatus]);

  // Statistics Calculation
  const totalCount = students.length;
  const exceedingCount = students.filter(
    (s) => s.classification === 'Exceeding Expectations'
  ).length;
  const meetingCount = students.filter(
    (s) => s.classification === 'Meeting Expectations'
  ).length;
  const needsAttentionCount = students.filter(
    (s) => s.classification === 'Needs Attention'
  ).length;

  const exceedingPercent = totalCount > 0 ? Math.round((exceedingCount / totalCount) * 100) : 22;
  const meetingPercent = totalCount > 0 ? Math.round((meetingCount / totalCount) * 100) : 64;
  const needsAttentionPercent =
    totalCount > 0 ? Math.round((needsAttentionCount / totalCount) * 100) : 14;

  // Actions
  const handleOpenAdd = () => {
    const nextId = `#BS-${1024 + students.length}`;
    setFormData({
      id: nextId,
      name: '',
      grade: 'Kindergarten',
      lastAssessment: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      classification: 'Meeting Expectations',
      avatar: '',
      notes: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setFormData({ ...student });
    setIsEditModalOpen(true);
  };

  const handleOpenView = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleOpenDelete = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newEntry = {
      ...formData,
      id: formData.id.startsWith('#') ? formData.id : `#${formData.id}`,
    };

    setStudents([newEntry, ...students]);
    setIsAddModalOpen(false);
    showToast(`Student "${formData.name}" has been enrolled successfully!`);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setStudents(
      students.map((item) =>
        item.id === selectedStudent.id === false && item.id !== selectedStudent.id
          ? item
          : { ...item, ...formData }
      )
    );
    setIsEditModalOpen(false);
    showToast(`Updated profile for "${formData.name}".`);
  };

  const handleConfirmDelete = () => {
    if (!selectedStudent) return;
    setStudents(students.filter((item) => item.id !== selectedStudent.id));
    setIsDeleteModalOpen(false);
    showToast(`Student "${selectedStudent.name}" removed.`);
  };

  return (
    <div className="bg-background text-on-background font-body-md text-body-md min-h-screen overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-on-surface text-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            check_circle
          </span>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* 1. Sidebar Shell (Separated Component) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeMenu="Students"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) {
            onNavigate('dashboard');
          } else if (onNavigate) {
            onNavigate(menu.toLowerCase());
          }
        }}
        onNewAssessment={() => {
          if (onNavigate) onNavigate('assessment');
        }}
        onLogout={onLogout}
      />

      {/* 2. Main Content Canvas */}
      <main className="md:ml-64 min-h-screen relative flex flex-col">
        {/* Top App Bar Shell (Separated Navbar Component with Add Student action) */}
        <Navbar
          onOpenSidebar={() => setMobileMenuOpen(true)}
          pageTitle="Students"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search by name, grade, or ID..."
          actionButton={
            <button
              type="button"
              onClick={handleOpenAdd}
              className="bg-primary text-on-primary h-[40px] px-lg rounded-full font-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[20px]">
                person_add
              </span>
              <span className="hidden sm:inline">Add Student</span>
            </button>
          }
          onLogout={onLogout}
        />

        {/* 3. Students Page Content */}
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

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none text-on-surface text-xs cursor-pointer"
              >
                <option>All Status</option>
                <option>Meeting Expectations</option>
                <option>Needs Attention</option>
                <option>Exceeding Expectations</option>
              </select>

              {/* Clear All Button */}
              {(selectedGrade !== 'All Grades' ||
                selectedStatus !== 'All Status' ||
                searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGrade('All Grades');
                    setSelectedStatus('All Status');
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-1 text-primary font-label-md hover:underline px-2 text-xs cursor-pointer font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Total Enrolled Card */}
            <div className="bg-primary-container/10 p-lg rounded-xl border border-primary-fixed-dim/20 flex flex-col justify-center">
              <span className="text-on-surface-variant font-label-md text-xs">
                Total Enrolled
              </span>
              <span className="text-display-lg font-display-lg text-primary text-4xl font-bold mt-1">
                {totalCount}
              </span>
            </div>
          </div>

          {/* Student Table Card */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant">
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Student Name
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Grade
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Last Assessment
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Classification
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-right text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-surface-container/30 transition-colors group"
                      >
                        {/* Student Name & Avatar */}
                        <td className="px-lg py-md">
                          <div
                            onClick={() => {
                              if (onSelectStudent) onSelectStudent(student);
                              else if (onNavigate) onNavigate('student-detail', student);
                              else handleOpenView(student);
                            }}
                            className="flex items-center gap-md cursor-pointer hover:opacity-85 transition-opacity"
                            title="Click to view student detail profile"
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0 flex items-center justify-center font-bold text-xs text-primary shadow-2xs">
                              {student.avatar ? (
                                <img
                                  className="w-full h-full object-cover"
                                  src={student.avatar}
                                  alt={`Portrait of ${student.name}`}
                                />
                              ) : (
                                <div className="w-full h-full bg-primary-fixed text-primary flex items-center justify-center">
                                  {student.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .substring(0, 2)}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-title-lg text-on-surface leading-tight text-sm font-semibold">
                                {student.name}
                              </p>
                              <p className="text-on-surface-variant text-label-md font-label-md opacity-70 text-[11px]">
                                ID: {student.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Grade */}
                        <td className="px-lg py-md">
                          <span className="font-body-md text-on-surface text-xs font-medium">
                            {student.grade}
                          </span>
                        </td>

                        {/* Last Assessment */}
                        <td className="px-lg py-md">
                          <span className="font-body-md text-on-surface-variant text-xs">
                            {student.lastAssessment}
                          </span>
                        </td>

                        {/* Classification Badge */}
                        <td className="px-lg py-md">
                          {student.classification === 'Meeting Expectations' && (
                            <span className="px-3 py-1 bg-secondary-container/30 text-secondary rounded-full font-label-md text-label-md flex items-center gap-1 w-fit text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              Meeting Expectations
                            </span>
                          )}
                          {student.classification === 'Needs Attention' && (
                            <span className="px-3 py-1 bg-tertiary-fixed/30 text-tertiary rounded-full font-label-md text-label-md flex items-center gap-1 w-fit text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                              Needs Attention
                            </span>
                          )}
                          {student.classification === 'Exceeding Expectations' && (
                            <span className="px-3 py-1 bg-primary-container/10 text-primary rounded-full font-label-md text-label-md flex items-center gap-1 w-fit text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Exceeding Expectations
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-lg py-md text-right">
                          <div className="flex items-center justify-end gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => {
                                if (onSelectStudent) onSelectStudent(student);
                                else if (onNavigate) onNavigate('student-detail', student);
                                else handleOpenView(student);
                              }}
                              className="p-2 text-primary hover:bg-primary-container/10 rounded-full cursor-pointer transition-colors"
                              title="View Detailed Profile"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                visibility
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(student)}
                              className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full cursor-pointer transition-colors"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                edit
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDelete(student)}
                              className="p-2 text-error hover:bg-error-container/30 rounded-full cursor-pointer transition-colors"
                              title="Delete"
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
                        colSpan="5"
                        className="px-lg py-12 text-center text-on-surface-variant text-xs"
                      >
                        <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
                          person_search
                        </span>
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-lg py-md bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-label-md text-on-surface-variant font-label-md text-xs">
                Showing 1-{filteredStudents.length} of {students.length} students
              </p>
              <div className="flex items-center gap-base">
                <button
                  type="button"
                  disabled={currentPageNum === 1}
                  onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                  className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant disabled:opacity-30 cursor-pointer"
                  aria-label="Previous page"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPageNum(1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md text-label-md text-xs font-semibold"
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPageNum(2)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md text-xs"
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPageNum(3)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md text-xs"
                >
                  3
                </button>
                <span className="px-2 text-on-surface-variant opacity-50 text-xs">
                  ...
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPageNum(31)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md text-xs"
                >
                  31
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPageNum((p) => p + 1)}
                  className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant cursor-pointer"
                  aria-label="Next page"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Growth Insights Bento Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Academic Classification Spread */}
            <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full transition-transform group-hover:scale-110 duration-700 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="font-title-lg text-title-lg text-on-surface mb-sm text-base font-bold">
                  Academic Classification Spread
                </h3>
                <p className="text-on-surface-variant font-body-md mb-lg text-xs">
                  Overview of student development milestones across all departments.
                </p>
                <div className="space-y-md">
                  {/* Exceeding Expectations */}
                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        Exceeding Expectations
                      </span>
                      <span className="text-primary font-bold">
                        {exceedingPercent}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${exceedingPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Meeting Expectations */}
                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        Meeting Expectations
                      </span>
                      <span className="text-secondary font-bold">
                        {meetingPercent}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-1000"
                        style={{ width: `${meetingPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Needs Attention */}
                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        Needs Attention
                      </span>
                      <span className="text-tertiary font-bold">
                        {needsAttentionPercent}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div
                        className="h-full bg-tertiary rounded-full transition-all duration-1000"
                        style={{ width: `${needsAttentionPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Insight Card */}
            <div className="bg-primary text-on-primary p-xl rounded-xl border border-primary shadow-lg flex flex-col justify-between relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      height="20"
                      id="dots"
                      patternUnits="userSpaceOnUse"
                      width="20"
                    >
                      <circle cx="2" cy="2" fill="currentColor" r="1"></circle>
                    </pattern>
                  </defs>
                  <rect fill="url(#dots)" height="100%" width="100%"></rect>
                </svg>
              </div>

              <div className="relative z-10">
                <span className="bg-on-primary/10 px-3 py-1 rounded-full font-label-md text-label-md mb-md inline-block text-xs font-semibold">
                  Pro Insight
                </span>
                <h3 className="font-headline-lg text-title-lg font-bold mb-md text-lg">
                  Early Intervention System
                </h3>
                <p className="font-body-md opacity-90 leading-relaxed mb-xl text-xs sm:text-sm">
                  Our AI-driven classification has identified a 15% increase in
                  literacy scores for students using the new journey tracking module.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="relative z-10 w-fit px-lg py-md bg-on-primary text-primary rounded-lg font-label-md text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>View Detailed Report</span>
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
        aria-label="Add Student"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* MODAL: Add Student */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    person_add
                  </span>
                </div>
                <h3 className="font-title-lg text-base font-bold text-on-surface">
                  Add New Student
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
                    Student ID
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.id}
                    className="w-full px-3.5 py-2 bg-surface-container-low/60 border border-outline-variant/40 rounded-xl text-xs font-mono text-outline cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Leo Henderson"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Grade Level *
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Pre-K 3</option>
                    <option>Pre-K 4</option>
                    <option>Kindergarten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Classification Status *
                  </label>
                  <select
                    value={formData.classification}
                    onChange={(e) =>
                      setFormData({ ...formData, classification: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Meeting Expectations</option>
                    <option>Needs Attention</option>
                    <option>Exceeding Expectations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Avatar Photo URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Development Notes / Observations
                </label>
                <textarea
                  rows="3"
                  placeholder="Observations on child progress, motor development, or interaction..."
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
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Student */}
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
                  Edit Student Profile
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
                    Student ID
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.id}
                    className="w-full px-3.5 py-2 bg-surface-container-low/60 border border-outline-variant/40 rounded-xl text-xs font-mono text-outline cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Grade Level
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option>Pre-K 3</option>
                    <option>Pre-K 4</option>
                    <option>Kindergarten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Classification Status
                  </label>
                  <select
                    value={formData.classification}
                    onChange={(e) =>
                      setFormData({ ...formData, classification: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option>Meeting Expectations</option>
                    <option>Needs Attention</option>
                    <option>Exceeding Expectations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Avatar Photo URL
                </label>
                <input
                  type="url"
                  value={formData.avatar || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Observations & Notes
                </label>
                <textarea
                  rows="3"
                  value={formData.notes || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                ></textarea>
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

      {/* MODAL: View Profile */}
      {isViewModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-surface-container shrink-0 flex items-center justify-center font-bold text-sm text-primary shadow-sm">
                  {selectedStudent.avatar ? (
                    <img
                      className="w-full h-full object-cover"
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-fixed text-primary flex items-center justify-center text-lg">
                      {selectedStudent.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-title-lg text-lg font-bold text-on-surface">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-xs text-outline font-mono">
                    ID: {selectedStudent.id} • {selectedStudent.grade}
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
              {/* Classification Banner */}
              <div
                className={`p-3.5 rounded-xl flex items-center justify-between ${
                  selectedStudent.classification === 'Exceeding Expectations'
                    ? 'bg-primary-container/10 border border-primary-container text-primary'
                    : selectedStudent.classification === 'Meeting Expectations'
                    ? 'bg-secondary-container/20 border border-secondary-container text-secondary'
                    : 'bg-tertiary-fixed/30 border border-tertiary-fixed text-tertiary'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    verified
                  </span>
                  <div>
                    <p className="font-bold text-xs">
                      {selectedStudent.classification}
                    </p>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      Last evaluated on {selectedStudent.lastAssessment}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-surface-container-lowest/80 rounded-lg">
                  {selectedStudent.grade}
                </span>
              </div>

              {/* Detail Info Card */}
              <div className="bg-surface-container-low p-4 rounded-xl space-y-2">
                <p className="font-semibold text-on-surface text-xs">
                  Educator Observations:
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  {selectedStudent.notes ||
                    'Student actively engages in structured play and cognitive developmental milestones according to early childhood benchmarks.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant/40 mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleOpenEdit(selectedStudent);
                }}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Edit Profile
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

      {/* MODAL: Delete Confirmation */}
      {isDeleteModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-error-container/40 text-error flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[26px]">
                warning
              </span>
            </div>
            <h3 className="font-title-lg text-base font-bold text-on-surface">
              Remove Student?
            </h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Are you sure you want to remove{' '}
              <span className="font-bold text-on-surface">
                "{selectedStudent.name}"
              </span>
              ? All longitudinal evaluation records for this student will be
              unlinked.
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

      {/* MODAL: Detailed AI Report */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">
                    auto_awesome
                  </span>
                </div>
                <h3 className="font-title-lg text-base font-bold text-on-surface">
                  Early Intervention System Report
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-surface-container-low rounded-xl space-y-2">
                <p className="font-semibold text-on-surface text-sm">
                  C4.5 Decision Tree Longitudinal Metrics
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  Our machine-learning model tracks weekly gross motor, fine motor,
                  social-emotional, and language developmental trajectories. Early
                  intervention notifications are triggered whenever growth scores
                  deviate by more than 1.5 standard deviations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary-container/20 rounded-xl">
                  <p className="text-[11px] text-outline font-semibold">
                    Literacy Gain
                  </p>
                  <p className="text-lg font-bold text-secondary">+15.4%</p>
                </div>
                <div className="p-3 bg-primary-container/10 rounded-xl">
                  <p className="text-[11px] text-outline font-semibold">
                    On-Track Milestone
                  </p>
                  <p className="text-lg font-bold text-primary">86%</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-outline-variant/40 mt-4">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataSiswa;
