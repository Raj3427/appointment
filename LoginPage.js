import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Replace with your actual API endpoint and logic
      const loginData = { email, password };
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();

        // Validate received data (consider additional checks for security)
        if (!data.hasOwnProperty('userType') || !data.hasOwnProperty('token')) {
          console.error('Invalid response format from login API');
          alert('Login failed. Please contact support.');
          return;
        }

        const { userType, token } = data;

        // Store the user data in local storage (consider secure storage options)
        localStorage.setItem('userType', userType);
        localStorage.setItem('token', token);

        // Redirect to the appropriate dashboard based on userType
        if (userType === 'doctor') {
          navigate('/doctor-dashboard');
        } else if (userType === 'patient') {
          navigate('/patient-dashboard');
        } else {
          console.error('Invalid user type in response');
          alert('Invalid user type. Please contact support.');
        }
      } else {
        console.error('Login failed:', response.statusText);
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;