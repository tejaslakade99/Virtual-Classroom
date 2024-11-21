const mongoose = require("mongoose");
const resultModel = require("../../models/Result");

module.exports.addResult = async (req, res) => {
  const { studentId, examId, marksObtained } = req.body;
  if (!studentId || !examId || !marksObtained) {
    return res.status(400).json({ message: "All Fields are required." });
  }

  if (
    !mongoose.Types.ObjectId.isValid(studentId) ||
    !mongoose.Types.ObjectId.isValid(examId)
  ) {
    return res.status(400).json({ message: "Invalid Id's." });
  }

  try {
    const result = await resultModel.create(req.body);
    res.status(200).json({ message: "Result is added.", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json(400, { message: "All hail tejas" });
};

module.exports.examResult = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  try {
    const results = await resultModel.find({ examId: id });
    res
      .status(200)
      .json({
        message: "Results of all students for a specific exam.",
        results,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.studentResult = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  try {
    const results = await resultModel.find({ studentId: id });
    res.status(200).json({
      message: "Results of all exams for a specific student.",
      results,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
