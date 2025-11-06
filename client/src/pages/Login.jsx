// client/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.success) navigate('/');
      else alert(res.error || 'Login failed');
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <div><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required /></div>
      <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required /></div>
      <button type="submit">Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </form>
  );
}
