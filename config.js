require("dotenv").config();
const { config } = require("dotenv");
const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewURLParser: true,
  });
  await mongoose.connection.once("open", () => {
    console.log("Connected");
  });
}

module.exports = main;
// config.js;
