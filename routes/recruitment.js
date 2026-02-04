const express = require('express');
const router = express.Router();
const Recruit = require('../models/Recruit');

// POST /api/recruitment
router.post('/', async (req, res) => {
  try {
    const { 
      name, year, branch, scholarNumber, vertical, phoneNumber,
      task1Github, task1Deployment, task2Github, task2Deployment,
      pdfLink, driveLink, portfolioLink, posterLink
    } = req.body;

    // Check if scholar number already exists
    const existingRecruit = await Recruit.findOne({ scholarNumber });
    if (existingRecruit) {
      return res.status(400).json({ message: 'Scholar Number already registered.' });
    }

    const newRecruit = new Recruit({
      name,
      year,
      branch,
      scholarNumber,
      vertical,
      phoneNumber,
      task1Github, 
      task1Deployment, 
      task2Github, 
      task2Deployment,
      pdfLink, 
      driveLink, 
      portfolioLink, 
      posterLink
    });

    await newRecruit.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    if (error.code === 11000) {
        return res.status(400).json({ message: 'Scholar Number already registered.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
