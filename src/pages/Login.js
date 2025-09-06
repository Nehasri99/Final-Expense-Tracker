import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { handleSuccess, handleError } from '../utils'; // Assuming you have this util
import { login } from '../services/apiService';
import '../index.css';

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError('Email and password are required');

    try {
      const data = await login(loginInfo);
      if (data.success) {
        handleSuccess(data.message);
        localStorage.setItem('token', data.jwtToken);
        localStorage.setItem('loggedInUser', data.name);
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={loginInfo.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={loginInfo.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Login;
