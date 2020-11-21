const express = require("express");
const router = express.Router();

const { verifyAuth } = require("../helpers/verifyAuth");

const {
  listMovies,
  readMovie,
  createMovie,
  likeMovie,
} = require("../controllers/movieController");

// Route that list all the movies
router.get("/", listMovies);
// Route that read a specific movie using the id
router.get("/:movieId", readMovie);
// Route that create a movie
router.post("/", verifyAuth, createMovie);
// Route that update a movie
router.put("/like/:movieId", verifyAuth, likeMovie);
module.exports = router;
