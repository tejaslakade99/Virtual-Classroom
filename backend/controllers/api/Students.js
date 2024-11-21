const { default: mongoose } = require("mongoose");
const StudentModel = require("../../models/Student");
const ClassModel = require("../../models/Class");
const cloudinary = require("../../config/cloudinary");

module.exports.index = (req, res) => {
  res.json({ student: "Students API here." });
};

module.exports.getAllStudents = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const skip = (page - 1) * limit;

  try {
    const students = await StudentModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ students: students });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports.createStudent = async (req, res) => {
  const { email, name, classId, profileImgUrl } = req.body;
  if (!email || !name || !classId || !profileImgUrl) {
    return res.json({ error: "All fields are required" });
  }
  try {
    const fileName = name.split(" ").join("-");
    const uploadImg = await cloudinary.uploader.upload(profileImgUrl, {
      public_id: fileName,
    });
    const student = await StudentModel.create({
      email,
      name,
      classId,
      profileImgUrl: uploadImg.secure_url,
    });
    res.status(200).json({ student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Single Student
module.exports.getStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ message: "No such student exists." });
  }
  try {
    const student = await StudentModel.findById(id);
    res.status(200).json({ student });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ message: "No such student exists." });
  }
  try {
    const student = await StudentModel.findOneAndDelete(id);
    res.status(200).json({ student });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ message: "No such student exists." });
  }

  const { email, name, classId, profileImgUrl } = req.body;
  if (!email || !name || !classId || !profileImgUrl) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const fileName = name.split(" ").join("-");
    const uploadImg = await cloudinary.uploader.upload(profileImgUrl, {
      public_id: fileName,
    });

    const student = await StudentModel.findByIdAndUpdate(
      { _id: id },
      { email, name, classId, profileImgUrl: uploadImg.secure_url },
      { new: true } // Return new document
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.markAttendance = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  console.log(name);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "No such student exists with that id." });
  }

  try {
    const isMarked = await ClassModel.find({name:name,attendees:{studentId:id}});
    if(isMarked){
      return res.status(200).json({message:"You attendance is already marked."})
    }
    const classroom = await ClassModel.findOneAndUpdate(
      { name: name },
      {
        $push: {
          attendees: { studentId: id },
        },
        $inc: {
          studentCount: 1,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Attendance is marked.", classroom });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
