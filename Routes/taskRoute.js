const express = require("express");
const taskRoute = express.Router();
const taskcontroller = require("../Controller/taskcontroller.js");
const { verifyToken } = require("../Middleware/verifyToken.js");

taskRoute.post("/tasks", verifyToken, taskcontroller.createTask);
taskRoute.get("/tasks", verifyToken, taskcontroller.getAllTasks);
taskRoute.get("/tasks/:id", verifyToken, taskcontroller.getParticularTask);
taskRoute.put("/tasks/:id", verifyToken, taskcontroller.updateTask);
taskRoute.delete("/tasks/:id", verifyToken, taskcontroller.deleteTask);
taskRoute.get("/searchingtask/:word", verifyToken, taskcontroller.searchingTask)
module.exports = taskRoute;
