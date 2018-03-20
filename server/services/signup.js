import User from "../models/user";

export default async (req,res,next) => {
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
}