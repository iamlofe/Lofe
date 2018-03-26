import jwt from "jsonwebtoken";
import config from "../config/index";

export default async (req,res,next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return next({
            status:403,
            message:"No Token",
        })
    }

    try {
        var tokenObj = jwt.verify(token, config.secretKey)
    } catch({message}) {
        return next({
            status:400,
            message,
        })
    }

    req.token = tokenObj;
    console.log(tokenObj);

    next();
}