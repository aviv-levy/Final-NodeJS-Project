const express = require("express");
const router = express.Router();
const verifyToken = require('./verifyToken')
const mongoose = require ('mongoose')
const cardModelScheme = require('../Models/cardModelScheme');
const userModel = require('../Models/userModel');
const cardModel = require('../Models/cardModel');


// http://localhost:3000/homepage/myInfo
router.get('/myInfo', verifyToken, async (req, res) => {
    try {
        res.status(200).json(await new userModel(req.body).findUserInfoById())
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:3000/homepage/newCard
router.post('/newCard', verifyToken, async (req, res) => {
    try {
        const newCard = new cardModel(req.body);
        const errors = newCard.validateNewCard();

        if (errors)
            return res.status(400).send(errors);

        await newCard.saveCard();

        res.status(201).send('New card created');
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:3000/homepage/myInfo
router.get('/card/:id', verifyToken, async (req, res) => {
    try {
        const cardID = req.params.id;
        const card = await cardModelScheme.findOne({ _id: cardID });
        res.status(202).json(card);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:3000/homepage/myInfo
router.put('/editCard/:id', verifyToken, async (req, res) => {
    try {
        const cardID = req.params.id;
        
    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;