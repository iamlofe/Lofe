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

//External modules
import router from './rootes/routers';
import config from './config/index';
import handler from './middlewares/errorHandler';

//Create app
const app = express();

//Connect to modules
app.use(cors({ origin: '*' }));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: config.secretKey
	})
);

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
app.get('http://localhost:3000/test', async (req, res) => {
	console.log(document.cookie)
})

app.get('/cookie', (req, res) => {
	res.send(req.headers);
});
//Error handler
app.use(handler);
