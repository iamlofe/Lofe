import express from "express"

import * as authControllers from "../controllers/auth"
const router = express.Router();

router.post('/signup', (req,res) => {
    console.log(11111111)
});

export default router;

