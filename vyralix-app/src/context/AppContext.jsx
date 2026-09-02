import React, { createContext, useState } from 'react';

// ============================================================================
// EXPERIMENT 3 (STEP 1): AppContext & Global State Management
// ----------------------------------------------------------------------------
// 1. createContext(): Creates a context for sharing post feed data & actions
// 2. useState(): Holds the array of posts in global state
// 3. likePost(id) & unlikePost(id): Actions that update post likes in state
// ============================================================================

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Initial posts array pre-filled with sample feed cards from Experiment 1
  const [posts, setPosts] = useState([
    {
      id: 1,
      creatorName: 'Kira Vance',
      creatorHandle: '@kira_3d',
      level: 28,
      contentType: '3D Animation',
      caption: 'Finished this 3D environment loop. Rendered with volumetric fog in Blender.',
      imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&q=80',
      likes: 1420,
      isLiked: false,
      comments: 89,
      timeAgo: '2 hours ago',
      loopText: '0:15 loop'
    },
    {
      id: 2,
      creatorName: 'Elysia Nova',
      creatorHandle: '@elysia_art',
      level: 42,
      contentType: 'Digital Art',
      caption: '"Valkyrie of Aetheria" character concept art completed after 18 hours of digital painting.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      likes: 3850,
      isLiked: false,
      comments: 214,
      timeAgo: '5 hours ago'
    },
    {
      id: 3,
      creatorName: 'Zack Beats',
      creatorHandle: '@zack_synth',
      level: 19,
      contentType: 'Music Clip',
      caption: '"Midnight Drive" — Synthwave lo-fi sample recorded with Ableton Live and Prophet synth.',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      likes: 890,
      isLiked: false,
      comments: 42,
      timeAgo: '1 day ago',
      sampleText: '0:45 audio sample'
    }
  ]);

  // ACTION 1: likePost(id) — Increments likes by 1 and sets isLiked to true
  const likePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1, isLiked: true } : post
      )
    );
  };

  // ACTION 2: unlikePost(id) — Decrements likes by 1 and sets isLiked to false
  const unlikePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes - 1, isLiked: false } : post
      )
    );
  };

  return (
    <AppContext.Provider value={{ posts, likePost, unlikePost }}>
      {children}
    </AppContext.Provider>
  );
}
