import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', { username, password });
      const token = response.data.token;
      // Save the token to local storage or a state variable for later use
      console.log('Token:', token);
      // Reset the form fields
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
