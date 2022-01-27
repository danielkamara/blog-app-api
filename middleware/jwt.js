const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET);
}

function verifyJWT(req, res, next) {
  let token = req.get("Authorization");

  if (token === null || token === undefined) {
    res.status(403).json({ message: "YOU MUST BE LOGGED IN" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
    if (error) {
      res.status(400).json({ message: "Token Required" });
    }

    if (result === false) {
      res.status(403).json({ message: "YOU MUST BE LOGGED IN" });
    }
    next();
  });
}

module.exports = { generateAccessToken, verifyJWT };
