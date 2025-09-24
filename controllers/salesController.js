const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Batch = require('../models/Batch');

exports.createSale = async (req, res) => {
  try {
    const { customerId, products, discount = 0 } = req.body; // products: [{productId, quantity}]
    let totalAmount = 0;
    const saleProducts = [];

    for (let item of products) {
      const product = await Product.findById(item.productId);
      if (product.stockQuantity < item.quantity) return res.status(400).json({ message: 'Insufficient stock' });

      // Find a batch (FIFO assumption; simplify by picking first batch)
      const batch = await Batch.findOne({ product: item.productId, quantity: { $gte: item.quantity } });
      if (!batch) return res.status(400).json({ message: 'No suitable batch' });

      batch.quantity -= item.quantity;
      await batch.save();

      product.stockQuantity -= item.quantity;
      await product.save();

      saleProducts.push({
        product: item.productId,
        quantity: item.quantity,
        sellingPrice: product.sellingPrice,
        batch: batch._id,
      });
      totalAmount += item.quantity * product.sellingPrice;
    }

    totalAmount -= discount;
    const paidAmount = req.body.paidAmount || 0;
    const paymentStatus = paidAmount >= totalAmount ? 'Paid' : paidAmount > 0 ? 'Partial' : 'Credit';

    const sale = new Sale({
      customer: customerId,
      products: saleProducts,
      totalAmount,
      discount,
      paidAmount,
      paymentStatus,
      invoiceNumber: `SAL-${Date.now()}`,
    });
    await sale.save();

    const customer = await Customer.findById(customerId);
    customer.sales.push(sale._id);
    customer.outstanding += totalAmount - paidAmount;
    await customer.save();

    // Low stock alert: Can check in frontend or add a separate endpoint

    res.status(201).json({
      status: 201,
      message: 'Sale created successfully',
      data: sale
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400, 
      message: err.message 
    });
  }
};