import express from 'express';

// import User from "../models/user";
import House from '../models/house';

import signin from '../services/signin';
import signup from '../services/signup';
import createHouse from '../services/createHouse';
import getHouse from '../services/getHouse';
import search from '../services/search';
import getUser from '../services/getUser';
import checkUser from '../services/checkUser';
import addToWishList from '../services/addToWishList';
import getWishList from '../services/getWishList';
import removeFromWishList from '../services/removeFromWishList';
import img from '../services/img';
import getFilteredWishList from '../services/getFilterWishList';
import addReview from '../services/addReview';
import reviews from '../services/reviews';
import order from '../services/order'

import multer from "multer"

//
import userF from '../services/getF';

const router = express.Router();

// Router fro signin
router.post('/signin', signin);

// Router for signup
router.post('/signup', signup);

//Router for create pages
router.post('/add-house', createHouse);

//Add to wish list
router.post('/addToWishList', addToWishList);

//Get WishList
router.post('/getWishList', getWishList);

//Remove from wishList
router.post('/removeFromWishList', removeFromWishList);

//Get filter wishlist
router.post('/getFilteredWishList', getFilteredWishList);

//Add comments
router.post('/house/:houseId/addReview', addReview);

//Get user
router.post('/get', userF);

//Add images!!!!!!
// const upload = multer({ storage });
// router.post('/img', upload.single('file'), img);

//Router for get pages
router.get('/house/:houseId', getHouse);

//Search
router.get('/search', search);

//Get user
router.get('/getUser', getUser);

//Check user
router.get('/checkUser', checkUser);

//Show reviews
router.get('/house/:houseId/reviews', reviews);

//Take order
router.post('/house/:houseId/order', order)


export default router;
