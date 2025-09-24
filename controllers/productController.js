const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      status: 201,
      message: 'Product created successfully',
      data: product
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400, 
      message: err.message 
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('batches');
    res.json({
      status: 200,
      message: 'Products retrieved successfully',
      data: products
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: err.message 
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ 
      status: 404, 
      message: 'Product not found' 
    });
    res.json({
      status: 200,
      message: 'Product updated successfully',
      data: product
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400, 
      message: err.message 
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ 
      status: 404, 
      message: 'Product not found' 
    });
    res.json({ 
      status: 200, 
      message: 'Product deleted successfully' 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: err.message 
    });
  }
};