const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Sequelize connection

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
    category: {
        type: DataTypes.ENUM('PGTRB', 'Polytechnic TRB', 'Arts & Science TRB', 'SET'),
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    file_path: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'materials',
    timestamps: false // because your table doesn’t have updated_at
});

module.exports = Material;
