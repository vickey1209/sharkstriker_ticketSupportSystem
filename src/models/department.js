const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  email: { type: String, required: true },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model('Department', DepartmentSchema);
