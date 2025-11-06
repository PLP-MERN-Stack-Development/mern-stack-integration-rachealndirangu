// server/controllers/postController.js
const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const category = req.query.category;
    const q = req.query.q;

    const filter = {};
    if (category) filter.category = category;
    if (q) filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
      { tags: { $regex: q, $options: 'i' } },
    ];

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ success: true, data: posts, meta: { total, page, limit } });
  } catch (err) { next(err); }
};

exports.getPost = async (req, res, next) => {
  try {
    const idOrSlug = req.params.id;
    const post = await Post.findOne({ $or: [{ _id: idOrSlug }, { slug: idOrSlug }] })
      .populate('author', 'name email')
      .populate('category', 'name');

    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

    post.incrementViewCount().catch(() => {});
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, category, tags, isPublished } = req.body;
    const post = new Post({
      title,
      content,
      excerpt,
      category,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      isPublished: !!isPublished,
      author: req.user._id,
      featuredImage: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (err) { next(err); }
};

exports.updatePost = async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (req.file) update.featuredImage = `/uploads/${req.file.filename}`;
    const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json({ success: true, data: {} });
  } catch (err) { next(err); }
};

exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    post.comments.push({ user: req.user._id, content });
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (err) { next(err); }
};

