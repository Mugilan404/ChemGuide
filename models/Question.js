const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Sequelize connection
const Test = require('./Test'); // Assuming Test model exists

// Define Question model
const Question = db.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    question_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    option_a: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_b: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_c: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    option_d: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    correct_option: {
        type: DataTypes.ENUM('A', 'B', 'C', 'D'),
        allowNull: false
    }
}, {
    tableName: 'questions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Association: Question belongs to Test
Question.belongsTo(Test, { foreignKey: 'test_id' });

module.exports = Question;
