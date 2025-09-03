const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Sequelize connection
const User = require('./User');
const Test = require('./Test');

// Define Result model
const Result = db.define('Result', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Test,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answers: {
        type: DataTypes.TEXT, // store JSON string of answers
        allowNull: true
    },
    submitted_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'results',
    timestamps: false
});

// Associations
Result.belongsTo(User, { foreignKey: 'user_id' });
Result.belongsTo(Test, { foreignKey: 'test_id' });

module.exports = Result;
