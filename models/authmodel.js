const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [true, "password is Required"],
  },
  // confirmPassword: {
  //   type: String,
  //   required: [true, "Confirm Password is Required"],
  // },
  // userType: {
  //   type: String,
  //   enum: ["Doctor", "Patient"],
  // },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
