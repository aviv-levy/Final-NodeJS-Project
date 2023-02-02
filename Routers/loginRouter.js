const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel.js');


// http://localhost:3000/login/signin
router.post('/signin', async (req, res) => {
    try {
        const signInUser = new userModel(req.body);

        res.status(200).json(await signInUser.signInUser());
    } catch (err) {
        res.status(500).send(err.message);
    }
})











module.exports = router;