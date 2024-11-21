const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  studentCount: {
    type: Number,
    default: 0,
  },
  attendees: [{
    studentId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Student",
    }
  }],
});

module.exports = mongoose.model("Class", classSchema);
