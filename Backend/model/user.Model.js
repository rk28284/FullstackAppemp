const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  age:Number,
  cnfpassword: String
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
