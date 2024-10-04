const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('../utils/validation')
const User = require("../models/user")
const {userAuth}  = require("../middlewares/auth");

const authRouter = express.Router();

// sign up
authRouter.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("User saved successfully")
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

// login 
authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Invalid credential");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT()
            res.cookie("token", token)
            res.send("Login Successfull");
        } else {
            throw new Error("Invalid credential");
        }

    } catch (error) {
        res.status(400).send("Error: " + error);
    }
})

// logout
authRouter.get('/logout',async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout Successfull");
});

module.exports = authRouter;