const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const materialController = require('../controllers/materialController');
const testController = require('../controllers/testController');

// ================== ADMIN AUTH ==================
router.post('/login', adminController.login);
router.post('/register', adminController.register); // optional, if you allow admin registration

// ================== USER MANAGEMENT ==================
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// ================== STUDY MATERIAL MANAGEMENT ==================
router.get('/materials', materialController.getAllMaterials); // list all materials
router.post('/materials', materialController.addMaterial);   // add new material
router.put('/materials/:id', materialController.updateMaterial); // update existing material
router.delete('/materials/:id', materialController.deleteMaterial); // delete material

// ================== TEST / QUIZ MANAGEMENT ==================
router.get('/tests', testController.getAllTests);
router.post('/tests', testController.addTest);
router.put('/tests/:id', testController.updateTest);
router.delete('/tests/:id', testController.deleteTest);

// ================== OTHERS ==================
// Add more admin-specific routes here if needed

module.exports = router;
