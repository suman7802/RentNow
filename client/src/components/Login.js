import axios from 'axios';
import React, {useState} from 'react';

export default function Login({
  uri,
  setHaveAccount,
  setLogin,
  setNotifications,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  function handleUserName(value) {
    setEmail(value);
  }

  function handlePassword(value) {
    setPassword(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${uri}/user/login`, {email, password});
      if (response.data.status === 200) {
        setLogin(true);
        setNotifications(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 404) setNotifications('user not found');
      if (error.response.status === 401) setNotifications('wrong password');
      console.error('An error occurred:', error);
    }
  }

  return (
    <div className="login">
      <form className="login-form">
        <input
          type="text"
          value={email}
          onChange={(e) => handleUserName(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <p>
          Don't have an account?{' '}
          <span
            className="register-link"
            onClick={() => setHaveAccount((e) => !e)}>
            Register now
          </span>
        </p>
      </form>
    </div>
  );
}
