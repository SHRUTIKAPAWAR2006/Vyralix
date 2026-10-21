import React, { useEffect } from 'react';

// ============================================================================
// Badges Component with Lucide icons & Back Navigation
// ============================================================================

export default function Badges({ onNavigate }) {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const badgeList = [
    { title: 'Genesis Creator', icon: 'star', desc: 'Joined during Vyralix platform launch', status: 'Unlocked' },
    { title: 'Pixel Master', icon: 'palette', desc: 'Uploaded 5+ Digital Art concept pieces', status: 'Unlocked' },
    { title: 'Animation Wizard', icon: 'film', desc: 'Crafted volumetric 3D environment loops', status: 'Unlocked' },
    { title: 'Sound Architect', icon: 'music', desc: 'Released an original audio synthesizer clip', status: 'Unlocked' },
    { title: 'Level 50 Titan', icon: 'lock', desc: 'Reach 50,000 XP in global creator ranking', status: 'Locked' },
    { title: 'Trendsetter', icon: 'trophy', desc: 'Reach #1 position on the global leaderboard', status: 'Locked' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
      {/* Top Back Navigation Bar */}
      <div>
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="text-xs text-[#4dd8c4] hover:underline inline-flex items-center gap-1.5 font-medium"
        >
          <i data-lucide="arrow-left" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
          <span>Back to Home Feed</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-6 space-y-2">
        <h1 className="font-heading font-bold text-xl text-[#e8e6e0]">Creator Badges & Achievements</h1>
        <p className="text-xs text-[#7a8580]">
          Visual showcase for creator progression. (Static UI preview — dedicated Badges database model to be introduced in a future update).
        </p>
      </div>

      {/* Badges Grid with Lucide icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badgeList.map((badge, idx) => (
          <div
            key={idx}
            className={`bg-[#141a17] border border-[#2a3330] rounded-md p-5 flex flex-col justify-between space-y-4 ${
              badge.status === 'Locked' ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-md bg-[#0d1210] border border-[#2a3330] flex items-center justify-center text-[#4dd8c4]">
                <i data-lucide={badge.icon} className="w-5 h-5 text-[#4dd8c4]" strokeWidth="1.5"></i>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  badge.status === 'Unlocked'
                    ? 'bg-[#4dd8c4]/10 text-[#4dd8c4]'
                    : 'bg-[#2a3330] text-[#7a8580]'
                }`}
              >
                {badge.status}
              </span>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-sm text-[#e8e6e0]">{badge.title}</h3>
              <p className="text-xs text-[#7a8580] mt-1">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
