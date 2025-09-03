const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// ================== TEST / QUIZ ROUTES ==================

// Get all tests
router.get('/', testController.getAllTests);

// Get a single test by ID
router.get('/:id', testController.getTestById);

// Add a new test (admin only)
router.post('/', testController.addTest);

// Update an existing test (admin only)
router.put('/:id', testController.updateTest);

// Delete a test (admin only)
router.delete('/:id', testController.deleteTest);

module.exports = router;
