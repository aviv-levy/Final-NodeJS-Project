const JOI = require("joi");
const userModelScheme = require('./userModelScheme');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userModel {

    constructor(object) {
        this.name = object.name;
        this.email = object.email;
        this.password = object.password;
        this.biz = object.biz;
    }
    //Validate new user value by JOI
    validateSignUpUser() {

        const userSchema = JOI.object({
            name: JOI.string().min(2).max(40).pattern(new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/)).required(),
            email: JOI.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: JOI.string().min(6).max(30).required(),
            biz: JOI.boolean()
        });

        const result = userSchema.validate(this, { abortEarly: false });

        return result.error ? result.error : null;
    }

    //Validate login user value by JOI
    validateSignInUser() {
        const userSchema = JOI.object({
            name: JOI.string(),
            email: JOI.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: JOI.string().min(6).max(30).required(),
            biz: JOI.boolean()
        });

        const result = userSchema.validate(this, { abortEarly: false });

        return result.error ? result.error : null;
    }

    //Save new user to database.
    async saveUser() {
        try {
            const user = new userModelScheme({
                name: this.name,
                email: this.email,
                password: await bcrypt.hash(this.password, 10),
                biz: false
            })
            await user.save();
        } catch (err) {

        }
    }

    //Return token if succeed to login
    async signIn() {

        try {
            const user = await userModelScheme.findOne({ email: this.email });
            if (await bcrypt.compare(this.password, user.password.toString())) {
                return jwt.sign({ id: user.id, biz: user.biz }, process.env.SECRET, { expiresIn: '15m' });
            }
            return false;
        } catch (err) {

        }
    }

    async findUserInfoById() {
        try {
            const user = await userModelScheme.findOne({ id: this.id }).lean() ;
            delete user.password;
            return user;
        } catch (err) {

        }
    }
}

module.exports = userModel;