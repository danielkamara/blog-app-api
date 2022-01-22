const express = require("express");
const morgan = require("morgan");
const mongoConnection = require("./config");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");

const app = express();
const port = 3000 || process.env.PORT;

const authRouter = require("./routes/authRoute");

// Security
app.use(helmet());
app.use(bodyParser.json());
// Security

dotenv.config();
app.use(morgan("dev"));

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Base Route is up" });
});

app.listen(port, () => {
  mongoConnection();
  console.log(`Server is listening at ${port}`);
});
