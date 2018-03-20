import Pages from "../models/pages";

export default async(req,res,next) => {
    let pages;
    try {
        pages = await Pages.find({})
    } catch({message}) {
        return next({
            message:"Can't get all pages",
            status:302,
        })
    }

    res.json(pages);
}