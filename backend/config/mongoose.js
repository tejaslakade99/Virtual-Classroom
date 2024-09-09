const { default: mongoose } = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URL).catch((error) => {
  console.log(`Error Occurred while connecting to database: ${error}`);
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error Occurred ${error}`);
});

db.once("open", () => {
  console.log("Database is successfully connected");
});

module.exports = db;
