const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = function(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
      return res.status(401).json({ message: "Auth Error" });
  }

  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};