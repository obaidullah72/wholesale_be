const express = require('express');
const { addVendor, getVendors /* add update/delete */ } = require('../controllers/vendorController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addVendor);
router.get('/', protect, getVendors);
// Add put/delete similarly

module.exports = router;