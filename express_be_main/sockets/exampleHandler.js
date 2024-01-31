// Example handler
const exampleHandler = (io, socket) => {
    socket.on('exampleEvent', (data) => {
        console.log(data);
        // Handle event
    });
};

module.exports = exampleHandler;

