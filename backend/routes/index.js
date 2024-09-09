const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Router is Loaded");
  return res.status(200).json({ msg: "Hello World" });
});

router.use("/api", require("./api"));

module.exports = router;
