<<<<<<< HEAD
import handler from "./middlewares/errorHandler";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import session from "express-session";
import bluebird from "bluebird";

import config from "./config/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import router from "./rootes/signinFromToken";

import routersSignup from "./rootes/routersSignup";
import routersSignin from "./rootes/routersSignin";
import getPages from "./rootes/getPages";
import routerImages from "./rootes/routerImages"

import checkToken from "./middlewares/checkToken";
import {Schema} from "mongoose";
=======
import handler from './middlewares/errorHandler';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import bluebird from 'bluebird';

import config from './config/index';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import router from './rootes/signinFromToken';

import routersSignup from './rootes/routersSignup';
import routersSignin from './rootes/routersSignin';

import checkToken from './middlewares/checkToken';
import {Schema} from 'mongoose';
import cors from 'cors';
>>>>>>> 0df6a89c7912c9941666356b6b1de7fdd1ccef61

//img


Grid.mongo = mongoose.mongo;
mongoose.Promise = bluebird;
const mg = mongoose.createConnection(config.dataBase);

mongoose.connect(config.dataBase, err => {
  if (err) throw err;

  console.log('Mongo has connected');
});


let gfs;
mg.once('open', async(req,res) => {
    gfs = Grid(mg.db, mongoose.mongo)
    gfs.collection('uploads')

})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return (res, err) => {
        crypto.randomBytes(16, (err, req) => {
          if (err) {
            return reject(err);
          }

          const filename = req.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          next({fileInfo});
        });
      };
    }
  });
  const upload = multer({ storage });




app.listen(config.port, err => {
  if (err) throw err;
  console.log(`server listening on port ${config.port}`);
});

app.use(cors({origin: '*'}));

<<<<<<< HEAD
app.get('/', (req,res) => {
    
})
=======
app.get('/', (req, res) => {
  res.send('hi');
});
>>>>>>> 0df6a89c7912c9941666356b6b1de7fdd1ccef61
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: config.secretKey
  })
);

////////////////////////

app.use('/api', routersSignin);
app.use('/api', routersSignup);
app.use('/api', router);
app.use('/api', getPages)
//img
app.use('/api', routerImg)


app.use(handler);
