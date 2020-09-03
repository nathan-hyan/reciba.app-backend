const socketIo = require("socket.io");
/**
 * Funcion para habilitar la conección WebSocket
 * @param {*} server Servidor HTTP
 */

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  //   socket.emit("FromAPI", response);
};

function iosConnect(server) {
  const io = socketIo(server);
  io.on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room);
      console.log(`${socket.id} joined ${room}`);

      socket.on("sign", (signature) => {
        console.log(`${socket} sended signature to ${room}`);
        io.emit("sign", signature);
      });
    });
  });
}

module.exports = iosConnect;
