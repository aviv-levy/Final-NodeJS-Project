const express = require("express");
const router = express.Router();
const userModel = require('../Models/userModel.js');


// http://localhost:3000/login/signin
router.post('/signin', async (req, res) => {
    try {
        const signInUser = new userModel(req.body);
        const errors = signInUser.validateSignUpUser();

        if (errors)
            return res.status(400).send(errors);

        const token = await signInUser.signIn();
        token ? res.status(200).cookie('token',token).send('Logged In') : res.status(403).send('Not authorized');
    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;