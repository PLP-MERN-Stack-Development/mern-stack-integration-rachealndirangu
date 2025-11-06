// server/routes/categories.js
const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

router.get('/', getAll);
router.post('/', protect, create);

module.exports = router;
