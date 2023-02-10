const JOI = require("joi");
const cardModelScheme = require('./cardModelScheme');
const jwt = require('jsonwebtoken');

class cardModel {

    constructor(object) {
        this.buissenes_Name = object.buissenes_Name;
        this.address = object.address;
        this.phone = object.phone;
        this.picture = object.picture;
        this.user_id = object.id;
    }

        //Validate new card values by JOI
        validateNewCard() {

            const cardSchema = JOI.object({
                buissenes_Name: JOI.string().min(2).max(40).pattern(new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/)),
                address: JOI.string().min(4).max(50).required(),
                phone: JOI.string().min(10).max(23).pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
                picture: JOI.string().min(10),
                user_id:JOI.string().min(2).max(30).required()
            });
    
            const result = cardSchema.validate(this, { abortEarly: false });
    
            return result.error ? result.error : null;
        }

        async saveCard() {
            try {
                const card = new cardModelScheme({
                    buissenes_Name: this.buissenes_Name,
                    address: this.address,
                    phone: this.phone,
                    picture: this.picture,
                    user_id: this.user_id
                })
                await card.save();
            } catch (err) {
    
            }
        }
        
}

module.exports = cardModel;
