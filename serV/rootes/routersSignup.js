import express from "express";
import User from "../models/user";

const router = express.Router();

router.post('/signup', async (req,res,next) =>{
    const creditionals = req.body;
    
    let user;

    try {
        user = await User.create(creditionals);
    } catch({message}) {
        return next({
            status:400,
            message,
        });
    }

    res.json(user);
})

export default router;
