const db = require('../config/db');

// ================== GET ALL TESTS ==================
exports.getAllTests = (req, res) => {
    const sql = "SELECT * FROM tests ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    });
};

// ================== GET TEST BY ID ==================
exports.getTestById = (req, res) => {
    const testId = req.params.id;
    const sql = "SELECT * FROM tests WHERE id = ?";
    db.query(sql, [testId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "Test not found" });
        res.json(results[0]);
    });
};

// ================== ADD NEW TEST ==================
exports.addTest = (req, res) => {
    const { title, description, total_marks } = req.body;
    const sql = "INSERT INTO tests (title, description, total_marks, created_at) VALUES (?, ?, ?, NOW())";

    db.query(sql, [title, description, total_marks], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to add test" });
        res.status(201).json({ message: "Test added successfully", testId: results.insertId });
    });
};

// ================== UPDATE TEST ==================
exports.updateTest = (req, res) => {
    const testId = req.params.id;
    const { title, description, total_marks } = req.body;

    const sql = "UPDATE tests SET title = ?, description = ?, total_marks = ? WHERE id = ?";
    db.query(sql, [title, description, total_marks, testId], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to update test" });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Test not found" });
        res.json({ message: "Test updated successfully" });
    });
};

// ================== DELETE TEST ==================
exports.deleteTest = (req, res) => {
    const testId = req.params.id;

    const sql = "DELETE FROM tests WHERE id = ?";
    db.query(sql, [testId], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to delete test" });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Test not found" });
        res.json({ message: "Test deleted successfully" });
    });
};
