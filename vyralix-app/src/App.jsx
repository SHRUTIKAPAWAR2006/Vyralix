import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Dashboard from './components/Dashboard';

// ============================================================================
// EXPERIMENT 3 (STEP 5): App Component Setup
// ----------------------------------------------------------------------------
// Renders <Navbar /> and <Feed /> as the primary Home view.
// Allows switching to <Dashboard /> (Exp 2 component) when requested.
// ============================================================================

export default function App() {
  // Simple view switcher: 'home' (Navbar + Feed) vs 'dashboard' (Exp 2 Dashboard)
  const [currentView, setCurrentView] = useState('home');

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-[#0d1210] text-[#e8e6e0]">
      {currentView === 'home' ? (
        <>
          {/* EXPERIMENT 3: Navbar + Feed Home View */}
          <Navbar onNavigateToDashboard={handleNavigation} currentView={currentView} />
          <Feed onNavigateToDashboard={handleNavigation} />
        </>
      ) : (
        <>
          {/* EXPERIMENT 2: Dashboard Component (Kept separate and unchanged) */}
          <Dashboard />
          <div className="max-w-6xl mx-auto px-6 py-4 border-t border-[#2a3330] text-center">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-xs text-[#4dd8c4] hover:underline font-medium"
            >
              ← Back to Home Feed
            </button>
          </div>
        </>
      )}
    </div>
  );
}
