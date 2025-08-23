const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const message = [];

app.get('/',(req,res)=>{
    try{
       return res.render("guest",{message:message});
    }catch(err){
        return res.json({"message":"something went wrong"});
    }
});

app.post('/add',(req,res)=>{
    try{
        message.push(req.body);
        return res.redirect('/')
    }catch(err){
        console.log(err.message);
        return res.json({"message":"something went wrong"});
    }
});


app.listen(5000,()=>{
    console.log("server is runing port : 5000");
});