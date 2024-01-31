const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Create Content
router.post('/', async (req, res) => {
    try {
      const { user, text } = req.body;
      const newContent = new Content({
        text: text,
        user: user
      });
      const content = await newContent.save();
      res.json(content);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  });
  

// Read Content for a specific user
router.get('/', async (req, res) => {
    try {
      const contents = await Content.find({ user: req.query.user });
      res.json(contents);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });
  

// Update Content
router.put('/:id', async (req, res) => {
    try {
      const { user, text } = req.body;
      const content = await Content.findOne({ _id: req.params.id, user: user });
  
      if (!content) {
        return res.status(404).json({ msg: 'Content not found or user not authorized' });
      }
  
      content.text = text;
      await content.save();
  
      res.json(content);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
// Delete Content
router.delete('/:id', async (req, res) => {
    try {
      const { user } = req.body; // Assuming user_id is sent in request body
      const content = await Content.findOneAndDelete({ _id: req.params.id, user: user });
  
      if (!content) {
        return res.status(404).json({ msg: 'Content not found or user not authorized' });
      }
  
      res.json({ msg: 'Content deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});  

module.exports = router;
