// routes/kids.js
const express = require('express');
const router = express.Router();
const Kid = require('../models/kid');

// Create a kid
router.post('/add', async (req, res) => {
  try {
    const { name } = req.body;
    const newKid = await Kid.create({ name });
    res.status(201).json(newKid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update kid's behavior for a specific date
router.put('/:kidId/behavior', async (req, res) => {
  try {
    const { kidId } = req.params;
    const { date, rating, comment } = req.body;
    const kid = await Kid.findById(kidId);

    if (!kid) return res.status(404).json({ message: 'Kid not found' });

    // Check if there's already a behavior entry for the given date
    const existingBehavior = kid.behavior.find(behavior => behavior.date.toISOString() === new Date(date).toISOString());

    if (existingBehavior) {
      // Update existing entry
      existingBehavior.rating = rating;
      existingBehavior.comment = comment;
    } else {
      // Add a new behavior entry
      kid.behavior.push({ date, rating, comment });
    }

    await kid.save();
    res.json(kid.behavior);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;