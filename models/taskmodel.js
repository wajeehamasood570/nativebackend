const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  TaskName: {
    type: String,
    required: [true, "Task Name is Required"],
  },
  StartTime: {
    type: Number,
    required: [true, "Start Time is Required"],
  },
  EndTime: {
    type: Number,
    required: [true, "End Time is Required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Ongoing","Complete"],
  },
 
});

const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;