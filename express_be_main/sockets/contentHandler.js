const Content = require('../models/Content');
const UserService = require('../services/UserService');
const ContentService = require('../services/ContentService');

module.exports =  (io, socket) => {

  const user_id = socket.handshake.query.user_id;
  if(user_id) {
      socket.user_id = user_id;
      console.log('socket user id', socket.user_id);
  
      console.log('loading');
      ContentService.getUserContentOrCreate(user_id)
        .then((content) => {
            console.log('user content found', content._id)
            // Send initial content to the client
            socket.emit('updateContent', content);
            console.log('emitted')
        }).catch((err) => {
            console.error(err);
        });
      console.log('loaded ');
  }

  socket.on('contentChange', async (newContent) => {
    console.log('change', socket.user_id)
    try {
      const user = await UserService.findUserById(socket.user_id);
      const content = await Content.findOneAndUpdate(
        { user: user },
        { text: newContent.text },
        { new: true, upsert: true }
      );
      // Broadcast the change to other clients, excluding the sender
      socket.broadcast.emit('updateContent', content);
      console.log('emitted contentChange')
    } catch (err) {
      console.error(err);
      // Handle error
    }
  });
};