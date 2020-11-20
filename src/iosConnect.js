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

      socket.on("close", (close) => {
        io.to(room).emit("close", false);
      });

      socket.on("pdf", (file) => {
        io.to(room).emit("pdf", file);
      });

      socket.on("sign", (signature) => {
        io.to(room).emit("sign", signature);
      });
    });
  });
}

module.exports = iosConnect;
