const express = require('express');
const router = express.Router();
const { generateWebsite } = require('../controllers/generatorController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, generateWebsite);

module.exports = router;