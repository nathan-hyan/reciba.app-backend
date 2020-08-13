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

const auth = require("./routes/auth")

// Route middlewares

app.use("/api/user", auth)

// Setting server up
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})