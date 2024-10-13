import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'; // Import custom CSS for styling
import { apipath } from '../others/constant';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Correct the function name and ensure it receives the event object
  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading animation
console.log(apipath);
const appi=`${apipath}api/login`;
console.log(appi);
    try {
      const response = await axios.post(appi, { username, password });
      localStorage.setItem('token', response.data.token); // Store JWT token or session data
      setLoading(false);
      handleLogin(); // Update authentication state
        // Store JWT token and user_id in localStorage
    localStorage.setItem('token', response.data.token); // Store JWT token
    localStorage.setItem('user_id', response.data.user_id); // Store user_id
    
      navigate('/App'); // Redirect to the main app (App.js route)
    } catch (error) {
      setLoading(false); // Stop loading animation
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/images/backgrnd.png" alt="Login Illustration" className="login-image" />
        <div className="login-text-overlay">
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your account</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-logo">
          <img src="/images/vow_logo.png" alt="Logo" className="logo-image" />
        </div>
        <h2>LOGIN</h2>
        {error && <div className="error">{error}</div>}
        {/* Make sure the form calls handleLoginSubmit on submit */}
        <form onSubmit={handleLoginSubmit}>
          <div className="lform-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="lform-control linput-large" 
            />
          </div>
          <div className="lform-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="lform-control linput-large" 
            />
          </div>
          <button type="submit" className="lbtn lbtn-primary lbtn-small">
            {loading ? 'Loading data from server...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
