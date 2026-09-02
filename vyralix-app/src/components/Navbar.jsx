import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

// ============================================================================
// EXPERIMENT 3 (STEP 4a): Navbar Component Reading Shared Context State
// ----------------------------------------------------------------------------
// 1. useContext(AppContext): Consumes posts array from AppContext
// 2. Teal Notification Indicator: Shows a teal dot (#4dd8c4) on the bell icon
//    whenever totalLikes > 0, demonstrating context state awareness.
// ============================================================================

export default function Navbar({ onNavigateToDashboard, currentView }) {
  // Consume global posts state from AppContext
  const { posts } = useContext(AppContext);

  // Calculate total likes across all posts in global context
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <header className="bg-[#0d1210] border-b border-[#2a3330] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        
        {/* Brand Wordmark */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); if (onNavigateToDashboard) onNavigateToDashboard('home'); }}
          className="font-heading font-bold text-2xl tracking-tight text-[#e8e6e0]"
        >
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

        {/* Action Controls & Notifications */}
        <div className="flex items-center gap-4">
          
          {/* Create CTA Button */}
          <button className="bg-[#4dd8c4] text-[#0d1210] font-semibold text-xs px-4 py-2 rounded-md border-0 outline-none ring-0 hover:bg-[#3ec4b1] transition-colors flex items-center gap-1.5 shadow-[0_0_12px_rgba(77,216,196,0.3)]">
            <i data-lucide="plus" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Create</span>
          </button>

          {/* Notification Icon with Dynamic Teal Indicator Dot from AppContext state */}
          <button className="relative text-[#7a8580] hover:text-[#e8e6e0] transition-colors" aria-label="Notifications">
            <i data-lucide="bell" className="w-5 h-5" strokeWidth="1.5"></i>
            {/* Teal dot appears when total likes across feed > 0 */}
            {totalLikes > 0 && (
              <span 
                className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#4dd8c4] rounded-full"
                title="Activity detected on feed"
              ></span>
            )}
          </button>

          {/* Profile Avatar Circle */}
          <button 
            onClick={() => { if (onNavigateToDashboard) onNavigateToDashboard('dashboard'); }}
            className="rounded-full focus:outline-none"
            aria-label="Profile Dashboard"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="Profile Avatar" 
              className="w-8 h-8 rounded-full object-cover border border-[#2a3330] hover:border-[#4dd8c4] transition-colors"
            />
          </button>
        </div>

      </div>
    </header>
  );
}
