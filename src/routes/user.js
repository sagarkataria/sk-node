const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

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

// get connection 

userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
           $or:[
                {toUserId:loggedInUser._id , status:"accepted"},
                {fromUserId:loggedInUser._id , status:"accepted"},
           ],
        }).populate("fromUserId",USER_SAFE_DATA);

        const data = connectionRequest.map((row)=>row.fromUserId);

        res.json({
            status: "success",
            message: "data fetch successfully",
            data
        })
    } catch (error) {
        res.status(400).json({
            status:"faild",
            message:"ERROR: "+error.message
        })
    }
});

module.exports = userRouter;
