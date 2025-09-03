const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// ================== STUDY MATERIAL ROUTES ==================

// Get all study materials
router.get('/', materialController.getAllMaterials);

// Get a single study material by ID
router.get('/:id', materialController.getMaterialById);

// Add a new study material (admin only)
router.post('/', materialController.addMaterial);

// Update an existing study material (admin only)
router.put('/:id', materialController.updateMaterial);

// Delete a study material (admin only)
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
