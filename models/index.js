const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};

// Import model
db.Material = require('./Material')(sequelize, DataTypes);  // Adjust path as needed

// Sync database models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
