const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String },
  taxId: { type: String },
  outstanding: { type: Number, default: 0 },
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],
});

module.exports = mongoose.model('Vendor', vendorSchema);