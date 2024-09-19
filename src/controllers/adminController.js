const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

//register
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'user already exist' });

    user = new User({ name, email, password, role: 'admin' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ msg: 'server Error' });
  }
};


// login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      const payload = { admin: { id: admin.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // get admin profile
  exports.getAdminProfile = async (req, res) => {
    try {
      const admin = await Admin.findById(req.admin.id).select('-password');
      res.json(admin);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
