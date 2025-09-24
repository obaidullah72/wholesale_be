const Sale = require('../models/Sale');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Batch = require('../models/Batch');

exports.getSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query; // Format: YYYY-MM-DD
  try {
    const filter = {};
    if (startDate) filter.date = { $gte: new Date(startDate) };
    if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };

    const sales = await Sale.find(filter).populate('products.product');
    const totalSales = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

    res.json({
      status: 200,
      message: 'Sales report retrieved successfully',
      data: { sales, totalSales }
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: err.message 
    });
  }
};

exports.getProfitLoss = async (req, res) => {
  try {
    const sales = await Sale.find();
    const purchases = await Purchase.find();

    const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
    const totalCost = purchases.reduce((acc, pur) => acc + pur.totalAmount, 0);
    const profit = totalRevenue - totalCost;

    res.json({
      status: 200,
      message: 'Profit/Loss report retrieved successfully',
      data: { profit, totalRevenue, totalCost }
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: err.message 
    });
  }
};

exports.getBestSellingProducts = async (req, res) => {
  try {
    const sales = await Sale.find().populate('products.product');
    const productSales = {};

    sales.forEach(sale => {
      sale.products.forEach(item => {
        if (!productSales[item.product._id]) productSales[item.product._id] = { name: item.product.name, quantity: 0 };
        productSales[item.product._id].quantity += item.quantity;
      });
    });

    const sorted = Object.values(productSales).sort((a, b) => b.quantity - a.quantity);
    res.json({
      status: 200,
      message: 'Best selling products retrieved successfully',
      data: sorted
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: err.message 
    });
  }
};

exports.getExpiryAlerts = async (req, res) => {
  try {
    const nearExpiry = await Batch.find({ expiryDate: { $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } }).populate('product'); // Next 30 days
    res.json({
      status: 200,
      message: 'Expiry alerts retrieved successfully',
      data: nearExpiry
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: err.message 
    });
  }
};

// Add similar for vendor/customer reports, outstanding, etc.