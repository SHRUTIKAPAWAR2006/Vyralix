import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import Activity from './components/Activity';
import Leaderboard from './components/Leaderboard';
import Badges from './components/Badges';
import Chat from './components/Chat';

// ============================================================================
// Vyralix Main App: Connected to Real MongoDB & Auth Backend
// ----------------------------------------------------------------------------
// Includes full Browser History navigation support (pushState + popstate):
// Clicking the browser's back arrow (←) or forward arrow (→) navigates smoothly
// between views without losing connection or causing "Site cannot be reached".
// ============================================================================

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');

  // Handle browser back and forward button clicks
  useEffect(() => {
    // Initialize current page state in browser history
    if (!window.history.state) {
      window.history.replaceState({ view: 'home' }, '', window.location.pathname);
    }

    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = (view) => {
    setCurrentView(view);
    // Push new view to browser history stack so the browser's back button works seamlessly
    window.history.pushState({ view }, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated full-screen authentication views
  if (currentView === 'login') {
    return (
      <Login
        onNavigate={handleNavigation}
        successMessage={registerSuccessMessage}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <Register
        onNavigate={handleNavigation}
        setSuccessMessage={setRegisterSuccessMessage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1210] text-[#e8e6e0] font-sans antialiased">
      {/* Top Navbar */}
      <Navbar onNavigate={handleNavigation} currentView={currentView} />

      {/* Main View Router */}
      {currentView === 'home' && (
        <>
          <Feed onNavigate={handleNavigation} />
          <Chat />
        </>
      )}

      {currentView === 'explore' && (
        <Feed onNavigate={handleNavigation} isExploreView={true} />
      )}

      {currentView === 'upload' && (
        <CreatePost onNavigate={handleNavigation} />
      )}

      {currentView === 'activity' && (
        <Activity onNavigate={handleNavigation} />
      )}

      {currentView === 'leaderboard' && (
        <Leaderboard onNavigate={handleNavigation} />
      )}

      {currentView === 'badges' && (
        <Badges onNavigate={handleNavigation} />
      )}

      {currentView === 'dashboard' && (
        <Dashboard onNavigate={handleNavigation} />
      )}
    </div>
  );
}
