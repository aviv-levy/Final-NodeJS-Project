const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    biz: Boolean,
})

const userModel = mongoose.model("user", UserSchema);


module.exports = userModel;