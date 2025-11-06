// server/controllers/categoryController.js
const Category = require('../models/Category');

exports.getAll = async (req, res, next) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: cats });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ success: false, error: 'Category already exists' });
    const cat = await Category.create({ name });
    res.status(201).json({ success: true, data: cat });
  } catch (err) { next(err); }
};
