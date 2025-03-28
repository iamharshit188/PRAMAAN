const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/geminiController');

router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }
    
    const result = await geminiController.handleChatMessage(message, context);
    res.json(result);
  } catch (error) {
    console.error('Error processing chat message:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router; 