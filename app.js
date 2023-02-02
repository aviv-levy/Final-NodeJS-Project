const port = 3000;

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const registerRouter = require('./Routers/registerRouter.js')
const loginRouter = require('./Routers/loginRouter.js')

app.use(bodyParser.json())

async function main() {
    await mongoose
        .connect(process.env.DATABASE)
        .then(() => {
            console.log("conected to Mongo");
        })
        .catch(() => {
            console.log("something in mongo went wrong");
        });
}

main();



app.use('/register', registerRouter)
app.use('/login', loginRouter)

app.listen(port, () => {
    console.log('Server is running...');
})
