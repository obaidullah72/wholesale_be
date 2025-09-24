const Purchase = require('../models/Purchase');
const Batch = require('../models/Batch');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

exports.stockIn = async (req, res) => {
  try {
    const { vendorId, products } = req.body; // products: [{productId, quantity, batchNumber, purchasePrice, expiryDate}]
    let totalAmount = 0;
    const purchaseProducts = [];

    for (let item of products) {
      const batch = new Batch({
        product: item.productId,
        batchNumber: item.batchNumber,
        quantity: item.quantity,
        purchasePrice: item.purchasePrice,
        expiryDate: item.expiryDate,
      });
      await batch.save();

      const product = await Product.findById(item.productId);
      product.stockQuantity += item.quantity;
      product.batches.push(batch._id);
      await product.save();

      purchaseProducts.push({
        product: item.productId,
        quantity: item.quantity,
        batchNumber: item.batchNumber,
        purchasePrice: item.purchasePrice,
        expiryDate: item.expiryDate,
      });
      totalAmount += item.quantity * item.purchasePrice;
    }

    const purchase = new Purchase({
      vendor: vendorId,
      products: purchaseProducts,
      totalAmount,
      invoiceNumber: `PUR-${Date.now()}`,
    });
    await purchase.save();

    const vendor = await Vendor.findById(vendorId);
    vendor.purchases.push(purchase._id);
    vendor.outstanding += totalAmount - (req.body.paidAmount || 0);
    await vendor.save();

    res.status(201).json({
      status: 201,
      message: 'Stock added successfully',
      data: purchase
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400, 
      message: err.message 
    });
  }
};

// For stockOut, it's handled in salesController (deduct stock on sale)