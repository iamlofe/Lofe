import Pages from "../models/pages"

export default async (req, res, next) => {
    const pageData = req.body;
    const userId = req.session.user;

    pageData.userId = userId;
    try {
        var page = await Pages.create(pageData)
    } catch ({message}) {
        return next({
            status:301,
            message,
        })
    } 
    res.json(page)
}
