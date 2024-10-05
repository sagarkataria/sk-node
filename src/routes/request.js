const express = require('express');
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignore"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status: " + status })
        }
        const toUser = await User.findById(toUserId);
        //  console.log(toUser)
        if (!toUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ],
        });
        if (existingConnectionRequest) {
            return res.status(400).json({
                status: "failed",
                message: "Connection request already exists!!"
            });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.json({
            status: "success",
            message: "Connection request sent successfully",
            data,
        });




    } catch (error) {
        res.status(400).send("ERROR: " + error.message);

    }
});

module.exports = requestRouter;