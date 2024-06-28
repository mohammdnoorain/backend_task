const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {

    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
);

const User = mongoose.model("userCollection", UserSchema);
module.exports = User;
