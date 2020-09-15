const socketIo = require("socket.io");
/**
 * Funcion para habilitar la conección WebSocket
 * @param {*} server Servidor HTTP
 */

function iosConnect(server) {
  const io = socketIo(server);
  io.on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room);
      console.log(`${socket.id} joined ${room}`);
      
      socket.on("close", (close) => {
        console.log(socket.id, "closed the modal", close);
        io.to(room).emit("close", false);
      });

      socket.on("sign", (signature) => {
        console.log(`${socket.id} sended signature to ${room}`);
        io.to(room).emit("sign", signature);
      });
    });
  });
}

module.exports = iosConnect;
