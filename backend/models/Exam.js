const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    totalMarks: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam',examSchema);
