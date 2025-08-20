const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject.js');

// POST /api/subjects (Create)
router.post('/', async (req, res) => { /* ... existing code ... */ });

// GET /api/subjects (Read All)
router.get('/', async (req, res) => { /* ... existing code ... */ });

// GET /api/subjects/:id (Read One)
router.get('/:id', async (req, res) => { /* ... existing code ... */ });

// PUT /api/subjects/:id (Update)
router.put('/:id', async (req, res) => { /* ... existing code ... */ });

// --- DELETE /api/subjects/:id --- (Delete)
// This is the new part!
router.delete('/:id', async (req, res) => {
  try {
    const subjectId = req.params.id;

    const subject = await Subject.findByIdAndDelete(subjectId);

    if (!subject) {
      return res.status(404).json({ msg: 'Subject not found' });
    }

    res.json({ msg: 'Subject removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;