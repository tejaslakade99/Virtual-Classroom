const router = require('express').Router
const examController = require('../../controllers/api/Exam');

router.post('/create-exam',examController.createExam);
router.put('/:id',examController.updateExam);