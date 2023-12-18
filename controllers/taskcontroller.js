const { SendResponse } = require("../helpers/helpers");
const TaskModel = require("../models/taskmodel");

const TaskController = {
  add: async (req, res) => {
    try {
      let { TaskName, StartTime,  EndTime,  status } = req.body;
      let obj = {TaskName, StartTime,  EndTime,  status };

      let errArray = [];

      if (!obj.TaskName) {
        errArray.push("Required Task Name");
      }
      if (!obj.status) {
        errArray.push("Required status");
      }

      if (errArray.length > 0) {
        res.status(400).send({
            success: false,
            message: "Validation Error!",
            errors: errArray,
        });
    } else {
        let newTask = new TaskModel(obj);
        let result = await newTask.save();
        res.status(200).send({
            success: true,
            message: "Data Added successfully",
            data: result,
        });
    }
} catch (err) {
    console.error('Error:', err); // Log the error details
    res.status(500).send({
        success: false,
        message: "Error",
    });
}
},



get: async (req, res) => {
try {
    let result = await TaskModel.find();

    if (result) {
        res.send({
            isSuccessfull: true,
            data: result,
            messsage: 'Data Found',
        });
    }
} catch (e) {
    res.send({
        isSuccessfull: false,
        data: null,
        messsage: 'No Data Found',
    });
}
},

getById: async (req, res) => {
try {
    const id = req.params.id;
    let result = await TaskModel.findById(id);

    if (result) {
        res.send({
            isSuccessfull: true,
            data: result,
            messsage: 'Data Found',
        });
    }
} catch (e) {
    res.send({
        isSuccessfull: false,
        data: null,
        messsage: 'No Data Found',
    });
}
},

delete: async (req, res) => {
try {
    const id = req.params.id;
    
    let result = await TaskModel.findByIdAndDelete(id)

    if (result) {
        res.send({
            isSuccessfull: true,
            data: result,
            messsage: 'Delete Sucessfully',
        });
    }
} catch (err) {
    res.send({
        isSuccessfull: false,
        data: null,
        messsage: 'No Data Found',
    });
}
},

edit: async (req, res) => {
try {
    const id = req.params.id;
    const updatedTask = req.body;

    // Find the index of the course with the specified ID
    let index = await TaskModel.findByIdAndUpdate(id,updatedTask);

    // if(index) {
    //     res.send({
    //         isSuccessfull: true,
    //         message: 'Course updated successfully',
    //         data: index,
    //     });
    // }

    res.send({
        isSuccessfull: true,
        message: 'Task updated successfully',
        data: index,
    });
} catch (err) {
    res.send({
        isSuccessfull: false,
        data: null,
        message: 'Task not found',
    });
}
},

};

module.exports = TaskController;