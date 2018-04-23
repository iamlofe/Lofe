import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import session from 'express-session';
import {Schema} from 'mongoose';
import bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import path from 'path';
import multer from 'multer';
import busboyBodyParser from 'busboy-body-parser';
import methodOverride from 'method-override';
import crypto from 'crypto';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import Img from './models/img';
import fs from 'fs';
//Img2
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';

//External modules
import router from './rootes/routers';
import config from './config/config';
import handler from './middlewares/errorHandler';

import passport from 'passport';
import session from 'express-session';
// const RedisStore = require('connect-redis')(session);
import flash from 'connect-flash';

const MongoStore = require('connect-mongo')(session);

//Create app
const app = express();
mongoose.Promise = bluebird;

import clientSessions from 'client-sessions';

//Flash for info
app.use(flash());
//Img
app.use(cors({origin: '*'}));
app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser());
// app.use(cookieParser({secret: 'secrettexthere'}));

app.use(
  session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true
    // using store session on MongoDB using express-session + connect
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(
  bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000})
);

//Img
app.use(methodOverride('_method'));
const conn = mongoose.createConnection(config.dataBase);
let gfs;
conn.once('open', () => {
  // Init stream
  console.log('connected to Mongo');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: config.dataBase,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({storage});

app.use('/static', express.static('./static'));

app.use(corsPrefetch);

//Create mongoose and connection with server
mongoose.connect(config.dataBase, err => {
  if (err) throw err;
  console.log('Mongo has connected');
});

//Start server
app.listen(config.port, err => {
  if (err) throw err;
  console.log(`server listening on port ${config.port}`);
});

//Passport

require('./config/passport')(passport);
require('./config/authfacebook')(passport);
require('./config/authGoogle')(passport);

//Main page
app.get('/', (req, res) => {
  res.json('Main');
});

//Router
app.use('', router);

//Error handler
app.use(handler);
