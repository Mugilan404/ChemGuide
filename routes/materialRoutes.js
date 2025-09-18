const express = require('express');
const multer = require('multer');
const path = require('path');
const materialController = require('../controllers/materialController');

const router = express.Router();

// Configure multer storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/assets/uploads'));
  },
  filename: function (req, file, cb) {
    // Rename file to include timestamp to avoid conflicts
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ 
  storage,
  fileFilter: function (req, file, cb) {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// ================== STUDY MATERIAL ROUTES ==================

// Get all study materials
router.get('/', materialController.getAllMaterials);

// Get a single study material by ID
router.get('/:id', materialController.getMaterialById);

// Add a new study material (admin only) with file upload handling
router.post('/', upload.single('file'), materialController.addMaterial);

// Update an existing study material (admin only)
router.put('/:id', upload.single('file'), materialController.updateMaterial);

// Delete a study material (admin only)
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
