const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const materialController = require('../controllers/materialController');
const testController = require('../controllers/testController');

// ================== ADMIN AUTH ==================
// Admin login route
router.post('/login', adminController.login);

// Admin registration route (optional, if you allow admin registration)
router.post('/register', adminController.register); 

// Log the controller methods to ensure they're correctly loaded
console.log("Admin Controller Methods:", adminController);

// ================== USER MANAGEMENT ==================
// Fetch all users
router.get('/users', adminController.getAllUsers);

// Fetch a user by ID
router.get('/users/:id', adminController.getUserById);

// Update user details
router.put('/users/:id', adminController.updateUser);

// Delete a user
router.delete('/users/:id', adminController.deleteUser);

// ================== STUDY MATERIAL MANAGEMENT ==================
// Fetch all materials
router.get('/materials', materialController.getAllMaterials);

// Add new material
router.post('/materials', materialController.addMaterial);

// Update existing material
router.put('/materials/:id', materialController.updateMaterial);

// Delete material
router.delete('/materials/:id', materialController.deleteMaterial);

// ================== TEST / QUIZ MANAGEMENT ==================
// Fetch all tests
router.get('/tests', testController.getAllTests);

// Add new test
router.post('/tests', testController.addTest);

// Update an existing test
router.put('/tests/:id', testController.updateTest);

// Delete test
router.delete('/tests/:id', testController.deleteTest);

// ================== OTHERS ==================
// Add more admin-specific routes here if needed

module.exports = router;
