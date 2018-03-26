import Pages from "../models/pages";

export default async(req,res,next) => {
    let pages;
    let search = req.query;
    try {
        pages = await Pages.find({address:search.q, price: {$gte :search.minprice},price: {$lte :search.maxprice}, rating: {$lte :search.maxrating}, rating:{$gte :search.minrating}})
    } catch({message}) {
        return next({
            message:"Can't get all pages",
            status:302,
        })
    }

    res.json(pages);
}