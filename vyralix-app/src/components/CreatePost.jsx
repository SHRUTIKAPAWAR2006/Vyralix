import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { UserContext } from '../context/UserContext';

// ============================================================================
// Create / Upload Post Component with Direct Device File Upload
// ============================================================================

export default function CreatePost({ onNavigate }) {
  const { createPost, fetchPosts } = useContext(AppContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const [creatorName, setCreatorName] = useState(user?.name || '');
  const [creatorHandle, setCreatorHandle] = useState(
    user?.name
      ? `@${user.name.toLowerCase().replace(/\s+/g, '')}`
      : user?.email
      ? `@${user.email.split('@')[0]}`
      : ''
  );
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('3D Animation');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Step 1 Validation: File must be chosen
    if (!file) {
      setError('Please choose a file to upload.');
      return;
    }

    setLoading(true);

    // Step 2: Build FormData with file and metadata
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('contentType', contentType);
    formData.append('creatorName', creatorName);
    formData.append('creatorHandle', creatorHandle);

    const result = await createPost(formData);

    setLoading(false);

    if (result.success) {
      // Refresh feed and return to home
      if (fetchPosts) {
        await fetchPosts();
      }
      onNavigate('home');
    } else {
      setError(result.error || 'Failed to upload post to backend.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">
      {/* Top Back Navigation Bar */}
      <div>
        <button
          onClick={() => onNavigate('home')}
          className="text-xs text-[#4dd8c4] hover:underline inline-flex items-center gap-1.5 font-medium cursor-pointer"
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
                Share images, audio tracks, or videos directly from your device.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-[#7a8580] hover:text-[#e8e6e0] flex items-center gap-1 cursor-pointer"
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

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#e8e6e0]">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cyber City Skyline"
              className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md px-3 py-2 text-xs text-[#e8e6e0] placeholder-[#7a8580] focus:outline-none focus:border-[#4dd8c4]"
            />
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

          {/* File Upload from Device */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#e8e6e0]">
              Upload Media from Device (Image, Audio, or Video)
            </label>
            <input
              type="file"
              accept="image/*,audio/*,video/*"
              onChange={(e) => {
                const selectedFile = e.target.files && e.target.files[0];
                setFile(selectedFile || null);
                if (selectedFile) {
                  setPreviewUrl(URL.createObjectURL(selectedFile));
                  // Auto-suggest category if not set
                  if (selectedFile.type.startsWith('audio/')) {
                    setContentType('Music Clip');
                  } else if (selectedFile.type.startsWith('video/')) {
                    setContentType('3D Animation');
                  } else if (selectedFile.type.startsWith('image/')) {
                    setContentType('Digital Art');
                  }
                } else {
                  setPreviewUrl('');
                }
              }}
              className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md px-3 py-2 text-xs text-[#e8e6e0] file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#141a17] file:text-[#4dd8c4] hover:file:bg-[#1f2824] file:cursor-pointer transition-colors"
            />
            {/* Show chosen file's name below the input */}
            {file ? (
              <p className="text-xs text-[#4dd8c4] flex items-center gap-1.5 mt-1 font-mono">
                <i data-lucide="check" className="w-3.5 h-3.5"></i>
                <span>Chosen file: <strong>{file.name}</strong> ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
              </p>
            ) : (
              <p className="text-[11px] text-[#7a8580] mt-1">
                Max file size: 50 MB (JPEG, PNG, GIF, WEBP, MP3, WAV, OGG, MP4, WEBM, MOV)
              </p>
            )}
          </div>

          {/* Media Preview Box */}
          {previewUrl && (
            <div className="mt-3 rounded-md overflow-hidden border border-[#2a3330] bg-[#0d1210] p-2">
              {file?.type?.startsWith('video/') ? (
                <video src={previewUrl} controls className="w-full max-h-64 rounded object-contain bg-black" />
              ) : file?.type?.startsWith('audio/') ? (
                <div className="p-4 text-center space-y-2">
                  <div className="text-xs text-[#4dd8c4] font-medium flex items-center justify-center gap-2">
                    <i data-lucide="music" className="w-4 h-4" strokeWidth="1.5"></i>
                    <span>Audio: {file.name}</span>
                  </div>
                  <audio src={previewUrl} controls className="w-full" />
                </div>
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-56 object-cover rounded"
                />
              )}
            </div>
          )}

          {/* Post Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd8c4] text-[#0d1210] font-semibold text-xs py-2.5 rounded-md hover:bg-[#3ec4b1] transition-colors shadow-[0_0_12px_rgba(77,216,196,0.3)] mt-2 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            <i data-lucide="plus" className="w-4 h-4" strokeWidth="1.5"></i>
            <span>{loading ? 'Uploading...' : 'Post'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
