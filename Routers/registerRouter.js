const express = require("express");
const router = express.Router();
const userModel = require('../Models/userModel.js');

// http://localhost:3000/register/signup
router.post('/signup', async (req, res) => {
    try {
        const signupUser = new userModel(req.body);
        const errors = signupUser.validateSignUpUser();

        if (errors)
            return res.status(400).send(errors);

        await signupUser.saveUser();

        res.status(201).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
})






module.exports = router;