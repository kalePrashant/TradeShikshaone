const express = require('express');
const router = express.Router();
// We'll import the Course model later

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  // Get all courses logic will go here
  res.send('Get all courses route');
});

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  // Get course by ID logic will go here
  res.send(`Get course with ID: ${req.params.id}`);
});

module.exports = router;