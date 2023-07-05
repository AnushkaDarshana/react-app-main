import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/routes/login', { username, password });
      const token = response.data.token;
      // Save token to local storage
      localStorage.setItem('Token', token);
      // Reset the form fields
      setUsername('');
      setPassword('');
      // Redirect to the homepage
      navigate('/homepage');
    } catch (error) {
      console.error('Error:', error.response.data.message);
      toast.error('Incorrect username or password', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
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
