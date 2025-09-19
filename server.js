require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db'); // Sequelize connection

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const materialRoutes = require('./routes/materialRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();

// ------------------- MIDDLEWARE -------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve uploaded files (PDFs etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ------------------- ROUTES -------------------
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/tests', testRoutes);

// ------------------- DB CONNECTION -------------------
db.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('❌ DB connection failed:', err));

// Sync models (optional: { alter: true } for dev)
db.sync()
  .then(() => console.log('✅ All models synced with database'))
  .catch(err => console.error('❌ Model sync error:', err));

// ------------------- SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
