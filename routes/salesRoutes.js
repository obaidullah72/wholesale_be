const express = require('express');
const { createSale } = require('../controllers/salesController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createSale);

module.exports = router;