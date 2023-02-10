const mongoose = require("mongoose");


const CardSchema = new mongoose.Schema({
    buissenes_Name: String,
    address: String ,
    phone: String,
    picture: String,
    user_id: String
})

const cardModel = mongoose.model("card", CardSchema);


module.exports = cardModel;