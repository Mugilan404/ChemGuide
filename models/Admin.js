const { DataTypes } = require('sequelize');
const db = require('../config/db'); // your Sequelize connection

// Define Admin model
const Admin = db.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'admins',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Admin;
