import express from 'express';

// import User from "../models/user";
import House from '../models/house';

import signin from '../services/signin';
import signup from '../services/signup';
import createHouse from '../services/createHouse';
import getHouse from '../services/getHouse';
import search from '../services/search';
import createComment from '../services/addComment';
import getUser from '../services/getUser';
import checkUser from '../services/checkUser';
import addToWishList from '../services/addToWishList';
import getWishList from '../services//getWishList';

//
import userF from '../services/getF';

const router = express.Router();

// Router fro signin
router.post('/signin', signin);

// Router for signup
router.post('/signup', signup);

//Router for create pages
router.post('/add-house', createHouse);

//Create comment
router.post('/createComment', createComment);

//Add to wish list
router.post('/addToWishList', addToWishList);

//Get WishList
router.post('/getWishList', getWishList);

//Get user
router.post('/get', userF);

//Router for get pages
router.get('/about', getHouse);

//Search
router.get('/search', search);

//Get user
router.get('/getUser', getUser);

//Check user
router.get('/checkUser', checkUser);

export default router;
