const teacherModel = require("../../models/Teacher");
const mongoose = require("mongoose");
const cloudinary = require("../../config/cloudinary");

module.exports.allTeachers = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const skip = (page - 1) * limit;

  try {
    const teachers = await teacherModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ page: page, limit: limit, teachers: teachers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.createTeacher = async (req, res) => {
  const { email, name, subject, profileImgUrl } = req.body;
  if (!email || !name || !subject || !profileImgUrl) {
    return res.json({ error: "All fields are required." });
  }
  try {
    const fileName = name.split(" ").join("-");
    const uploadImg = await cloudinary.uploader.upload(profileImgUrl, {
      public_id: fileName,
    });
    const teacher = await teacherModel.create({
      email,
      name,
      subject,
      profileImgUrl: uploadImg.secure_url,
    });
    res.status(200).json({ status: "Teacher Created.", teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getTeacher = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Teacher not found." });
  }
  try {
    const teacher = await teacherModel.findById(id);
    res.status(200).json({ teacher });
  } catch (error) {
    res.status(400).json({ message: "Teacher Not Found." });
  }
};

module.exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Such Teacher Exists." });
  }

  const { email, name, subject, profileImgUrl } = req.body;
  if (!email || !name || !subject || !profileImgUrl) {
    return res.json({ error: "All fields are required." });
  }

  try {
    const fileName = name.split(" ").join("-");
    const uploadImg = await cloudinary.uploader.upload(profileImgUrl, {
      public_id: fileName,
    });
    const teacher = await teacherModel.findByIdAndUpdate(
      { _id: id },
      { email, name, subject, profileImgUrl: uploadImg.secure_url },
      {new: true} // Return new document
    );
    res.status(200).json({ message: "Teacher is updated.", teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Such Teacher Exists." });
  }
  try {
    const teacher = await teacherModel.findByIdAndDelete(id);
    res.status(200).json({ status: "Teacher is Deleted.", teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
