const express = require("express");
const router = express.Router();
const studentController = require("../../controllers/api/Students");

router.get("/", studentController.index);

// Get All Students

router.get("/all-students", studentController.getAllStudents);
router.post("/create-student", studentController.createStudent);
router.get("/:id", studentController.getStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
