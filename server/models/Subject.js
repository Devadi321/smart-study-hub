const mongoose = require('mongoose');

// This is the blueprint for every "Subject" we create
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,      // The subject's name must be a string of text
    required: true     // We must provide a name; it cannot be empty
  }
}, {
  timestamps: true   // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create a usable "Model" from the blueprint and export it
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;