const { client } = require("../dataBase/index");
const slugify = require("slugify");

//! GET ALL MOVIES
module.exports.listMovies = async (req, res) => {
  try {
    // We query the database to select all the movies
    const { rows } = await client.query({
      text: "SELECT * FROM movies",
    });

    // We check if the result is empty or not
    if (rows.length === 0)
      return res.status(400).json({ errorMessage: "No movies in database " });

    res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
};

module.exports.readMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const { rows } = await client.query({
      text: "SELECT * FROM movies WHERE id=$1",
      values: [movieId],
    });

    if (rows.length === 0)
      return res.status(400).json({
        errorMessage: "No movie found, make sure the id is correct",
      });

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
};
