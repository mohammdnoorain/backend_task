const express = require("express");
const userController = require("../Controller/usercontroller.js");

const userRoute = express.Router();
userRoute.post("/login", userController.LoginClient);

userRoute.post("/register", userController.RegisterUser);
module.exports = userRoute;
