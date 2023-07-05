import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/routes/register', { username, password })
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Username Already Exists', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles['register-form']}>
      <label className={styles['form-label']}>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles['form-input']}
        />
      </label>
      <label className={styles['form-label']}>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles['form-input']}
        />
      </label>
      <input type="submit" value="Submit" className={styles['submit-button']} />
    </form>
  );
}

export default RegistrationForm;
