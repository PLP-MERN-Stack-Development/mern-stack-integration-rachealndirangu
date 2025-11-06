// client/src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password });
      if (res.success) navigate('/');
      else alert(res.error || 'Registration failed');
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <div><input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required /></div>
      <div><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required /></div>
      <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required /></div>
      <button type="submit">Register</button>
    </form>
  );
}
