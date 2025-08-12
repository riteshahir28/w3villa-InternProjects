const mongoose  = require("mongoose");

const CrudUsers = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});

const UserModel = mongoose.model("CRUD",CrudUsers);
module.exports=UserModel;