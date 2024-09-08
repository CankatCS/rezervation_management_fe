import './Login.css'; 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // To track successful login
  const navigate = useNavigate(); // To redirect upon success

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });
      
      // Handle successful login
      if (response.status === 200) {
        setSuccess(true); // Update success state
        setError(''); // Clear any errors
        // You can redirect to a different page, e.g., dashboard
        navigate('/dashboard'); // Redirect to dashboard (configure this route)
      }
    } catch (error) {
      setSuccess(false); // Reset success
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Login successful!</p>}
    </div>
  );
};

export default Login;