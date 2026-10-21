import React, { useState, useEffect } from 'react';

// ============================================================================
// Real Functional Register Component with original Lucide icons (user, mail, lock, arrow-left)
// ============================================================================

export default function Register({ onNavigate, setSuccessMessage }) {
  const [name, setName] = useState('');
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
      // POST http://localhost:5000/api/auth/register
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'user',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed. Please check your information.');
      }

      if (setSuccessMessage) {
        setSuccessMessage(`Account created for ${name}! Please log in with your credentials.`);
      }
      onNavigate('login');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1210] text-[#e8e6e0] font-sans flex items-center justify-center p-4 antialiased selection:bg-[#4dd8c4] selection:text-[#0d1210]">
      {/* Centered Card */}
      <div className="bg-[#141a17] border border-[#2a3330] border-t-2 border-t-[#4dd8c4]/40 rounded-md p-8 sm:p-10 max-w-md mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <button
            onClick={() => onNavigate('home')}
            className="font-heading font-bold text-3xl tracking-tight text-[#e8e6e0] hover:text-[#4dd8c4] transition-colors"
          >
            Vyralix
          </button>
          <p className="text-xs text-[#7a8580]">Create your creator account</p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-md flex items-center gap-2">
            <i data-lucide="alert-circle" className="w-4 h-4 flex-shrink-0" strokeWidth="1.5"></i>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Register Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#e8e6e0]">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7a8580]">
                <i data-lucide="user" className="w-4 h-4" strokeWidth="1.5"></i>
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivers"
                className="w-full bg-[#0d1210] border border-[#2a3330] rounded-md pl-9 pr-3 py-2 text-xs text-[#e8e6e0] placeholder-[#7a8580] focus:outline-none focus:border-[#4dd8c4] transition-colors"
              />
            </div>
          </div>

          {/* Email Address */}
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

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#e8e6e0]">Password</label>
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

          {/* Solid Teal Sign Up CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd8c4] text-[#0d1210] font-semibold text-xs py-2.5 rounded-md border-0 outline-none hover:bg-[#3ec4b1] transition-colors shadow-[0_0_12px_rgba(77,216,196,0.3)] mt-2 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Link to Login Page */}
        <div className="text-center text-xs text-[#7a8580] pt-2 border-t border-[#2a3330]">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-[#4dd8c4] font-medium hover:underline ml-1"
          >
            Log in
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
