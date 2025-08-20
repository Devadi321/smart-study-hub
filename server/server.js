require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Your new line
const subjectRoutes = require('./routes/subjects');

const app = express();
const PORT = 3000;
const mongoURI = process.env.MONGO_URI;

// --- Middleware ---
app.use(cors()); // Your new line
app.use(express.json());

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('🎉 MongoDB Connected!');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

connectDB();

// --- Routes ---
app.use('/api/subjects', subjectRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});