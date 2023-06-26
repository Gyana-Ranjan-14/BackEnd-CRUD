const mongoose=require("mongoose");

// now declare the structure of schena
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    },


});
const users = new mongoose.model("users",userSchema);

module.exports=users