const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/materialController.js');

// Routes for materials
router.post('/', MaterialController.uploadMaterial, MaterialController.addMaterial);
router.get('/', MaterialController.getAllMaterials);
router.get('/:id', MaterialController.getMaterialById);
router.delete('/:id', MaterialController.deleteMaterial);

module.exports = router;
