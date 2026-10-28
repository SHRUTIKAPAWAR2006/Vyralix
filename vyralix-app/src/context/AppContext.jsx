import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

// ============================================================================
// AppContext: Connects directly to the MongoDB backend (Exp 4-6)
// ----------------------------------------------------------------------------
// 1. fetchPosts(): GET ${API_URL}/api/posts
// 2. createPost(): POST ${API_URL}/api/posts (saves new post to MongoDB)
// 3. likePost() / unlikePost(): PUT ${API_URL}/api/posts/:id
// ============================================================================

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Call 1: Fetch all posts from the MongoDB backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/posts`);
      if (!res.ok) {
        throw new Error(`Failed to load posts (${res.status})`);
      }
      const data = await res.json();
      // Newest posts first, so a freshly uploaded post stays at the top after refresh
      data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setPosts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load posts from the backend on initial mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // API Call 2: Create a new post and persist it to MongoDB
  const createPost = async (postData) => {
    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      const newPost = await res.json();
      // Prepend newly created post to the feed state immediately
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return { success: true, post: newPost };
    } catch (err) {
      console.error('Error creating post:', err);
      return { success: false, error: err.message };
    }
  };

  // API Call 3: Increment like count and update MongoDB
  const likePost = async (postId) => {
    const post = posts.find((p) => (p._id || p.id) === postId);
    if (!post) return;

    const newLikes = (post.likes || 0) + 1;

    // Optimistically update the UI state
    setPosts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === postId ? { ...p, likes: newLikes, isLiked: true } : p
      )
    );

    try {
      // Sync with MongoDB backend using PUT /api/posts/:id
      await fetch(`${API_URL}/api/posts/${post._id || post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: newLikes }),
      });
    } catch (err) {
      console.error('Failed to sync like with backend:', err);
    }
  };

  // API Call 4: Decrement like count and update MongoDB
  const unlikePost = async (postId) => {
    const post = posts.find((p) => (p._id || p.id) === postId);
    if (!post) return;

    const newLikes = Math.max(0, (post.likes || 0) - 1);

    // Optimistically update the UI state
    setPosts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === postId ? { ...p, likes: newLikes, isLiked: false } : p
      )
    );

    try {
      // Sync with MongoDB backend using PUT /api/posts/:id
      await fetch(`${API_URL}/api/posts/${post._id || post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: newLikes }),
      });
    } catch (err) {
      console.error('Failed to sync unlike with backend:', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        loading,
        error,
        fetchPosts,
        createPost,
        likePost,
        unlikePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
