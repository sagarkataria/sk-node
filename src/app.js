const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user")
const app = express();

app.post('/signup',async (req,res)=>{
    
    const user = new User({
        firstName : "Virat",
        lastName : "Singh",
        emailId : "sagar@gmail.com",
        password : "sagar123"
    });
   await user.save(); 
   res.send("User saved successfully")
})

connectDB().then(() => {
    console.log("Connected to MongoDB")
    app.listen(7777, () => {
        console.log(`Server successfully listening on port http://localhost:${7777}`);
    });
}).catch((err) => {
    console.log(err.message)
})



