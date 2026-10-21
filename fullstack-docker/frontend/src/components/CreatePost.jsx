import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { UserContext } from '../context/UserContext';

// ============================================================================
// Create / Upload Post Component with Lucide icons & Back Navigation
// ============================================================================

export default function CreatePost({ onNavigate }) {
  const { createPost } = useContext(AppContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const [creatorName, setCreatorName] = useState(user?.name || 'Alex Rivers');
  const [creatorHandle, setCreatorHandle] = useState(
    user?.email ? `@${user.email.split('@')[0]}` : '@alex_rivers'
  );
  const [contentType, setContentType] = useState('3D Animation');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const samplePresets = [
    {
      label: 'Cyberpunk 3D Loop',
      url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      type: '3D Animation',
    },
    {
      label: 'Sci-Fi Concept Art',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      type: 'Digital Art',
    },
    {
      label: 'Audio Synthesizer',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      type: 'Music Clip',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!imageUrl) {
      setError('Please provide an image URL or choose a preset below.');
      return;
    }

    setLoading(true);

    const result = await createPost({
      creatorName,
      creatorHandle,
      contentType,
      caption,
      imageUrl,
      likes: 0,
    });

    setLoading(false);

    if (result.success) {
      onNavigate('home');
    } else {
      setError(result.error || 'Failed to save post to MongoDB');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">
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

      <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-6 sm:p-8 space-y-6">
        
        {/* Title */}
        <div className="flex items-center justify-between border-b border-[#2a3330] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#0d1210] border border-[#2a3330] flex items-center justify-center text-[#4dd8c4]">
              <i data-lucide="upload" className="w-5 h-5 text-[#4dd8c4]" strokeWidth="1.5"></i>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-[#e8e6e0]">Upload New Creation</h1>
              <p className="text-xs text-[#7a8580] mt-0.5">
                Publish your 3D animation, concept art, or music sample to MongoDB.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-[#7a8580] hover:text-[#e8e6e0] flex items-center gap-1"
          >
            <span>Cancel</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-md flex items-center gap-2">
            <i data-lucide="alert-circle" className="w-4 h-4 flex-shrink-0" strokeWidth="1.5"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Creator Information Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#e8e6e0]">Creator Name</label>
              <input
                type="text"
                required
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder="Alex Rivers"
                className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md px-3 py-2 text-xs text-[#e8e6e0] focus:outline-none focus:border-[#4dd8c4]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#e8e6e0]">Creator Handle</label>
              <input
                type="text"
                required
                value={creatorHandle}
                onChange={(e) => setCreatorHandle(e.target.value)}
                placeholder="@alex_rivers"
                className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md px-3 py-2 text-xs text-[#e8e6e0] focus:outline-none focus:border-[#4dd8c4]"
              />
            </div>
          </div>

          {/* Content Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#e8e6e0]">Category / Content Type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md px-3 py-2 text-xs text-[#e8e6e0] focus:outline-none focus:border-[#4dd8c4]"
            >
              <option value="3D Animation">3D Animation</option>
              <option value="Digital Art">Digital Art</option>
              <option value="Music Clip">Music Clip</option>
              <option value="Motion Graphics">Motion Graphics</option>
            </select>
          </div>

          {/* Caption */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#e8e6e0]">Caption / Description</label>
            <textarea
              required
              rows="3"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe your creation, tools used (Blender, Photoshop, Ableton), etc."
              className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md px-3 py-2 text-xs text-[#e8e6e0] placeholder-[#7a8580] focus:outline-none focus:border-[#4dd8c4]"
            ></textarea>
          </div>

          {/* Media URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#e8e6e0]">Media Image URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md px-3 py-2 text-xs text-[#e8e6e0] placeholder-[#7a8580] focus:outline-none focus:border-[#4dd8c4]"
            />
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <span className="text-[11px] text-[#7a8580]">Or click a sample preset:</span>
            <div className="flex flex-wrap gap-2">
              {samplePresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setImageUrl(preset.url);
                    setContentType(preset.type);
                  }}
                  className="px-2.5 py-1 text-[11px] bg-[#0d1210] border border-[#2a3330] hover:border-[#4dd8c4] text-[#e8e6e0] rounded transition-colors flex items-center gap-1"
                >
                  <i data-lucide="zap" className="w-3 h-3 text-[#d4a24c]" strokeWidth="1.5"></i>
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="mt-3 rounded-md overflow-hidden border border-[#2a3330] max-h-56 bg-[#0d1210]">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-56 object-cover"
                onError={() => setError('Image failed to load from provided URL.')}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd8c4] text-[#0d1210] font-semibold text-xs py-2.5 rounded-md hover:bg-[#3ec4b1] transition-colors shadow-[0_0_12px_rgba(77,216,196,0.3)] mt-2 disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <i data-lucide="plus" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>{loading ? 'Saving to MongoDB...' : 'Publish to Feed'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
