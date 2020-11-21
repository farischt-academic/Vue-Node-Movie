const { client } = require("../dataBase/index");
const slugify = require("slugify");

const { movieValidation } = require("../helpers/movieValidation");

//! GET ALL MOVIES
module.exports.listMovies = async (req, res) => {
  try {
    // We query the database to select all the movies
    const { rows } = await client.query({
      text: "SELECT * FROM movies",
    });

    // We check if the result is empty or not
    if (!rows.length)
      return res.status(400).json({ errorMessage: "No movies in database " });

    res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

module.exports.readMovie = async (req, res) => {
  if (isNaN(parseInt(req.params.movieId)))
    return res
      .status(400)
      .json({ errorMessage: "Movie id must be an integer" });

  const { movieId } = req.params;

  try {
    const { rows } = await client.query({
      text: "SELECT * FROM movies WHERE id=$1",
      values: [parseInt(movieId)],
    });

    if (!rows.length)
      return res.status(400).json({
        errorMessage: "No movie found, make sure the id is correct",
      });

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

module.exports.createMovie = async (req, res) => {
  if (isNaN(parseInt(req.body.hours)) || isNaN(parseInt(req.body.minutes)))
    return res
      .status(400)
      .json({ errorMessage: "Movie hours and minutes must be an integer" });

  const {
    title,
    description,
    url,
    hours,
    minutes,
    realisator,
    casting,
    video,
  } = req.body;

  // We set a default value to rating
  const defaultRating = 0;

  // We try to validate the body of the request
  const { error } = movieValidation(req.body);
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message });

  // We first search if a movie with the same name exists or not
  try {
    const { rows } = await client.query({
      text: "SELECT * FROM movies WHERE title=$1",
      values: [title],
    });

    if (rows.length)
      return res
        .status(400)
        .json({ errorMessage: "A movie with the same title already exists" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }

  // Now we can insert the movie in db
  try {
    const { rows } = await client.query({
      text:
        "INSERT INTO movies(title, description, url, hours, minutes, realisator, casting, rating, video) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      values: [
        title,
        description,
        url,
        parseInt(hours),
        parseInt(minutes),
        realisator,
        casting,
        defaultRating,
        video,
      ],
    });
    res.json(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

module.exports.updateMovie = async (req, res) => {
  if (isNaN(parseInt(req.params.movieId)))
    return res
      .status(400)
      .json({ errorMessage: "Movie id must be an integer" });

  if (isNaN(parseInt(req.body.hours)) || isNaN(parsInt(req.body.minutes)))
    return res
      .status(400)
      .json({ errorMessage: "Movie hours and minutes must be an integer" });

  const { movieId } = req.params;
  const {
    title,
    description,
    url,
    hours,
    minutes,
    realisator,
    casting,
    video,
  } = req.body;

  const { error } = movieValidation(req.body);
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message });

  try {
    const { rows } = await client.query({
      text: "SELECT * FROM movies WHERE id=$1",
      values: [parseInt(movieId)],
    });

    if (!rows.length)
      return res
        .status(400)
        .json({ errorMessage: "No movie found, make sure the id is correct" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }

  try {
    const { rows } = await client.query({
      text:
        "UPDATE movies SET title=$1, SET description=$2, SET url=$3, SET hours=$4, SET minutes=$5, SET realisator=$6, SET casting=$7, SET video=$8 WHERE id=$9",
      values: [
        title,
        description,
        url,
        parseInt(hours),
        parseInt(minutes),
        realisator,
        casting,
        video,
        parseInt(movieId),
      ],
    });

    res.json(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

module.exports.likeMovie = async (req, res) => {
  if (isNaN(parseInt(req.params.movieId)))
    return res.status(400).json({ errorMessage: "Invalid movie id" });

  const { movieId } = req.params;

  // We first check if the movie exist:
  try {
    const { rows } = await client.query({
      text: "SELECT id FROM movies WHERE id=$1",
      values: [parseInt(movieId)],
    });

    if (!rows.length)
      return res.status(404).json({
        errorMessage: "The movie you are trying to like doesn't exist",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }

  try {
    const likedMovies = await client.query({
      text: "SELECT liked FROM users WHERE id=$1",
      values: [req.session.userId],
    });
    // We check if the movie is liked or not by looking at the user likes
    const checkLike = likedMovies.rows[0].liked.find(
      (id) => id === parseInt(movieId)
    );
    console.log(checkLike);
    if (checkLike)
      return res
        .status(403)
        .json({ errorMessage: "You already liked this movie" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }

  // We can now add the movidId in user likes
  try {
    await client.query({
      text: "UPDATE users SET liked = array_cat(liked,$1) WHERE id=$2",
      values: [[parseInt(movieId)], req.session.userId],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }

  // We can increment number of movie likes
  try {
    await client.query({
      text: "UPDATE movies SET rating=rating+1 WHERE id=$1",
      values: [parseInt(movieId)],
    });
    res.json({ likedMovie: movieId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};
