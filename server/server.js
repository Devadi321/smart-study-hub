require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const subjectRoutes = require('./routes/subjects'); // <-- IMPORT THE NEW ROUTES

const app = express();
const PORT = 3000;
const mongoURI = process.env.MONGO_URI;

app.use(express.json()); // Allows our app to understand JSON

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
// Any request to /api/subjects will be handled by our new routes file
app.use('/api/subjects', subjectRoutes); // <-- USE THE NEW ROUTES

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});