const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const departmentController = require("../controllers/departmentController")
const auth = require("../middleware/auth")

// user routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/profile', auth, adminController.getAdminProfile);


// Department routes
router.post('/departments', auth, departmentController.addDepartment);
router.get('/departments', auth, departmentController.getDepartments);
router.put('/departments/:id', auth, departmentController.updateDepartment);
router.delete('/departments/:id', auth, departmentController.deleteDepartment);

module.exports = router;
