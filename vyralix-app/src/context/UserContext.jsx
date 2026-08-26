import { createContext } from 'react';

// ============================================================================
// EXPERIMENT 2 (PART E/F): useContext() Implementation
// ----------------------------------------------------------------------------
// createContext() creates a Context object that lets components pass data 
// down the component tree without having to pass props manually at every level.
// ============================================================================

// 1. Define default user data for the Vyralix platform (Alex Rivers)
export const initialUserData = {
  name: 'Alex Rivers',
  handle: '@alex_rivers',
  level: 35,
  currentXP: 2450,
  nextLevelXP: 3000,
  stats: {
    posts: 48,
    followers: '12.4k',
    following: 342
  }
};

// 2. Create the UserContext object with default user data
export const UserContext = createContext(initialUserData);
