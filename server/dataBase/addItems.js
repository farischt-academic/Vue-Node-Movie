const { Client } = require("pg");

client = new Client({
  user: "postgres", //process.env.DB_USER,
  host: "localhost", //process.env.DB_HOST,
  password: "lolilollpb", //process.env.DB_PASSWORD,
  database: "PROJETWEB", //process.env.DB_NAME,
});

client.connect();

const movies = [
  {
    title: "Inception",
    description:
      "Dom Cobb est un voleur expérimenté – le meilleur qui soit dans l’art périlleux de l’extraction : sa spécialité consiste à s’approprier les secrets les plus précieux d’un individu, enfouis au plus profond de son subconscient, pendant qu’il rêve et que son esprit est particulièrement vulnérable. Très recherché pour ses talents dans l’univers trouble de l’espionnage industriel, Cobb est aussi devenu un fugitif traqué dans le monde entier qui a perdu tout ce qui lui est cher.",
    rating: 0,
    casting: ["Leonardo Dicaprio", "Marion Cotillard", "Ellen Page"],
    url:
      "https://images-na.ssl-images-amazon.com/images/I/81CgNB2mglL._SL1425_.jpg",
    hours: 3,
    minutes: 1,
    realisator: "Christopher Nolan",
  },
  {
    title: "Interstellar",
    description:
      "Le film raconte les aventures d’un groupe d’explorateurs qui utilisent une faille récemment découverte dans l’espace-temps afin de repousser les limites humaines et partir à la conquête des distances astronomiques dans un voyage interstellaire. ",
    rating: 0,
    casting: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Michael Caine",
      "Michael Caine",
    ],
    url:
      "https://media.senscritique.com/media/000018762465/source_big/Interstellar.jpg",
    hours: 2,
    minutes: 10,
    realisator: "Christopher Nolan",
  },
  /*{
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },*/
];

movies.forEach(async (movie) => {
  const sql = await client.query({
    text:
      "INSERT INTO movies (title, description, rating, url, hours, minutes, realisator, casting) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    values: [
      movie.title,
      movie.description,
      movie.rating,
      movie.url,
      movie.hours,
      movie.minutes,
      movie.realisator,
      movie.casting,
    ],
  });
  console.log(sql);
});
