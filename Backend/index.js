const express = require("express");
const connection = require("./configs/db");
const { userRouter } = require("./routes/user.Route");
const { dashboardRouter } = require("./routes/dashboard.Route");
const { authentication } = require("./middleware/auth.middleware");

require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
const port = process.env.port || 8080;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to homepage of Employee Data backend");
});

app.use("/user", userRouter);
// app.use(authentication)
app.use("/employee", dashboardRouter);
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connnection succesfully");
  } catch (error) {
    console.log(error);
  }
  console.log("Running at port 7070");
});
