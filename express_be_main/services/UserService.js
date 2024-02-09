const User = require('../models/User');

class UserService {
  
  async findUserByField(field, value) {
    try {
        // Use bracket notation to use the value of the 'field' variable as the key
        const query = { [field]: value };
        const user = await User.findOne(query);
        if (user) {
          console.log('User found:', user);
          return user;
        } else {
          console.log(`No user found with ${field}: ${value}`);
          return null;
        }
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
  }

  async findUserById(userId) {
    return this.findUserByField('id', userId);
  }

  async findUserByName(username) {
    return this.findUserByField('name', username);
  }
}

module.exports = new UserService();
