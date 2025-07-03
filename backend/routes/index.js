const express = require('express');
const router = express.Router();

// Simple test route to verify server is working
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

module.exports = router;