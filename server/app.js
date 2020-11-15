// DEPENDENCIES
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { client } = require("./dataBase/index");
// ROUTERS
const authRouter = require("./routes/auth.js");
const movieRouter = require("./routes/movie.js");

const app = express();
client.connect();

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
app.use("/api/movie/", movieRouter);

module.exports = app;
