const express = require('express');
const { addCustomer, getCustomers /* add update/delete */ } = require('../controllers/customerController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addCustomer);
router.get('/', protect, getCustomers);
// Add put/delete

module.exports = router;