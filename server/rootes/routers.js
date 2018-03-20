import express from "express";

// import User from "../models/user";
import Pages from "../models/pages";

import signin from "../services/signin";
import signup from "../services/signup";
import createPages from "../services/createPages";
import getPages from "../services/getPages";

const router = express.Router();


// Router fro signin
router.post('/signin', signin);

// Router for signup
router.post('/signup', signup)

//Router for create pages
router.post('/createPages', createPages)

//Router for get pages
router.get('/getPages', getPages)


export default router;