const express = require("express");
const router = express.Router();

const { listMovies, readMovie } = require("../controllers/movieController");

// Route that list all the movies
router.get("/", listMovies);
// Route that read a specific movie using the id
router.get("/:movieId", readMovie);

module.exports = router;
