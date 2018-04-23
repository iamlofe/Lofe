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
//Cokie
// import mongoStore from 'connect-mongodb@0.1.1';

import passport from 'passport';
import session from 'express-session';
const RedisStore = require('connect-redis')(session);
// import User from '../models/user';
import flash from 'connect-flash';

//Create app
const app = express();
mongoose.Promise = bluebird;

import clientSessions from 'client-sessions';

//Connect to modules
//Passport and session

//
app.use(
  session({
    cookie: {maxAge: 60000},
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false
  })
);
//Flash for info
app.use(flash());
//Img
app.use(cors({origin: '*'}));
app.use(morgan('dev'));

app.use(
  clientSessions({
    secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK' // set this to a long random string!
  })
);

//
app.use(bodyParser.json());
app.use(cookieParser());
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

/////////////////////////////////////////////////////////////////////////////////////////////

// import _multiparty from 'multiparty';

// var _multiparty2 = _interopRequireDefault(_multiparty);

// import _md5File from 'md5-file';

// var _md5File2 = _interopRequireDefault(_md5File);

// // var _fs = require('fs');

// var _fs2 = _interopRequireDefault(fs);

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function sendError(res, error) {
// 	var err = new Error(error);
// 	console.error(err);
// 	res.sendStatus(400);
// }

// function saveFile1(tempPath, savePath, servePath, fileName) {
// 	var copyToPath = savePath + '/' + fileName;
// 	try {
// 		if (!_fs2.default.existsSync(copyToPath)) {
// 			var data = _fs2.default.readFileSync(tempPath);
// 			// make copy of image to new location
// 			_fs2.default.writeFileSync(copyToPath, data);
// 			// delete temp image
// 			_fs2.default.unlinkSync(tempPath);
// 		}
// 		return {
// 			error: false,
// 			path: servePath + '/' + fileName
// 		};
// 	} catch (e) {
// 		return {
// 			error: e
// 		};
// 	}
// }

// function imagesUpload1(savePath, servePath, multiple, notRename) {
// 	var localSavePath = savePath.charAt(savePath.length - 1) === '/' ? savePath.slice(0, -1) : savePath;
// 	var localServePath = servePath.charAt(servePath.length - 1) === '/' ? servePath.slice(0, -1) : servePath;
// 	return function (req, res) {
// 		var form = new _multiparty2.default.Form();
// 		form.parse(req, function (err, fields, files) {
// 			if (err) {
// 				sendError(res, err);
// 				return;
// 			}
// 			if (files.imageFiles && files.imageFiles.length > 0) {
// 				if (multiple) {
// 					try {
// 						var respFiles = files.imageFiles.map(function (file) {
// 							var tempPath = file.path,
// 								originalFilename = file.originalFilename;

// 							var fileName = originalFilename;
// 							if (notRename !== false) {
// 								var fileExtNum = fileName.lastIndexOf('.');
// 								var fileExt = fileExtNum < 0 ? '' : fileName.substr(fileExtNum);
// 								fileName = '' + _md5File2.default.sync(tempPath) + fileExt;
// 							}

// 							var _saveFile = saveFile1(tempPath, localSavePath, localServePath, fileName),
// 								error = _saveFile.error,
// 								path = _saveFile.path;
// 							if (error) {
// 								throw error;
// 							}
// 							return path;
// 						});
// 						res.send(respFiles);
// 					} catch (e) {
// 						sendError(res, e);
// 						return;
// 					}
// 				} else {
// 					var _files$imageFiles$ = files.imageFiles[0],
// 						tempPath = _files$imageFiles$.path,
// 						originalFilename = _files$imageFiles$.originalFilename;

// 					var fileName = originalFilename;
// 					if (notRename !== false) {
// 						var fileExtNum = fileName.lastIndexOf('.');
// 						var fileExt = fileExtNum < 0 ? '' : fileName.substr(fileExtNum);
// 						fileName = '' + _md5File2.default.sync(tempPath) + fileExt;
// 					}

// 					var _saveFile2 = saveFile1(tempPath, localSavePath, localServePath, fileName),
// 						_error = _saveFile2.error,
// 						_path = _saveFile2.path;

// 					if (_error) {
// 						sendError(res, _error);
// 						return;
// 					}

// 					res.send(JSON.stringify(_path));
// 				}
// 			} else {
// 				res.sendStatus(400);
// 			}
// 		});
// 	};
// }
// //////////////////////////////////////////////////////////////////////////////////////////

// app.post('/upload', upload.single('filesInput'), (req, res) => {
// 	let data = req.file;
// 	let img;
// 	try {
// 		// img = await Img.create(data);
// 		res.send(data);
// 	} catch ({ message }) {
// 		return next({
// 			status: 301,
// 			message
// 		});
// 	}
// });

// app.get('/uploads', (req, res) => {
// 	let img, readstream;
// 	let data = req.query.q;
// 	console.log(data);
// 	readstream = gfs.createReadStream(data);
// 	readstream.pipe(res);
// 	// gfs.files.find().toArray((err, files) => {
// 	// 	if (!files) {
// 	// 		res.send('No files');
// 	// 	} else {
// 	// 		files.map(file => {
// 	// 			file.isImage = true;
// 	// 		});
// 	// 	}
// 	// 	res.send({ files });
// 	// });
// });

//IMGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
app.use('/static', express.static('./static'));
app.use(
  session({
    secret: config.secretKey,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: true}
  })
);

app.use(corsPrefetch);

// app.post(
// 	'/multiple',
// 	imagesUpload1(
// 		'./static/multipleFiles',
// 		'http://localhost:3030/static/multipleFiles',
// 		true
// 	)
// );

// app.post(
// 	'/notmultiple',
// 	imagesUpload1('./static/multipleFiles', 'http://localhost:3030/static/multipleFiles')
// );

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

app.use(passport.initialize());
app.use(passport.session());
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
