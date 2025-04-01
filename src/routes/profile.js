const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');
const profileRouter = express.Router();

//get profile
profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    throw new Error('ERROR: ' + error);
  }
});
//update profile
profileRouter.post('/profile/edit', userAuth, async (req, res) => {
    console.log("req.body", req.body);
  try {
    if (!validateEditProfileData(req)) {
      throw new Error('Invalid Edit Request');
    }
    const loggedInuser = req.user;
    console.log(loggedInuser);
    Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));
    loggedInuser.save();
    console.log(loggedInuser);

    res.json({
      message: loggedInuser.firstName + ':  your profile updated successfully',
      data: loggedInuser,
    });
  } catch (err) {
     res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
