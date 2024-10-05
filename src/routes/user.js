const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending connection request for the loggedIn user
userRouter.get("/user/request/recieved",userAuth,async(req,res)=>{
   try {
      const loggedInUser = req.user;

      const connectionRequest = await ConnectionRequest.find({
         toUserId:loggedInUser,
         status:"interested"
      }).populate("fromUserId",["firstName","lastName","photoUrl","age","skills","about"])

      
        res.json(
        { 
            status: "success",
            message:"data fetch successfully",
            data:connectionRequest
        })


   } catch (error) {
     res.status(400).json({
        message:"ERROR: "+error
     })
   }
});

module.exports = userRouter;
