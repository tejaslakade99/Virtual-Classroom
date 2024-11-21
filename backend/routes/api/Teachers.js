const express = require("express");
const router = express.Router();
const passport = require("../../config/passport");
const teacherController = require("../../controllers/api/Teachers");

router.get("/", (req, res) => {
  res.json({ message: "Teachers API." });
});

// - Add a new teacher.
router.post(
  "/create-teacher",
  passport.authenticate("jwt", { session: false }),
  teacherController.createTeacher
);

// - Get all teachers (with pagination).
router.get(
  "/all-teachers",
  passport.authenticate("jwt", { session: false }),
  teacherController.allTeachers
);

// - Get a teacher by ID.
router.get("/:id", teacherController.getTeacher);

// - Update a teacher (e.g., name, subject, profile image).
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  teacherController.updateTeacher
);

// - Delete a teacher (soft delete preferred).
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  teacherController.deleteTeacher
);

module.exports = router;
