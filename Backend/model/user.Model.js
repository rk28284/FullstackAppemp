const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    password:String,
    cnfpassword:String
})

const UserModel=mongoose.model("user",userSchema)

module.exports=UserModel