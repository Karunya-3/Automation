import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPass) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPass) {
      setError('Passwords do not match');
      return;
    }
    alert(`Signup successful for ${name} (${email})`);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPass('');
    setError('');
    navigate('/login');
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
            placeholder="Enter password"
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
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
      </form>
    </div>
  );
}
export default SignUp;