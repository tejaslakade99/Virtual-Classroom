const mongoose = require("mongoose");
const examModel = require("../../models/Exam");

module.exports.createExam = async (req, res) => {
  const { name, subject, totalMarks } = req.body;
  if (!name || !subject || !totalMarks) {
    return res.status(400).json({ message: "All Fields are required." });
  }

  try {
    const exam = await examModel.create(req.body);
    res.status(200).json({ message: "Exam is created", exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.updateExam = async (req, res) => {
  const { name, subject, totalMarks } = req.body;
  if (!name || !subject || !totalMarks) {
    return res.status(400).json({ message: "All Fields are required." });
  }

  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:"The exam with this id does not exists."})
  }

  try {
    const exam = await examModel.findByIdAndUpdate(id,{...req.body});
    res.status(200).json({ message: "Exam is updated", exam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
