import React, { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {isLoggedIn ? (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
