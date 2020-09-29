const router = require("express").Router();
const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const hasUser = require("./middlewares/hasUser");

// User register

router.post("/register", async (req, res) => {
  // Checking if already exist
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res
      .status(400)
      .send({ success: false, message: `User already registered` });
  } else {
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creating the user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Saving
    try {
      await user.save();
      res.send({
        success: true,
        message: `Welcome ${req.body.name}`,
        data: { id: user._id, name: user.name },
      });
    } catch (err) {
      res
        .status(400)
        .send({ success: false, message: `Error: ${err.message}` });
    }
  }
});

// User login

router.post("/login", async (req, res) => {
  // Check if user exist
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res
      .status(401)
      .send({ success: false, message: `Email or password incorrect` });
  } else {
    // Check for valid password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(401)
        .send({ success: false, message: `Email or password incorrect` });
    } else {
      // Create and send token
      const token = JWT.sign({ id: user._id }, process.env.TOKEN, {
        expiresIn: process.env.TOKEN_TIME,
      });
      res.header("auth", token);
      await User.findOneAndUpdate({ _id: user._id }, { lastLogin: new Date() });
      res.send({
        success: true,
        message: `Welcome back ${user.name}`,
        data: { name: user.name, token },
      });
    }
  }
});

// Check for already logged in user

router.post("/loggedInUser", hasUser, async (req, res) => {
  const userExist = await User.findOne({ _id: req.user.id });

  if (userExist) {
    try {
      const verifiedToken = JWT.verify(req.body.storedToken, process.env.TOKEN);
      const currentDate = Date.now().toString().substring(0, 10);

      if (currentDate > verifiedToken.exp) {
        return res.status(401).send({
          success: false,
          message: "Invalid user, please log in",
        });
      } else {
        const token = JWT.sign({ id: userExist._id }, process.env.TOKEN, {
          expiresIn: process.env.TOKEN_TIME,
        });
        await User.findOneAndUpdate(
          { _id: userExist._id },
          { lastLogin: new Date() }
        );
        res.send({
          success: true,
          message: `Welcome back ${userExist.name}`,
          data: { name: userExist.name, token },
        });
      }
    } catch (err) {
      console.log(err);

      return res.status(401).send({
        success: false,
        message: "Invalid user, please log in",
      });
    }
  } else {
    return res.status(401).send({
      success: false,
      message: "Invalid user, please log in",
    });
  }
});

module.exports = router;
