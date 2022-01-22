const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  let token = req.get("Authorization");

  if (token === null || token === undefined) {
    res.status(403).json({ message: "YOU MUST BE LOGGED IN" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
    if (error) {
      res.status(400).json({ message: "Ya done goofed" });
    }

    if (result === false) {
      res.status(403).json({ message: "YOU MUST BE LOGGED IN" });
    }
    next();
  });
}

module.exports = verifyJWT;
