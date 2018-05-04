import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
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
//Img
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
//External modules
import router from './rootes/routers';
import config from './config/config';
import handler from './middlewares/errorHandler';
import passport from 'passport';
// import session from 'express-session';
import flash from 'connect-flash';
//
import cookieSession from 'cookie-session';
import expressSession from 'express-session';
import searcha from './services/searcha';

//Create app
// const app = express();
mongoose.Promise = bluebird;

//////////////////////////////////////////////////////

// require('./config/passport').default(passport);

//////////////////////////////////////////////////////

/////////////////////////////////////////////////////
//Img
// const conn = mongoose.createConnection(config.dataBase);
// let gfs;
// conn.once('open', () => {
//   // Init stream
//   console.log('connected to Mongo');
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: config.dataBase,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({storage});

//Create mongoose and connection with server
mongoose.connect(config.dataBase, err => {
  if (err) throw err;
  console.log('Mongo has connected');
});

//Start server
const app = express();
app.listen(config.port, err => {
  if (err) throw err;
  console.log(`server listening on port ${config.port}`);
});
// app.use(flash());
app.use(cors({origin: '*'}));
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(
// 	bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000})
// );
///
// app.use(bodyParser());
// app.use(bodyParser.urlencoded({extended: true}));

// app.set('trust proxy', 1);
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use('/static', express.static('./static'));
app.use(corsPrefetch);
// app.use(passport.initialize());
// app.use(passport.session());

//Passport
// require('./config/authfacebook')(passport);
// require('./config/authGoogle')(passport);

app.post(
  '/multiple',
  imagesUpload(
    './static/multipleFiles',
    'http://localhost:3030/static/multipleFiles',
    true
  )
);

// app.post(
//   '/notmultiple',
//   imagesUpload('./static/files', 'http://localhost:3030/static/files')
// );

//Main page

//Router
app.get('/house/search', searcha);
app.use(router);

//Error handler
app.use(handler);
