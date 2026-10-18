import React, { useState } from 'react';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DataSiswa } from './pages/DataSiswa';
import { DetailSiswa } from './pages/DetailSiswa';
import { DataGuru } from './pages/DataGuru';
import { DataOrtu } from './pages/DataOrtu';
import { Assessment } from './pages/Assessment';
import { Classification } from './pages/Classification';
import { Recommendations } from './pages/Recommendations';
import { Journey } from './pages/Journey';
import { Reports } from './pages/Reports';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard' | 'students' | 'student-detail' | 'teachers' | 'parents' | 'assessment' | 'classification' | 'recommendations' | 'journey' | 'reports'
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleNavigate = (page, data = null) => {
    const p = (page || '').toLowerCase();
    if (data) {
      setSelectedStudent(data);
    }
    if (p === 'students' || p === 'siswa' || p === 'datasiswa') {
      setCurrentPage('students');
    } else if (
      p === 'student-detail' ||
      p === 'detailsiswa' ||
      p === 'detail-siswa'
    ) {
      setCurrentPage('student-detail');
    } else if (p === 'teachers' || p === 'guru' || p === 'dataguru') {
      setCurrentPage('teachers');
    } else if (p === 'parents' || p === 'ortu' || p === 'dataortu') {
      setCurrentPage('parents');
    } else if (p === 'assessment' || p === 'penilaian') {
      setCurrentPage('assessment');
    } else if (p === 'classification' || p === 'klasifikasi') {
      setCurrentPage('classification');
    } else if (p === 'recommendations' || p === 'rekomendasi') {
      setCurrentPage('recommendations');
    } else if (p === 'journey' || p === 'perjalanan') {
      setCurrentPage('journey');
    } else if (p === 'reports' || p === 'laporan' || p === 'report') {
      setCurrentPage('reports');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-['Be_Vietnam_Pro',sans-serif]">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : currentPage === 'student-detail' ? (
        <DetailSiswa
          student={selectedStudent}
          onBack={() => setCurrentPage('students')}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      ) : currentPage === 'students' ? (
        <DataSiswa
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          onSelectStudent={(student) => {
            setSelectedStudent(student);
            setCurrentPage('student-detail');
          }}
        />
      ) : currentPage === 'teachers' ? (
        <DataGuru
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      ) : currentPage === 'parents' ? (
        <DataOrtu
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      ) : currentPage === 'assessment' ? (
        <Assessment
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      ) : currentPage === 'classification' ? (
        <Classification
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      ) : currentPage === 'recommendations' ? (
        <Recommendations
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      ) : currentPage === 'journey' ? (
        <Journey
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      ) : currentPage === 'reports' ? (
        <Reports
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      ) : (
        <Dashboard
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
