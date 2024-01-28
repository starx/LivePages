const express = require('express');
var router = express.Router();
const { connectDB, mongoose } = require('../data');

function isMongoDBConnected() {
  return mongoose.connection.readyState === 1;
}

// Initialize the database connection
connectDB();

/* GET home page. */
router.get('/', async function(req, res, next) {

  const mongo_connected = await isMongoDBConnected();
    
  res.render('index', { 
    title: 'Hey', 
    message: 'How are you doing?',
    mongo_connected: mongo_connected
  });
});

module.exports = router;
