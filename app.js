const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const connectDB = require("./config/db");

// Connect to database
connectDB();
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);
app.use(flash());
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.get("/", (req, res) => {
    res.render("index");
});

const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`server running on port ${port}`));
