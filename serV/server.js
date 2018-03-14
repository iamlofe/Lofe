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

mongoose.Promise = bluebird;
mongoose.connect(config.dataBase, err => {
  if (err) throw err;

  console.log('Mongo has connected');
});

const app = express();

app.listen(config.port, err => {
  if (err) throw err;
  console.log(`server listening on port ${config.port}`);
});

app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
  res.send('hi');
});
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
app.use('/api', checkToken, router);

app.use(handler);
