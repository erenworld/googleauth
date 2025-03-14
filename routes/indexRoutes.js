import express from "express";
import { getGoogleAuthURL } from "../utils/googleAuth.js";

const router = express.Router();

router.get("/", (req, res) => {
    const authURL = getGoogleAuthURL();
    res.redirect(authURL);
})

export default router;
