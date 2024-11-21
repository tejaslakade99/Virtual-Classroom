const express = require("express");
const router = express.Router();
const userController = require("../../controllers/api/User");
const passport = require('../../config/passport')

// Endpoint to Create the First User
router.post("/create-user", userController.createUser);

// NOTE: 
// - The first user must be created using this endpoint. 
// - Without creating the first user, any operations requiring authorization will not be accessible.
// - Use the credentials of the first user to create and authorize additional users.
// router.post(
//   "/create-user",
//   passport.authenticate("jwt", { session: false }),
//   userController.createUser
// );
router.post('/create-session', userController.createSession);

module.exports = router;