const express = require("express");
const router = express.Router();
const verifyToken = require('./verifyToken')
const mongoose = require('mongoose')
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
        const errors = newCard.validateCard();

        if (errors)
            return res.status(400).send(errors);

        await newCard.saveCard();

        res.status(201).send('New card created');
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:3000/homepage/card/:CardID
router.get('/card/:id', verifyToken, async (req, res) => {
    try {
        const cardID = req.params.id;
        const card = await cardModelScheme.findOne({ _id: cardID });
        res.status(202).json(card);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:3000/homepage/editCard/:CardID
router.put('/editCard/:id', verifyToken, async (req, res) => {
    try {
        const cardID = req.params.id;
        const card = new cardModel(req.body);
        const errors = card.validateCard();

        if (errors)
            return res.status(400).send(errors);

        await cardModelScheme.updateOne({ _id: cardID }, card);
        res.status(200).send(card.buissenes_Name+' updated Successfuly')
    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:3000/homepage/deleteCard/:CardID
router.delete('/deleteCard/:id', verifyToken, async (req, res) => {
    try {
        const cardID = req.params.id;
        await cardModelScheme.deleteOne({ _id: cardID });
        res.status(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:3000/homepage/myCards
router.get('/myCards', verifyToken, async (req, res) => {
    try {
        const cards = await cardModelScheme.find({ user_id: req.body.id });
        res.status(202).json(cards);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;