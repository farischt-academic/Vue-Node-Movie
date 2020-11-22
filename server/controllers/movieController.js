const { client } = require("../dataBase/index");

const { movieValidation } = require("../helpers/movieValidation");

//! Get all movies
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

//! Read a movie
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

//! Create a movie
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

//! Update a movie
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

//! Like a movie
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

//! Get movies by pages
module.exports.paginateMovies = async (req, res) => {
  // numéro de page à laquelle on veut acceder params
  // nombre d'élément par page   params

  // if (isNaN(parseInt(req.params.pageNumber)))
  //   return res
  //     .status(400)
  //     .json({ errorMessage: "page number must be an integer" });

  /*  if (isNaN(parseInt(req.params.moviesPerPages)))
    return res
      .status(400)
      .json({ errorMessage: "movies per page must be an integer" });*/

  const { moviesPerPage, pageNumber } = req.params;
  // const { pageNumber } = req.body;

  if (!(req.session.maxPages && parseInt(pageNumber) <= req.session.maxPages))
    return res
      .status(400)
      .json({ errorMessage: "The page you are trying to reach doesnt exist" });

  let offset = parseInt((parseInt(pageNumber) - 1) * parseInt(moviesPerPage));

  try {
    const { rows } = await client.query({
      text: "SELECT * FROM movies LIMIT $1 OFFSET $2",
      values: [parseInt(moviesPerPage), offset],
    });

    if (!rows.length)
      return res
        .status(404)
        .json({ errorMessage: "No movie found for your query" });

    res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//! Get the maximum number of pages possible
module.exports.numberOfPages = async (req, res) => {
  if (isNaN(parseInt(req.params.moviesPerPage)))
    return res
      .status(400)
      .json({ errorMessage: "movies per page must be an integer" });

  const { moviesPerPage } = req.params;

  try {
    const { rows } = await client.query({
      text: "SELECT COUNT(*) FROM movies",
    });

    if (!rows.length)
      return res.status(404).json({ errorMessage: "0 page in database" });

    const { count } = rows[0];
    const numberOfPages = Math.ceil(count / parseInt(moviesPerPage));
    req.session.maxPages = numberOfPages;
    res.json({ numberOfPages });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};

//! Get most liked movies
module.exports.listMostLiked = async (req, res) => {
  const filtre = 120;

  try {
    const { rows } = await client.query({
      text: "SELECT * FROM movies WHERE rating > $1",
      values: [filtre],
    });

    if (!rows.length)
      return res
        .status(400)
        .json({ errorMessage: `No movie has more than ${filtre} likes.` });

    res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(err.code).json({ errorMessage: err.message });
  }
};

//! Delete a movie
module.exports.deleteMovie = async (req, res) => {
  if (isNaN(parseInt(req.params.movieId)))
    return res.status(400).json({ errorMessage: "id must be an integer" });

  const { movieId } = req.params;
  // We first check if the id exist in db
  try {
    const { rows } = await client.query({
      text: "SELECT id FROM movies WHERE id=$1",
      values: [parseInt(movieId)],
    });
    if (!rows.length)
      return res.status(400).json({ errorMessage: "invalid movie id" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }

  // We can now delete the movie
  try {
    await client.query({
      text: "DELETE FROM movies WHERE id=$1",
      values: [parseInt(movieId)],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }

  // Finaly we can delete the movie from current user liked movies
  //! Problem : it only delete from the current user and not all user who liked. Liked should have been in movies table
  try {
    const { rows } = await client.query({
      text: "SELECT liked FROM users WHERE id=$1",
      values: [req.session.userId],
    });
    const liked = rows[0].liked;
    const likedItem = liked.find((element) => element === parseInt(movieId));
    // if the current user had liked this item, we remove it
    if (likedItem) {
      const index = liked.findIndex((element) => {
        element === parseInt(movieId);
      });
      liked.splice(index, 1);
      await client.query({
        text: "UPDATE users SET liked=$1 WHERE id=$2",
        values: [liked, req.session.userId],
      });
      res.json(movieId);
    }
    // else we do nothing
    else res.json(movieId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.message });
  }
};
