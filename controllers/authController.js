const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ 
        status: 400, 
        message: 'All fields are required' 
      });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ 
        status: 400, 
        message: 'Username or email already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ 
      status: 201, 
      message: 'User created successfully' 
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400, 
      message: err.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ 
        status: 401, 
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      status: 200, 
      message: 'Login successful', 
      data: { token } 
    });
  } catch (err) {
    res.status(400).json({ 
      status: 400, 
      message: err.message 
    });
  }
};