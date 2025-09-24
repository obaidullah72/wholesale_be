const express = require('express');
const { getSalesReport, getProfitLoss, getBestSellingProducts, getExpiryAlerts } = require('../controllers/reportController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/sales', protect, getSalesReport);
router.get('/profit-loss', protect, getProfitLoss);
router.get('/best-selling', protect, getBestSellingProducts);
router.get('/expiry-alerts', protect, getExpiryAlerts);
// Add more routes for other reports

module.exports = router;