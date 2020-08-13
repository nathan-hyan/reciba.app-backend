// Entry point

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

// Connect to DB

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }, () => {
        console.log(`Connected to database`)
    })

// Body parser

app.use(express.json())

// Routes

const auth = require("../routes/auth")

// Route middlewares

app.use("/api/user", auth)

// Setting server up
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.use("*", express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})