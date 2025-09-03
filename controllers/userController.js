const db = require('../config/db');

// ================== USER DASHBOARD / PROFILE ==================

// Get user profile by ID
exports.getUserProfile = (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT id, username, email, created_at FROM users WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(results[0]);
    });
};

// Update user profile
exports.updateUserProfile = (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    db.query(sql, [username, email, userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to update profile" });
        if (results.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "Profile updated successfully" });
    });
};

// ================== STUDY MATERIALS ==================

// Get all available study materials for user
exports.getAvailableMaterials = (req, res) => {
    const sql = "SELECT id, title, description, file_name FROM materials ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    });
};

// ================== TESTS / QUIZZES ==================

// Get all available tests for user
exports.getAvailableTests = (req, res) => {
    const sql = "SELECT id, title, description, total_marks FROM tests ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    });
};

// Submit test results
exports.submitTestResults = (req, res) => {
    const userId = req.body.userId; // or get from JWT
    const testId = req.params.testId;
    const { score, answers } = req.body; // `answers` can be stored as JSON string

    const sql = "INSERT INTO results (user_id, test_id, score, answers, submitted_at) VALUES (?, ?, ?, ?, NOW())";
    db.query(sql, [userId, testId, score, JSON.stringify(answers)], (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to submit test results" });
        res.status(201).json({ message: "Test submitted successfully", resultId: results.insertId });
    });
};
