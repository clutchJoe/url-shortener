const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const dotenv = require("dotenv");

const urlSchema = require("../models/Url");

dotenv.config();

router.post("/shorten", async (req, res) => {
    let errors = [];
    const { longUrl } = req.body;
    // console.log(req.body);
    const baseUrl = process.env.BASE_URL;
    if (!validUrl.isUri(baseUrl)) {
        errors.push({ msg: "Invalid base url" });
        res.render("index", { errors });
    }
    // Create url code
    const urlCode = shortid.generate();

    // Check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await urlSchema.findOne({ longUrl });
            if (url) {
                res.render("index", { succ_msg: `${url.shortUrl}` });
            } else {
                const shortUrl = baseUrl + "/" + urlCode;
                url = new urlSchema({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                res.render("index", { succ_msg: `${shortUrl}` });
            }
        } catch (err) {
            // console.error(err);
            errors.push({ msg: "Server error" });
            res.render("index", { errors });
            // res.status(500).json("Server error");
        }
    } else {
        errors.push({ msg: "Invalid long url" });
        res.render("index", { errors });
        // res.status(401).json("Invalid long url");
    }
});

module.exports = router;
