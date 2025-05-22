import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    alert(`Logged in successfully as ${email}`);
    setEmail('');
    setPassword('');
    setError('');
    navigate('/');
  }

  return (
    <div
      className="container my-5"
      style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 20 }}
    >
      <form onSubmit={onSubmit} style={{ maxWidth: 400 }} className="mx-auto text-dark">
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label fw-semibold">
            Email<span className="text-danger">*</span>
          </label>
          <input
            id="loginEmail"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label fw-semibold">
            Password<span className="text-danger">*</span>
          </label>
          <input
            id="loginPassword"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;