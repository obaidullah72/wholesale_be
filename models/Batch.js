const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  batchNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  purchasePrice: { type: Number, required: true },
});

module.exports = mongoose.model('Batch', batchSchema);