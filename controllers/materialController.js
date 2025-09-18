const db = require('../models');
const multer = require('multer');
const path = require('path');

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),  // Store the file in memory
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  }
});

// Middleware to handle file upload
exports.uploadMaterial = upload.single('file');

// Add material to database
exports.addMaterial = async (req, res) => {
  // Check if a file is provided
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Destructure the fields from the body
  const { title, category, tag } = req.body;

  // Check if required fields are provided
  if (!title || !category || !tag) {
    return res.status(400).json({ error: 'Title, category, and tag are required.' });
  }

  try {
    // Save the PDF file data directly as BLOB in the database
    const material = await db.Material.create({
      title,
      category,
      tag,
      file_name: req.file.originalname, // Store the original file name
      file_data: req.file.buffer,       // Store the binary file data (BLOB)
      created_at: new Date(),           // This will be set to current timestamp by default
    });

    res.status(201).json({
      message: 'Material uploaded successfully!',
      materialId: material.id,
    });
  } catch (err) {
    console.error('Error saving material to database:', err);
    res.status(500).json({ error: 'Failed to save material to database.' });
  }
};

// ================== UPDATE MATERIAL ==================
exports.updateMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;  // Get ID from the URL
    const { title, category, tag } = req.body;  // Get new data from the request body

    // Find the material in the database
    const material = await Material.findByPk(materialId);

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    // Update the material with new values
    material.title = title || material.title;  // Update only if new value is provided
    material.category = category || material.category;
    material.tag = tag || material.tag;

    // Save the updated material
    await material.save();

    return res.json({ message: 'Material updated successfully', material });
  } catch (error) {
    console.error('Error updating material:', error);
    return res.status(500).json({ error: 'Failed to update material' });
  }
};

// Get all materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await db.findAll();
    res.status(200).json(materials);
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ error: 'Failed to fetch materials.' });
  }
};

// Get material by ID
exports.getMaterialById = async (req, res) => {
  try {
    const material = await db.findByPk(req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (err) {
    console.error('Error fetching material by ID:', err);
    res.status(500).json({ error: 'Failed to fetch material.' });
  }
};

// Delete material by ID
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await db.findByPk(req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    await material.destroy();
    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (err) {
    console.error('Error deleting material:', err);
    res.status(500).json({ error: 'Failed to delete material.' });
  }
};
