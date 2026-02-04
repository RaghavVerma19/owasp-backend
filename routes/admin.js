const express = require('express');
const router = express.Router();
const Recruit = require('../models/Recruit');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Jaishriram54321OwaspManit';

// Middleware to verify admin password
const verifyAdmin = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }
  next();
};

// Login Check
router.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid Password' });
    }
});

// GET All Recruits
router.get('/recruits', verifyAdmin, async (req, res) => {
  try {
    const recruits = await Recruit.find().sort({ createdAt: -1 });
    res.json(recruits);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// UPDATE Recruit
router.put('/recruits/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedRecruit = await Recruit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecruit);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE Recruit
router.delete('/recruits/:id', verifyAdmin, async (req, res) => {
  try {
    await Recruit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recruit deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
