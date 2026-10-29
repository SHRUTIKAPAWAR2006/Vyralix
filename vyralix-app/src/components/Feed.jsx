import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { UserContext } from '../context/UserContext';
import TrendingWidget from './TrendingWidget';

// ============================================================================
// Feed Component: Real Feed connected to MongoDB backend (Exp 4-6)
// Restores original Lucide icons (home, compass, upload, activity, trophy, award, user)
// ============================================================================

export default function Feed({ onNavigate, isExploreView = false }) {
  const { posts, loading, error, likePost, unlikePost } = useContext(AppContext);
  const { token, logoutUser } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Trigger Lucide icon SVG conversion on mount & state changes
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Filter posts based on selected category tab
  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter(
          (post) =>
            post.contentType &&
            post.contentType.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

      {/* ========================================== */}
      {/* LEFT SIDEBAR NAVIGATION                    */}
      {/* ========================================== */}
      <aside className="w-52 flex-shrink-0 hidden md:block">
        <nav className="space-y-1 sticky top-24">
          
          {/* 1. Home Feed */}
          <button
            onClick={() => onNavigate('home')}
            className={`w-full flex items-center gap-3 px-3 py-2 border-l-2 font-medium text-xs rounded-r-md transition-colors text-left ${
              !isExploreView
                ? 'border-l-[#4dd8c4] bg-[#141a17] text-[#4dd8c4]'
                : 'border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50'
            }`}
          >
            <i data-lucide="home" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Home</span>
          </button>

          {/* 2. Explore */}
          <button
            onClick={() => onNavigate('explore')}
            className={`w-full flex items-center gap-3 px-3 py-2 border-l-2 font-medium text-xs rounded-r-md transition-colors text-left ${
              isExploreView
                ? 'border-l-[#4dd8c4] bg-[#141a17] text-[#4dd8c4]'
                : 'border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50'
            }`}
          >
            <i data-lucide="compass" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Explore</span>
          </button>

          {/* 3. Upload */}
          <button
            onClick={() => onNavigate('upload')}
            className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
          >
            <i data-lucide="upload" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Upload</span>
          </button>

          {/* 4. Activity */}
          <button
            onClick={() => onNavigate('activity')}
            className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
          >
            <i data-lucide="activity" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Activity</span>
          </button>

          {/* 5. Leaderboard */}
          <button
            onClick={() => onNavigate('leaderboard')}
            className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
          >
            <i data-lucide="trophy" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Leaderboard</span>
          </button>

          {/* 6. Badges */}
          <button
            onClick={() => onNavigate('badges')}
            className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
          >
            <i data-lucide="award" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Badges</span>
          </button>

          {/* 7. Profile */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#7a8580] hover:text-[#e8e6e0] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
          >
            <i data-lucide="user" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>Profile (Dashboard)</span>
          </button>

          {/* 8. Log In or Log Out */}
          {token ? (
            <button
              onClick={() => {
                logoutUser();
                onNavigate('login');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-red-400/80 hover:text-red-400 hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="log-out" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Log Out</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="w-full flex items-center gap-3 px-3 py-2 border-l-2 border-l-transparent text-[#4dd8c4]/80 hover:text-[#4dd8c4] hover:bg-[#141a17]/50 font-medium text-xs rounded-r-md transition-colors text-left"
            >
              <i data-lucide="log-in" className="w-4 h-4" strokeWidth="1.5"></i>
              <span>Log In / Register</span>
            </button>
          )}

        </nav>
      </aside>

      {/* ========================================== */}
      {/* CENTER FEED MAIN CONTENT                   */}
      {/* ========================================== */}
      <main className="flex-1 max-w-xl space-y-6">

        {/* Explore View Banner */}
        {isExploreView ? (
          <div className="space-y-4 mb-4">
            <div>
              <button
                onClick={() => onNavigate('home')}
                className="text-xs text-[#4dd8c4] hover:underline inline-flex items-center gap-1.5 font-medium"
              >
                <i data-lucide="arrow-left" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
                <span>Back to Home Feed</span>
              </button>
            </div>
            <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-4">
              <h1 className="font-heading font-bold text-lg text-[#e8e6e0]">Explore All Creations</h1>
              <p className="text-xs text-[#7a8580]">
                Discover community pieces fetched live from MongoDB.
              </p>
            </div>
          </div>
        ) : (
          <TrendingWidget />
        )}

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-6 border-b border-[#2a3330] pb-2 text-xs font-medium">
          {['All', 'Digital Art', '3D Animation', 'Music Clip'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-2 border-b-2 font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'border-b-[#4dd8c4] text-[#e8e6e0]'
                  : 'border-b-transparent text-[#7a8580] hover:text-[#e8e6e0]'
              }`}
            >
              {cat === 'All' ? 'All Feed' : cat}
            </button>
          ))}
        </div>

        {/* Loading / Error Indicators */}
        {loading && (
          <div className="text-center py-8 text-xs text-[#7a8580]">
            Loading real creations from MongoDB...
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-xs">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredPosts.length === 0 && (
          <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-8 text-center space-y-3">
            <p className="text-sm text-[#7a8580]">No posts found in this category.</p>
            <button
              onClick={() => onNavigate('upload')}
              className="text-xs text-[#4dd8c4] hover:underline font-medium"
            >
              + Upload the first post now
            </button>
          </div>
        )}

        {/* FEED CARDS: Dynamically mapped from real backend posts */}
        {filteredPosts.map((post) => {
          const postId = post._id || post.id;
          const isLiked = post.isLiked || false;

          return (
            <article 
              key={postId} 
              className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-6 space-y-4"
            >
              {/* Creator Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={
                      post.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        post.creatorName || 'User'
                      )}&background=141a17&color=4dd8c4`
                    } 
                    alt={post.creatorName} 
                    className="w-10 h-10 rounded-full object-cover border border-[#2a3330]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-sm text-[#e8e6e0]">
                        {post.creatorName}
                      </h3>
                      <span className="text-xs text-[#7a8580]">{post.creatorHandle}</span>
                      <span className="text-xs text-[#d4a24c] font-medium border-b border-[#d4a24c]/40 pb-0.5 ml-1">
                        LVL 28
                      </span>
                    </div>
                    <p className="text-xs text-[#7a8580] mt-0.5">
                      <span className="text-[#4dd8c4] font-medium">{post.contentType}</span>
                      {' · '}
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              {post.title && (
                <h4 className="font-heading font-semibold text-base text-[#e8e6e0]">
                  {post.title}
                </h4>
              )}
              <p className="text-sm text-[#e8e6e0] leading-relaxed">
                {post.caption}
              </p>

              {/* Media Content Preview: Image, Video, or Audio */}
              {post.imageUrl && (
                <div className="relative rounded-md overflow-hidden bg-[#0d1210] border border-[#2a3330]">
                  {post.mediaType === 'video' || (typeof post.imageUrl === 'string' && post.imageUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i)) ? (
                    <video
                      src={post.imageUrl}
                      controls
                      className="w-full max-h-96 object-contain bg-black"
                    />
                  ) : post.mediaType === 'audio' || (typeof post.imageUrl === 'string' && post.imageUrl.match(/\.(mp3|wav|ogg)(\?.*)?$/i)) ? (
                    <div className="p-6 text-center space-y-3 bg-[#141a17]">
                      <div className="flex items-center justify-center gap-2 text-xs text-[#4dd8c4] font-medium">
                        <i data-lucide="music" className="w-4 h-4" strokeWidth="1.5"></i>
                        <span>{post.contentType || 'Audio Clip'}</span>
                      </div>
                      <audio src={post.imageUrl} controls className="w-full" />
                    </div>
                  ) : (
                    <img 
                      src={post.imageUrl} 
                      alt="Content Preview" 
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                  )}
                </div>
              )}

              {/* Engagement Actions Row */}
              <div className="flex items-center gap-6 pt-2 text-xs font-medium">
                
                {/* REAL INTERACTIVE LIKE BUTTON: Persists to MongoDB */}
                <button 
                  onClick={() => (isLiked ? unlikePost(postId) : likePost(postId))}
                  className={`flex items-center gap-2 transition-colors ${
                    isLiked ? 'text-[#4dd8c4]' : 'text-[#7a8580] hover:text-[#4dd8c4]'
                  }`}
                  title={isLiked ? 'Unlike post' : 'Like post (syncs to MongoDB)'}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={isLiked ? '#4dd8c4' : 'none'} 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 transition-colors"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span className="font-mono">{(post.likes || 0).toLocaleString()}</span>
                </button>

                {/* Comment Button */}
                <button className="flex items-center gap-2 text-[#7a8580] hover:text-[#e8e6e0] transition-colors">
                  <i data-lucide="message-square" className="w-4 h-4" strokeWidth="1.5"></i>
                  <span className="font-mono">12</span>
                </button>

                {/* Bookmark Button */}
                <button className="flex items-center gap-2 text-[#7a8580] hover:text-[#e8e6e0] transition-colors ml-auto">
                  <i data-lucide="bookmark" className="w-4 h-4" strokeWidth="1.5"></i>
                </button>

              </div>
            </article>
          );
        })}

      </main>

    </div>
  );
}
