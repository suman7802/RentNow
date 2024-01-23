import axios from 'axios';
import React, {useState} from 'react';

export default function Register({uri, setHaveAccount, setNotifications}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  function handleEmail(value) {
    setEmail(value);
  }

  function handlePassword(value) {
    setPassword(value);
  }

  function handleFullName(value) {
    setFullName(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPasswordLength = 8;
    try {
      if (!emailRegex.test(email)) {
        return setNotifications('Please enter a valid email address');
      }

      if (password.length < minPasswordLength) {
        return setNotifications(
          `Password must be at least ${minPasswordLength} characters long`
        );
      }

      const response = await axios.post(`${uri}/user/register`, {
        email,
        password,
        fullName,
      });

      if (response.status === 201) {
        setNotifications('Registration successful');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      if (error?.response?.status === 400) {
        setNotifications('Please fill Registration form properly');
      } else if (error?.response?.status === 409) {
        setNotifications('User already exist');
      } else if (error.message === 'Network Error') {
        setNotifications('Network Error');
      }
    }
  }

  return (
    <div className="register">
      <form className="register-form">
        <input
          type="email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          placeholder="Password"
        />

        <input
          type="text"
          value={fullName}
          onChange={(e) => handleFullName(e.target.value)}
          placeholder="Full Name"
        />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>

        <p>
          Already have an account?{' '}
          <span
            className="login-link"
            onClick={() => setHaveAccount((e) => !e)}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
