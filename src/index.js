// Entry point test

const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const iosConnect = require("./iosConnect");

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

// Body parser

app.use(express.json());

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
