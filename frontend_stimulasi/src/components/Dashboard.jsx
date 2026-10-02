import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export function Dashboard({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [journeyRange, setJourneyRange] = useState('Last 6 Months');

  const devChartRef = useRef(null);
  const classChartRef = useRef(null);

  // Initialize Chart.js charts matching Stitch AI specifications
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
              pointBackgroundColor: '#0059ba'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: { display: true, color: '#f1f5f9' },
              border: { display: false }
            },
            x: {
              grid: { display: false },
              border: { display: false }
            }
          }
        }
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
              hoverOffset: 4
            }
          ]
        },
        options: {
          cutout: '80%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    return () => {
      if (devChartInstance) devChartInstance.destroy();
      if (classChartInstance) classChartInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] min-h-screen flex font-['Be_Vietnam_Pro',sans-serif]">
      
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* SideNavBar Shell */}
      <aside className={`h-screen w-64 fixed left-0 top-0 bg-white border-r border-[#c2c6d5] shadow-xs z-50 flex flex-col py-6 gap-1 transition-transform duration-300 md:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Brand Identity */}
        <div className="px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0059ba] rounded-lg flex items-center justify-center text-white shadow-md shadow-[#0059ba]/20">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <h1 className="text-[24px] leading-tight font-bold text-[#0059ba]">B-Star</h1>
              <p className="text-xs text-[#424753] font-medium">Academic Growth</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-[#727784] hover:text-[#111c2d]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1">
          {/* Dashboard Active */}
          <a
            className="flex items-center gap-3 bg-[#2c72d9]/10 text-[#0059ba] border-l-4 border-[#0059ba] px-4 py-3 text-xs font-semibold rounded-r-lg transition-all"
            href="#dashboard"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>

          <a
            className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-3 text-xs font-medium transition-colors rounded-lg"
            href="#students"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">school</span>
            <span>Students</span>
          </a>

          <a
            className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-3 text-xs font-medium transition-colors rounded-lg"
            href="#teachers"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">person_4</span>
            <span>Teachers</span>
          </a>

          <a
            className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-3 text-xs font-medium transition-colors rounded-lg"
            href="#parents"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">family_restroom</span>
            <span>Parents</span>
          </a>

          <a
            className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-3 text-xs font-medium transition-colors rounded-lg"
            href="#assessment"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">assignment</span>
            <span>Assessment</span>
          </a>

          <a
            className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-3 text-xs font-medium transition-colors rounded-lg"
            href="#classification"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">category</span>
            <span>Classification</span>
          </a>

          <a
            className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-3 text-xs font-medium transition-colors rounded-lg"
            href="#recommendations"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>Recommendations</span>
          </a>

          <a
            className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-3 text-xs font-medium transition-colors rounded-lg"
            href="#journey"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">timeline</span>
            <span>Journey</span>
          </a>

          <a
            className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-3 text-xs font-medium transition-colors rounded-lg"
            href="#reports"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">description</span>
            <span>Reports</span>
          </a>
        </nav>

        {/* CTA & Bottom Items */}
        <div className="px-4 mt-auto pt-6 border-t border-[#c2c6d5] space-y-3">
          <button
            onClick={() => alert('New Assessment Modal')}
            className="w-full bg-[#0059ba] text-white py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm shadow-[#0059ba]/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Assessment</span>
          </button>

          <div className="space-y-1">
            <a
              className="flex items-center gap-3 text-[#424753] hover:bg-[#dee8ff] px-4 py-2 text-xs font-medium transition-colors rounded-lg"
              href="#settings"
              onClick={(e) => e.preventDefault()}
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </a>
            
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 text-[#ba1a1a] hover:bg-[#ffdad6]/40 px-4 py-2 text-xs font-semibold transition-colors rounded-lg text-left cursor-pointer"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300">
        
        {/* TopNavBar Shell */}
        <header className="flex justify-between items-center w-full px-6 py-3 sticky top-0 z-30 bg-[#f9f9ff]/80 backdrop-blur-md shadow-xs border-b border-[#c2c6d5]/40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#0059ba] cursor-pointer"
              aria-label="Open Navigation"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#727784] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#f0f3ff] border border-[#c2c6d5]/60 rounded-full text-xs text-[#424753] w-64 focus:ring-2 focus:ring-[#0059ba]/20 outline-none transition-all placeholder:text-[#727784]/70"
                placeholder="Search students or data..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="p-2 text-[#424753] hover:bg-[#f0f3ff] transition-colors rounded-full relative cursor-pointer"
              onClick={() => alert('Anda memiliki 3 notifikasi sistem')}
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
            </button>
            
            <div className="h-7 w-px bg-[#c2c6d5] mx-1"></div>
            
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#111c2d]">Dr. Sarah Chen</p>
                <p className="text-[10px] text-[#424753]">Head of Admissions</p>
              </div>
              <img
                className="w-10 h-10 rounded-full object-cover border border-[#c2c6d5]"
                alt="Profile Administrator Dr. Sarah Chen"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb-K-t9nNfRGw9BUp46IO8XmXsOGG30RtqnYrzbrngpDoChEFsdxeokLO27W7RVJNtzROaSS9D6acZPwwenUGRR1CvXaLf5FnTxDV1HOyw2fZTkmI60eFsf5PMybNyd2Ux_SGR_SUAdB3aepUE3nmlSX2P1T5_Fx2KKj6NfMl4T5l1crSjBdUR0f1UIVUl8B7tw9Ki9SWFGR6vBBTJ2k3l6lHXwA-klntHTWFH8lkz3nYoVuJ4msoj6HQYZDry_iN7CBZjJMjSixah"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 max-w-[1440px] mx-auto space-y-6">
          
          {/* Welcome Section & Quick Actions */}
          <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111c2d] tracking-tight">
                Welcome back, Sarah
              </h2>
              <p className="text-sm text-[#424753] mt-0.5">
                Here is what's happening in your academy today.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => alert('Mengekspor laporan akademik...')}
                className="bg-white border border-[#c2c6d5] text-[#111c2d] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-[#dee8ff]/50 transition-colors shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">description</span>
                <span>Generate Report</span>
              </button>
              
              <button
                onClick={() => alert('Membuka formulir penilaian baru...')}
                className="bg-[#0059ba] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md shadow-[#0059ba]/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>New Assessment</span>
              </button>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Students */}
            <div className="bg-white p-5 rounded-2xl border border-[#c2c6d5] shadow-xs hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-[#2c72d9]/10 rounded-xl text-[#0059ba]">
                  <span className="material-symbols-outlined text-[22px]">group</span>
                </div>
                <span className="text-xs font-semibold text-[#006c50] flex items-center gap-1 bg-[#8bf7cd]/30 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[15px]">trending_up</span>
                  +12%
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-[#424753] font-semibold uppercase tracking-wider">Total Students</p>
                <h3 className="text-3xl font-bold text-[#111c2d] mt-0.5">1,284</h3>
              </div>
            </div>

            {/* Recent Assessments */}
            <div className="bg-white p-5 rounded-2xl border border-[#c2c6d5] shadow-xs hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-[#8bf7cd]/20 rounded-xl text-[#006c50]">
                  <span className="material-symbols-outlined text-[22px]">fact_check</span>
                </div>
                <span className="text-xs text-[#424753] bg-[#f0f3ff] px-2 py-0.5 rounded-md font-medium">Last 7 days</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-[#424753] font-semibold uppercase tracking-wider">Recent Assessments</p>
                <h3 className="text-3xl font-bold text-[#111c2d] mt-0.5">342</h3>
              </div>
            </div>

            {/* Average Growth */}
            <div className="bg-white p-5 rounded-2xl border border-[#c2c6d5] shadow-xs hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-[#ffdf9c]/30 rounded-xl text-[#755700]">
                  <span className="material-symbols-outlined text-[22px]">auto_graph</span>
                </div>
                <span className="text-xs font-semibold text-[#006c50] flex items-center gap-1 bg-[#8bf7cd]/30 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[15px]">arrow_upward</span>
                  4.2pt
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-[#424753] font-semibold uppercase tracking-wider">Average Growth</p>
                <h3 className="text-3xl font-bold text-[#111c2d] mt-0.5">88%</h3>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="bg-white p-5 rounded-2xl border border-[#c2c6d5] shadow-xs hover:shadow-md transition-all relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-[#ffdad6]/40 rounded-xl text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[22px]">warning</span>
                </div>
                <span className="text-xs text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-0.5 rounded-full font-bold">Priority</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-[#424753] font-semibold uppercase tracking-wider">Active Alerts</p>
                <h3 className="text-3xl font-bold text-[#111c2d] mt-0.5">07</h3>
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#ba1a1a]/5 rounded-full pointer-events-none"></div>
            </div>
          </section>

          {/* Main Charts & Notifications Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Line Chart: Student Development */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#c2c6d5] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#111c2d]">Student Development Journey</h3>
                  <p className="text-xs text-[#424753]">Monthly longitudinal cognitive & motor progress</p>
                </div>
                <select
                  value={journeyRange}
                  onChange={(e) => setJourneyRange(e.target.value)}
                  className="bg-[#f0f3ff] border border-[#c2c6d5]/70 rounded-xl text-xs text-[#424753] px-3 py-1.5 focus:ring-1 focus:ring-[#0059ba] outline-none cursor-pointer self-start sm:self-auto"
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
            <div className="bg-white p-6 rounded-2xl border border-[#c2c6d5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-[#111c2d]">System Alerts</h3>
                  <button onClick={() => alert('Melihat semua notifikasi')} className="text-[#0059ba] text-xs font-semibold hover:underline cursor-pointer">
                    View All
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-3 p-3.5 bg-[#f0f3ff] rounded-xl border-l-4 border-[#ba1a1a]">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0 mt-0.5">feedback</span>
                    <div>
                      <p className="text-xs font-bold text-[#111c2d]">Review Needed: Leo S.</p>
                      <p className="text-[11px] text-[#424753] leading-snug">Growth curve below average for 3 weeks.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3.5 bg-[#f0f3ff] rounded-xl border-l-4 border-[#006c50]">
                    <span className="material-symbols-outlined text-[#006c50] text-[20px] shrink-0 mt-0.5">verified</span>
                    <div>
                      <p className="text-xs font-bold text-[#111c2d]">New Parent Report</p>
                      <p className="text-[11px] text-[#424753] leading-snug">Journey completion for "Social Integration".</p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3.5 bg-[#f0f3ff] rounded-xl border-l-4 border-[#0059ba]">
                    <span className="material-symbols-outlined text-[#0059ba] text-[20px] shrink-0 mt-0.5">update</span>
                    <div>
                      <p className="text-xs font-bold text-[#111c2d]">System Update</p>
                      <p className="text-[11px] text-[#424753] leading-snug">New classification metrics applied to K-2.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#c2c6d5]/40 mt-3 text-center">
                <span className="text-[11px] text-[#727784]">All indicators synced with C4.5 model</span>
              </div>
            </div>
          </section>

          {/* Bottom Grid: Tables & Progress */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Classification Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-[#c2c6d5] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111c2d] mb-4">Student Classification</h3>
                <div className="flex-1 flex flex-col items-center justify-center relative my-2">
                  <div className="h-48 w-48 relative">
                    <canvas ref={classChartRef}></canvas>
                  </div>
                  <div className="absolute text-center pointer-events-none">
                    <p className="text-2xl font-bold text-[#111c2d]">82%</p>
                    <p className="text-xs text-[#424753] font-medium">On Track</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#c2c6d5]/40 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#006c50]"></div>
                  <span className="text-xs text-[#424753] font-medium">Meeting Exp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ba1a1a]"></div>
                  <span className="text-xs text-[#424753] font-medium">Needs Attention</span>
                </div>
              </div>
            </div>

            {/* Recent Assessments Table */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#c2c6d5] shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-[#111c2d]">Recent Assessments</h3>
                <button onClick={() => alert('Melihat seluruh riwayat penilaian')} className="text-[#0059ba] text-xs font-semibold hover:underline cursor-pointer">
                  Explore All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#f0f3ff] text-[#424753] text-[11px] font-bold uppercase border-b border-[#c2c6d5]/50">
                      <th className="py-3 px-4 first:rounded-l-xl">Student</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Evaluator</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 last:rounded-r-xl text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c2c6d5]/40 text-xs">
                    <tr className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d7e2ff] flex items-center justify-center text-[#0059ba] font-bold text-xs">
                          AM
                        </div>
                        <span className="font-semibold text-[#111c2d]">Alice Miller</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#424753]">Social Skills</td>
                      <td className="py-3.5 px-4 text-[#424753]">Ms. Thompson</td>
                      <td className="py-3.5 px-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#8bf7cd]/40 text-[#007255] uppercase">
                          Meeting Expectations
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#111c2d]">92/100</td>
                    </tr>

                    <tr className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#8bf7cd] flex items-center justify-center text-[#006c50] font-bold text-xs">
                          JB
                        </div>
                        <span className="font-semibold text-[#111c2d]">James Bond</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#424753]">Logic &amp; Math</td>
                      <td className="py-3.5 px-4 text-[#424753]">Dr. Aris</td>
                      <td className="py-3.5 px-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#ffdad6] text-[#93000a] uppercase">
                          Needs Attention
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#111c2d]">45/100</td>
                    </tr>

                    <tr className="hover:bg-[#f0f3ff]/60 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ffdf9c] flex items-center justify-center text-[#755700] font-bold text-xs">
                          CR
                        </div>
                        <span className="font-semibold text-[#111c2d]">Chloe Reed</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#424753]">Motor Control</td>
                      <td className="py-3.5 px-4 text-[#424753]">Ms. Thompson</td>
                      <td className="py-3.5 px-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#8bf7cd]/40 text-[#007255] uppercase">
                          Meeting Expectations
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#111c2d]">88/100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Parent Journey Section (Bento Style Card) */}
          <section className="bg-white p-6 rounded-2xl border border-[#c2c6d5] shadow-xs">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-base font-bold text-[#111c2d]">Top Parent Journeys</h3>
                <p className="text-xs text-[#424753]">Tracking the most active educational partnerships.</p>
              </div>
              <span className="material-symbols-outlined text-[#2c72d9] text-[24px]">favorite</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#111c2d]">The Peterson Family</span>
                  <span className="text-[#0059ba] font-bold">94%</span>
                </div>
                <div className="w-full bg-[#dee8ff] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0059ba] h-full w-[94%] transition-all duration-1000"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#111c2d]">The Garcia Family</span>
                  <span className="text-[#0059ba] font-bold">81%</span>
                </div>
                <div className="w-full bg-[#dee8ff] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0059ba] h-full w-[81%] transition-all duration-1000"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#111c2d]">The Kim Family</span>
                  <span className="text-[#0059ba] font-bold">76%</span>
                </div>
                <div className="w-full bg-[#dee8ff] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0059ba] h-full w-[76%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer / Support */}
        <footer className="p-6 mt-8 text-center text-[#424753] opacity-75 border-t border-[#c2c6d5]/40">
          <p className="text-xs">
            © {new Date().getFullYear()} B-Star Early Childhood Development Platform. Built for Nurturing Tomorrow.
          </p>
        </footer>

      </main>

      {/* Contextual Mobile FAB */}
      <button
        onClick={() => alert('New Assessment')}
        className="fixed bottom-6 right-6 bg-[#0059ba] text-white w-14 h-14 rounded-full shadow-2xl md:hidden flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="New Assessment"
      >
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>

    </div>
  );
}
