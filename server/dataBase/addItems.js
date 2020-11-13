const { client } = require("./index");

client.connect();

const movies = [
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
  { name: "", duration: "", realisator: "", summary: "", url: "", rating: 0 },
];

movies.forEach(async (movie) => {
  await client.query({
    text:
      "INSERT INTO movies (name, duration, realisator, summary, url, rating) VALUES ($1, $2, $3, $4, $5)",
    values: [
      movie.name,
      movie.duration,
      movie.realisator,
      movie.summary,
      movie.url,
      movie.rating,
    ],
  });
});
