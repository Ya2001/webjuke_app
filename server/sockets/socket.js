module.exports = function(io) {
    io.on('connection', (socket) => {
      console.log('a user connected');
  
      socket.on('joinSession', (sessionCode) => {
        socket.join(sessionCode);
      });
  
      socket.on('queueSong', (data) => {
        io.to(data.sessionCode).emit('updateQueue', data.song);
      });
  
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  };
  