// Entry point test

const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const iosConnect = require("./iosConnect");
const morgan = require("morgan");

require("dotenv").config();

//Initialize HTTP Server
const server = http.createServer(app);

//WebSocket initialization
iosConnect(server);

// Connect to DB
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log(`Connected to database`);
  }
);

app.use(cors());
app.use(express.json());

//Log requests to console
app.use(morgan("dev"));

// Route middlewares

app.use("/api/user", require("./routes/auth"));
app.use(`/api/invoice`, require("./routes/invoice"));
app.use(`/api/mail`, require("./routes/mailHandler"));

// Setting server up
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use("*", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
