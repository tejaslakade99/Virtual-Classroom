const { default: mongoose } = require("mongoose");
const ClassModel = require("../../models/Class");

module.exports.createClass = async (req, res) => {
  const { name, teacherId } = req.body;
  if (!name || !teacherId) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const classroom = await ClassModel.create(req.body);
    res.status(200).json({ message: "Classroom is created.", classroom });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.allClasses = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const skip = (page - 1) * limit;
  try {
    const classrooms = await ClassModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ page: page, limit: limit, classrooms: classrooms });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.updateClass = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No such classroom exists.");
  }
  try {
    const classroom = await ClassModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res
      .status(200)
      .json({ message: "Classroom is updated.", classroom: classroom });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.assignTeacher = async (req, res) => {
  const { teacherId, classId } = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(teacherId) ||
    !mongoose.Types.ObjectId.isValid(classId)
  ) {
    return res.status(400).json("No such teacher exists.");
  }
  try {
    const classroom = await ClassModel.findByIdAndUpdate(
      classId,
      { teacherId: teacherId },
      { new: true }
    );
    res.status(200).json({ message: "Teacher is Assigned.", classroom });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.deleteClass = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("No such classroom exists.");
  }
  try {
    const classroom = await ClassModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Classroom is deleted.", classroom: classroom });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.report = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id is invalid." });
  }

  try {
    const classroom = await ClassModel.findById(id).populate({
      path: "attendees.studentId",
      select: "name",
    });
    res.status(200).json({message:"Classroom Report.", classroom});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
