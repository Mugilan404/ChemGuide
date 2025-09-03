const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Sequelize connection

// Define Test model
const Test = db.define('Test', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    total_marks: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tests',
    timestamps: false
});

module.exports = Test;
