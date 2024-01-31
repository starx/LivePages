const User = require('../models/User');

class UserService {
  async findUserById(userId) {
    try {
        const user = await User.findOne({ id: userId });
        if (user) {
          console.log('User found:', user);
          return user;
        } else {
          console.log('No user found with id:', userId);
          return null;
        }
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
  }
}

module.exports = new UserService();
