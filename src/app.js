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

app.get('/user',async (req,res)=>{
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({emailId:userEmail});
        if(!user){
            res.status(404).send('User not found');
        }else{
            res.send(user);
        }
    } catch (error) {
        res.status(400).send("Something went wrong");
    }

    // try {
    //    const user =  await User.find({'emailId':userEmail});
    //    if(user.length===0){
    //      res.status(404).send("User not found");
    //    }else{
    //      res.send(user);
    //    }
    // } catch (error) {
    //     res.status(400).send("Something went wrong");
    // }
});



app.get('/feed',async(req,res)=>{
    try {
        const users = await User.find({});
        if(users.length===0){
            res.status(404).send("No users found");
        }else{
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("Something went wrong");
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



