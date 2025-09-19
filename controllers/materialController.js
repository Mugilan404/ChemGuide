const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Material = require('../models/Material');

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  },
});

// Middleware for single file upload
exports.uploadMaterial = upload.single('file');

// ================== ADD MATERIAL ==================
exports.addMaterial = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { title, category, tag } = req.body;
  if (!title || !category || !tag) {
    return res.status(400).json({ error: 'Title, category, and tag are required.' });
  }

  try {
    const material = await Material.create({
      title,
      category,
      tag,
      file_name: req.file.originalname,
      file_path: `/uploads/${req.file.filename}`,
      created_at: new Date(),
    });

    res.status(201).json({
      message: '✅ Material uploaded successfully!',
      materialId: material.id,
      fileUrl: material.file_path,
    });
  } catch (err) {
    console.error('Error saving material:', err);
    res.status(500).json({ error: 'Failed to save material.' });
  }
};

// ================== UPDATE MATERIAL ==================
exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, tag } = req.body;

    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    material.title = title || material.title;
    material.category = category || material.category;
    material.tag = tag || material.tag;

    await material.save();
    res.json({ message: '✅ Material updated successfully', material });
  } catch (err) {
    console.error('Error updating material:', err);
    res.status(500).json({ error: 'Failed to update material.' });
  }
};

// ================== GET ALL ==================
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ error: 'Failed to fetch materials.' });
  }
};

// ================== GET BY ID ==================
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findByPk(req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json(material);
  } catch (err) {
    console.error('Error fetching material by ID:', err);
    res.status(500).json({ error: 'Failed to fetch material.' });
  }
};

// ================== DELETE ==================
exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    // Delete file from disk
    const filePath = path.join(__dirname, '..', material.file_path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await material.destroy();
    res.json({ message: '🗑️ Material deleted successfully' });
  } catch (err) {
    console.error('Error deleting material:', err);
    res.status(500).json({ error: 'Failed to delete material.' });
  }
};
