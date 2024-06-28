require("dotenv").config();
const jwt = require("jsonwebtoken");
const Task = require("../Model/TaskModel.js");



const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const registertask = new Task(
      {
        title: title,
        description: description,
      }
    );
    const result = await registertask.save();
    return res
      .status(201)
      .send({ data: result, message: "New Task Registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." });
  }
}




const getAllTasks = async (req, res) => {
  try {
    const { page } = req.query;
    const newpage = parseInt(page) - 1;
    const dataperpage = 6;
    const allTask = await Task.find().sort({ _id: -1 }).skip(newpage * dataperpage).limit(dataperpage);
    res.status(200).send({ success: true, allTask: allTask });
  } catch (err) {
    console.error("Error fetching all Task details:", err);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};




const getParticularTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.findOne({ _id: id });
    res.send({ message: "data sended successfully", data: data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }



}

const updateTask = async (req, res) => {
  try {
    let { title, description, completed } = req.body;
    const { id } = req.params;
    const data = await Task.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          completed
        },
      },
      { new: true }
    );
    res.send({ success: true, data: data, message: " Task Updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error updating client");

  }
}
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.deleteOne({ _id: id });
    res.send({ message: "Task deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}


const searchingTask = async (req, res) => {
  try {
    const { page } = req.query;
    const newpage = parseInt(page) - 1;
    const dataperpage = 6;
    const { word } = req.params;
    const data = await Task.find({
      "$or": [
        { "title": { $regex: word, $options: 'i' } },
        { "description": { $regex: word, $options: 'i' } },
      ]
    }).skip(newpage * dataperpage).limit(dataperpage);
    if (data.length === 0) {
      return res.status(404).send({ success: false, message: "No data found" });
    }
    res.status(200).send({ success: true, message: "Data sent successfully", data: data });
  } catch (err) {
    console.error("Error fetching plot details:", err);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getParticularTask,
  updateTask,
  deleteTask,
  searchingTask
}
