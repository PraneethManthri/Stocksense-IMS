import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // All good — save user info and navigate to dashboard
    localStorage.setItem('ss_user', JSON.stringify({ name: form.name, email: form.email }));
    navigate('/dashboard');
  };

  return (
    <div className="signup-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#2563EB" fillOpacity="0.1"/>
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

      {/* Main */}
      <div className="signup-main">
        {/* Left panel */}
        <div className="signup-left">
          <h1 className="left-heading">
            Create Your<br />
            <span className="left-heading-blue">Account</span>
          </h1>
          <p className="left-sub">Join StockSense and manage your inventory smartly.</p>

          <ul className="feature-list">
            <li className="feature-item">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div>
                <strong>Track Inventory</strong>
                <p>Monitor stock in real-time</p>
              </div>
            </li>
            <li className="feature-item">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <div>
                <strong>Improve Efficiency</strong>
                <p>Reduce stockouts and overstock</p>
              </div>
            </li>
            <li className="feature-item">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div>
                <strong>Secure &amp; Reliable</strong>
                <p>Your data is always protected</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Card */}
        <div className="signup-card">
          <div className="card-logo">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <rect width="52" height="52" rx="12" fill="#EFF6FF"/>
              <path d="M26 8L42 16V32L26 40L10 32V16L26 8Z" fill="#2563EB" opacity="0.25"/>
              <path d="M26 8L42 16L26 24L10 16L26 8Z" fill="#2563EB"/>
              <path d="M10 16L26 24V40L10 32V16Z" fill="#1d4ed8"/>
              <path d="M42 16L26 24V40L42 32V16Z" fill="#3b82f6"/>
            </svg>
          </div>
          <h2 className="card-title">
            <span className="title-black">Stock</span><span className="title-blue">Sense</span>
          </h2>
          <p className="card-subtitle">Create your account</p>

          <form onSubmit={handleSubmit} className="signup-form">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input id="name" name="name" type="text" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <input id="email" name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={form.password} onChange={handleChange} required />
                <button type="button" className="eye-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPassword
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input id="confirm" name="confirm" type={showConfirm ? 'text' : 'password'} placeholder="Confirm your password" value={form.confirm} onChange={handleChange} required />
                <button type="button" className="eye-toggle" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle confirm password">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showConfirm
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" className="signup-btn">Sign Up</button>
            {error && <p className="signup-error">{error}</p>}
          </form>

          <div className="divider">
            <span className="divider-line" />
            <span className="divider-text">OR</span>
            <span className="divider-line" />
          </div>

          <p className="login-text">
            Already have an account?{' '}
            <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>

        {/* Right spacer (background handles illustration) */}
        <div className="signup-right" />
      </div>
    </div>
  );
}
