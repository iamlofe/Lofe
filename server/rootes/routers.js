import express from 'express';

// import User from "../models/user";
import House from '../models/house';

import signin from '../services/signin';
import signup from '../services/signup';
import createHouse from '../services/createHouse';
import search from '../services/search';
import checkUser from '../services/checkUser';
import addToWishList from '../services/addToWishList';
import getWishList from '../services/getWishList';
import removeFromWishList from '../services/removeFromWishList';
import img from '../services/img';
import getFilteredWishList from '../services/getFilterWishList';
import addReview from '../services/addReview';
import reviews from '../services/reviews';
import order from '../services/order';
import isLoggedIn from '../services/isLoggedIn';
import aboutUser from '../services/aboutUser';
import getHouse from '../services/getHouse';
import passport from 'passport';
import multer from 'multer';
import authFacebook from '../services/authFacebook';
import authGoogle from '../services/authGoogle';
import changeProfile from '../services/setProfile';
import showreview from '../services/showreview';
import logout from '../services/logout';
import searcha from '../services/searcha';

import mustAuthenticatedMw from '../services/mustAuthenticatedMw';

const router = express.Router();

// Router fro signin

// Router for signup
router.post('/user/signup', signup);

router.post('/user/signin', signin);

router.get('/user/logout', logout);

// router.get('/user.logout', passport.authenticate('google', {scope: ['profile']})

//Router for create pages
router.post('/add-house', createHouse);

//Add to wish list
router.post('/user/addToWishList', addToWishList);

router.post('/user/changeProfile', changeProfile);
//Get WishList
router.post('/user/getWishList', getWishList);

//Remove from wishList
router.post('/removeFromWishList', removeFromWishList);

//Get filter wishlist
router.post('/getFilteredWishList', getFilteredWishList);

//Add comments
router.post('/house/:houseId/addReview', addReview);

//Auth facebook
router.get('/auth/facebook', authFacebook);

//Auth google
router.get(
  '/auth/google',
  passport.authenticate('google', {scope: ['profile']})
);

router.get(
  '/auth/google/redirect',
  passport.authenticate('google'),
  (req, res, next) => {
    res.send(req.user);
  }
);

// router.get('/auth/google/redirect', authGoogle);

//Router for get comments
router.get('/house/:houseId', getHouse);

//Search
// router.get('/house/search', search);

// router.get('/house/searcha', searcha);

//
router.get('/review/:reviewId', showreview);

//Check user
router.get('/checkUser', checkUser);

//Show reviews
router.get('/house/:houseId/reviews', reviews);

//Take order
router.post('/house/:houseId/order', order);

//Add reviews
router.post('/user/isLoggedIn', isLoggedIn);

//About user
router.get('/user/:userId', aboutUser);

export default router;
