// Entry point

const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

// Connect to DB

mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log(`Connected to database`)
    })

// Body parser

app.use(express.json())

// Routes

const auth = require("./routes/auth")

// Route middlewares

app.use("/api/user", auth)

// Setting server up

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})