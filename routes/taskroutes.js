const express = require("express");
const TaskController = require("../controllers/taskcontroller");
const route = express.Router();

route.get("/", TaskController.get);
// route.get("/:id", TaskController.getById);
route.post("/", TaskController.add);
// route.delete("/:id", TaskController.del);

module.exports = route;