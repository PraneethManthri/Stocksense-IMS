import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const user = data.user || { name: data.name || email.split('@')[0], email };
      localStorage.setItem('ss_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to log in.');
    }
  };

  return (
    <div className="login-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="8" fill="#2563EB" opacity="0.1"/>
            <path d="M18 6L30 12V24L18 30L6 24V12L18 6Z" fill="#2563EB" opacity="0.3"/>
            <path d="M18 6L30 12L18 18L6 12L18 6Z" fill="#2563EB"/>
            <path d="M6 12L18 18V30L6 24V12Z" fill="#1d4ed8"/>
            <path d="M30 12L18 18V30L30 24V12Z" fill="#3b82f6"/>
          </svg>
          <span className="logo-text"><span className="logo-bold">Stock</span><span className="logo-blue">Sense</span></span>
        </div>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      {/* Background */}
      <div className="login-bg">
        <div className="bg-shelves" />
        <div className="bg-forklift" />

        {/* Login Card */}
        <div className="login-card">
          {/* Card Logo */}
          <div className="card-logo">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="52" height="52" rx="12" fill="#EFF6FF"/>
              <path d="M26 8L42 16V32L26 40L10 32V16L26 8Z" fill="#2563EB" opacity="0.25"/>
              <path d="M26 8L42 16L26 24L10 16L26 8Z" fill="#2563EB"/>
              <path d="M10 16L26 24V40L10 32V16Z" fill="#1d4ed8"/>
              <path d="M42 16L26 24V40L42 32V16Z" fill="#3b82f6"/>
            </svg>
          </div>

          <h1 className="card-title">
            <span className="title-black">Stock</span><span className="title-blue">Sense</span>
          </h1>
          <p className="card-subtitle">Inventory Management System</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="signup-error" style={{ marginTop: '12px' }}>{error}</p>}
            <button type="submit" className="login-btn">Login</button>
          </form>

          <Link to="/verify-otp" className="forgot-link">Forgot Password?</Link>

          <div className="divider">
            <span className="divider-line" />
            <span className="divider-text">OR</span>
            <span className="divider-line" />
          </div>

          <button type="button" className="google-btn" onClick={() => navigate('/dashboard')}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.4 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.7 7.2 29.1 5 24 5 13 5 4 14 4 25s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.7 7.2 29.1 5 24 5 16.3 5 9.7 9.1 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 45c5 0 9.6-1.9 13-5l-6-5.2C29.2 36.6 26.7 37.5 24 37.5c-5.2 0-9.6-3.5-11.2-8.3l-6.5 5C9.6 41 16.3 45 24 45z"/>
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.8l6 5.2C41.2 36.3 44 31 44 25c0-1.3-.1-2.6-.4-3.9z"/>
            </svg>
            Continue to dashboard
          </button>

          <p className="signup-text">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
