const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ================== USER AUTH ==================

// User registration
router.post('/register', authController.registerUser);

// User login
router.post('/login', authController.loginUser);

// ================== ADMIN AUTH ==================

// Admin login
router.post('/admin/login', authController.loginAdmin);

// Admin registration (optional)
router.post('/admin/register', authController.registerAdmin);

module.exports = router;
