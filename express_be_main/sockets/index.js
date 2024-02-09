const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

const exampleHandler = require('./exampleHandler');
const contentChangeHandler = require('./contentHandler');

module.exports = (server) => {
    const io = socketIo(server, {
        cors: {
          origin: "*", // use wildcard '*' for any origin, or use ällowed origins like 'http://localhost:8884'
          methods: ["GET", "POST"],
          allowedHeaders: ["my-custom-header"],
          credentials: true
        }
      });

    io.on('connection', (socket) => {
        console.log('New client connected');

        // exampleHandler(io, socket);
        contentChangeHandler(io, socket);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    io.use((socket, next) => {
        // Example: Using JWT for authentication
        const token = socket.handshake.query.token;
        console.log('socket middleware', { token });
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            console.log('jwt verified', { decoded })
            if (err) return next(new Error('Authentication error'));
            socket.username = decoded.username;
            next();
        });
    });
      
};
