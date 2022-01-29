// NPM Packages
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
// Add Morgan
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");

// Local Requirements

const mongoConnection = require("./config");
const userRouter = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const swaggerRoute = require("./docs/swagger");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security
app.use(helmet());
app.use(bodyParser.json());
// Security
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/blog", blogRoute);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerRoute));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Base Route is up" });
});

app.listen(port, () => {
  mongoConnection();
  console.log(`Server is listening at ${port}`);
});
