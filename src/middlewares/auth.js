const jwt = require('jsonwebtoken');
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            return res.status(401).send("Please Login!");
        }

        const decodeData = await jwt.verify(token, "DEVSagar263");

        const { _id } = decodeData;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user
        next();
    }  catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
}

module.exports = {
    userAuth,
}