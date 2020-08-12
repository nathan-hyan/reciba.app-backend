const router = require("express").Router();
const User = require("../models/User")
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// User register

router.post('/register', async (req, res) => {

    // Checking if already exist
    const emailExist = await User.findOne({ email: req.body.email })

    if (emailExist) {
        return res.status(400).send({ success: false, message: `User already registered` })
    } else {

        // Hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Creating the user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        // Saving
        try {
            await user.save();
            res.send({ success: true, message: `Welcome ${req.body.name}`, data: { id: user._id, name: user.name } })
        }
        catch (err) {
            res.status(400).send({ success: false, message: `Error: ${err.message}` })
        }
    }

})

// User login

router.post('/login', async (req, res) => {

    // Check if user exist
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(401).send({ success: false, message: `Email or password incorrect` })
    } else {
        // Check for valid password
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(401).send({ success: false, message: `Email or password incorrect` })
        } else {
            // Create and send token
            const token = JWT.sign({ id: user._id }, process.env.TOKEN)
            res.header('auth', token)
            res.send({ success: true, message: `Welcome back ${user.name}` })
        }
    }

})

module.exports = router