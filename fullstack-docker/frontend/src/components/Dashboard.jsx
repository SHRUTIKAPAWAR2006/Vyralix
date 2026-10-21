import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// ============================================================================
// ISSUE 3: Protected Dashboard Component
// Restores original Lucide icons (home, compass, upload, activity, trophy, award, user, etc.)
// ============================================================================

export default function Dashboard({ onNavigate }) {
  const { user, token, logoutUser } = useContext(UserContext);
  const [authStatus, setAuthStatus] = useState({ loading: true, verified: false, message: '' });

  const displayName = user?.name || 'Alex Rivers';
  const displayHandle = user?.email ? `@${user.email.split('@')[0]}` : '@alex_rivers';

  useDocumentTitle(`Vyralix - ${displayName}'s Dashboard`);

  // Initialize Lucide icons on render
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Verify JWT token against protected endpoint: GET /api/user/dashboard
  useEffect(() => {
    const verifyProtectedDashboard = async () => {
      if (!token) {
        setAuthStatus({
          loading: false,
          verified: false,
          message: 'No token found in localStorage. Please log in.',
        });
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/user/dashboard', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setAuthStatus({
            loading: false,
            verified: true,
            message: data.message || 'Token verified. Protected access granted.',
          });
        } else {
          setAuthStatus({
            loading: false,
            verified: false,
            message: data.message || 'Authentication rejected by backend.',
          });
        }
      } catch (err) {
        setAuthStatus({
          loading: false,
          verified: false,
          message: 'Error connecting to backend auth middleware.',
        });
      }
    };

    verifyProtectedDashboard();
  }, [token]);

  // Handle Logout
  const handleLogout = () => {
    logoutUser();
    if (onNavigate) {
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1210] text-[#e8e6e0] font-sans antialiased">
      
      {/* Dashboard Sub-Header */}
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="text-xs text-[#4dd8c4] hover:underline flex items-center gap-1.5 font-medium"
        >
          <i data-lucide="arrow-left" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
          <span>Back to Home Feed</span>
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-3 py-1.5 rounded-md transition-colors font-medium flex items-center gap-1.5"
        >
          <i data-lucide="log-out" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
          <span>Log Out</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-4 flex gap-8">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="w-52 flex-shrink-0 hidden md:block">
          <nav className="space-y-1 sticky top-24">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="home" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('explore')}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="compass" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Explore</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('upload')}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="upload" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Upload</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('activity')}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="activity" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Activity</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('leaderboard')}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="trophy" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Leaderboard</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('badges')}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="award" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Badges</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-[#4dd8c4] bg-[#141a17] text-[#4dd8c4] font-medium text-xs rounded-r-md text-left"
            >
              <i data-lucide="user" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Profile (Dashboard)</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-red-400/80 hover:text-red-400 hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="log-out" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Log Out</span>
            </button>
          </nav>
        </aside>

        {/* MAIN DASHBOARD CONTENT */}
        <main className="flex-1 space-y-6">

          {/* JWT Authentication Status Banner */}
          <div
            className={`p-4 rounded-md border text-xs flex items-center justify-between ${
              authStatus.verified
                ? 'bg-[#4dd8c4]/10 border-[#4dd8c4]/30 text-[#4dd8c4]'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-[#0d1210]">
                JWT Auth
              </span>
              <span>{authStatus.loading ? 'Verifying token...' : authStatus.message}</span>
            </div>

            {!token && (
              <button
                onClick={() => onNavigate && onNavigate('login')}
                className="font-semibold underline ml-2"
              >
                Log In Now
              </button>
            )}
          </div>

          {/* PROFILE HEADER CARD */}
          <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt={displayName}
                  className="w-16 h-16 rounded-full object-cover border border-[#2a3330]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-heading font-semibold text-lg text-[#e8e6e0]">{displayName}</h1>
                    <span className="text-xs text-[#d4a24c] font-medium border-b border-[#d4a24c]/40 pb-0.5 ml-1">
                      LVL 35
                    </span>
                  </div>
                  <p className="text-xs text-[#7a8580]">{displayHandle}</p>
                  {user?.email && (
                    <p className="text-[11px] text-[#7a8580]/70">{user.email}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 bg-[#0d1210] border border-red-500/30 hover:border-red-500 text-xs font-medium text-red-400 rounded-md transition-colors flex items-center gap-1.5"
              >
                <i data-lucide="log-out" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
                <span>Log Out</span>
              </button>
            </div>

            {/* XP PROGRESS BAR */}
            <div className="space-y-1.5 pt-4 border-t border-[#2a3330]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#e8e6e0] font-medium">Level 35 Progress</span>
                <span className="text-[#d4a24c] font-mono font-medium">2,450 / 3,000 XP (82%)</span>
              </div>
              <div className="w-full h-2 bg-[#2a3330] rounded-full overflow-hidden">
                <div className="h-full bg-[#d4a24c] rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>

          {/* STATS ROW */}
          <div className="grid grid-cols-3 gap-6 py-4 border-y border-[#2a3330] text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs text-[#7a8580] font-medium uppercase tracking-wider">Role</span>
              <div className="font-heading font-semibold text-xl text-[#4dd8c4]">
                {user?.role ? user.role.toUpperCase() : 'USER'}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#7a8580] font-medium uppercase tracking-wider">Followers</span>
              <div className="font-heading font-semibold text-xl text-[#e8e6e0]">12.4k</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#7a8580] font-medium uppercase tracking-wider">Following</span>
              <div className="font-heading font-semibold text-xl text-[#e8e6e0]">342</div>
            </div>
          </div>

          {/* TABS SECTION */}
          <div className="space-y-6">
            <div className="flex items-center gap-6 border-b border-[#2a3330] pb-2 text-xs font-medium">
              <button className="border-b-2 border-b-[#4dd8c4] text-[#e8e6e0] font-semibold pb-2">
                Posts
              </button>
              <button className="border-b-2 border-b-transparent text-[#7a8580] hover:text-[#e8e6e0] pb-2 transition-colors">
                Likes
              </button>
              <button className="border-b-2 border-b-transparent text-[#7a8580] hover:text-[#e8e6e0] pb-2 transition-colors">
                Badges
              </button>
            </div>

            {/* BADGES GRID with original Lucide icons */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-xs text-[#7a8580] uppercase tracking-wider">Badges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-center">
                  <i data-lucide="star" className="w-6 h-6 text-[#4dd8c4]" strokeWidth="1.5"></i>
                  <span className="text-xs text-[#e8e6e0] font-medium">Genesis Creator</span>
                </div>

                <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-center">
                  <i data-lucide="palette" className="w-6 h-6 text-[#4dd8c4]" strokeWidth="1.5"></i>
                  <span className="text-xs text-[#e8e6e0] font-medium">Pixel Master</span>
                </div>

                <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-center">
                  <i data-lucide="film" className="w-6 h-6 text-[#4dd8c4]" strokeWidth="1.5"></i>
                  <span className="text-xs text-[#e8e6e0] font-medium">Animation Wizard</span>
                </div>

                <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-center opacity-50">
                  <i data-lucide="lock" className="w-6 h-6 text-[#7a8580]" strokeWidth="1.5"></i>
                  <span className="text-xs text-[#7a8580] font-medium">Level 50 Titan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate && onNavigate('upload')}
              className="p-4 bg-[#141a17] border border-[#2a3330] hover:border-[#4dd8c4] rounded-md text-left transition-colors flex items-center justify-between"
            >
              <div>
                <h3 className="font-heading font-semibold text-sm text-[#e8e6e0]">Upload Creation</h3>
                <p className="text-xs text-[#7a8580] mt-1">Publish new 3D or art piece to the feed</p>
              </div>
              <i data-lucide="plus" className="w-4 h-4 text-[#4dd8c4]" strokeWidth="1.5"></i>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('activity')}
              className="p-4 bg-[#141a17] border border-[#2a3330] hover:border-[#4dd8c4] rounded-md text-left transition-colors flex items-center justify-between"
            >
              <div>
                <h3 className="font-heading font-semibold text-sm text-[#e8e6e0]">View Activity</h3>
                <p className="text-xs text-[#7a8580] mt-1">Check like metrics and your upload list</p>
              </div>
              <i data-lucide="activity" className="w-4 h-4 text-[#4dd8c4]" strokeWidth="1.5"></i>
            </button>
          </div>

        </main>

      </div>
    </div>
  );
}
