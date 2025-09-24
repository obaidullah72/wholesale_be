const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String, required: true }, // e.g., '500ml'
  category: { type: String, enum: ['Soft Drinks', 'Juices', 'Water Bottles'], required: true },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  stockQuantity: { type: Number, default: 0 },
  batches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
});

module.exports = mongoose.model('Product', productSchema);