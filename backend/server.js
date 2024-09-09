const express = require("express");
const app = express();
const mongoose = require("./config/mongoose");
const router = require("./routes");
const port = 8000;

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
