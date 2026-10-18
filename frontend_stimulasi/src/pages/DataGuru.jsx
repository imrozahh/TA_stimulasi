import React, { useState, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function DataGuru({ onLogout, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // Initial teacher dataset matching the ECD platform
  const [teachers, setTeachers] = useState([
    {
      id: 'TCH-201',
      name: 'Ms. Clara Thompson',
      nip: '19880412-201503-2-004',
      assignedClass: 'Pre-K 4',
      subject: 'Lead Educator & Social Development',
      email: 'clara.thompson@bstar-ecd.edu',
      phone: '0812-3456-7810',
      studentCount: 18,
      status: 'Active',
      qualification: "Master's in Early Childhood Education",
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDb-K-t9nNfRGw9BUp46IO8XmXsOGG30RtqnYrzbrngpDoChEFsdxeokLO27W7RVJNtzROaSS9D6acZPwwenUGRR1CvXaLf5FnTxDV1HOyw2fZTkmI60eFsf5PMybNyd2Ux_SGR_SUAdB3aepUE3nmlSX2P1T5_Fx2KKj6NfMl4T5l1crSjBdUR0f1UIVUl8B7tw9Ki9SWFGR6vBBTJ2k3l6lHXwA-klntHTWFH8lkz3nYoVuJ4msoj6HQYZDry_iN7CBZjJMjSixah',
      notes: 'Certified in C4.5 developmental screening & positive discipline.',
    },
    {
      id: 'TCH-202',
      name: 'Dr. Aris Wibowo, M.Psi',
      nip: '19820719-201001-1-002',
      assignedClass: 'Kindergarten',
      subject: 'Child Psychologist & Cognitive Lead',
      email: 'aris.wibowo@bstar-ecd.edu',
      phone: '0813-9876-5421',
      studentCount: 22,
      status: 'Active',
      qualification: 'PhD in Developmental Psychology',
      avatar: null,
      notes: 'Supervisor for student behavioral assessments & early intervention.',
    },
    {
      id: 'TCH-203',
      name: 'Ibu Nurhayati, S.Pd',
      nip: '19920115-201802-2-007',
      assignedClass: 'Pre-K 3',
      subject: 'Sensory & Motor Skills Specialist',
      email: 'nurhayati@bstar-ecd.edu',
      phone: '0811-2233-4499',
      studentCount: 16,
      status: 'Active',
      qualification: 'Bachelor of Early Childhood Education',
      avatar: null,
      notes: 'Focus on fine motor dexterity and montessori learning tools.',
    },
    {
      id: 'TCH-204',
      name: 'Ms. Rebecca Sterling',
      nip: '19940628-202004-2-009',
      assignedClass: 'Kindergarten',
      subject: 'Language & Literacy Mentor',
      email: 'rebecca.sterling@bstar-ecd.edu',
      phone: '0857-8899-1122',
      studentCount: 20,
      status: 'Active',
      qualification: 'B.Ed in English & Literacy Development',
      avatar: null,
      notes: 'Manages bilingual reading corners and expressive speech modules.',
    },
    {
      id: 'TCH-205',
      name: 'Bpk. Ahmad Fauzi, S.Pd',
      nip: '19900910-201608-1-005',
      assignedClass: 'Pre-K 4',
      subject: 'Creative Arts & Physical Movement',
      email: 'ahmad.fauzi@bstar-ecd.edu',
      phone: '0878-3344-5566',
      studentCount: 19,
      status: 'On Leave',
      qualification: 'Bachelor in Sports & Physical Pedagogy',
      avatar: null,
      notes: 'Currently completing specialized KPSP screening refresher course.',
    },
  ]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    nip: '',
    assignedClass: 'Kindergarten',
    subject: '',
    email: '',
    phone: '',
    status: 'Active',
    qualification: '',
    notes: '',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Logic
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        teacher.name.toLowerCase().includes(q) ||
        teacher.id.toLowerCase().includes(q) ||
        teacher.nip.toLowerCase().includes(q) ||
        teacher.subject.toLowerCase().includes(q) ||
        teacher.email.toLowerCase().includes(q);

      const matchClass =
        selectedClass === 'All Classes' || teacher.assignedClass === selectedClass;

      const matchStatus =
        selectedStatus === 'All Status' || teacher.status === selectedStatus;

      return matchSearch && matchClass && matchStatus;
    });
  }, [teachers, searchQuery, selectedClass, selectedStatus]);

  // Quick stats
  const totalCount = teachers.length;
  const activeCount = teachers.filter((t) => t.status === 'Active').length;
  const onLeaveCount = teachers.filter((t) => t.status === 'On Leave').length;
  const totalStudentsTaught = teachers.reduce((acc, curr) => acc + (curr.studentCount || 0), 0);

  // Actions
  const handleOpenAdd = () => {
    const nextId = `TCH-${200 + teachers.length + 1}`;
    setFormData({
      id: nextId,
      name: '',
      nip: '',
      assignedClass: 'Kindergarten',
      subject: 'Early Childhood Lead Educator',
      email: '',
      phone: '',
      status: 'Active',
      qualification: "Bachelor's in Early Childhood Education",
      notes: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({ ...teacher });
    setIsEditModalOpen(true);
  };

  const handleOpenView = (teacher) => {
    setSelectedTeacher(teacher);
    setIsViewModalOpen(true);
  };

  const handleOpenDelete = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newEntry = {
      ...formData,
      studentCount: 16,
      avatar: null,
    };

    setTeachers([newEntry, ...teachers]);
    setIsAddModalOpen(false);
    showToast(`Educator "${formData.name}" has been registered successfully!`);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setTeachers(
      teachers.map((item) =>
        item.id === selectedTeacher.id ? { ...item, ...formData } : item
      )
    );
    setIsEditModalOpen(false);
    showToast(`Teacher profile for "${formData.name}" updated successfully.`);
  };

  const handleConfirmDelete = () => {
    if (!selectedTeacher) return;
    setTeachers(teachers.filter((item) => item.id !== selectedTeacher.id));
    setIsDeleteModalOpen(false);
    showToast(`Teacher "${selectedTeacher.name}" has been removed.`);
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
        activeMenu="Teachers"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (menu === 'Students' && onNavigate) onNavigate('students');
          else if (menu === 'Parents' && onNavigate) onNavigate('parents');
          else if (onNavigate) onNavigate(menu.toLowerCase());
        }}
        onNewAssessment={() => {
          if (onNavigate) onNavigate('assessment');
        }}
        onLogout={onLogout}
      />

      {/* 2. Main Canvas */}
      <main className="md:ml-64 min-h-screen relative flex flex-col">
        {/* Top App Bar (Separated Navbar Component with Add Teacher action) */}
        <Navbar
          onOpenSidebar={() => setMobileMenuOpen(true)}
          pageTitle="Teachers"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search by teacher name, NIP, or class..."
          actionButton={
            <button
              type="button"
              onClick={handleOpenAdd}
              className="bg-primary text-on-primary h-[40px] px-lg rounded-full font-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[20px]">
                person_add
              </span>
              <span className="hidden sm:inline">Add Teacher</span>
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

              {/* Class Filter */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-body-md focus:border-primary outline-none text-on-surface text-xs cursor-pointer"
              >
                <option>All Classes</option>
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
                <option>Active</option>
                <option>On Leave</option>
              </select>

              {/* Reset Button */}
              {(selectedClass !== 'All Classes' ||
                selectedStatus !== 'All Status' ||
                searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedClass('All Classes');
                    setSelectedStatus('All Status');
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-1 text-primary font-label-md hover:underline px-2 text-xs cursor-pointer font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Total Teachers Card */}
            <div className="bg-primary-container/10 p-lg rounded-xl border border-primary-fixed-dim/20 flex flex-col justify-center">
              <span className="text-on-surface-variant font-label-md text-xs">
                Total Educators
              </span>
              <span className="text-display-lg font-display-lg text-primary text-4xl font-bold mt-1">
                {totalCount}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl">
                <span className="material-symbols-outlined text-[24px]">
                  check_circle
                </span>
              </div>
              <div>
                <p className="text-xs text-outline font-semibold uppercase">
                  Active in Class
                </p>
                <h4 className="text-2xl font-bold text-on-surface">
                  {activeCount} Teachers
                </h4>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="p-3 bg-primary-fixed text-primary rounded-xl">
                <span className="material-symbols-outlined text-[24px]">
                  groups
                </span>
              </div>
              <div>
                <p className="text-xs text-outline font-semibold uppercase">
                  Students Under Care
                </p>
                <h4 className="text-2xl font-bold text-on-surface">
                  {totalStudentsTaught} Students
                </h4>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
              <div className="p-3 bg-tertiary-fixed text-tertiary rounded-xl">
                <span className="material-symbols-outlined text-[24px]">
                  school
                </span>
              </div>
              <div>
                <p className="text-xs text-outline font-semibold uppercase">
                  Student-Teacher Ratio
                </p>
                <h4 className="text-2xl font-bold text-on-surface">
                  1 : 7 (Ideal ECD)
                </h4>
              </div>
            </div>
          </section>

          {/* Teachers Table Card */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant">
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Teacher Name & NIP
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Assigned Class
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Specialization / Role
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Contact
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-xs">
                      Status
                    </th>
                    <th className="px-lg py-md font-label-md uppercase tracking-wider text-right text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                      <tr
                        key={teacher.id}
                        className="hover:bg-surface-container/30 transition-colors group"
                      >
                        {/* Avatar & Name */}
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-md">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0 flex items-center justify-center font-bold text-xs text-primary shadow-2xs">
                              {teacher.avatar ? (
                                <img
                                  className="w-full h-full object-cover"
                                  src={teacher.avatar}
                                  alt={teacher.name}
                                />
                              ) : (
                                <div className="w-full h-full bg-primary-fixed text-primary flex items-center justify-center">
                                  {teacher.name
                                    .replace(/^(Ms\.|Mr\.|Dr\.|Ibu|Bpk\.)\s*/, '')
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .substring(0, 2)}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-title-lg text-on-surface leading-tight text-sm font-semibold">
                                {teacher.name}
                              </p>
                              <p className="text-on-surface-variant text-label-md font-label-md opacity-70 text-[11px] font-mono">
                                NIP: {teacher.nip || teacher.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Class Badge */}
                        <td className="px-lg py-md">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-primary-container/10 text-primary">
                            {teacher.assignedClass}
                          </span>
                        </td>

                        {/* Subject */}
                        <td className="px-lg py-md">
                          <p className="font-body-md text-on-surface text-xs font-medium">
                            {teacher.subject}
                          </p>
                          <p className="text-[11px] text-outline">
                            {teacher.studentCount} Students Assigned
                          </p>
                        </td>

                        {/* Contact */}
                        <td className="px-lg py-md">
                          <p className="font-body-md text-on-surface text-xs">
                            {teacher.email}
                          </p>
                          <p className="text-[11px] text-outline font-mono">
                            {teacher.phone}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-lg py-md">
                          {teacher.status === 'Active' ? (
                            <span className="px-3 py-1 bg-secondary-container/30 text-secondary rounded-full font-label-md text-label-md flex items-center gap-1 w-fit text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              Active
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-tertiary-fixed/30 text-tertiary rounded-full font-label-md text-label-md flex items-center gap-1 w-fit text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                              On Leave
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-lg py-md text-right">
                          <div className="flex items-center justify-end gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleOpenView(teacher)}
                              className="p-2 text-primary hover:bg-primary-container/10 rounded-full cursor-pointer transition-colors"
                              title="View Educator Profile"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                visibility
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(teacher)}
                              className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full cursor-pointer transition-colors"
                              title="Edit Details"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                edit
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDelete(teacher)}
                              className="p-2 text-error hover:bg-error-container/30 rounded-full cursor-pointer transition-colors"
                              title="Delete Teacher"
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
                          person_off
                        </span>
                        No educators found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-lg py-md bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-label-md text-on-surface-variant font-label-md text-xs">
                Showing 1-{filteredTeachers.length} of {teachers.length} educators
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

          {/* Growth & Pedagogical Insights Bento Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Pedagogical Milestones Card */}
            <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full transition-transform group-hover:scale-110 duration-700 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="font-title-lg text-title-lg text-on-surface mb-sm text-base font-bold">
                  Professional ECD Certifications
                </h3>
                <p className="text-on-surface-variant font-body-md mb-lg text-xs">
                  Competency standards across early detection and student monitoring.
                </p>
                <div className="space-y-md">
                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        C4.5 Decision Tree Screening Certified
                      </span>
                      <span className="text-primary font-bold">96%</span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[96%]"></div>
                    </div>
                  </div>

                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        Sensory & Motor Stimulation Mastery
                      </span>
                      <span className="text-secondary font-bold">88%</span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full w-[88%]"></div>
                    </div>
                  </div>

                  <div className="space-y-base">
                    <div className="flex justify-between text-label-md font-label-md text-xs">
                      <span className="text-on-surface font-medium">
                        Parent-Teacher Counseling Certification
                      </span>
                      <span className="text-tertiary font-bold">92%</span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full w-[92%]"></div>
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
                      id="dots-teachers"
                      patternUnits="userSpaceOnUse"
                      width="20"
                    >
                      <circle cx="2" cy="2" fill="currentColor" r="1"></circle>
                    </pattern>
                  </defs>
                  <rect fill="url(#dots-teachers)" height="100%" width="100%"></rect>
                </svg>
              </div>

              <div className="relative z-10">
                <span className="bg-on-primary/10 px-3 py-1 rounded-full font-label-md text-label-md mb-md inline-block text-xs font-semibold">
                  Pedagogical Insight
                </span>
                <h3 className="font-headline-lg text-title-lg font-bold mb-md text-lg">
                  Multi-Disciplinary Educator Coordination
                </h3>
                <p className="font-body-md opacity-90 leading-relaxed mb-xl text-xs sm:text-sm">
                  Our teachers synchronize weekly observations directly into the C4.5
                  algorithm, generating automatic adaptation prompts for students who
                  need personalized developmental stimulation.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  showToast('Exporting educator pedagogical matrix report...')
                }
                className="relative z-10 w-fit px-lg py-md bg-on-primary text-primary rounded-lg font-label-md text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>View Educator Portfolio</span>
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
        aria-label="Add Teacher"
      >
        <span className="material-symbols-outlined text-3xl">person_add</span>
      </button>

      {/* MODAL: Add Teacher */}
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
                  Register New Educator
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
                    Teacher ID
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
                    Full Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ms. Sarah Jenkins, M.Ed"
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
                    NIP / National ID
                  </label>
                  <input
                    type="text"
                    placeholder="19950101-202001-2-001"
                    value={formData.nip}
                    onChange={(e) =>
                      setFormData({ ...formData, nip: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Assigned Class *
                  </label>
                  <select
                    value={formData.assignedClass}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedClass: e.target.value })
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
                    Specialization / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cognitive & Motor Development"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option>Active</option>
                    <option>On Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="teacher@bstar-ecd.edu"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>
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
                  Save Educator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Teacher */}
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
                  Edit Educator Profile
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
                    Teacher ID
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
                    Full Name *
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
                    Assigned Class
                  </label>
                  <select
                    value={formData.assignedClass}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedClass: e.target.value })
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
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none cursor-pointer"
                  >
                    <option>Active</option>
                    <option>On Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs text-on-surface outline-none"
                  />
                </div>

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

      {/* MODAL: View Teacher Profile */}
      {isViewModalOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-surface-container shrink-0 flex items-center justify-center font-bold text-sm text-primary shadow-sm">
                  {selectedTeacher.avatar ? (
                    <img
                      className="w-full h-full object-cover"
                      src={selectedTeacher.avatar}
                      alt={selectedTeacher.name}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-fixed text-primary flex items-center justify-center text-lg">
                      {selectedTeacher.name
                        .replace(/^(Ms\.|Mr\.|Dr\.|Ibu|Bpk\.)\s*/, '')
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-title-lg text-lg font-bold text-on-surface">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-xs text-outline font-mono">
                    ID: {selectedTeacher.id} • {selectedTeacher.assignedClass}
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
                    {selectedTeacher.subject}
                  </p>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Qualification: {selectedTeacher.qualification}
                  </p>
                </div>
                <span className="px-3 py-1 bg-secondary-container/30 text-secondary rounded-full font-bold text-[11px]">
                  {selectedTeacher.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-surface-container-low p-4 rounded-xl">
                <div>
                  <span className="text-outline text-[11px] block">NIP</span>
                  <span className="font-semibold text-on-surface font-mono">
                    {selectedTeacher.nip || '-'}
                  </span>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Students Assigned</span>
                  <span className="font-semibold text-on-surface">
                    {selectedTeacher.studentCount} Children
                  </span>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Email</span>
                  <span className="font-semibold text-on-surface">
                    {selectedTeacher.email}
                  </span>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Phone / WhatsApp</span>
                  <span className="font-semibold text-on-surface font-mono">
                    {selectedTeacher.phone}
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low p-3.5 rounded-xl">
                <span className="text-outline text-[11px] block mb-1">
                  Professional Focus & Notes:
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {selectedTeacher.notes ||
                    'Actively leads weekly developmental assessment observations and parent collaboration workshops.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant/40 mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleOpenEdit(selectedTeacher);
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

      {/* MODAL: Delete Teacher */}
      {isDeleteModalOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in fade-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-error-container/40 text-error flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[26px]">
                warning
              </span>
            </div>
            <h3 className="font-title-lg text-base font-bold text-on-surface">
              Remove Educator?
            </h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Are you sure you want to remove{' '}
              <span className="font-bold text-on-surface">
                "{selectedTeacher.name}"
              </span>
              ? Assigned student evaluation classes will need re-assignment.
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

export default DataGuru;
