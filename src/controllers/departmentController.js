const Department = require('../models/departmentModel');

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching departments' });
  }
};

exports.addDepartment = async (req, res) => {
  const { name, description, email, admins, hidden } = req.body;
  try {
    const newDepartment = new Department({
      name,
      description,
      email,
      admins,
      hidden,
    });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(500).json({ message: 'Error adding department' });
  }
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, description, email, admins, hidden } = req.body;
  try {
    const department = await Department.findByIdAndUpdate(id, {
      name,
      description,
      email,
      admins,
      hidden,
    }, { new: true });
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: 'Error updating department' });
  }
};

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting department' });
  }
};
