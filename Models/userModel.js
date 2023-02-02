const JOI = require("joi");
const userModelScheme = require('./userModelScheme');
const bcrypt = require('bcrypt');

class userModel {

    constructor(object) {
        this.id = object.id;
        this.name = object.name;
        this.email = object.email;
        this.password = object.password;
        this.biz = object.biz;
    }
    //Validate user value by JOI
    validateUser() {

        const userSchema = JOI.object({
            id: JOI.number().min(1),
            name: JOI.string().min(2).max(40).pattern(new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/)),
            email: JOI.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: JOI.string().min(6).max(30),
            biz: JOI.boolean()
        });

        const result = userSchema.validate(this, { abortEarly: false });

        return result.error ? result.error : null;
    }

    //Save new user to database.
    async saveUser() {

        const user = new userModelScheme({
            id: this.id,
            name: this.name,
            email: this.email,
            password: await bcrypt.hash(this.password,10),
            biz: this.biz
        })
        await user.save();
    }


    async signInUser() {
        return await userModelScheme.findOne({ email: this.email });
    }
}

module.exports = userModel;