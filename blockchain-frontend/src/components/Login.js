// components/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, let's just check if the username and password are not empty
    if (username !== '' && password !== '') {
      setLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {isLoggedIn ? (
        <p>You are already logged in.</p>
      ) : (
        <>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default Login;
