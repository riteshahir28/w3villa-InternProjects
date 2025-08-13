const express = require("express");
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',        
    user: 'root',             
    password: '1234',  
    database: 'sys'       
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected successfully!');
});

app.get("/",(req,res)=>{

});

app.listen(5000,()=>{
    console.log("server is ready");
});