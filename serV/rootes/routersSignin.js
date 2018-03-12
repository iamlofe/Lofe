import express from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/index"

const router = express.Router();

router.post('/signin', async (req,res,next) => {
    let {login, password} = req.body;

    const user = await User.findOne({login});
    
    if(!user) {
        return next({
            status: 400,
            message: "User not found",
        })
    }
    try {
        const result = await user.comparePasswords(password);

        if(user.password !== password) {
            return next({
                status:401,
                message:"encorrect"
            })
        }
    }catch(e) {
        return next({
            status:401,
            message:"error send"
        })
    }

    const token = jwt.sign({_id:user._id}, config.secretKey);
    res.json(user);
    
});

export default router;
