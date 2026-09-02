import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { UserContext, initialUserData } from './context/UserContext.jsx';
import './index.css';

// ============================================================================
// EXPERIMENT 3 (STEP 3): Global Providers Setup
// ----------------------------------------------------------------------------
// We wrap <App /> in both <AppProvider> (Exp 3: posts & likes state) and 
// <UserContext.Provider> (Exp 2: user profile data) so all components can 
// access shared state via useContext().
// ============================================================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <UserContext.Provider value={initialUserData}>
        <App />
      </UserContext.Provider>
    </AppProvider>
  </React.StrictMode>,
);
