import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { UserContext } from '../context/UserContext';

// ============================================================================
// Activity Component with Lucide icons & Back Navigation
// ============================================================================

export default function Activity({ onNavigate }) {
  const { posts } = useContext(AppContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const currentUserName = user?.name || '';
  const currentUserHandle = user?.name
    ? `@${user.name.toLowerCase().replace(/\s+/g, '')}`
    : user?.email
    ? `@${user.email.split('@')[0]}`
    : '';

  // Filter posts where creator matches current user
  const userPosts = posts.filter(
    (post) =>
      (post.creatorName && post.creatorName.toLowerCase() === currentUserName.toLowerCase()) ||
      (post.creatorHandle && post.creatorHandle.toLowerCase() === currentUserHandle.toLowerCase())
  );

  const totalUserLikes = userPosts.reduce((sum, p) => sum + (p.likes || 0), 0);

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

      {/* Activity Header Card */}
      <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#0d1210] border border-[#2a3330] flex items-center justify-center text-[#4dd8c4]">
              <i data-lucide="activity" className="w-5 h-5 text-[#4dd8c4]" strokeWidth="1.5"></i>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-[#e8e6e0]">Creator Activity & Stats</h1>
              <p className="text-xs text-[#7a8580] mt-0.5">
                Live metrics calculated from your posts saved in MongoDB.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('upload')}
            className="bg-[#4dd8c4] text-[#0d1210] font-semibold text-xs px-3.5 py-2 rounded-md hover:bg-[#3ec4b1] transition-colors flex items-center gap-1.5"
          >
            <i data-lucide="plus" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
            <span>New Post</span>
          </button>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2a3330]">
          <div className="bg-[#0d1210] border border-[#2a3330] rounded-md p-4">
            <span className="text-[11px] text-[#7a8580] uppercase tracking-wider font-medium">Your Posts</span>
            <div className="font-heading font-semibold text-2xl text-[#e8e6e0] mt-1">{userPosts.length}</div>
          </div>

          <div className="bg-[#0d1210] border border-[#2a3330] rounded-md p-4">
            <span className="text-[11px] text-[#7a8580] uppercase tracking-wider font-medium">Total Likes</span>
            <div className="font-heading font-semibold text-2xl text-[#d4a24c] font-mono mt-1">
              {totalUserLikes.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#0d1210] border border-[#2a3330] rounded-md p-4 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-[#7a8580] uppercase tracking-wider font-medium">Account Status</span>
            <div className="font-heading font-semibold text-sm text-[#4dd8c4] mt-2">
              ● Active Creator
            </div>
          </div>
        </div>
      </div>

      {/* User's Posts Feed */}
      <div className="space-y-4">
        <h2 className="font-heading font-semibold text-sm text-[#e8e6e0] uppercase tracking-wider">
          Your Recent Uploads ({userPosts.length})
        </h2>

        {userPosts.length === 0 ? (
          <div className="bg-[#141a17] border border-[#2a3330] rounded-md p-8 text-center space-y-3">
            <p className="text-sm text-[#7a8580]">You haven't uploaded any posts yet.</p>
            <button
              onClick={() => onNavigate('upload')}
              className="text-xs text-[#4dd8c4] hover:underline font-medium"
            >
              Upload your first creation to see activity →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userPosts.map((post) => (
              <div
                key={post._id || post.id}
                className="bg-[#141a17] border border-[#2a3330] rounded-md p-4 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#4dd8c4] font-medium">{post.contentType}</span>
                    <span className="text-[#d4a24c] font-mono flex items-center gap-1">
                      <i data-lucide="heart" className="w-3 h-3 fill-[#d4a24c] text-[#d4a24c]" strokeWidth="1.5"></i>
                      <span>{post.likes || 0}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#e8e6e0] line-clamp-2">{post.caption}</p>
                </div>

                {post.imageUrl && (
                  <div className="rounded overflow-hidden border border-[#2a3330]">
                    {post.mediaType === 'video' || (typeof post.imageUrl === 'string' && post.imageUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i)) ? (
                      <video src={post.imageUrl} controls className="w-full h-40 object-cover bg-black" />
                    ) : post.mediaType === 'audio' || (typeof post.imageUrl === 'string' && post.imageUrl.match(/\.(mp3|wav|ogg)(\?.*)?$/i)) ? (
                      <div className="p-3 bg-[#0d1210]">
                        <audio src={post.imageUrl} controls className="w-full" />
                      </div>
                    ) : (
                      <img
                        src={post.imageUrl}
                        alt={post.caption || 'Post image'}
                        className="w-full h-40 object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
