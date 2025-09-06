import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils'; // Assuming you have this util
import { signup } from '../services/apiService';
import '../index.css';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) return handleError('All fields are required');

    try {
      const data = await signup(signupInfo);
      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (err) {
        handleError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={signupInfo.name} onChange={handleChange} placeholder="Enter your name" required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={signupInfo.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={signupInfo.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;