import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import { Schema } from 'mongoose';
import bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import path from "path";
import multer from "multer";
import busboyBodyParser from "busboy-body-parser";
import methodOverride from "method-override";
import crypto from "crypto"
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import Img from "./models/img";
import fs from "fs";


//External modules
import router from './rootes/routers';
import config from './config/config';
import handler from './middlewares/errorHandler';

//Create app
const app = express();

//Connect to modules
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		// resave: true,
		// saveUninitialized: true,
		secret: config.secretKey
	})
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

//Img
app.use(methodOverride('_method'));
const conn = mongoose.createConnection(config.dataBase);
let gfs;
conn.once('open', () => {
	// Init stream
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
const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
	let data = req.file;
	let img;
	try {
		// img = await Img.create(data);
		res.send(data);
	} catch ({ message }) {
		return next({
			status: 301,
			message,
		})
	}
});

app.get('/uploads', (req, res) => {
	let img, readstream;
	let data = req.query.q;
	console.log(data);
	// readstream = gfs.createReadStream(data);
	// readstream.pipe(res);
	gfs.files.find().toArray((err, files) => {
		if (!files) {
			res.send("No files")
		} else {
			files.map(file => {
				file.isImage = true;
			})
		}
		res.send({ files })
	})
});

//Create mongoose and connection with server
mongoose.Promise = bluebird;
mongoose.connect(config.dataBase, err => {
	if (err) throw err;
	console.log('Mongo has connected');
});

//Start server
app.listen(config.port, err => {
	if (err) throw err;
	console.log(`server listening on port ${config.port}`);
});

//Main page
app.get('/', (req, res) => {
	res.json('Main');
});
//Router
app.use('', router);

//Error handler
app.use(handler);
