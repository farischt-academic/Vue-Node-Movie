// DEPENDENCIES
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// ROUTERS
const authRouter = require("./routes/auth.js");

const app = express();

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "grehjznejzkhgjrez",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(express.static(path.join(__dirname, "../client")));

// ROUTE MIDLLEWARES
app.use("/api/auth/", authRouter);

module.exports = app;
