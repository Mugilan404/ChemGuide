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
        allowNull: false,
        validate: {
            notEmpty: true, // Ensures title is not empty
            len: [1, 255]   // Ensures title is between 1 and 255 characters
        }
    },
    category: {
        type: DataTypes.ENUM('PGTRB', 'Polytechnic TRB', 'Arts & Science TRB', 'SET'),
        allowNull: false,
        validate: {
            isIn: [['PGTRB', 'Polytechnic TRB', 'Arts & Science TRB', 'SET']] // Ensures valid category
        }
    },
    tag: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [1, 50]  // Ensures tag is between 1 and 50 characters (if provided)
        }
    },
    file_path: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,  // Ensures file path is not empty
            isUrl: true      // Optionally, you can validate that file_path is a valid URL (if storing URL paths)
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'materials',
    timestamps: false,  // Disable Sequelize's automatic createdAt and updatedAt fields
    hooks: {
        beforeCreate: (material, options) => {
            // You can add additional pre-processing logic before creating a new material
            // e.g., normalizing the file path or title, etc.
        },
        beforeUpdate: (material, options) => {
            // Similar hook for updates, if needed
        }
    }
});

module.exports = Material;
