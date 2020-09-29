const JWT = require("jsonwebtoken");
const User = require("../../models/User");

const private = async (req, res, next) => {
  const token = req.header("auth");

  try {
    const verified = JWT.verify(token, process.env.TOKEN);
    const { lastInvoiceNumber } = await User.findOne({ _id: verified.id });

    req.user = { ...verified, lastInvoiceNumber };
    next();
  } catch (err) {
    console.log("No se detectó un usuario");
    next();
  }
};

module.exports = private;
