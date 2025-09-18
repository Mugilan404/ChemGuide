const { Sequelize } = require('sequelize');
require('dotenv').config();

// Destructuring to get the values from the .env file
const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_DIALECT = 'mysql',  // Default to 'mysql' if not provided
  DB_PORT = 3306,        // Default to 3306 if not provided
} = process.env;

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql',
  port: process.env.DB_PORT || 3306,
  logging: false,
});

// Authenticate and log the connection status
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });

module.exports = sequelize;
