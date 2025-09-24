const express = require('express');
const { stockIn } = require('../controllers/stockController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/in', protect, stockIn);
// Add stockOut if separate from sales

module.exports = router;