import express from "express"

import jwt from "jsonwebtoken"
import config from "../config/index";
const router = express.Router();

import * as UserService from "../services/service";


router.get('/current-user', async (req, res, next) => {
    const {token} = req;

    try {
        var user = await UserService.getUserByToken(token); 
    }catch({message}) {
        return next({
            status:500,
            message
        })
    }
    return res.json(user);
})

export default router;


// router.post('/signup',async (req,res,next) =>{
//     const creditionals = req.body;
    
//     let user;

//     try {
//         user = await User.create(creditionals);
//     } catch({message}) {
//         return next({
//             status:400,
//             massage,
//         });
//     }

//     res.json(user);
// });


// router.post('/signin', async (req,res,next) => {
//     let {login, password} = req.body;

//     const user = await User.findOne({login, password});
    
//     if(user) {
//         return next({
//             status: 400,
//             message: "User not found",
//         })
//     }
    
//     try {
//         const result = await user.comparePasswords(password);
//     } catch(e) {
//         return next({
//             status:400,
//             message:"Bad credentials",
//         })
//     }

//     const token = jwt.sign({ _id:user._id},config.secretKey);

//     res.json(user);
//     res.json(token);
// });



