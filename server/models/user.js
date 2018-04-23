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
  name: {type: String},
  password: {type: String},
  wishList: {type: Array},
  contacts: {
    phone: {type: Number, default: ''},
    instagram: {type: String, default: ''},
    skype: {type: String, default: ''},
    viber: {type: String, default: ''},
    telegram: {type: String, default: ''},
    vk: {type: String, default: ''},
    facebook: {type: String, default: ''}
  },
  housesIds: {type: Array},
  reviewIds: {type: Array},
  visitedIds: {type: Array},
  notifications: {
    all: {type: Array},
    unrad: {type: Array}
  },
  approved: {type: Number},
  isLogged: {type: Boolean}
});

export default mongoose.model('User', userScheme);
