import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPassword2, setRegPassword2] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const showSignIn = () => {
    setIsSignIn(true);
    setRegError('');
    setRegSuccess('');
  };

  const showSignUp = () => {
    setIsSignIn(false);
    setLoginError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await login(loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (regPassword !== regPassword2) {
      setRegError('Passwords do not match.');
      return;
    }

    setRegLoading(true);

    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await register(fullName, regEmail, regPassword, regPassword2);
      setRegSuccess('Account created successfully! Please check your email to verify your account.');
    } catch (err) {
      setRegError(err.message);
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <main className="wrap">
      <section className="grid">
        {/* Left: info / CTA */}
        <aside className="glass promo" aria-labelledby="promo-title">
          <div>
            <h2 id="promo-title">{isSignIn ? 'Welcome back!' : 'New here?'}</h2>
            <p>
              {isSignIn
                ? 'Sign in to access your account and continue where you left off.'
                : 'Create an account to sync your data and access all features.'
              }
            </p>
            <div className="cta">
              <button
                className="btn ghost"
                onClick={isSignIn ? showSignUp : showSignIn}
                aria-controls={isSignIn ? "signupForm" : "signinForm"}
              >
                {isSignIn ? 'Create account' : 'Sign in'}
              </button>
            </div>
          </div>
          <p className="fineprint">
            By continuing, you agree to our{' '}
            <button className="muted-link" onClick={() => alert('Terms of Service')}>Terms</button> and{' '}
            <button className="muted-link" onClick={() => alert('Privacy Policy')}>Privacy Policy</button>.
          </p>
        </aside>

        {/* Right: auth card */}
        <section className="glass auth" aria-labelledby="auth-title">
          <div className="tabs" role="tablist" aria-label="Authentication">
            <button
              className={`tab ${isSignIn ? 'active' : ''}`}
              onClick={showSignIn}
              role="tab"
              aria-selected={isSignIn}
              aria-controls="signinForm"
            >
              Sign In
            </button>
            <button
              className={`tab ${!isSignIn ? 'active' : ''}`}
              onClick={showSignUp}
              role="tab"
              aria-selected={!isSignIn}
              aria-controls="signupForm"
            >
              Sign Up
            </button>
          </div>

          <h3 id="auth-title">{isSignIn ? 'SIGN IN' : 'SIGN UP'}</h3>

          {/* Sign In Form */}
          <form
            id="signinForm"
            className={isSignIn ? '' : 'hidden'}
            onSubmit={handleLoginSubmit}
            autoComplete="on"
          >
            {loginError && (
              <div className="error-message" style={{color: '#ef4444', marginBottom: '16px', padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)'}}>
                {loginError}
              </div>
            )}

            <div className="field">
              <label htmlFor="loginEmail">Email</label>
              <input
                id="loginEmail"
                className="input"
                type="email"
                placeholder="you@example.com"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <span className="icon-right" aria-hidden="true" title="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" opacity=".75"/>
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </span>
            </div>

            <div className="field">
              <label htmlFor="loginPassword">Password</label>
              <input
                id="loginPassword"
                className="input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button
                type="button"
                className="icon-right"
                aria-label="Show or hide password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>

            <div className="actions">
              <button className="muted-link" onClick={() => alert('Forgot password functionality coming soon!')}>Forgot Password?</button>
              <button className="btn" type="submit" disabled={loginLoading}>
                {loginLoading ? 'Signing in...' : 'Log in'}
              </button>
            </div>
          </form>

          {/* Sign Up Form */}
          <form
            id="signupForm"
            className={isSignIn ? 'hidden' : ''}
            onSubmit={handleRegisterSubmit}
            autoComplete="on"
          >
            {regError && (
              <div className="error-message" style={{color: '#ef4444', marginBottom: '16px', padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)'}}>
                {regError}
              </div>
            )}

            {regSuccess && (
              <div className="success-message" style={{color: '#10b981', marginBottom: '16px', padding: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)'}}>
                {regSuccess}
              </div>
            )}

            <div className="row">
              <div className="field" style={{flex:1}}>
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  className="input"
                  type="text"
                  placeholder="Jane"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="field" style={{flex:1}}>
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  className="input"
                  type="text"
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="regEmail">Email</label>
              <input
                id="regEmail"
                className="input"
                type="email"
                placeholder="you@example.com"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="regPassword">Password</label>
              <input
                id="regPassword"
                className="input"
                type={showPassword ? 'text' : 'password'}
                minLength="8"
                placeholder="Min. 8 characters"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              <button
                type="button"
                className="icon-right"
                aria-label="Show or hide password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>

            <div className="field">
              <label htmlFor="regPassword2">Confirm password</label>
              <input
                id="regPassword2"
                className="input"
                type={showConfirmPassword ? 'text' : 'password'}
                minLength="8"
                placeholder="Repeat password"
                required
                value={regPassword2}
                onChange={(e) => setRegPassword2(e.target.value)}
              />
              <button
                type="button"
                className="icon-right"
                aria-label="Show or hide password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>

            <button className="btn full" type="submit" disabled={regLoading}>
              {regLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
};

export default Auth;