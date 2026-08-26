import React from 'react';
import { UserContext, initialUserData } from './context/UserContext';
import Dashboard from './components/Dashboard';

// ============================================================================
// EXPERIMENT 2: App Root Component
// ----------------------------------------------------------------------------
// We wrap the Dashboard component in <UserContext.Provider value={initialUserData}>
// so any component inside can consume user state via useContext(UserContext).
// ============================================================================

export default function App() {
  return (
    <UserContext.Provider value={initialUserData}>
      <Dashboard />
    </UserContext.Provider>
  );
}
