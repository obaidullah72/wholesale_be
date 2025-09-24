const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addProduct);
router.get('/', protect, getProducts);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;