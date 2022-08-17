const { Server } = require('socket.io');
const message = require("../database/entity/message")

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
  // options
  });

  io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    const {bookId} = socket.handshake.query;
    console.log(`Socket book: ${bookId}`);
    socket.join(bookId);

    socket.on('comment', async (msg) => {
      const newMessage = new message({
        author: msg.author,
        message: msg.message,
        bookId: bookId,
        date: new Date(),
      });

      try {
        await newMessage.save();
      } catch (e) {
        console.error(e);
      }
      
      socket.emit('comment', newMessage);
    })

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${id}`);
    });
  })
}