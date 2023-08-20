const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: {type: String,required: true,},
  email: {type: String,required: true },
  department: {type: String,required: true,},
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
// {
//   "firstName": "rakesh",
//   "lastName":"rakesh",
//   "email":"rakesh@gmail.com",
//   "department":"full stack dev" ,
// }
