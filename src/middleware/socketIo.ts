import { Socket } from "socket.io";

const socket = (io: any) => {
  io.on("connection", (socket: Socket) => {
    console.log(`>> SOCKET || ${socket.id} just connected`);

    socket.on("join", (room: string) => {
      console.log(`>> SOCKET || Connected to ${room}`);
      socket.join(room);

      socket.on("disconnect", () => {
        console.log(`>> SOCKET || ${socket.id} disconnected`);
      });

      socket.on("close", () => {
        io.to(room).emit("close", false);
        console.log(`>> SOCKET || ${socket.id} disconnected`);
      });

      socket.on("pdf", (file: string) => {
        console.log(`>> SOCKET || ${socket.id} send a file`);
        io.to(room).emit("pdf", file);
      });

      socket.on("sign", (signature: string) => {
        console.log(`>> SOCKET || ${socket.id} signed a bill`);
        io.to(room).emit("sign", signature);
      });
    });
  });
};

export default socket;
