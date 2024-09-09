const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ api: "Connected to API" });
});

router.use('/students', require('./Students'))

module.exports = router;
