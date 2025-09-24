const Vendor = require('../models/Vendor');

exports.addVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json({
      status: 201,
      message: 'Vendor created successfully',
      data: vendor
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400, 
      message: err.message 
    });
  }
};

exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('purchases');
    res.json({
      status: 200,
      message: 'Vendors retrieved successfully',
      data: vendors
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: err.message 
    });
  }
};

// Similar for updateVendor, deleteVendor (copy pattern from productController)