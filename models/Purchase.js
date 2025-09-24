const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    batchNumber: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
  }],
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  invoiceNumber: { type: String, unique: true }, // Auto-generate in controller
});

module.exports = mongoose.model('Purchase', purchaseSchema);