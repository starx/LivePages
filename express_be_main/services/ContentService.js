const Content = require('../models/Content');
const UserService = require('../services/UserService');

class UserNotFound extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}


class ContentService {
  async findContentByUserId(userId) {
    try {
      const user = await UserService.findUserById(userId);
      if (user) {
        const content = await Content.findOne({ user: user._id });
        return content;
      }
      return null;
    } catch (error) {
      console.error('Error finding content:', error);
      throw error;
    }
  }

  async createEmptyContentForUser(userId) {
    try {
      const user = await UserService.findUserById(userId);
      if (!user) {
        throw new UserNotFound(`${userId} not found.`)
      }
      const newContent = new Content({
        // empty editor
        text: '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
        user: user._id
      });
      return newContent.save();
    } catch (error) {
      console.error(`Error getting or creating user content for user ${userId}.`, error);
      throw error;
    }
  }

  
  async getUserContentOrCreate(userId) {
    try {
      const existingContent = await this.findContentByUserId(userId);
      if(existingContent) {
        return existingContent;
      }
      return this.createEmptyContentForUser(userId)
    } catch (error) {
      console.error(`Error getting or creating user content for user ${userId}.`, error);
      throw error;
    }
  }
}


module.exports = new ContentService();
