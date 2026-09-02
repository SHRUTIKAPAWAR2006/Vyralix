import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import TrendingWidget from './TrendingWidget';

// ============================================================================
// EXPERIMENT 3 (STEP 4b): Feed Component Reading & Modifying Global Context State
// ----------------------------------------------------------------------------
// 1. useContext(AppContext): Reads posts, likePost, and unlikePost from Context
// 2. Interactive Heart Button: Toggles likePost(id) / unlikePost(id) on click,
//    immediately updating likes count & heart color in state across the app.
// ============================================================================

export default function Feed({ onNavigateToDashboard }) {
  // Consume posts state and like/unlike actions from AppContext
  const { posts, likePost, unlikePost } = useContext(AppContext);

  // Initialize Lucide icons on component load & state changes
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [posts]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

      {/* ========================================== */}
      {/* LEFT SIDEBAR NAVIGATION                    */}
      {/* ========================================== */}
      <aside className="w-52 flex-shrink-0 hidden md:block">
        <nav className="space-y-1 sticky top-24">
          
          {/* Active Item: Home Feed */}
          <a href="#" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-[#4dd8c4] bg-[#141a17] text-[#4dd8c4] font-medium text-xs rounded-r-md">
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

          {/* Profile Dashboard Link */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); if (onNavigateToDashboard) onNavigateToDashboard('dashboard'); }}
            className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors"
          >
            <i data-lucide="user" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Profile (Dashboard)</span>
          </a>

          <a href="/login.html" className="flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors">
            <i data-lucide="settings" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Settings / Log In</span>
          </a>

        </nav>
      </aside>

      {/* ========================================== */}
      {/* CENTER FEED MAIN CONTENT                   */}
      {/* ========================================== */}
      <main className="flex-1 max-w-xl space-y-6">

        {/* TRENDING WIDGET: Placed directly above filter tabs */}
        <TrendingWidget />

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-6 border-b border-[#2a3330] pb-2 text-xs font-medium">
          <button className="border-b-2 border-b-[#4dd8c4] text-[#e8e6e0] font-semibold pb-2">
            All Feed
          </button>
          <button className="border-b-2 border-b-transparent text-[#7a8580] hover:text-[#e8e6e0] pb-2 transition-colors">
            Digital Art
          </button>
          <button className="border-b-2 border-b-transparent text-[#7a8580] hover:text-[#e8e6e0] pb-2 transition-colors">
            3D Animation
          </button>
          <button className="border-b-2 border-b-transparent text-[#7a8580] hover:text-[#e8e6e0] pb-2 transition-colors">
            Music Clips
          </button>
        </div>

        {/* FEED CARDS: Dynamically mapped from AppContext posts array */}
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-6 space-y-4"
          >
            {/* Creator Header Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={post.avatarUrl} 
                  alt={post.creatorName} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-sm text-[#e8e6e0]">{post.creatorName}</h3>
                    <span className="text-xs text-[#7a8580]">{post.creatorHandle}</span>
                    <span className="text-xs text-[#d4a24c] font-medium border-b border-[#d4a24c]/40 pb-0.5 ml-1">
                      LVL {post.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#7a8580] mt-0.5">
                    <span className="text-[#4dd8c4] font-medium">{post.contentType}</span> · {post.timeAgo}
                  </p>
                </div>
              </div>
            </div>

            {/* Caption */}
            <p className="text-sm text-[#e8e6e0] leading-relaxed">
              {post.caption}
            </p>

            {/* Media Content Preview */}
            <div className="relative rounded-md overflow-hidden bg-[#0d1210] border border-[#2a3330]">
              <img 
                src={post.imageUrl} 
                alt="Content Preview" 
                className="w-full h-80 object-cover"
              />
              {(post.loopText || post.sampleText) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <i data-lucide="play" className="w-7 h-7 text-[#e8e6e0] opacity-90" strokeWidth="1.5"></i>
                </div>
              )}
              {(post.loopText || post.sampleText) && (
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d1210]/90 to-transparent flex items-end p-3">
                  <span className="text-xs text-[#7a8580] font-mono">
                    {post.loopText || post.sampleText}
                  </span>
                </div>
              )}
            </div>

            {/* Engagement Actions Row */}
            <div className="flex items-center gap-6 pt-2 text-xs font-medium">
              
              {/* INTERACTIVE LIKE BUTTON */}
              <button 
                onClick={() => post.isLiked ? unlikePost(post.id) : likePost(post.id)}
                className={`flex items-center gap-2 transition-colors ${
                  post.isLiked ? 'text-[#4dd8c4]' : 'text-[#7a8580] hover:text-[#4dd8c4]'
                }`}
                title={post.isLiked ? "Unlike post" : "Like post"}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill={post.isLiked ? "#4dd8c4" : "none"} 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4 transition-colors"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="font-mono">{post.likes.toLocaleString()}</span>
              </button>

              {/* Comment Button */}
              <button className="flex items-center gap-2 text-[#7a8580] hover:text-[#e8e6e0] transition-colors">
                <i data-lucide="message-square" className="w-4 h-4" strokeWidth="1.5"></i>
                <span className="font-mono">{post.comments}</span>
              </button>

              {/* Bookmark Button */}
              <button className="flex items-center gap-2 text-[#7a8580] hover:text-[#e8e6e0] transition-colors ml-auto">
                <i data-lucide="bookmark" className="w-4 h-4" strokeWidth="1.5"></i>
              </button>

            </div>
          </article>
        ))}

      </main>

    </div>
  );
}
