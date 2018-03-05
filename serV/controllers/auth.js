import User from "../models/user";

export const signup = async (req,res,next) => {
    const creditionals = req.body;

    let user;

    try {
        user = User.create(creditionals);
    } catch(e) {
        return next(e);
    }

    res.json(user)
}

export const signin = async (req,res,next) => {
    res.json('signin');
}



