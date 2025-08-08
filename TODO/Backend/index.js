const express = require("express");
const cors  = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
let todos=[];

app.put('/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos[index] = {
            ...todos[index],    
            ...req.body           
        };

        return res.status(200).json({ message: "Todo updated successfully"});
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});


app.delete('/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = todos.findIndex(todo => todo.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos.splice(index, 1);

        return res.status(200).json({ message: "Delete successful!" });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});

app.post('/todos',(req,res)=>{
     try{
         todos.push({...req.body,id:todos.length+1});
         return res.status(200).json({"message":"add successful !"});
    }catch(err){
        return res.status(500).json({"message":"something went wrong"});
    }
});

app.get('/todos', (req, res) => {
    try{
        return res.status(200).json(todos);
    }catch(err){
        return res.status(500).json({"message":"something went wrong"});
    }
     
});

app.listen(3001, () => {
    console.log("hello server");
});
