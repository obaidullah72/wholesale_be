const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String },
  outstanding: { type: Number, default: 0 },
  sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],
});

module.exports = mongoose.model('Customer', customerSchema);