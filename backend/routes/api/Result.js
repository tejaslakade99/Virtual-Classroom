const router = require("express").Router;
const resultController = require("../../controllers/api/Result");

// Additional Features
router.post("/add-result", resultController.addResult);
router.get("/exam-result/:id", resultController.examResult);
router.get("/student-result/:id", resultController.studentResult);

