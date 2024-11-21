const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ api: "Connected to API" });
});

router.use('/students', require('./Students'))
router.use('/teachers', require('./Teachers'))
router.use('/class', require('./Class'))
router.use('/user', require('./User'))

module.exports = router;
