// client/src/pages/PostList.jsx
import React, { useEffect, useState } from 'react';
import  postService  from '../services/postService';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => { fetchPosts(); }, [page]);

  async function fetchPosts() {
    try {
      const res = await postService.getAllPosts(page, 10);
      setPosts(res.data);
    } catch (err) { console.error(err); }
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(p => (
        <article key={p._id} style={{ borderBottom: '1px solid #ddd', padding: 10 }}>
          <h2><Link to={`/posts/${p.slug}`}>{p.title}</Link></h2>
          <p>{p.excerpt}</p>
          <small>By {p.author?.name} • {new Date(p.createdAt).toLocaleDateString()}</small>
        </article>
      ))}
      <div style={{ marginTop: 10 }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span> Page {page} </span>
        <button disabled={posts.length < 10} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
