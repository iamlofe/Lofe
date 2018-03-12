import * as UserService from "../services/service";

export async function getCurrentUser(req, res, next) {
    const {token} = req;

    try {
        var user = await UserService.getUserByToken(token); 
    }catch({message}) {
        return next({
            status:500,
            message:"Get not"
        })
    }
    return res.json(user);
}