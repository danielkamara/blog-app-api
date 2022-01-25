const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");

dotenv.config();

const app = express();
const port = 3000 || process.env.PORT;

// Security
app.use(helmet());
app.use(bodyParser.json());
// Security
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Base Route is up" });
});

app.listen(port, () => {
  mongoConnection();
  console.log(`Server is listening at ${port}`);
});

const mongoConnection = require("./config");

const authRoute = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute");

app.use("/auth", authRoute);
app.use("/blog", blogRoute);
