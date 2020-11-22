const express = require("express");
const router = express.Router();

const { verifyAuth } = require("../helpers/verifyAuth");

const {
  listMovies,
  readMovie,
  createMovie,
  updateMovie,
  likeMovie,
  paginateMovies,
  numberOfPages,
  listMostLiked,
  deleteMovie,
} = require("../controllers/movieController");

// Route that list all the movies
router.get("/", listMovies);
// Route that read a specific movie using the id
router.get("/:movieId", readMovie);
// Route that create a movie
router.post("/", verifyAuth, createMovie);
// Route that update a movie
router.put("/like/:movieId", verifyAuth, likeMovie);

router.use((req, res, next) => {
  if (!req.session.maxPages) {
    req.session.maxPages = 10;
    next();
  } else next();
});
// Route that get movies for a specific page
router.get(
  "/page/nbmovies=:moviesPerPage&pagenumber=:pageNumber",
  paginateMovies
);
// Route that get the max number of pages
router.get("/number/:moviesPerPage", numberOfPages);
// Route that list the most liked movies
router.get("/carousel/most-liked", listMostLiked);
// Route that delete a movie
router.delete("/delete/:movieId", verifyAuth, deleteMovie);

module.exports = router;
