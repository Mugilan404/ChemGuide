const db = require('../config/db'); // Your database connection
const path = require('path');
const fs = require('fs');

// ================== GET ALL MATERIALS ==================
exports.getAllMaterials = (req, res) => {
    const sql = "SELECT * FROM materials ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database query failed" });
        }
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

// ================== ADD NEW MATERIAL ==================
exports.addMaterial = (req, res) => {
    const { title, description } = req.body;
    const file = req.file; // assuming you're using multer middleware

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const fileName = file.filename;
    const sql = "INSERT INTO materials (title, description, file_name, created_at) VALUES (?, ?, ?, NOW())";

    db.query(sql, [title, description, fileName], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to add material" });
        res.status(201).json({ message: "Material added successfully", materialId: results.insertId });
    });
};

// ================== UPDATE MATERIAL ==================
exports.updateMaterial = (req, res) => {
    const materialId = req.params.id;
    const { title, description } = req.body;
    const file = req.file;

    // Fetch current material to delete old file if replaced
    const getSql = "SELECT file_name FROM materials WHERE id = ?";
    db.query(getSql, [materialId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ error: "Material not found" });

        let oldFile = results[0].file_name;
        let newFile = oldFile;

        if (file) {
            newFile = file.filename;
            // Delete old file
            const oldPath = path.join(__dirname, '../public/assets/uploads', oldFile);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        const updateSql = "UPDATE materials SET title = ?, description = ?, file_name = ? WHERE id = ?";
        db.query(updateSql, [title, description, newFile, materialId], (err2) => {
            if (err2) return res.status(500).json({ error: "Failed to update material" });
            res.json({ message: "Material updated successfully" });
        });
    });
};

// ================== DELETE MATERIAL ==================
exports.deleteMaterial = (req, res) => {
    const materialId = req.params.id;

    // Fetch file name to delete from uploads
    const getSql = "SELECT file_name FROM materials WHERE id = ?";
    db.query(getSql, [materialId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ error: "Material not found" });

        const fileName = results[0].file_name;
        const filePath = path.join(__dirname, '../public/assets/uploads', fileName);

        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        const deleteSql = "DELETE FROM materials WHERE id = ?";
        db.query(deleteSql, [materialId], (err2) => {
            if (err2) return res.status(500).json({ error: "Failed to delete material" });
            res.json({ message: "Material deleted successfully" });
        });
    });
};
