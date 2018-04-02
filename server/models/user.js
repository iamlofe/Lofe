import mongoose, {Schema} from 'mongoose';
//import bcrypt from "bcrypt-nodejs";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import config from '../config/config';
import jwt from 'jsonwebtoken';

const userScheme = new Schema({
  email: {type: String, unique: true},
  username: {
    type: String,
    unique: true,
    lowercase: true,
    index: {unique: true}
  },
  password: {type: String},
  wishList: {type: Array},
  contacts: {
    email: {type: String},
    numberPhone: [
      {
        type: Number
      }
    ],
    skype: {type: String, default: 'Not indicated'},
    viber: {type: String, default: 'Not indicated'},
    telegram: {type: String, default: 'Not indicated'},
    vk: {type: String, default: 'Not indicated'},
    facebook: {type: String, default: 'Not indicated'}
  },
  housesIds: {type: Array},
  visitedIds: {type: Array},
  notifications: {
    all: {type: Array},
    unrad: {type: Array}
  },
  approved: {type: Number}
});

//Must modifier
userScheme.pre('save', async function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
    });
  });
});

userScheme.methods.comparePasswords = function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userScheme);
