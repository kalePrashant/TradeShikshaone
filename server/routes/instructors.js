const express = require('express');
const router = express.Router();
// We'll import the Instructor model later

// @route   GET api/instructors
// @desc    Get all instructors
// @access  Public
router.get('/', async (req, res) => {
  // Get all instructors logic will go here
  res.send('Get all instructors route');
});

// @route   GET api/instructors/:id
// @desc    Get instructor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  // Get instructor by ID logic will go here
  res.send(`Get instructor with ID: ${req.params.id}`);
});

module.exports = router;