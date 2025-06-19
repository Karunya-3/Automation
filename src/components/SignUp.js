import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    
    // Frontend validation
    if (!name || !email || !password || !confirmPass) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPass) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://automation-backend-sx6l.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Signup failed');
        return;
      }
      
      // Success
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPass('');
      setError('');
      
      // Show success message or redirect
      alert('Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="container my-5"
      style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 20 }}
    >
      <form onSubmit={onSubmit} style={{ maxWidth: 400 }} className="mx-auto text-dark">
        <div className="mb-3">
          <label htmlFor="signupName" className="form-label fw-semibold">
            Name<span className="text-danger">*</span>
          </label>
          <input
            id="signupName"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signupEmail" className="form-label fw-semibold">
            Email<span className="text-danger">*</span>
          </label>
          <input
            id="signupEmail"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signupPassword" className="form-label fw-semibold">
            Password<span className="text-danger">*</span>
          </label>
          <input
            id="signupPassword"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password (min 6 characters)"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signupConfirmPassword" className="form-label fw-semibold">
            Confirm Password<span className="text-danger">*</span>
          </label>
          <input
            id="signupConfirmPassword"
            type="password"
            className="form-control"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
            placeholder="Confirm password"
            disabled={loading}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Creating Account...' : 'Signup'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;