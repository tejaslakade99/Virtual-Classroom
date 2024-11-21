const express = require("express");
const app = express();
const mongoose = require("./config/mongoose");
const cloudinary = require("./config/cloudinary");
const router = require("./routes");
const port = 8000;

//  Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
