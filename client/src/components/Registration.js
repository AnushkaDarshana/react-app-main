import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8080/routes/register', { username, password })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Username Already Exists', {
          position: toast.POSITION.TOP_CENTER, // Display the toast in the middle of the screen
          autoClose: 3000, // Close the toast after 3 seconds
          hideProgressBar: true, // Hide the progress bar
        });
      });
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
      <input type="submit" value="Submit" />
    </form>
  );
}

export default RegistrationForm;
