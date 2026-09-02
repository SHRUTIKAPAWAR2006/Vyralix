import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

// ============================================================================
// EXPERIMENT 3: TrendingWidget Component
// ----------------------------------------------------------------------------
// 1. useContext(AppContext): Reads global posts array from context
// 2. Dynamic Calculation: Finds the post with the highest likes count
// 3. Automatic Updates: Re-evaluates instantly when likes change in Feed
// ============================================================================

export default function TrendingWidget() {
  // Consume posts array from AppContext
  const { posts } = useContext(AppContext);

  // Initialize Lucide icons on load & updates
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [posts]);

  // Find the post with the highest like count
  const topPost = posts && posts.length > 0 
    ? posts.reduce((max, post) => (post.likes > max.likes ? post : max), posts[0])
    : null;

  if (!topPost) return null;

  return (
    <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-4 mb-6 flex items-center justify-between gap-4">
      
      {/* Left: Trending Tag & Creator Info */}
      <div className="flex items-center gap-3">
        {/* Flame / Flame Icon Box */}
        <div className="w-8 h-8 rounded-md bg-[#0d1210] border border-[#2a3330] flex items-center justify-center text-[#d4a24c]">
          <i data-lucide="flame" className="w-4 h-4 text-[#d4a24c]" strokeWidth="1.5"></i>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#d4a24c]">
              Trending Now
            </span>
            <span className="text-xs text-[#7a8580]">·</span>
            <span className="text-xs text-[#4dd8c4] font-medium">
              {topPost.contentType}
            </span>
          </div>
          <p className="text-xs text-[#e8e6e0] font-medium mt-0.5">
            {topPost.creatorName} <span className="text-[#7a8580] font-normal">({topPost.creatorHandle})</span>
          </p>
        </div>
      </div>

      {/* Right: Gold Status Like Count */}
      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0d1210] border border-[#2a3330] rounded-md">
        <i data-lucide="heart" className="w-3.5 h-3.5 fill-[#d4a24c] text-[#d4a24c]" strokeWidth="1.5"></i>
        <span className="font-mono text-xs font-semibold text-[#d4a24c]">
          {topPost.likes.toLocaleString()}
        </span>
      </div>

    </div>
  );
}
