import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// ============================================================================
// EXPERIMENT 2 (STEPS 2, 3, 4, 5): Dashboard Component
// ----------------------------------------------------------------------------
// 1. useContext(UserContext): Consumes user data from context instead of hardcoding.
// 2. useDocumentTitle(): Custom Hook that internally uses useEffect() to set title.
// 3. useEffect(): Re-renders Lucide icons when component mounts or updates.
// ============================================================================

export default function Dashboard() {
  // STEP 4: Consume UserContext using useContext() hook
  const user = useContext(UserContext);

  // STEP 5: Use Custom Hook to update document.title dynamically
  useDocumentTitle(`Vyralix - ${user.name}'s Dashboard`);

  // useEffect Hook: Initializes Lucide icon SVGs after component mounts
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [user]);

  // Calculate XP percentage dynamically from context data
  const xpPercentage = Math.round((user.currentXP / user.nextLevelXP) * 100);

  return (
    <div className="min-h-screen bg-[#0d1210] text-[#e8e6e0] font-sans antialiased">

      {/* ========================================== */}
      {/* NAVBAR                                     */}
      {/* ========================================== */}
      <header className="bg-[#0d1210] border-b border-[#2a3330] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          
          {/* Brand Wordmark linking to Home Feed (/index.html in public folder) */}
          <a href="/index.html" className="font-heading font-bold text-2xl tracking-tight text-[#e8e6e0]">
            Vyralix
          </a>

          {/* Search Input */}
          <div className="relative w-72 hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7a8580]">
              <i data-lucide="search" className="w-4 h-4" strokeWidth="1.5"></i>
            </div>
            <input 
              type="text" 
              placeholder="Search creators, 3D art..." 
              className="w-full bg-[#141a17] border border-[#2a3330] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#e8e6e0] placeholder-[#7a8580] focus:outline-none focus:border-[#4dd8c4] transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="bg-[#4dd8c4] text-[#0d1210] font-semibold text-xs px-4 py-2 rounded-md border-0 outline-none ring-0 hover:bg-[#3ec4b1] transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(77,216,196,0.3)]">
              <i data-lucide="plus" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Create</span>
            </button>

            <button className="text-[#7a8580] hover:text-[#e8e6e0] transition-colors" aria-label="Notifications">
              <i data-lucide="bell" className="w-5 h-5" strokeWidth="1.5"></i>
            </button>

            <a href="#">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
            </a>
          </div>

        </div>
      </header>

      {/* ========================================== */}
      {/* MAIN LAYOUT: Left Sidebar + Main Content   */}
      {/* ========================================== */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

        {/* LEFT SIDEBAR */}
        <aside className="w-52 flex-shrink-0 hidden md:block">
          <nav className="space-y-1 sticky top-24">
            {/* Link to Home Feed (/index.html in public folder) */}
            <a href="/index.html" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors">
              <i data-lucide="home" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Home</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors">
              <i data-lucide="compass" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Explore</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors">
              <i data-lucide="upload" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Upload</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors">
              <i data-lucide="activity" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Activity</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors">
              <i data-lucide="trophy" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Leaderboard</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors">
              <i data-lucide="award" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Badges</span>
            </a>

            {/* Active Item: Profile */}
            <a href="#" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-[#4dd8c4] bg-[#141a17] text-[#4dd8c4] font-medium text-xs rounded-r-md">
              <i data-lucide="user" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Profile</span>
            </a>

            {/* Link to Login page (/login.html in public folder) */}
            <a href="/login.html" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors">
              <i data-lucide="settings" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Settings / Log In</span>
            </a>
          </nav>
        </aside>

        {/* MAIN DASHBOARD CONTENT */}
        <main className="flex-1 space-y-8">

          {/* PROFILE HEADER CARD */}
          <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-6 space-y-6">
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-heading font-semibold text-lg text-[#e8e6e0]">{user.name}</h1>
                    {/* Gold Underlined Level Tag */}
                    <span className="text-xs text-[#d4a24c] font-medium border-b border-[#d4a24c]/40 pb-0.5 ml-1">LVL {user.level}</span>
                  </div>
                  <p className="text-xs text-[#7a8580]">{user.handle}</p>
                </div>
              </div>

              <button className="px-3.5 py-1.5 bg-[#0d1210] border border-[#2a3330] hover:border-[#4dd8c4] text-xs font-medium text-[#e8e6e0] rounded-md transition-colors">
                Edit Profile
              </button>
            </div>

            {/* FLAT XP PROGRESS BAR */}
            <div className="space-y-1.5 pt-4 border-t border-[#2a3330]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#e8e6e0] font-medium">Level {user.level} Progress</span>
                <span className="text-[#d4a24c] font-mono font-medium">{user.currentXP.toLocaleString()} / {user.nextLevelXP.toLocaleString()} XP</span>
              </div>
              <div className="w-full h-2 bg-[#2a3330] rounded-full overflow-hidden">
                <div className="h-full bg-[#d4a24c] rounded-full" style={{ width: `${xpPercentage}%` }}></div>
              </div>
            </div>

          </div>

          {/* STATS ROW */}
          <div className="grid grid-cols-3 gap-6 py-4 border-y border-[#2a3330] text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs text-[#7a8580] font-medium uppercase tracking-wider">Posts</span>
              <div className="font-heading font-semibold text-2xl text-[#e8e6e0]">{user.stats.posts}</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#7a8580] font-medium uppercase tracking-wider">Followers</span>
              <div className="font-heading font-semibold text-2xl text-[#e8e6e0]">{user.stats.followers}</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#7a8580] font-medium uppercase tracking-wider">Following</span>
              <div className="font-heading font-semibold text-2xl text-[#e8e6e0]">{user.stats.following}</div>
            </div>
          </div>

          {/* TABS SECTION */}
          <div className="space-y-6">
            
            {/* Underline Tabs */}
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

            {/* BADGES GRID */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-xs text-[#7a8580] uppercase tracking-wider">Badges</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                {/* Unlocked Badge 1 */}
                <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-center">
                  <i data-lucide="star" className="w-6 h-6 text-[#4dd8c4]" strokeWidth="1.5"></i>
                  <span className="text-xs text-[#e8e6e0] font-medium">Genesis Creator</span>
                </div>

                {/* Unlocked Badge 2 */}
                <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-center">
                  <i data-lucide="palette" className="w-6 h-6 text-[#4dd8c4]" strokeWidth="1.5"></i>
                  <span className="text-xs text-[#e8e6e0] font-medium">Pixel Master</span>
                </div>

                {/* Unlocked Badge 3 */}
                <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-center">
                  <i data-lucide="film" className="w-6 h-6 text-[#4dd8c4]" strokeWidth="1.5"></i>
                  <span className="text-xs text-[#e8e6e0] font-medium">Animation Wizard</span>
                </div>

                {/* Locked Badge */}
                <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-center opacity-50">
                  <i data-lucide="lock" className="w-6 h-6 text-[#7a8580]" strokeWidth="1.5"></i>
                  <span className="text-xs text-[#7a8580] font-medium">Level 50 Titan</span>
                </div>

              </div>
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}
