require("dotenv").config();
const User = require("../Model/UserModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const RegisterUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const register = new User({
      username: username,
      password: hashedPassword
    });
    await register.save();
    res.status(200).send({ message: " User Register successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  };
}


const LoginClient = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    if (!user.password) {
      return res.send({
        success: false,
        message: "Password is required",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Password does not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.secretkey, { expiresIn: "4d" });
    console.log("Generated token:", token);
    res.send({
      success: true,
      User: user,
      token: token,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  RegisterUser,
  LoginClient
}
