// client/src/pages/PostForm.jsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('content', content);
      form.append('excerpt', excerpt);
      form.append('category', category);
      if (file) form.append('featuredImage', file);
      const res = await api.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' }});
      navigate(`/posts/${res.data.data.slug}`);
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required /></div>
      <div><textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required /></div>
      <div><input value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Excerpt" /></div>
      <div><input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category id" /></div>
      <div><input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" /></div>
      <button type="submit">Create</button>
    </form>
  );
}
