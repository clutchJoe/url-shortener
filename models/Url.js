const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        urlCode: {
            type: String,
            required: true
        },
        longUrl: {
            type: String,
            required: true
        },
        shortUrl: {
            type: String,
            required: true
        },
        date: { type: String, default: Date.now }
    },
    { collation: "urls" }
);

module.exports = mongoose.model("urlSchema", urlSchema, "urls");
