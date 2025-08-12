const mongoose = require("mongoose");

async function connect() {
    try{
        await mongoose.connect("mongodb+srv://ry742634:riteshyadav%40123@cluster0.gy8i4mi.mongodb.net/TODO");
        console.log("connection establish");
    }catch(err){
        console.log(err);
    }
}
module.exports=connect;