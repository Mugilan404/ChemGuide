const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ================== USER DASHBOARD ==================

// Get user profile/dashboard info
router.get('/profile/:id', userController.getUserProfile);

// Update user profile
router.put('/profile/:id', userController.updateUserProfile);

// ================== STUDY MATERIALS ==================

// Get list of study materials for the user
router.get('/materials', userController.getAvailableMaterials);

// ================== TESTS / QUIZZES ==================

// Get list of tests available to the user
router.get('/tests', userController.getAvailableTests);

// Submit test results
router.post('/tests/:testId/submit', userController.submitTestResults);

module.exports = router;
