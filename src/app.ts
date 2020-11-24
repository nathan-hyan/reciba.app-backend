import cors from "cors";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import { createServer } from "http";

// DotEnv File Config
import dotenv from "dotenv";
dotenv.config();

import express, { Application, json, NextFunction } from "express";
import "./middleware/database";

import authRoute from "./routes/auth";
import invoices from "./routes/invoice";
import email from "./routes/email";
import { Server, Socket } from "socket.io";

// Express
const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(morgan("tiny"));

let http = createServer(app);
let io = new Server(http, {
  cors: {
    credentials: true,
    methods: ["GET", "PATCH", "POST", "PUT"],
    origin: true, // accept from any domain }
  },
});

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

// Routes

app.use("/api/user", authRoute);
app.use(`/api/invoice`, invoices);
app.use(`/api/mail`, email);
app.use(
  (
    error: { status: any; message: any; stack: any },
    req: any,
    res: {
      status: (arg0: any) => void;
      json: (arg0: { success: boolean; message: any; stack: any }) => void;
    },
    next: NextFunction
  ) => {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? `👀` : error.stack,
    });
  }
);

// Setting up the server
const PORT: number = parseInt(process.env.PORT || "8000");
http.listen(PORT, () => console.log(`Server running in ${PORT}`));

//WebSocket initialization
