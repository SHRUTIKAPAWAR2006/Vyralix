import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import './index.css';

// ============================================================================
// Global Providers Setup
// ----------------------------------------------------------------------------
// We wrap <App /> in both <UserProvider> (JWT & user state) and 
// <AppProvider> (posts from MongoDB & feed interactions) so all components
// can access shared state and authentication seamlessly.
// ============================================================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </UserProvider>
  </React.StrictMode>,
);
