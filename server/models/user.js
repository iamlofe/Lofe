import mongoose, {Schema} from 'mongoose';
//import bcrypt from "bcrypt-nodejs";
import config from '../config/config';

const userScheme = new Schema({
  email: {type: String},
  username: {
    type: String,
    unique: true,
    lowercase: true,
    index: {unique: true}
  },
  google: {
    id: {type: String},
    token: {type: String},
    email: {type: String},
    name: {type: String}
  },
  firstName: {type: String},
  lastName: {type: String},
  password: {type: String},
  wishList: {type: Array},
  facebookId: {type: String},
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
  approved: {type: Number},
  isLogged: {type: Boolean}
});

export default mongoose.model('User', userScheme);
