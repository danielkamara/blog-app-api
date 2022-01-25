// NPM Packages
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
// Add Morgan
const morgan = require("morgan");

// Local Requirements

const mongoConnection = require("./config");
const authRouter = require("./routes/authRoute");
// const blogRoute = require("./routes/blogRoute");

dotenv.config();

const app = express();
const port = 3000 || process.env.PORT;

// Security
app.use(helmet());
app.use(bodyParser.json());
// Security
app.use(morgan("dev"));

app.use("/auth", authRouter);
// app.use("/blog", blogRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Base Route is up" });
});

app.listen(port, () => {
  mongoConnection();
  console.log(`Server is listening at ${port}`);
});
