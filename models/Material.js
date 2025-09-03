const { DataTypes } = require('sequelize');
const db = require('../config/db'); // your Sequelize connection

// Define Material model
const Material = db.define('Material', {
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
    file_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'materials',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Material;
