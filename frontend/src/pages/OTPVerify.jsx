import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OTPVerify.css';

const RESEND_SECONDS = 30;

export default function OTPVerify() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    if (timer === 0) { setCanResend(true); return; }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = [...otp];
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    const lastFilled = Math.min(pasted.length, 5);
    inputRefs.current[lastFilled]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setTimer(RESEND_SECONDS);
    setCanResend(false);
    inputRefs.current[0]?.focus();
    // TODO: call resend OTP API
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return;
    // TODO: verify OTP API call, then navigate
    navigate('/reset-password');
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="otp-page">
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
          <span className="logo-text">
            <span className="logo-bold">Stock</span>
            <span className="logo-blue">Sense</span>
          </span>
        </div>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      {/* Background */}
      <div className="otp-bg">
        {/* Envelope illustration */}
        <div className="envelope-wrap" aria-hidden="true">
          <div className="envelope">
            <svg width="110" height="88" viewBox="0 0 110 88" fill="none">
              <rect x="2" y="2" width="106" height="84" rx="10" fill="white" stroke="#2563eb" strokeWidth="3"/>
              <path d="M2 12L55 52L108 12" stroke="#2563eb" strokeWidth="3" fill="none"/>
              <line x1="2" y1="86" x2="40" y2="50" stroke="#2563eb" strokeWidth="2.5"/>
              <line x1="108" y1="86" x2="70" y2="50" stroke="#2563eb" strokeWidth="2.5"/>
            </svg>
            <div className="send-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </div>
          </div>
          <div className="speed-lines">
            <span/><span/><span/>
          </div>
        </div>

        {/* Card */}
        <div className="otp-card">
          <div className="card-logo">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <rect width="52" height="52" rx="12" fill="#EFF6FF"/>
              <path d="M26 8L42 16V32L26 40L10 32V16L26 8Z" fill="#2563EB" opacity="0.25"/>
              <path d="M26 8L42 16L26 24L10 16L26 8Z" fill="#2563EB"/>
              <path d="M10 16L26 24V40L10 32V16Z" fill="#1d4ed8"/>
              <path d="M42 16L26 24V40L42 32V16Z" fill="#3b82f6"/>
            </svg>
          </div>

          <h2 className="card-brand">
            <span className="title-black">Stock</span>
            <span className="title-blue">Sense</span>
          </h2>
          <h3 className="card-heading">Reset Password</h3>
          <p className="card-sub">Enter the 6-digit OTP sent to your email</p>

          {/* Email row */}
          <div className="email-row">
            <span className="email-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <span className="email-address">sathvik@example.com</span>
            <Link to="/forgot-password" className="change-link">Change</Link>
          </div>

          {/* OTP inputs */}
          <form onSubmit={handleSubmit} className="otp-form">
            <div className="otp-boxes" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`otp-box${digit ? ' filled' : ''}`}
                  aria-label={`OTP digit ${i + 1}`}
                />
              ))}
            </div>

            <button type="submit" className="verify-btn" disabled={otp.join('').length < 6}>
              Verify OTP
            </button>
          </form>

          <button
            className={`resend-btn${canResend ? ' active' : ''}`}
            onClick={handleResend}
            disabled={!canResend}
          >
            {canResend
              ? 'Resend OTP'
              : `Resend OTP (00:${pad(timer)})`}
          </button>
        </div>
      </div>
    </div>
  );
}
