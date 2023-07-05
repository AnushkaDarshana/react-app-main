import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loginImage from '../images/login.png';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', { username, password });
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
<div className='background-container'>
  <form onSubmit={handleSubmit} className='login-form'>
    <div className='form-image-container'>
      <img src={loginImage} alt="Login Image" className='form-image' />
    </div>
    <label className='form-label'>
      Email:
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='form-input' />
    </label>
    <label className='form-label'>
      Password:
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' />
    </label>
    <input type="submit" value="Login" className='submit-button' />
    <p className='form-link'>
      Create new account? <a href="/">Register</a>
    </p>
  </form>
</div>



  );
};

export default LoginForm;
