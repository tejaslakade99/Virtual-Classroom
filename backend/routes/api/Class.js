const express = require("express");
const router = express.Router();
const classController = require("../../controllers/api/Class");
const passport = require("../../config/passport");

router.get("/", (req, res) => {
  res.json({ message: "hello Class" });
});

// - Create a class.
router.post(
  "/create-class",
  passport.authenticate("jwt", { session: false }),
  classController.createClass
);

// - Assign a teacher to a class.
router.patch("/assign-teacher", classController.assignTeacher);

// - Get all classes (with pagination).
router.get("/all-classes", classController.allClasses);

// - Update class details (e.g., name, teacher).
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  classController.updateClass
);

// - Delete a class.
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  classController.deleteClass
);

// Additional Features.
// Generate a report for a class with a list of students and the assigned teacher.
router.get('/report/:id', classController.report);

module.exports = router;
