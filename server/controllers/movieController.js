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
    return res.status(500).json({ errorMessage: err });
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
    return res.status(500).json({ errorMessage: err });
  }
};

module.exports.createMovie = async (req, res) => {
  const { title, description, /*cast,*/ url, duration, realisator } = req.body;

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
    return res.status(500).json({ errorMessage: err });
  }

  // Now we can insert the movie in db
  try {
    const { rows } = await client.query({
      text:
        "INSERT INTO movies(title, description, url, duration, realisator, rating) VALUES ($1, $2, $3, $4, $5, $6)",
      values: [title, description, url, duration, realisator, defaultRating],
    });
    res.json(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
};

module.exports.updateMovie = async (req, res) => {
  if (isNaN(parseInt(req.params.movieId)))
    return res
      .status(400)
      .json({ errorMessage: "Movie id must be an integer" });

  const { movieId } = req.params;
  const { title, description, /*cast,*/ url, duration, realisator } = req.body;

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
    return res.status(500).json({ errorMessage: err });
  }

  try {
    const { rows } = await client.query({
      text:
        "UPDATE movies SET title=$1, SET description=$2, SET url=$3, SET duration=$4, SET realisator=$5 WHERE id=$6",
      values: [
        title,
        description,
        url,
        duration,
        realisator,
        parseInt(movieId),
      ],
    });

    res.json(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
};
