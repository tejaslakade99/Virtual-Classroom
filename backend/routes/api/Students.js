const express = require("express");
const router = express.Router();
const studentController = require("../../controllers/api/Students");

router.get("/", studentController.index);

// Get All Students
// - Add a new student.
router.post("/create-student", studentController.createStudent);

// - Get all students (with pagination and filtering by class).
router.get("/all-students", studentController.getAllStudents);

// - Get a single student by ID.
router.get("/:id", studentController.getStudent);

// - Update a student (e.g., name, class, profile image).
router.put("/:id", studentController.updateStudent);

// - Delete a student (soft delete preferred).
router.delete("/:id", studentController.deleteStudent);

// Additional Features
// - Mark Attendance For Class
router.post("/mark-attendance/:id", studentController.markAttendance);
module.exports = router;
