const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewURLParser: true,
  });
  await mongoose.connection.once("open", () => {
    console.log("Connected");
  });
}

require("dotenv").config();
const { config } = require("dotenv");

module.exports = main;
