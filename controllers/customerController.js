const Customer = require('../models/Customer');

exports.addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({
      status: 201,
      message: 'Customer created successfully',
      data: customer
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400, 
      message: err.message 
    });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('sales');
    res.json({
      status: 200,
      message: 'Customers retrieved successfully',
      data: customers
    });
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      message: err.message 
    });
  }
};

// Similar for updateCustomer, deleteCustomer