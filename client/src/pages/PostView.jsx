// client/src/pages/PostView.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  postService  from '../services/postService';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => { load(); }, [id]);
  async function load() {
    try {
      const res = await postService.getPost(id);
      setPost(res.data);
    } catch (err) { console.error(err); }
  }
  if (!post) return <div>Loading...</div>;
  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author?.name}</p>
      {post.featuredImage && <img src={post.featuredImage} alt={post.title} style={{ maxWidth: 600 }} />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <section>
        <h3>Comments</h3>
        {post.comments.map(c => (
          <div key={c._id}>
            <small>{c.user?.name || 'User'} · {new Date(c.createdAt).toLocaleString()}</small>
            <p>{c.content}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
