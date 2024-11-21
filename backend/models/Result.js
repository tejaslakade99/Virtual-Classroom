const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      require: true,
    },
    examId: {
      type: mongoose.Types.ObjectId,
      ref: "Exam",
      require: true,
    },
    marksObtained: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
