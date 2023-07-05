import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import registerImage from '../images/register.png';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8080/users/register', { username, password })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Username Already Exists', {
          position: toast.POSITION.TOP_CENTER, // Display the toast in the middle of the screen
          autoClose: 1500, // Close the toast after 1.5 seconds
          hideProgressBar: true, // Hide the progress bar
        });
      });
  };

  return (
<div className='background-container'>
  <form onSubmit={handleSubmit} className='register-form'>
    <div className='form-image-container'>
      <img src={registerImage} alt="Login Image" className='form-image' />
    </div>
    <label className='form-label'>
      Email:
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='form-input' />
    </label>
    <label className='form-label'>
      Password:
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' />
    </label>
    <input type="submit" value="Register" className='submit-button' />
    <p className='form-link'>
      Already have an account? <a href="./login">Login</a>
    </p>
  </form>
</div>

  );
}

export default RegistrationForm;
