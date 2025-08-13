const express = require("express");
const app  = express();
const joi = require("joi");

app.use(express.json());

const schemaValidation = joi.object({
    name:joi.string().required(),
    password:joi.number().strict().min(1000).required(),
    email:joi.string().email().required()
});

let allData=[{}];

app.get("/",(req,res)=>{
    try{
        return res.status(200).json(allData);
    }catch(err){
        return res.status(500).json({"message":"somethind went wrong"});
    }
});


app.post("/post",(req,res)=>{
    try{
       const { error ,value } = schemaValidation.validate(req.body); 
        if(error)
            console.log("error : ",error.details[0].message);
        else{
            console.log("validation successful");
            allData.push(value);
        }
        return res.status(200).json({"message":"successful !"});
    }catch(err){
        return res.status(500).json({"message":"something went wrong"});
    }
});

app.listen(5000,()=>{
    console.log("server is ready");
});