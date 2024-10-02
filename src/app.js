const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user")
const app = express();

const { validateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt');

app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName,lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password,10);

        const user = new User({
            firstName,  
            lastName,
            emailId,
            password:passwordHash
        });
        await user.save();
        res.send("User saved successfully")
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({ emailId: userEmail });
        if (!user) {
            res.status(404).send('User not found');
        } else {
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

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Something went wrong ");
    }
})
// Update the user 
app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {

        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skillls"];
        const isUpdateAllow = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllow) {
            throw new Error("Update not Allow");
        }


        const user = await User.findByIdAndUpdate({ _id: userId }, data);
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("Something went wrong ");
    }
})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).send("No users found");
        } else {
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



