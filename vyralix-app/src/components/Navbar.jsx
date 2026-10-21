import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { UserContext } from '../context/UserContext';

// ============================================================================
// Navbar: Top Navigation Bar
// Uses original Lucide icons: search, plus, bell, log-out, log-in
// ============================================================================

export default function Navbar({ onNavigate, currentView }) {
  const { posts } = useContext(AppContext);
  const { user, token, logoutUser } = useContext(UserContext);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Calculate total likes across all posts in MongoDB
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);

  return (
    <header className="bg-[#0d1210] border-b border-[#2a3330] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        
        {/* Brand Wordmark */}
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="font-heading font-bold text-2xl tracking-tight text-[#e8e6e0] hover:text-[#4dd8c4] transition-colors"
        >
          Vyralix
        </button>

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

        {/* Action Controls & Notifications */}
        <div className="flex items-center gap-3">
          
          {/* Create CTA Button */}
          <button
            onClick={() => onNavigate && onNavigate('upload')}
            className="bg-[#4dd8c4] text-[#0d1210] font-semibold text-xs px-3.5 py-1.5 rounded-md border-0 outline-none hover:bg-[#3ec4b1] transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(77,216,196,0.3)]"
          >
            <i data-lucide="plus" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Create</span>
          </button>

          {/* Notification Icon with Dynamic Teal Indicator Dot */}
          <button
            onClick={() => onNavigate && onNavigate('activity')}
            className="relative text-[#7a8580] hover:text-[#e8e6e0] transition-colors p-1.5"
            aria-label="Activity Notifications"
            title="View Activity"
          >
            <i data-lucide="bell" className="w-5 h-5" strokeWidth="1.5"></i>
            {totalLikes > 0 && (
              <span 
                className="absolute top-1 right-1 w-2 h-2 bg-[#4dd8c4] rounded-full"
                title={`${totalLikes} total likes across posts`}
              ></span>
            )}
          </button>

          {/* Auth State Button: Log In / Profile */}
          {token ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigate && onNavigate('dashboard')}
                className="flex items-center gap-2 rounded-full focus:outline-none p-0.5 hover:ring-1 hover:ring-[#4dd8c4] transition-all"
                title={`Logged in as ${user?.name || 'User'}`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Profile Avatar" 
                  className="w-8 h-8 rounded-full object-cover border border-[#2a3330]"
                />
              </button>

              <button
                onClick={() => {
                  logoutUser();
                  if (onNavigate) onNavigate('login');
                }}
                className="text-[11px] text-[#7a8580] hover:text-red-400 transition-colors flex items-center gap-1 ml-1"
                title="Log Out"
              >
                <i data-lucide="log-out" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="text-xs bg-[#141a17] hover:bg-[#1f2824] border border-[#2a3330] hover:border-[#4dd8c4] text-[#e8e6e0] px-3 py-1.5 rounded-md transition-colors font-medium flex items-center gap-1.5"
            >
              <i data-lucide="log-in" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
              <span>Log In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
