const express  = require("express");
const cors = require("cors");
const connect = require("./connection.js");
const model = require("./model/User.js");

connect();

const app = express();
app.use(cors())
app.use(express.json());

app.get('/crud',async (req,res)=>{
    try{    
        const data = await model.find();
        return res.status(200).json(data);
        // return res.status(200).json({"message" :"get data successful !"});
    }catch(err){
        return res.status(500).json({"message" :"something went wrong"});
    }
}); 

app.delete('/crud/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        await model.findByIdAndDelete(id);
        return res.status(200).json({"message":"delete successful"});
    }catch(err){
        return res.status(500).json({"message":"something went wrong"});
    }
});

app.put("/crud/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        await model.findByIdAndUpdate(id,data,{new:true});
        return res.status(200).json({"message":"update successful"});
    }catch(errp){
        return res.status(500).json({"message":"something went wrong"});
    }
});


app.post("/crud", async (req,res)=>{
    try{
        await model.create(req.body);
        console.log(req.body);
        return res.status(200).json({"message" :"add successful !"});
    }catch(err){
        return res.status(500).json({"message" :"something went wrong"});
    }
});

app.listen("5000",()=>{
    console.log("server is ready");
});