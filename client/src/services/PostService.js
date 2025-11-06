// client/src/services/PostService.js
import api from './api';

const postService = {
  // Fetch all posts (optionally with pagination)
  getAllPosts: async (page = 1, limit = 10) => {
    const res = await api.get(`/posts?page=${page}&limit=${limit}`);
    return res.data;
  },

  // Fetch a single post by ID or slug
  getPost: async (idOrSlug) => {
    const res = await api.get(`/posts/${idOrSlug}`);
    return res.data;
  },

  // Create a new post (for PostForm.jsx)
  createPost: async (formData) => {
    const res = await api.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  // Update a post (optional for later)
  updatePost: async (id, data) => {
    const res = await api.put(`/posts/${id}`, data);
    return res.data;
  },

  // Delete a post (optional for later)
  deletePost: async (id) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  },
};

export default postService;
