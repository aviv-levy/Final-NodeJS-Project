const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    biz: Boolean,
})

const userModel = mongoose.model("user", UserSchema);


module.exports = userModel;