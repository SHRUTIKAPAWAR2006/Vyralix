import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

// ============================================================================
// Leaderboard Component with Lucide icons & Back Navigation
// ============================================================================

export default function Leaderboard({ onNavigate }) {
  const { posts } = useContext(AppContext);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Sort posts by likes in descending order (highest first)
  const rankedPosts = [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0));

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
      {/* Top Back Navigation Bar */}
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="text-xs text-[#4dd8c4] hover:underline inline-flex items-center gap-1.5 font-medium"
        >
          <i data-lucide="arrow-left" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
          <span>Back to Home Feed</span>
        </button>
      </div>

      {/* Leaderboard Header */}
      <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#d4a24c] rounded-md p-6 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#0d1210] border border-[#2a3330] flex items-center justify-center text-[#d4a24c]">
            <i data-lucide="trophy" className="w-5 h-5 text-[#d4a24c]" strokeWidth="1.5"></i>
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl text-[#e8e6e0]">Global Creator Leaderboard</h1>
            <p className="text-xs text-[#7a8580] mt-0.5">
              Top posts ranked live by total likes stored in MongoDB.
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#141a17] border border-[#2a3330] rounded-md overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#2a3330] text-[11px] font-semibold text-[#7a8580] uppercase tracking-wider">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6 sm:col-span-7">Creator & Creation</div>
          <div className="col-span-2 text-center">Category</div>
          <div className="col-span-2 text-right">Likes</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#2a3330]">
          {rankedPosts.map((post, idx) => {
            const rank = idx + 1;
            const rankBadgeColor =
              rank === 1
                ? 'text-[#d4a24c] font-bold text-base'
                : rank === 2
                ? 'text-gray-300 font-bold'
                : rank === 3
                ? 'text-amber-600 font-bold'
                : 'text-[#7a8580]';

            return (
              <div
                key={post._id || post.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#19221e] transition-colors"
              >
                {/* Rank */}
                <div className={`col-span-2 text-center font-mono font-semibold ${rankBadgeColor}`}>
                  #{rank}
                </div>

                {/* Creator & Preview */}
                <div className="col-span-6 sm:col-span-7 flex items-center gap-3">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.creatorName}
                      className="w-12 h-12 rounded object-cover border border-[#2a3330] flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-xs text-[#e8e6e0] truncate">
                      {post.creatorName}
                    </h3>
                    <p className="text-[11px] text-[#7a8580] truncate">{post.creatorHandle}</p>
                    <p className="text-[11px] text-[#e8e6e0]/80 truncate mt-0.5 max-w-xs sm:max-w-md">
                      "{post.caption}"
                    </p>
                  </div>
                </div>

                {/* Content Type */}
                <div className="col-span-2 text-center text-xs">
                  <span className="text-[#4dd8c4] font-medium px-2 py-0.5 rounded bg-[#4dd8c4]/10 text-[10px]">
                    {post.contentType}
                  </span>
                </div>

                {/* Likes count */}
                <div className="col-span-2 text-right font-mono font-semibold text-xs text-[#d4a24c] flex items-center justify-end gap-1">
                  <i data-lucide="heart" className="w-3.5 h-3.5 fill-[#d4a24c] text-[#d4a24c]" strokeWidth="1.5"></i>
                  <span>{(post.likes || 0).toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
