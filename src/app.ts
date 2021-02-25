import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { createServer } from "http";

// DotEnv File Config
import dotenv from "dotenv";
dotenv.config();

import express, { Application, json, NextFunction } from "express";
import "./middleware/database";

import authRoute from "./routes/auth";
import invoices from "./routes/invoice";
import email from "./routes/email";
import test from "./routes/test"
import { Server } from "socket.io";
import socket from "./middleware/socketIo";

// Express
const app: Application = express();
app.use(cors());
app.use(bodyParser({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());
app.use(morgan("tiny"));

const http = createServer(app);
const io = new Server(http, {
  cors: {
    credentials: false,
    methods: ["GET", "PATCH", "POST", "PUT"],
    origin: true, // accept from any domain }
  },
});

/**
 * Running Socket io middleware
 */
socket(io);

// Routes

app.use("/api/user", authRoute);
app.use(`/api/invoice`, invoices);
app.use(`/api/mail`, email);
app.use(`/transacciones`, test)
app.use(
  (
    error: { status: number; message: string; stack: unknown },
    req: unknown,
    res: {
      status: (arg0: number) => void;
      json: (arg0: { success: boolean; message: string; stack: unknown }) => void;
    },
    next: NextFunction
  ) => {
    next();
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
