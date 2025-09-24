const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }, // Link to batch for expiry
  }],
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['Paid', 'Partial', 'Credit'], default: 'Credit' },
  date: { type: Date, default: Date.now },
  invoiceNumber: { type: String, unique: true }, // Auto-generate in controller
});

module.exports = mongoose.model('Sale', saleSchema);