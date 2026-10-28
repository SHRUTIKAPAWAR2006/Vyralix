import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { API_URL } from '../config';

// ============================================================================
// Real Functional Login Component with original Lucide icons (mail, lock, arrow-left)
// ============================================================================

export default function Login({ onNavigate, successMessage }) {
  const { loginUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // POST ${API_URL}/api/auth/login
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      loginUser(data.token, data.user);
      onNavigate('home');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1210] text-[#e8e6e0] font-sans flex items-center justify-center p-4 antialiased selection:bg-[#4dd8c4] selection:text-[#0d1210]">
      {/* Centered Auth Card */}
      <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-8 sm:p-10 max-w-md mx-auto w-full space-y-6">
        
        {/* Brand Wordmark & Tagline Header */}
        <div className="text-center space-y-1">
          <button
            onClick={() => onNavigate('home')}
            className="font-heading font-bold text-3xl tracking-tight text-[#e8e6e0] hover:text-[#4dd8c4] transition-colors"
          >
            Vyralix
          </button>
          <p className="text-xs text-[#7a8580]">Show. Connect. Level Up.</p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="bg-[#4dd8c4]/10 border border-[#4dd8c4]/40 text-[#4dd8c4] text-xs p-3 rounded-md text-center">
            {successMessage}
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-md flex items-center gap-2">
            <i data-lucide="alert-circle" className="w-4 h-4 flex-shrink-0" strokeWidth="1.5"></i>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Credentials Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#e8e6e0]">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7a8580]">
                <i data-lucide="mail" className="w-4 h-4" strokeWidth="1.5"></i>
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@vyralix.com"
                className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md pl-9 pr-3 py-2 text-xs text-[#e8e6e0] placeholder-[#7a8580] focus:outline-none focus:border-[#4dd8c4] transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[#e8e6e0]">Password</label>
              <span className="text-xs text-[#7a8580]">Default: password123</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7a8580]">
                <i data-lucide="lock" className="w-4 h-4" strokeWidth="1.5"></i>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md pl-9 pr-3 py-2 text-xs text-[#e8e6e0] placeholder-[#7a8580] focus:outline-none focus:border-[#4dd8c4] transition-colors"
              />
            </div>
          </div>

          {/* Solid Teal Log In CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd8c4] text-[#0d1210] font-semibold text-xs py-2.5 rounded-md border-0 outline-none hover:bg-[#3ec4b1] transition-colors shadow-[0_0_12px_rgba(77,216,196,0.3)] mt-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Log In'}
          </button>
        </form>

        {/* Link to Register Page */}
        <div className="text-center text-xs text-[#7a8580] pt-2 border-t border-[#2a3330]">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="text-[#4dd8c4] font-medium hover:underline ml-1"
          >
            Sign up
          </button>
        </div>

        {/* Back to Home shortcut */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-[#7a8580] hover:text-[#e8e6e0] transition-colors inline-flex items-center gap-1"
          >
            <i data-lucide="arrow-left" className="w-3.5 h-3.5" strokeWidth="1.5"></i>
            <span>Back to Feed</span>
          </button>
        </div>

      </div>
    </div>
  );
}
