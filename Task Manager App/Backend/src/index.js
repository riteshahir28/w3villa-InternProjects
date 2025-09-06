import app from './app.js'
import db from './config/db.js'

(async ()=>{
    try{
        await db.authenticate();
        await db.sync()  
        console.log("Database connection successful!");
    }catch(err){
        console.log("Database connection error:", err);
    }
})();



app.listen(5000,()=>{
    console.log("Server started on port 5000!");
});