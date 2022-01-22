const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");

const app = express();

const port = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Base Route is up" });
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
