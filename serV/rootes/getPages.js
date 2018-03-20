import Pages from "../models/pages";

import express from "express";
const router = express.Router();

router.post('/pages', async (req, res, next) => {
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
})


// router.post('/allPages', async (req, res, next) => {
//     try {
//         var pages = await Pages.find({});
//     } catch ({message}) {
//         return next({
//             status:301,
//             message
//         })
//     }
//     res.json(pages)
// })

export default router;