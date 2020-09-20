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
        io.to(room).emit("close", false);
      });

      socket.on("pdf", (file) => {
        console.log("PDF goes out >>");
        io.to(room).emit("pdf", file);
      });

      socket.on("sign", (signature) => {
        console.log(`${socket.id} sended signature to ${room}`);
        io.to(room).emit("sign", signature);
      });
    });
  });
}

module.exports = iosConnect;
