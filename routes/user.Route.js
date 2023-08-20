const express = require("express");
const UserModel = require("../model/user.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, cnfpassword,age } = req.body;
//   console.log(req.body);
//   console.log("Received Password:", password);
//   console.log("Received Confirm Password:", cnfpassword);
//   console.log("Received Confirm Password:", age);
  if (password == cnfpassword) {
    try {
      bcrypt.hash(password, 5, async (err, security) => {
        if (err) {
          console.log(err);
        } else {
            // console.log(password,cnfpassword);
          const user = new UserModel({
            email,
            age,
            password: security,
            cnfpassword: security,
          });
          
          await user.save();
        //   res.json(user)
          // console.log(user);
        }
      });
    } catch (error) {
      res.send({ message: "error in registering the user" });
      // console.log(error.message);
    }
  } else {
    res.send({ message: "password and conform password not matching" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashpassword = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashpassword, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0].id }, process.env.key);
          res.send({ messsage: "Login successful", token: token });
        } else {
          res.send({ messsage: "Wrong credentials" });
        }
      });
    } else {
      res.send({ messsage: "credentials are wrong" });
    }
  } catch (error) {
    res.send({ messsage: "somethinh went wrong" });
  }
});

module.exports = { userRouter };
