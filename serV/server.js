import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import session from "express-session";
import bluebird from "bluebird";
import authRouter from "./rootes/auth";
import config from "./config/index";


import User from "./models/user";
import {Schema} from "mongoose";

mongoose.Promise = bluebird;
mongoose.connect(config.dataBase, err => {
    if (err) throw err;

    console.log("Mongoose has connected")
})

const app = express();

app.listen(config.port, err => {
    if(err) throw err;
    console.log(`server listening on port ${config.port}`);
})

app.get('/', (req,res) => {
    
})
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:config.secretKey
}))

////////////////////////

const signup = async (req,res,next) =>{
    const creditionals = req.body;

    let user;

    try {
        user = await User.create(creditionals);
    } catch(e) {
        return next(e);
    }

    res.json(user)
}

function signin(req,res,next){
    res.json('signin');
}

app.use('/api/signin', signin);
app.use('/api/signup', signup);




