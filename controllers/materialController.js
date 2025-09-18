const path = require('path');
const fs = require('fs');
const db = require('../config/db');
const multer = require('multer');

// Multer storage: save file with original name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/assets/uploads'));
  },
  filename: (req, file, cb) => {
    // Use original name temporarily, we'll rename it later to ensure no conflicts
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files allowed'));
    }
    cb(null, true);
  }
});

exports.uploadMaterial = upload.single('file');

// ================== ADD NEW MATERIAL ==================
exports.addMaterial = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  const { title, category, tag } = req.body;
  if (!title || !category || !tag) {
    return res.status(400).json({ error: 'Title, category, and tag are required.' });
  }

  const uploadDir = path.join(__dirname, '../public/assets/uploads');
  const fileExt = path.extname(req.file.originalname);
  const newFilename = req.file.originalname; // Use the original filename directly

  const oldPath = path.join(uploadDir, req.file.filename);  // multer saved with original name
  const newPath = path.join(uploadDir, newFilename);

  // Delete file if it exists to overwrite
  if (fs.existsSync(newPath)) {
    fs.unlinkSync(newPath);
  }

  // Rename after multer upload
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error('Error renaming file:', err);
      return res.status(500).json({ error: 'Failed to process uploaded file.' });
    }

    // Insert into DB with new filename
    const sql = `
      INSERT INTO materials (title, category, tag, file_name, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(sql, [title, category, tag, newFilename], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save material to database.' });
      }

      res.status(201).json({
        message: 'Material uploaded successfully!',
        materialId: results.insertId
      });
    });
  });
};

// ================== GET ALL MATERIALS ==================
exports.getAllMaterials = (req, res) => {
  const sql = "SELECT * FROM materials ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json(results);
  });
};

// ================== GET MATERIAL BY ID ==================
exports.getMaterialById = (req, res) => {
  const materialId = req.params.id;
  const sql = "SELECT * FROM materials WHERE id = ?";
  db.query(sql, [materialId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0) return res.status(404).json({ error: "Material not found" });

    res.json(results[0]);
  });
};

// ================== UPDATE MATERIAL ==================
exports.updateMaterial = (req, res) => {
  const materialId = req.params.id;
  const { title, category, tag } = req.body;
  const file = req.file;

  // Fetch current file to delete if replaced
  const getSql = "SELECT file_name FROM materials WHERE id = ?";
  db.query(getSql, [materialId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Material not found" });

    const oldFile = results[0].file_name;
    let newFileName = oldFile;

    const uploadDir = path.join(__dirname, '../public/assets/uploads');

    if (file) {
      // Use the original filename (no sanitization)
      const fileExt = path.extname(file.originalname);
      newFileName = file.originalname; // Use the original filename from the uploaded file
      const oldPath = path.join(uploadDir, file.filename);
      const newPath = path.join(uploadDir, newFileName);

      if (fs.existsSync(newPath)) {
        fs.unlinkSync(newPath);
      }

      try {
        fs.renameSync(oldPath, newPath);
      } catch (renameErr) {
        console.error('Error renaming file during update:', renameErr);
        return res.status(500).json({ error: 'Failed to process uploaded file.' });
      }

      // Delete old file from server
      const oldFilePath = path.join(uploadDir, oldFile);
      if (oldFile && fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update DB record
    const updateSql = "UPDATE materials SET title = ?, category = ?, tag = ?, file_name = ? WHERE id = ?";
    db.query(updateSql, [title, category, tag, newFileName, materialId], (err2) => {
      if (err2) return res.status(500).json({ error: "Failed to update material" });

      res.json({ message: "Material updated successfully" });
    });
  });
};

// ================== DELETE MATERIAL ==================
exports.deleteMaterial = (req, res) => {
  const materialId = req.params.id;

  const getSql = "SELECT file_name FROM materials WHERE id = ?";
  db.query(getSql, [materialId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Material not found" });

    const fileName = results[0].file_name;
    const filePath = path.join(__dirname, '../public/assets/uploads', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const deleteSql = "DELETE FROM materials WHERE id = ?";
    db.query(deleteSql, [materialId], (err2) => {
      if (err2) return res.status(500).json({ error: "Failed to delete material" });

      res.json({ message: "Material deleted successfully" });
    });
  });
};
