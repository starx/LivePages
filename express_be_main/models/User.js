const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true, // Only add if this should be unique across all documents
    required: true // Only add if this field is mandatory
  },
  name: {
    type: String,
    required: true // Assuming every user should have a name
    // Consider additional validations like minlength and maxlength
  }
}, {
  // timestamps: true // Adds createdAt and updatedAt timestamps
});

const User = mongoose.model('User', userSchema);

module.exports = User;
