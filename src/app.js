const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user")
const app = express();

app.use(express.json());

app.post('/signup',async (req,res)=>{
    const user = new User(req.body);
    try {
        await user.save(); 
        res.send("User saved successfully")
    } catch (error) {
        res.status(400).send("Error saving the user: " + error.message)
    }
})

connectDB().then(() => {
    console.log("Connected to MongoDB")
    app.listen(7777, () => {
        console.log(`Server successfully listening on port http://localhost:${7777}`);
    });
}).catch((err) => {
    console.log(err.message)
})



