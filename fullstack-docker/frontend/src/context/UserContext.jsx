import React, { createContext, useState, useEffect } from 'react';

// ============================================================================
// UserContext: Manages authentication state, JWT token, and user profile data.
// ----------------------------------------------------------------------------
// 1. token: Stored in localStorage for persistent login across page refreshes.
// 2. user: Current logged-in user info (name, email, role, etc.).
// 3. loginUser(token, userData): Saves token & user to localStorage + state.
// 4. logoutUser(): Clears localStorage and resets state.
// ============================================================================

export const UserContext = createContext();

export const defaultProfileData = {
  name: 'Alex Rivers',
  handle: '@alex_rivers',
  email: 'alex@vyralix.com',
  role: 'user',
  level: 35,
  currentXP: 2450,
  nextLevelXP: 3000,
  stats: {
    posts: 3,
    followers: '12.4k',
    following: 342,
  },
};

export function UserProvider({ children }) {
  // Read existing token & user from localStorage if previously logged in
  const [token, setToken] = useState(() => localStorage.getItem('vyralix_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vyralix_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Action: Log in and save JWT credentials
  const loginUser = (newToken, userData) => {
    localStorage.setItem('vyralix_token', newToken);
    localStorage.setItem('vyralix_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  // Action: Log out and remove credentials
  const logoutUser = () => {
    localStorage.removeItem('vyralix_token');
    localStorage.removeItem('vyralix_user');
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ token, user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
