const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/user');

const app = express();

dotenv.config();

Mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log(err)
    }
    else (
        console.log("database connected successfully")
    )
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.json("hello amazon clone")
})

app.post("/", (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json("saved successfully")
        }
    })
})

app.listen(3000, err =>{
    if (err) {
        console.log(err)
    }
    else {
        console.log("listening on port", 3000)
    }
});